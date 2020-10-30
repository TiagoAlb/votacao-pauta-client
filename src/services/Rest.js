import loginService from './Login'
import axios from 'axios'

export default class Rest {

    constructor(url) {
        this.url = url
    }

    get(id, success, error) {
        const options = {
            headers: {
                'Authorization': loginService.getAuthorization()
            }
        }

        axios.get(`${this.url}/${id}`, options)
            .then(res => {
                if (res.status === 200) {
                    success(res.data)
                } else {
                    error(res)
                }
            }).catch(err => {
                error(this.handleCatchError(err))
            })
    }

    getVotacaoStatus(id, success, error) {
        const options = {
            headers: {
                'Authorization': loginService.getAuthorization()
            }
        }

        axios.get(`${this.url}/${id}/status`, options)
            .then(res => {
                if (res.status === 200) {
                    success(res.data)
                } else {
                    error(res)
                }
            }).catch(err => {
                error(this.handleCatchError(err))
            })
    }

    getList(success, error) {
        const options = {
            headers: {
                'Authorization': loginService.getAuthorization()
            }
        }

        axios.get(this.url, options)
            .then(res => {
                if (res.status === 200) {
                    success(res.data)
                } else {
                    error(res)
                }
            }).catch(err => {
                error(this.handleCatchError(err))
            })
    }

    getPagedList(page, success, error) {
        const options = {
            headers: {
                'Authorization': loginService.getAuthorization()
            }
        }

        axios.get(`${this.url}?page=${page}`, options)
            .then(res => {
                if (res.status === 200) {
                    success(res.data)
                } else {
                    error(res)
                }
            }).catch(err => {
                error(this.handleCatchError(err))
            })
    }

    postVotacao(id, minutes, success, error) {
        const options = {
            headers: {
                'Authorization': loginService.getAuthorization()
            }
        }

        axios.post(`${this.url}${id}/votacao?minutes=${minutes}`, {}, options)
            .then(res => {
                if (res.status === 201) {
                    success(res.data)
                } else {
                    const err = res.data
                    if (err.errors.length > 0) {
                        error(err.errors[0])
                    } else {
                        error(err.message)
                    }
                }
            }).catch(err => {
                error(this.handleCatchError(err))
            })
    }

    postVoto(votacaoId, associadoId, voto, success, error) {
        const options = {
            headers: {
                'Authorization': loginService.getAuthorization()
            }
        }

        axios.post(`${this.url}${votacaoId}/associados/${associadoId}/votos?voto=${voto}`, {}, options)
            .then(res => {
                if (res.status === 201) {
                    success(res.data)
                } else {
                    const err = res.data
                    if (err.errors.length > 0) {
                        error(err.errors[0])
                    } else {
                        error(err.message)
                    }
                }
            }).catch(err => {
                error(this.handleCatchError(err))
            })
    }

    post(item, success, error) {
        const options = {
            headers: {
                'Authorization': loginService.getAuthorization()
            }
        }

        axios.post(`${this.url}`, item, options)
            .then(res => {
                if (res.status === 201) {
                    success(res.data)
                } else {
                    const err = res.data
                    if (err.errors.length > 0) {
                        error(err.errors[0])
                    } else {
                        error(err.message)
                    }
                }
            }).catch(err => {
                error(this.handleCatchError(err))
            })
    }

    postNoAuth(item, success, error) {
        console.log('postNoAuth')
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.post(this.url, item, options)
            .then(res => {
                console.log('AQUI')
                console.log(res)
                if (res.status === 201) {
                    success(res.data)
                } else {
                    const err = res.data
                    if (err.errors.length > 0) {
                        error(err.errors[0])
                    } else {
                        error(err.message)
                    }
                }
            }).catch(err => {
                error(this.handleCatchError(err))
            })
    }

    delete(id, sucesso, erro) {
        fetch(`${this.url}/${id}`, {
            headers: new Headers({
                'Authorization': loginService.getAuthorization()
            }),
            method: "DELETE"
        }
        ).then((resposta) => {
            if (resposta.ok) {
                sucesso()
            } else {
                resposta.json().then(erro)
            }

        }).catch(err => {
            error(this.handleCatchError(err))
        })
    }

    handleCatchError(error) {
        console.log(error.response)
        if (error.response) {
            const err = error.response.data
            if (err.errors && err.errors.length > 0)
                return err.message + '\n' + err.errors[0]

            return err.message
        }
        return error.message
    }
}