// This file is created by egg-ts-helper@1.27.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportHome from '../../../app/controller/home';
import ExportResource from '../../../app/controller/resource';
import ExportRole from '../../../app/controller/role';
import ExportRoleResource from '../../../app/controller/roleResource';
import ExportRoleUser from '../../../app/controller/roleUser';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    home: ExportHome;
    resource: ExportResource;
    role: ExportRole;
    roleResource: ExportRoleResource;
    roleUser: ExportRoleUser;
    user: ExportUser;
  }
}
