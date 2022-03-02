import get from 'axios';
type ItemType = {
    name: string;
    height: string;
}

const URL = `https://swapi.dev/api/people`;

async function getPeople(nome: string) {

    const url = `${URL}/?search=${nome}&format=json`;

    const result = await get(url);
    return result.data.results.map(mapPeople);
}

function mapPeople(item: ItemType) {
    return {
        nome: item.name,
        peso: item.height
    }
}

export { getPeople };