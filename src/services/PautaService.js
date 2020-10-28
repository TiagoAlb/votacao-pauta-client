import Rest from './Rest'

export default class PautaService extends Rest {
    constructor() {
        super("/api/pautas/")
    }
}