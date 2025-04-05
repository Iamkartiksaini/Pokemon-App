import { baseUrl } from '@/utils/api';
import Image from 'next/image';

export async function generateMetadata({ params }) {
    const { id } = params;
    const res = await fetch(`${baseUrl}/${id}`);
    const data = await res.json();
    const { name, types } = data;

    return {
        title: `${name.toUpperCase()} | Pokémon`,
        description: `Details about ${name}, a ${types[0].type.name}-type Pokémon.`,
    };
}

export default async function PokemonDetailsPage({ params }) {
    const { id } = params;
    const res = await fetch(`${baseUrl}/${id}`);
    const data = await res.json();
    const { name, abilities, types, stats, moves, height, weight, sprites } = data;
    const threeMoves = [moves[0].move.name, moves[1].move.name, moves[2].move.name];
    const statsNames = stats.map(val => val.stat.name);
    const abilitNames = abilities.map(val => val.ability.name);
    const typesNames = types.map(val => val.type.name);
    const imageUrl = sprites.other['dream_world']?.front_default;

    return (
        <div>
            <div className='shadow-blue-400 rounded-lg overflow-hidden'>
                <div className="p-4 flex justify-center items-center bg-[#60e2c8]">
                    <Image height={200} width={200} src={imageUrl} alt={name} />
                </div>
                <div className="p-4 flex flex-col gap-2 bg-[#fdc767]">
                    <p><strong>Name:</strong> <span>{name}</span></p>
                    <p><strong>Types:</strong> <span>{typesNames.join(', ')}</span></p>
                    <p><strong>Stats:</strong> <span>{statsNames.join(', ')}</span></p>
                    <p><strong>Abilities:</strong> <span>{abilitNames.join(', ')}</span></p>
                    <p><strong>Some Moves:</strong> <span>{threeMoves.join(', ')}</span></p>
                </div>
            </div>
        </div>
    );
}
