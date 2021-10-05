import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  const auth = app.middleware.auth(app.config.auth, app)

  router.get('/', controller.home.index);
  /**
   * 用户
   */
  router.get('/api/user', controller.user.findByOptions);
  router.get('/api/user/findAll', controller.user.findAll);
  router.post('/api/user', controller.user.create)
  router.put('/api/user/:id', controller.user.update);
  router.delete('/api/user/:id', controller.user.destory);

  /**
   * 角色
   */
  router.get('/api/role', controller.role.findByOptions);
  router.post('/api/role', controller.role.create)
  router.put('/api/role/:id', controller.role.update);
  router.delete('/api/role/:id', controller.role.destory);
  router.get('/api/role/getResource', controller.role.getResource); //获取所有资源
  router.post('/api/role/setResource', controller.role.setResource);//设置角色的资源
  router.get('/api/role/getUser', auth, controller.role.getUser);//获取所有的用户
  router.post('/api/role/setUser', auth, controller.role.setUser);//设置角色和用户的关系

  /**
   * 资源
   */
  router.get('/api/resource', controller.resource.findByOptions);
  router.post('/api/resource', controller.resource.create)
  router.put('/api/resource/:id', controller.resource.update);
  router.delete('/api/resource/:id', controller.resource.destory);

  /**
   * 用户角色关系表
   */
  router.get('/api/roleUser', controller.roleUser.findByOptions);
  router.post('/api/roleUser', controller.roleUser.create)
  router.put('/api/roleUser/:id', controller.roleUser.update);
  router.delete('/api/roleUser/:id', controller.roleUser.destory);

  /**
   * 角色资源关系表
   */
  router.get('/api/roleResource', controller.roleResource.findByOptions);
  router.post('/api/roleResource', controller.roleResource.create)
  router.put('/api/roleResource/:id', controller.roleResource.update);
  router.delete('/api/roleResource/:id', controller.roleResource.destory);


  router.get('/api/captcha', controller.user.captcha);//获取验证图片
  router.post('/api/checkCaptcha', controller.user.checkCaptcha);//提交验证
  router.post('/api/verification_codes',controller.verificationCodes.create)

  router.post('/api/signUp', controller.user.signUp);//注册
  router.post('/api/signIn', controller.user.signIn);//登录
};
