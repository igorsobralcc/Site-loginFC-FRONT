import http from '../http-common'

class GerenteDataService {
  getAll () {
    return http.get('/gerente')
  }

  getAllActive () {
    return http.get('/gerente/ativo')
  }

  get (id) {
    return http.get(`/gerente/${id}`)
  }

  create (data) {
    console.log('data da rota: ', data)
    return http.post('/gerente', data)
  }

  update (id, data) {
    return http.put(`/gerente/${id}`, data)
  }

  delete (id) {
    return http.delete(`/gerente/${id}`)
  }

  deleteAll () {
    return http.delete('/gerente')
  }
}

export default new GerenteDataService()
