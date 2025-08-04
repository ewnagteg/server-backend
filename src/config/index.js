export default {
    port: process.env.PORT || 3000,
    vl: {
        budget: process.env.BUDGET,
        lockTeams: process.env.LOCK_TEAMS === 'TRUE',
        maxGroups: Number(process.env.MAX_GROUPS)
    },
    database: {
      path: process.env.DB_PATH,
      test: process.env.TEST_PATH
    },
    auth: {
      jwksUri: process.env.JWKS_URI,
      audience: process.env.AUTH_AUDIENCE,
      issuer: process.env.AUTH_ISSUER,
    },
    api: {
      key: process.env.UPLOAD_API_KEY,
    },
    env: process.env.ENV,
    log: process.env.LOG === "TRUE"
}; 