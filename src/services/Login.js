import base64 from 'base-64/base64.js'
import axios from 'axios'

class Login {
    auth(email, password, success, error) {
        this.email = email
        this.password = password
        const options = {
            headers: {
                'Authorization': this.getAuthorization()
            }
        }
        axios.get(`api/associados/login`, options)
            .then(res => {
                if (res.status === 200) {
                    this.token = res.headers.token
                    localStorage.setItem("token", this.token)
                    this.data = res.data
                    success(this.data)
                } else {
                    res.json().then(error)
                }
            }).catch(error)
    }

    validateLogin(success, error) {
        const options = {
            headers: {
                'Authorization': this.getAuthorization()
            }
        }

        axios.get(`/api/associados/validateLogin`, options)
            .then(res => {
                if (res.status === 200) {
                    this.data = res.data
                    this.token = localStorage.getItem("token")
                    success(this.data)
                } else {
                    res.json().then(error)
                }
            }).catch(error)
    }

    logout() {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    getAuthorizationGet() {
        return "token=" + this.token
    }

    getAuthorization() {
        this.token = localStorage.getItem('token')

        if (this.token)
            return "Bearer " + this.token
        else
            return "Basic " + base64.encode(this.email + ":" + this.password)
    }

    logged() {
        if (this.data)
            return this.data
        else
            return false
    }

    getUser() {
        return this.data.id
    }
}

export default new Login()