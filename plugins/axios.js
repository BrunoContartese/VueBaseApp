export default function ({ $axios, app }) {

  $axios.onError(error => {
    switch (error.response.status) {
      case 500:
        app.$toast.error('Ha ocurrido un error en el servidor. (CODE: 500)')
        break;
      case 400:
        app.$toast.error('Su petición no puede ser procesada. (CODE: 400)')
        break;
      case 404:
        app.$toast.error('No se ha encontrado el recurso solicitado. (CODE: 404)')
        break;
      case 401:
        app.$toast.error('No tiene permisos para acceder al recurso solicitado. (CODE: 401)')
        break;
      case 422:
        return Promise.reject(new Error(handleErrors(error.response.data.errors)))
        // app.$toast.error(handleErrors(error.response.data.errors))
        break;
      default:
        app.$toast.error('Su petición no puede ser procesada. (CODE ' + error.response.status +')')
        break;
    }
  })
}

function handleErrors (data) {
  let errors = '<ul>'
  for (const value in data) {
    for (const error in data[value]) {
      errors += '<li>' + data[value][error] + '</li>'
    }
  }
  errors += '</ul>'
  return errors
}
