module.exports = {
  mongoConfig: {
    HOSTNAME: "cluster0.lv4x1.mongodb.net",
    SCHEMA: "mongodb+srv",
    USER: "admin",
    PASSWORD: process.env.MONGO_PASSWORD,
    DATABASE: "coder-backend",
    OPTIONS: "retryWrites=true&w=majority"
  },
  redisConfig: {
    PASSWORD: process.env.REDIS_PASSWORD
  },
  mail: {
    GMAIL_PWD: process.env.GMAIL_PWD,
    GMAIL_ADDRESS: process.env.GMAIL_ADDRESS
  },
  twilio: {
    TWILIO_AUTH: process.env.TWILIO_AUTH,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_PHONE: process.env.TWILIO_PHONE
  }
}