import { readFile, writeFile } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

type ItemType = {
    nome: string,
    poder: string,
    id: number
};

type ItemCadastro = {
    nome: string,
    poder: string,
}

class Database {
    NOME_ARQUIVO: string;

    constructor() {
        this.NOME_ARQUIVO = 'herois.json';
    };

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString());
    };

    async escreverArquivo(dados: ItemType | any) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
        return true;
    };

    async cadastrar(heroi: ItemCadastro) {
        const dados = await this.obterDadosArquivo();
        const id = Date.now();
        const heroiComId = {
            id,
            ...heroi
        };
        const dadosFinal = [...dados, heroiComId];
        const resultado = await this.escreverArquivo(dadosFinal);
        return resultado;
    }
    async listar(id: number) {
        const dados = await this.obterDadosArquivo();
        const dadosFiltrados = dados.filter((item: ItemType) => (id ? (item.id === id) : true));
        return dadosFiltrados;
    };

    async remover(id: number) {
        if (!id) {
            return await this.escreverArquivo([]);
        }
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex((item: ItemType) => item.id === id);
        if (indice === -1) {
            throw Error('0 usuario informado não existe')
        }
        dados.splice(indice, 1);
        return await this.escreverArquivo(dados);
    };
}

export { Database };