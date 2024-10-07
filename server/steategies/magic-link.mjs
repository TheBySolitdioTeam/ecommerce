import passport from 'passport'
import MagicLink from 'passport-magic-link'
import sendgrid from '@sendgrid/mail'
import Users from '../models/users.mjs'
import {} from 'dotenv/config'
import mongoose from 'mongoose'

const MagicLinkStrategy = MagicLink.Strategy
 


sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

passport.use(
  new MagicLinkStrategy(
    {
      secret: 'keyboard cat',
      userFields: ['email','id'],
      tokenField: 'token',
      verifyUserAfterToken: true,
    },
    function send(user, token) {
      var link = 'https://api.mobilium.info/auth/login/email/verify?token=' + token
      var msg = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Sign in to bySolitdio',
        text:
          'Hello! Click the link below to finish signing in to Mobilium.\r\n\r\n' +
          link,
        html:
          '<h3>Hello!</h3><p>Click the link below to finish signing in to Mobilium.</p><p><a href="' +
          link +
          '">Sign in</a></p>',
      }
      return sendgrid.send(msg)
    },
    async function verify(user) {
      try {
        const check = await Users.findOne({ email: user.email })
        if (!check) {
          const userPrototype = { email: user.email }
          if (user.id) {
            userPrototype._id = mongoose.Types.ObjectId.createFromHexString(user.id)
          }
          const newUser = new Users(userPrototype)
          await newUser.save()
          return new Promise(function (resolve, reject) {
            return resolve(newUser)
          })
        }
        return new Promise(function (resolve, reject) {
          return resolve(check)
        })
      } catch (error) {
        return new Promise(function (resolve, reject) {
          return reject(error.message)
        })
      }
    }
  )
)
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, email: user.email, isAdmin: user.isAdmin, fullName: user.fullName, picture: user.picture, phone: user.phone })
  })
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    //console.log(`Inside Deserializer:  ${JSON.stringify(user)}`);
    return cb(null, user)
  })
})