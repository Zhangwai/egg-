import { Service } from 'egg';
import { createUser } from './interface'
import { v4 } from 'uuid';
/**
 * User Service
 */
export default class BaseService extends Service {
    entity: string
    public async list(pageNum: number, pageSize: number, where: any) {
        const { app } = this;
        let data: any[], total: number;
        if (!pageSize && !pageSize && !where) {
            data = await app.mysql.select(this.entity);
            total = await app.mysql.count(this.entity);
        } else {
            // 查询当页的数据
            data = await app.mysql.select(this.entity, {
                where,
                order: [['id', 'asc'], ['username', 'asc']],
                offset: (pageNum - 1) * pageSize,
                limit: pageSize
            });
            total = await app.mysql.count(this.entity, where)
        }

        return { data, total }
    }
    public async create(payload: createUser) {
        const { app } = this;
        payload.uuid = v4();
        const res = await app.mysql.insert(this.entity, payload);
        return res.affectedRows > 0;
    }
    public async update(payload: createUser) {
        const { app } = this;
        const res = await app.mysql.update(this.entity, payload)
        return res.affectedRows > 0;
    }
    public async destory(id: number) {
        const { app } = this;
        return app.mysql.delete(this.entity, { id })
    }
}
