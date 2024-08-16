import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/auth.mjs'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import adminRouter from './routes/admin.mjs'



const corsOptions = {
  origin:'http://localhost:5173'

  ,
  credentials: true,
  optionsSuccessStatus: 200,
}

try {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected')
} catch {
    console.log("Error occured");
}


const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser('yes'))
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: 'mern-starter',
    }),
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
app.use('/auth', authRouter)
app.use('/admin', adminRouter)

const port = process.env.PORT || 5500

app.get("/", (req, res) => {
    res.send("Hello, homepage here!")
})


app.listen(port, () => {
    console.log("Listening to port 5500!");
})