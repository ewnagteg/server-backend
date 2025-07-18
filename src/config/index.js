export default {
    port: process.env.PORT || 3000,
    vl: {
        budget: process.env.BUDGET,
        lockTeams: process.env.LOCK_TEAMS === 'TRUE',
    },
    database: {
      path: process.env.DB_PATH,
    },
    auth: {
      jwksUri: process.env.JWKS_URI,
      audience: process.env.AUTH_AUDIENCE,
      issuer: process.env.AUTH_ISSUER,
    },
    api: {
      key: process.env.UPLOAD_API_KEY,
    },
}; 