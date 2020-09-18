const env = process.env.NODE_ENV === 'development' ? 'dev' : process.env.NODE_ENV

const development = {
  baseURL: 'http://dev.iczer.com'
}

const uat = {
  baseURL: 'http://dev.iczer.com'
}

const production = {
  baseURL: 'http://dev.iczer.com'
}

module.exports = env === 'dev' ? development : env === 'uat' ? uat : production