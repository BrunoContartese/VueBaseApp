export default ({ $axios }, inject) => {
    const baseUrl = '/administration/permissions'

    const permissionsService = {

        index(params = null) {
            return $axios.get(baseUrl, { params })
        },
    }

    inject('permissionsService', permissionsService)
}