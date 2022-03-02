import { deepEqual } from 'assert';
import { Database } from './database'
import nock from 'nock';

import { getPeople } from './api';

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const db = new Database();

describe('Star wars test', function () {
    this.beforeAll(() => {
        const response = {
            "count": 1,
            "next": null,
            "previous": null,
            "results": [
                {
                    "name": "R2-D2",
                    "height": "96",
                    "mass": "32",
                    "hair_color": "n/a",
                    "skin_color": "white, blue",
                    "eye_color": "red",
                    "birth_year": "33BBY",
                    "gender": "n/a",
                    "homeworld": "https://swapi.dev/api/planets/8/",
                    "films": [
                        "https://swapi.dev/api/films/1/",
                        "https://swapi.dev/api/films/2/",
                        "https://swapi.dev/api/films/3/",
                        "https://swapi.dev/api/films/4/",
                        "https://swapi.dev/api/films/5/",
                        "https://swapi.dev/api/films/6/"
                    ],
                    "species": [
                        "https://swapi.dev/api/species/2/"
                    ],
                    "vehicles": [],
                    "starships": [],
                    "created": "2014-12-10T15:11:50.376000Z",
                    "edited": "2014-12-20T21:17:50.311000Z",
                    "url": "https://swapi.dev/api/people/3/"
                }
            ]
        }

        nock('https://swapi.dev/api/people/')
            .get('/?search=r2-d2&format=json')
            .reply(200, response);
    })
    it('Deve buscar o r2d2 com o formato correto ', async () => {
        const expected = [{
            nome: 'R2-D2',
            peso: '96'
        }];
        const nomeBase = `r2-d2`;
        const resultado = await getPeople(nomeBase);
        deepEqual(resultado, expected);
    });
});

describe('Suite de manipulação de Herois', function () {
    this.beforeAll(async () => {
        await db.cadastrar(DEFAULT_ITEM_CADASTRAR);
    });

    it('Deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultado] = await db.listar(expected.id);

        deepEqual(resultado, expected)
    });

    it('Deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const resultado = await db.cadastrar(DEFAULT_ITEM_CADASTRAR);
        const [atual] = await db.listar(DEFAULT_ITEM_CADASTRAR.id);
        deepEqual(atual, expected)
    });

    it('Deve remover um heroi por id', async () => {
        const expected = true;
        const resultado = await db.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected);
    });
})