export default ({ app, $axios }, inject) => {
    const baseUrl = '/administration/roles'

    const rolesService = {

        index(params = null) {
            return $axios.get(baseUrl, { params })
        },

        paginated(params) {
            return $axios.get(`${baseUrl}/paginated/index`, { params })
        },

        show(resourceId) {
            return $axios.get(`${baseUrl}/${resourceId}`)
        },

        store(resource) {
            return $axios.post(`${baseUrl}`, resource)
        },

        update({resource}) {
            return $axios.put(`${baseUrl}/${resource.id}`, resource)
        },

        destroy(resourceId) {
            return $axios.delete(`${baseUrl}/${resourceId}`)
        },

        updatePermissions(resource) {
            return $axios.post(`${baseUrl}/${resource.id}/syncPermissions`, { permissions: resource.permissions })
        }

    }

    inject('rolesService', rolesService)
}