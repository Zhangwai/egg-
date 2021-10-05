const { verify } = require('jsonwebtoken');

function verifyToken(token: string, secret: string) {
    return new Promise(function (resolve, reject) {
        verify(token, secret, function (error, payload) {
            if (error) {
                reject(error);
            } else {
                resolve(payload);
            }
        });
    })
}
/*
export default (options, app) => {
    return async function (ctx, next) {
        //在此处进行权限判断
        let authUrls = options.authUrls;
        if (authUrls.includes(ctx.url)) {
            const authorization = ctx.get('Authorization');
            if (authorization) {
                try {
                    let user = await verifyToken(authorization, app.config.jwtSecret);
                    ctx.session.user = user;
                    await next();
                } catch (error) {
                    ctx.status = 401;
                    ctx.body = 'token验证失败'
                }
            } else {
                ctx.status = 401;
                ctx.body = '没有token'
            }
        } else {
            await next();
        }
    }
}
*/

export default (options, app) => {
    return async function (ctx, next) {
        //肯定要进行token判断
        const authorization = ctx.get('Authorization');
        if (authorization) {
            try {
                let user = await verifyToken(authorization, app.config.jwtSecret);
                ctx.session.user = user;
                await next();
            } catch (error) {
                ctx.status = 401;
                ctx.body = 'token验证失败'
            }
        } else {
            ctx.status = 401;
            ctx.body = '没有token'
        }
    }
}