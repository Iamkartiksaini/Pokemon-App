export const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

export async function fetchPokemons(pageNum = 0) {
  const res = await fetch(`${baseUrl}?limit=20&offset=${pageNum * 20}`);
  const listData = await res.json();
  const allPromise = listData.results.map((val) => {
    const id = getPokemonId(val.url);
    return getPokemonById(id);
  });
  const pokemons = await Promise.all(allPromise);
  const { pokemonsTypes, data } = getAllTypes(pokemons);

  return { data, count: listData?.count, pokemonsTypes };
}

async function getPokemonById(id) {
  const res = await fetch(`${baseUrl}/${id}`);
  return await res.json();
}

function getPokemonId(url) {
  const linkArr = url.split("/");
  return linkArr[linkArr.length - 2];
}

function getAllTypes(pokemons) {
  let pokemonsTypesObject = new Set();
  const data = pokemons.flatMap((val) => {
    const types = val.types.flatMap((data) => data.type.name);
    types.forEach((type) => pokemonsTypesObject.add(type));
    return {
      id: val.id,
      name: val.name,
      sprites: val.sprites.other,
      types,
    };
  });
  const pokemonsTypes = Array.from(pokemonsTypesObject);

  return { pokemonsTypes, data };
}
