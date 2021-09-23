import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.get('/api/user', controller.user.findByOptions);
  router.get('/api/user/findAll', controller.user.findAll);
  router.post('/api/user',controller.user.create)
  router.put('/api/user/:id',controller.user.update);
  router.delete('/api/user/:id',controller.user.destory);

  router.get('/api/role', controller.role.findByOptions);
  router.post('/api/role',controller.role.create)
  router.put('/api/role/:id',controller.role.update);
  router.delete('/api/role/:id',controller.role.destory);

  router.get('/api/resource', controller.resource.findByOptions);
  router.post('/api/resource',controller.resource.create)
  router.put('/api/resource/:id',controller.resource.update);
  router.delete('/api/resource/:id',controller.resource.destory);

  router.get('/api/roleUser', controller.roleUser.findByOptions);
  router.post('/api/roleUser',controller.roleUser.create)
  router.put('/api/roleUser/:id',controller.roleUser.update);
  router.delete('/api/roleUser/:id',controller.roleUser.destory);

  router.get('/api/roleResource', controller.roleResource.findByOptions);
  router.post('/api/roleResource',controller.roleResource.create)
  router.put('/api/roleResource/:id',controller.roleResource.update);
  router.delete('/api/roleResource/:id',controller.roleResource.destory);

};
