export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '1d',
    secretRefreshToken: process.env.APP_SECRET_REFRESH || 'default',
    expiresInRefreshToken: '30d',
    expiresInRefreshTokenDays: 30,
  },
};
