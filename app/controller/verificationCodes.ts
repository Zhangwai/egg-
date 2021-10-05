import { Controller } from 'egg';
export default class RoleController extends Controller {
    /**
     * @apikey
     * @summary 创建 验证码
     * @description 创建 验证码
     * @router post /api/v1/verification_codes
     * @request body verification_codeBodyReq
     */
    async create() {
        const { ctx } = this;
        console.log(ctx.rule, 11111111111)
        // ctx.validate(ctx.rule.verification_codeBodyReq, ctx.request.body);
        // await ctx.service.verificationCodes.create(ctx.request.body);
        // ctx.helper.body.CREATED_UPDATE({ ctx });
        ctx.body = {
            code: 1,
            mas:'111'
        }
    }
}