import Countdown from 'react-countdown'

/* eslint-disable react/prop-types */
export default function SalesCard({ item }) {
    let today = new Date(Date.now())
    let expiryDate = new Date(item.expires)
    let difference = today.getTime() - expiryDate.getTime()
 
   
    return (
      <div className="card bg-base-100 m-3 image-full w-96 shadow-xl">
        <figure>
          <img
            src={
              'http://localhost:5500/sales/' + item.image ||
              'http://localhost:5500/sales/default.webp'
            }
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl">{item.name}</h2>
          <p className="my-3 text-6xl text-white font-extrabold">
            {item.discount_rate.$numberDecimal}%
          </p>
          <Countdown className="text-4xl" date={Date.now() + difference}>
            <span className="text-2xl">Expired</span>
          </Countdown>
          <div className="card-actions justify-end">
            <button className="btn btn-warning">Edit</button>
          </div>
        </div>
      </div>
    )
}