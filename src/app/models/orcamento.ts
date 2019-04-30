import { Cliente } from './cliente';
import { Vendedor } from './vendedor';
import { Produto } from './produto';

export interface Orcamento {
    id_orcamento: number,
    data: Date,
    cliente: number,
    vendedor: number,
    total: number,
    produtos: Array<Produto>
}
