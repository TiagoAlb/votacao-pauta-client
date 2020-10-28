import Rest from './Rest'

export default class AssociadoService extends Rest {
    constructor() {
        super("/api/associados/")
    }
}