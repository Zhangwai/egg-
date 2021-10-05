import BaseController from './base';

export default class Controller extends BaseController {
    entity = 'role'
    async getResource() {
        const { service } = this;
        const res = await service.role.getResource()
        res ? this.success(res) : this.error('error')
    }
    async setResource() {
        const { ctx, service } = this;
        let body = ctx.request.body; //roleId = 1 resourceIds = [1 2 3]
        await service.role.setResource(body);
        this.success('授权成功');
    }

    async getUser() {
        const { service } = this;
        const res = await service.role.getUser();
        res ? this.success(res) : this.error('error');
    }
    async setUser() {
        const { ctx, service } = this;
        let body = ctx.request.body; //roleId = 1 userIds = [1 2 3]
        await service.role.setUser(body);
        this.success('授权成功');
    }
}
