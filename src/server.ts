import express from 'express'
import payload from 'payload'

require('dotenv').config()
const app = express()

app.use(express.static('static'))

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET!,
    express: app,
    email: {
      fromAddress: process.env.PAYLOAD_EMAIL_FROM_ADDRESS!,
      fromName: process.env.PAYLOAD_EMAIL_FROM_NAME!,
      transportOptions: {
        host: process.env.SMTP_HOST!,
        port: parseInt(process.env.SMTP_PORT!, 10),
        secure: parseInt(process.env.SMTP_PORT!, 10) === 465,
        requireTLS: process.env.NODE_ENV === 'production',
        auth: {
          user: process.env.SMTP_USER!,
          pass: process.env.SMTP_PASS!,
        }
      }
    },
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(3000)
}

start()
