import { EggAppConfig, PowerPartial } from 'egg';
export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.security = {
    csrf: {
      enable: false,
    },
    //跨域白名单
    domainWhiteList: ["http://localhost:8008"],
  };
  //add mysql
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123',
      // 数据库名
      database: 'chat',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  //add redis
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: "123",
      db: 0
    }
  }
  return {
    ...config
  };
};
