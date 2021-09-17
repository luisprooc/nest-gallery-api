export default () => ({
  PORT: parseInt(process.env.PORT, 10),
  THROTTLE_TTL: parseInt(process.env.THROTTLE_TTL,10),
  THROTTLE_LIMIT: parseInt(process.env.THROTTLE_LIMIT,10),
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE: {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT, 10),
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
  }
});