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
            }).catch(error)
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
            }).catch(error)
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
            }).catch(error)
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
            }).catch(error)
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
            }).catch(error)
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
            }).catch(error)
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
            }).catch(error)
    }

    postNoAuth(item, success, error) {
        const options = {
            headers: {
                'Content-Type': 'application/json'
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
            }).catch(error)
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

        })
    }

    create(item, success, error) {
        fetch(this.url, {
            method: "POST",
            headers: new Headers({
                'Authorization': loginService.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(item)
        }).then((result) => {
            console.log(result)
            if (result.ok) {
                result.json().then(success)
            } else {
                result.json().then(
                    (errorResult) => error(errorResult)
                )
            }
        })
    }

    update(item, step, success, error) {
        fetch(`${this.url}/${item.id}?step=${step}`, {
            method: "PUT",
            headers: new Headers({
                'Authorization': loginService.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(item)
        }).then((result) => {
            if (result.ok) {
                result.json().then(success)
            } else {
                result.json().then(
                    (errorResult) => error(errorResult)
                )
            }

        })
    }

    insertImages(id, file, success, error) {
        fetch(`${this.url}/${id}/images`, {
            method: "PUT",
            body: file
        }).then((result) => {
            if (result.ok) {
                result.json().then(success)
            } else {
                result.json().then(
                    (errorResult) => error(errorResult)
                )
            }
        })
    }

    uploadFileProgress(id, file, uploading, started, finished, error) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            // let fd = new FormData()
            // adicione ao fd as demais informações que você pretende enviar por POST
            // ao servidor, além do(s) arquivo(s)

            // agora é hora de adicionarmos o(s) arquivo(s)
            // fd.append('the-file', file) // nome para referência ao arquivo no formulário
            xhr.open('PUT', `${this.url}/${id}/images`) // path da rota no servidor
            xhr.setRequestHeader('Authorization', loginService.getAuthorization())

            xhr.onerror = reject // em caso de erro, rejeitamos a promise
            xhr.onload = event => {
                // o envio ocorreu com sucesso
                console.log(event)
                resolve() // resolvemos nossa promise
                finished()
            }

            if (xhr.upload) {
                // caso tenhamos acesso a esta informação
                xhr.upload.onloadstart = () => {
                    started()
                }
                xhr.upload.onprogress = progress => {
                    uploading(Math.round((progress.loaded * 100) / progress.total) + '%')
                }
                xhr.upload.onerror = () => {
                    error()
                }
            } else {
                // tratamento em navegadores que não suportam xhr.upload
            }

            xhr.send(file) // iniciando a requisição, enviando o FormData
        })
    }

    listarPaginado(pagina, sucesso, erro) {

        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        }

        fetch(this.url + "?pagina=" + pagina, {
            headers: new Headers({
                'Authorization': loginService.getAuthorization(),

            }),
            method: "GET"
        }).then(trataFetch)
    }

    read(id, success, error) {
        let treatFetch = (result) => {
            if (result.ok) {
                result.json().then(success)
            } else {
                result.json().then(
                    (resultError) => error(resultError)
                )
            }
        }
        fetch(`${this.url}/${id}`, {
            headers: new Headers({
                'Authorization': loginService.getAuthorization(),
            }),
            method: "GET"
        }).then(treatFetch)
    }
}