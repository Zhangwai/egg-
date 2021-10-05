import { Controller } from 'egg';

export default class BaseController extends Controller {
    entity: string;
    success(data: string | any[] | {}) {
        this.ctx.body = {
            code: 0,
            data,
        }
    }
    error(data: string | []) {
        this.ctx.body = {
            code: 1,
            data,
        }
    }
    /**
     * @desc 找到全部数据
     */
    public async findAll() {
        const { ctx, service } = this;
        let list = await service[this.entity].list();
        ctx.body = list;
    }
    /**
     * @desc 根据条件找数据
     */
    public async findByOptions() {
        const { ctx, service } = this;
        let { pageNum, pageSize, ...where } = ctx.query;
        let list = await service[this.entity].list(isNaN(Number(pageNum)) ? 1 : Number(pageNum), isNaN(Number(pageSize)) ? 5 : Number(pageSize), where);
        this.success(list)
    }

    public async create() {
        const { ctx, service } = this;
        //默认接受x-www-form-urlencoded格式和json格式
        let entity = ctx.request.body;
        const res = await service[this.entity].create(entity);
        res ? this.success('success') : this.error('创建失败');
    }

    public async update() { //   /api/user/:id 要写动态路由
        const { ctx, service } = this;
        let id = ctx.params.id;
        let entity = ctx.request.body;
        entity.id = id;
        const res = await service[this.entity].update(entity);
        res ? this.success('success') : this.error('更新失败');
    }

    public async destory() {
        const { ctx, service } = this;
        let id = ctx.params.id;
        const res = await service[this.entity].destory(id);
        res ? this.success('success') : this.error('删除失败');
    }
}
