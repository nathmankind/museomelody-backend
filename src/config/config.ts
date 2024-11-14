export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '1h',
  },
  database: {
    connectionString: process.env.DB_CONNECTION_STRING,
  },
});
