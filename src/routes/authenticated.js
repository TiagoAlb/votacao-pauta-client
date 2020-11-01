
import Dashboard from '../pages/Dashboard'
import Pautas from '../pages/Pautas'
import CadastrarPauta from '../pages/CadastrarPauta'
import IniciarVotacao from '../pages/IniciarVotacao'
import Sessao from '../pages/Sessao'
import Votacoes from '../pages/Votacoes'

const routes = [
    { path: "/", name: "Dashboard", component: Dashboard },
    { path: "/pautas", name: "Pautas", component: Pautas },
    { path: "/pautas/nova", name: "Cadastrar Pauta", component: CadastrarPauta },
    { path: "/pautas/:id/votacao", name: "Iniciar Votação", component: IniciarVotacao },
    { path: "/sessoes/:id", name: "Sessão de Votação", component: Sessao },
    { path: "/sessoes", name: "Sessões", component: Votacoes }
]

export default routes