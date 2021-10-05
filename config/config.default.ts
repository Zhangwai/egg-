import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1632323598849_202';

  // add your egg config in here
  config.middleware = [
    // "auth",
  ];
  config.session = {
    maxAge: 24 * 3600 * 1000, // ms
    // maxAge: 20 * 1000, // ms
    key: 'EGG_SESS',
    httpOnly: true,
    signed: false,
    encrypt: false,
    renew: true,
    // sameSite: null,
  };
  config.auth = {
    authUrls: ['/api/role/getUser', '/api/role/setUser']
  };
  config.jwtSecret = 'zhangwai';
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  config.validate = {
    // 配置参数校验器，基于parameter
    convert: true, // 对参数可以使用convertType规则进行类型转换
    // validateRoot: false,   // 限制被验证值必须是一个对象。
  };

  config.mailer = {
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MailerAuthUser, // generated ethereal user
      pass: process.env.MailerAuthPass, // generated ethereal password
    },
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
