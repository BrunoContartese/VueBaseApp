export default ( { app }, inject ) => {
  const hasPermissionTo = (permissionName) => {
    let authorize = false
    authorize = app.$auth.user.roles[0].permissions.some((permission) => {
      return permission.name === permissionName;
    })
    return authorize
  }
  inject('hasPermissionTo', hasPermissionTo)
}
