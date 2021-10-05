import { Service } from 'egg';
const svgCaptcha = require('svg-captcha');
export default class toolService extends Service {
    //注册检查重复用户名
    async DuplicateUser(username: string) {
        const { app } = this;
        const res = await app.mysql.select('user', {
            where: { username },
            limit: 1
        })
        return res;
    }
    //发送验证码
    async getCaptcha() {
        const captchaObj = svgCaptcha.create(); //captcha = {text,data}
        return captchaObj
    }
}