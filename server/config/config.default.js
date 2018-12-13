'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1544685812446_1684';

  // add your config here
  config.middleware = [];

  //关闭csrf
  config.security = {
    csrf: {
      ignore: '/api/*',
    },
    domainWhiteList: [
      'http://localhost:8081',
      'http://127.0.0.1:8081',
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'http://kuxbot.kux.ai'
    ]
  };

  return config;
};
