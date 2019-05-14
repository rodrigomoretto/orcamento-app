import { Cliente } from './cliente';
import { Vendedor } from './vendedor';
import { Produto } from './produto';

export interface Orcamento {
    cliente: number,
    vendedor: number,
    total: number,
    produtos: Array<Produto>
}
