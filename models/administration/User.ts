import Role from './Role'

export default interface User {
  id?:             number;
  email:           string;
  email_verified?: boolean;
  given_name:      string;
  family_name:     string;
  password?:        string;
  picture?:        string;
  created_by?:     Date;
  updated_by?:     Date;
  deleted_by?:     Date;
  deleted_at?:     Date;
  created_at?:     Date;
  updated_at?:     Date;
  destroyer?:      null;
  roles?:          Role[];
}
