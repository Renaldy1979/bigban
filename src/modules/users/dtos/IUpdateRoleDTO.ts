import Permission from '@modules/users/infra/typeorm/entities/Permission';

export default interface IUpdateRoleDTO {
  name?: string;
  description?: string;
  permissions?: Permission[];
}
