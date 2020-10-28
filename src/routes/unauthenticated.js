import SignIn from '../pages/SignIn'
import Register from '../pages/Register'

const routes = [
    { path: "/signin", name: "SignIn", component: SignIn },
    { path: "/register", name: "Register", component: Register },
    { redirect: true, path: "/", to: "/signin", name: "SignIn" }
]

export default routes