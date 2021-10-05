import BaseService from './base';
import { resourceInterface } from './interface'
/**
 * User Service
 */
export default class Service extends BaseService {
    entity = 'user';
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
            for (let i = 0; i < data.length; i++) {
                const user = data[i];
                const resources =await app.mysql.query(`SELECT resource.* FROM resource
                INNER JOIN role_resource ON resource.id = role_resource.resource_id
                INNER JOIN role_user ON role_resource.role_id = role_user.role_id
                WHERE role_user.user_id=?;`, user.id);
                const rootMenus: resourceInterface[] = [];
                const map = {};
                resources.forEach((item: resourceInterface) => {
                    item.children = [];
                    map[item.id] = item;
                    if (item.parent_id === 0) {
                        rootMenus.push(item);
                    } else {
                        map[item.parent_id].children.push(item)
                    }
                });
                user.resources = rootMenus;
            }
            total = await app.mysql.count(this.entity, where)
        }

        return { data, total }
    }
}
