import { Cliente } from './cliente';
import { Vendedor } from './vendedor';
import { Produto } from './produto';

export interface Orcamento {
    id_orcamento: number,
    cliente: number,
    vendedor: number,
    total: number,
    produtos: Array<Produto>
}
