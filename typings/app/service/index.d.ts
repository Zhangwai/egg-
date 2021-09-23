// This file is created by egg-ts-helper@1.27.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBase from '../../../app/service/base';
import ExportResource from '../../../app/service/resource';
import ExportRole from '../../../app/service/role';
import ExportRoleResource from '../../../app/service/roleResource';
import ExportRoleUser from '../../../app/service/roleUser';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/user';
import ExportInterfaceIndex from '../../../app/service/interface/index';

declare module 'egg' {
  interface IService {
    base: AutoInstanceType<typeof ExportBase>;
    resource: AutoInstanceType<typeof ExportResource>;
    role: AutoInstanceType<typeof ExportRole>;
    roleResource: AutoInstanceType<typeof ExportRoleResource>;
    roleUser: AutoInstanceType<typeof ExportRoleUser>;
    test: AutoInstanceType<typeof ExportTest>;
    user: AutoInstanceType<typeof ExportUser>;
    interface: {
      index: AutoInstanceType<typeof ExportInterfaceIndex>;
    }
  }
}
