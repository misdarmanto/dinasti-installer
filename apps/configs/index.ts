import dotenv from 'dotenv'
dotenv.config()

export const CONFIG = {
  appVersion: process.env.APP_VERSION,
  appSemantic: process.env.APP_SEMANTIC,
  appMode: process.env.APP_MODE ?? 'development',
  appUrl: 'https://jasaapk.us/leora/api/v1',
  env: process.env.APP_ENV,
  port: 8012,
  log: 'true',
  ipBlackList: [],
  secret: {
    keyEncryption: 'qwerty',
    passwordEncryption: 'qwerty',
    pinEncryption: 'qwerty',
    token: 'qwerty'
  },
  maximumUploadFile: 1024,
  dataBase: {
    development: {
      username: 'admin_leoraonline',
      password: 'BedakKalsi2024',
      database: 'admin_KasirDinasti',
      host: '119.235.252.16',
      dialect: 'mysql',
      logging: process.env.DB_LOG === 'true'
    },
    testing: {
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: process.env.DB_LOG === 'true'
    },
    production: {
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: process.env.DB_LOG === 'true'
    }
  }
}

// export const CONFIG = {
//   appVersion: process.env.APP_VERSION,
//   appSemantic: process.env.APP_SEMANTIC,
//   appMode: process.env.APP_MODE ?? 'development',
//   appUrl: process.env.APP_URL,
//   env: process.env.APP_ENV,
//   port: process.env.APP_PORT ?? 8000,
//   log: process.env.APP_LOG === 'true',
//   ipBlackList: JSON.parse(process.env.IP_BLACK_LIST ?? '[]'),
//   secret: {
//     keyEncryption: process.env.SECRET_KEY_ENCRYPTION,
//     passwordEncryption: process.env.SECRET_PASSWORD_ENCRYPTION,
//     pinEncryption: process.env.SECRET_PIN_ENCRYPTION,
//     token: process.env.TOKEN_SECRET
//   },
//   maximumUploadFile: process.env.MAXIMUM_UPLOAD_FILE ?? 1024,
//   dataBase: {
//     development: {
//       username: process.env.DB_USER_NAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       host: process.env.DB_HOST,
//       dialect: process.env.DB_DIALECT,
//       logging: process.env.DB_LOG === 'true',
//       port: 8889
//     },
//     testing: {
//       username: process.env.DB_USER_NAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       host: process.env.DB_HOST,
//       dialect: process.env.DB_DIALECT,
//       logging: process.env.DB_LOG === 'true'
//     },
//     production: {
//       username: process.env.DB_USER_NAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       host: process.env.DB_HOST,
//       dialect: process.env.DB_DIALECT,
//       logging: process.env.DB_LOG === 'true'
//     }
//   }
// }
