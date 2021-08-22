export default ({ app, $axios }, inject) => {
    const baseUrl = '/administration/users'

    const usersService = {

        index(params = null) {
            return $axios.get(baseUrl, { params })
        },

        paginated(params) {
            return $axios.get(`${baseUrl}/paginated/index`, { params })
        },

        show(userId) {
            return $axios.get(`${baseUrl}/${userId}`)
        },

        store(user) {
            return $axios.post(`${baseUrl}`, user)
        },

        update({user, userId}) {
            return $axios.put(`${baseUrl}/${userId}`, user)
        },

        destroy(userId) {
            return $axios.delete(`${baseUrl}/${userId}`)
        },

        restore(userId) {
            return $axios.post(`${baseUrl}/${userId}/restore`)
        }
    }

    inject('usersService', usersService)
}