import BaseService from './base';
import { resourceInterface, setBody } from './interface'
/**
 * User Service
 */
export default class Service extends BaseService {
    entity = 'role'
    async getResource() {
        const { app } = this;
        const resources = await app.mysql.select("resource");
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
        return rootMenus;
    }
    async setResource(body: setBody) {
        const { app } = this;
        const { roleId, resourceIds } = body;
        //开启事务
        const conn = await app.mysql.beginTransaction();
        try {
            await conn.delete('role_resource', roleId);
            if (resourceIds) {
                for (let i = 0; i < resourceIds.length; i++) {
                    await conn.insert('role_resource', {
                        role_id: roleId,
                        resource_id: resourceIds[i]
                    })
                }
            }
            //成功提交
            await conn.commit();
        } catch (error) {
            //失败回滚
            await conn.rollback();
            throw error;
        }

    }

    async getUser() {
        const { app } = this;
        const users = await app.mysql.select("user");
        return users;
    }
    async setUser(body: setBody) {
        const { app } = this;
        const { roleId, userIds } = body;
        const conn = await app.mysql.beginTransaction();
        try {
            await conn.delete('role_user', roleId);
            if (userIds) {
                for (let i = 0; i < userIds.length; i++) {
                    await conn.insert('role_user', {
                        role_id: roleId,
                        user_id: userIds[i]
                    })
                }
            }
            conn.commit();
        } catch (error) {
            conn.rollback();
            throw error;
        }

    }
}
