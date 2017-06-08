const config = {
  dev: {
    port: 3000,
    api: {
      host: process.env.API_HOST || 'localhost',
      port: process.env.API_PORT || '8181',
      https: false,
      version: '',
    },
  },
  prod: {
    api: {
      https: true,
    },
  },
};

module.exports = (function getConfig() {
  const env = process.env.NODE_ENV;
  const options = {
    development: () => config.dev,
    testing: () => config.dev,
    production: () => config.prod,
  };
  if (typeof options[env] !== 'function') {
    return {};
  }

  const protocol = https => (https ? 'https://' : 'http://');
  const all = options[env]();

  const fullHost = (({ host, port, https, version }) => ({
    fullHost: `${protocol(https)}${host}:${port}/api${version ? `/${version}` : ''}`,
  }))(all.api);

  const confObject = Object.assign(all, fullHost);

  return confObject;
}());
