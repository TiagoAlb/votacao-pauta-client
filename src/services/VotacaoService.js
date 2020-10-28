import Rest from './Rest'

export default class Votacao extends Rest {
    constructor() {
        super("/api/votacoes/")
    }
}