import express, { Router } from "express";
import Orders from "../models/orders.mjs";
import Cart from "../models/cart.mjs";
import Addresses from "../models/addresses.mjs";

const router = Router();

const checkIfConnected = (req, res, next) => {
  req.user ? next() : res.send({ error: "Your are not an connected!" });
};

// Calculate amount for items
const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  const total = items
    .map((item) => parseFloat(item.price * parseFloat(item.qty)))
    .reduce((acc, curr) => (acc += curr), 0);
  return total;
};

router.post("/", checkIfConnected, async (req, res) => {
  //Get address from request query
  const { addressId } = req.query;
  try {
    // get the order ready
    const address = await Addresses.findById(addressId);
    if (!address) return res.send({ error: "Wrong Address" });
    //console.log(address)
    // Get the user from req.user
    const user = {
      user_id: req.user.id,
      email: req.user.email,
      picture: req.user.picture,
      phone: req.user.phone,
    };

    // get cart from user._id
    let cart = await Cart.find({ user_id: req.user.id });
    cart = cart[0];
    const items = cart.items;
    const total = calculateOrderAmount(items);
    const payment = "cash";
    const orderObj = {
      cart,
      user,
      address,
      total,
      payment,
    };

    const order = new Orders(orderObj);
    await order.save();

    // update cart 
    cart.items = [];
    cart.subtotal = 0;
    
    await Cart.findByIdAndUpdate(cart._id, cart);
    return res.send({msg: "Order created!"})
  } catch (error) {
    return res.send({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const query = {};
  if (!req.user.isAdmin) {
    query["user.user_id"] = req.user.id;
  }
  try {
    const data = await Orders.find(query, null, { sort: { _id: -1 } });
    //console.log(data)
    return res.send(data);
  } catch (error) {
    return res.send({ error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { cursor, limit } = req.query;
  const query = { "user.user_id": userId };
  if (cursor) {
    query._id = { $gt: cursor };
  }
  try {
    const userOrders = await Orders.find(query, null, {
      limit: Number(limit),
      sort: { _id: -1 },
    });
    return res.send(userOrders);
  } catch (error) {
    return res.send({ error: error.message });
  }
});

// Get order according to date
router.get("/filter/:date", async (req, res) => {
  let { date } = req.params;
  date = new Date(date);
  let datePlusOne = new Date(date);
  datePlusOne.setDate(date.getDate() + 1);
  //console.log(date ,datePlusOne)
  const { cursor, limit } = req.query;
  const query = { createdAt: { $gte: date, $lt: datePlusOne.toISOString() } };
  if (!req.user.isAdmin) {
    query["user.user_id"] = req.user.id;
  }

  if (cursor) {
    query._id = { $gt: cursor };
  }
  try {
    const orders = await Orders.find(query, null, { limit: Number(limit) });
    return res.send(orders);
  } catch (error) {
    return res.send({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, shipping } = req.body;

  // get order

  const order = await Orders.findById(id);
  if (!order) return res.send({ error: "Order does not exist" });
  if (status) {
    order.status = status;
  }
  if (shipping) {
    order.shipping = shipping;
  }

  // update order
  try {
    await Orders.findByIdAndUpdate(id, order);
    return res.send({ msg: "Order updated!" });
  } catch (error) {
    return res.send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const order = await Orders.findById(id);
  if (!order) return res.send({ error: "Order does not exist" });

  try {
    await Orders.findByIdAndDelete(id);
    return res.send({ msg: "Order deleted!" });
  } catch (error) {
    return res.send({ error: error.message });
  }
});

export default router;
