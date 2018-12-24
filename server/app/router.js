'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/v1/chat/bot1', controller.chat.bot1);
  router.get('/api/v1/chat/bot1', controller.chat.bot1);
  router.post('/api/v1/chat/bot2', controller.chat.bot2);
  router.get('/api/v1/chat/bot2', controller.chat.bot2);
};
