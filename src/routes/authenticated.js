
import Dashboard from '../pages/Dashboard'
import Pautas from '../pages/Pautas'
import CadastrarPauta from '../pages/CadastrarPauta'
import IniciarVotacao from '../pages/IniciarVotacao'
import Votacoes from '../pages/Votacoes'

const routes = [
    { path: "/", name: "Dashboard", component: Dashboard },
    { path: "/pautas", name: "Pautas", component: Pautas },
    { path: "/pautas/nova", name: "Cadastrar Pauta", component: CadastrarPauta },
    { path: "/pautas/:id/votacao", name: "Iniciar Votação", component: IniciarVotacao },
    { path: "/votacoes", name: "Votacoes", component: Votacoes }
]

export default routes