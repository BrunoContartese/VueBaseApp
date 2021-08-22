import RolePermission from './RolePermission';
export default interface Role {
  id?:          number;
  name:        string;
  guard_name?:  string;
  is_editable?: boolean;
  created_at?:  Date;
  updated_at?:  Date;
  permissions?: RolePermission[]
}
