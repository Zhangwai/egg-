import BaseController from './base';


const { sign } = require('jsonwebtoken');

export default class Controller extends BaseController {
    entity = 'user'
    //发送验证码
    async captcha() {
        const { ctx, app } = this;
        const captchaObj = await ctx.service.tools.uerTool.getCaptcha()
        await app.redis.set("captcha", captchaObj.text, "EX", 30);
        ctx.session.captcha = {
            text: captchaObj.text,
            expires: new Date(Date.now() + 60 * 1000),
        }; //文本信息存到会话中的captcha属性中
        ctx.set("Content-Type", "image/svg+xml");
        ctx.body = captchaObj.data;
    }
    //验证验证码
    async checkCaptcha() {
        const { ctx, app } = this;
        let { captcha } = ctx.request.body;
        const capchaRedis = await app.redis.get("captcha")
        console.log(captcha, capchaRedis, 1111111111111)
        // console.log(app.redis,22222222222222)
        if (captcha.toLowerCase() === ctx.session.captcha.text.toLowerCase() && new Date(ctx.session.captcha.expires).getTime() > new Date(Date.now()).getTime()) {
            this.success('验证成功');
        } else {
            this.error('验证失败');
        }
    }
    //注册
    async signUp() {
        const { ctx } = this;
        const user = ctx.request.body; //{ username, password, email }
        // 检查数据库中该用户帐号是否重复
        const DuplicateUser = await ctx.service.tools.uerTool.DuplicateUser(user.username);
        if (DuplicateUser && DuplicateUser.length > 0) {
            this.error('用户名已经被注册')
        } else {
            const res = await ctx.service.user.create(user);
            if (res) {
                this.success('注册成功');
            } else {
                this.error('注册失败');
            }
        }

    }
    //登录
    async signIn() {
        const { ctx, app } = this;
        const { username, password } = ctx.request.body;
        const res = await app.mysql.select('user', {
            where: { username, password },
            limit: 1
        })
        if (res && res.length > 0) {
            const u = JSON.parse(JSON.stringify(res[0]));
            delete u.password;
            this.success({
                msg: '登录成功',
                Authorization: sign(u, this.config.jwtSecret)
            })
        } else {
            this.error("登录失败")
        }
    }
}
