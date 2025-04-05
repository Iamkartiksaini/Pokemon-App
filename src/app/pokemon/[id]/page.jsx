import { baseUrl } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';

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

    const parentStyle = "flex flex-col justify-center gap-4 min-h-[calc(100vh_-_100px)] items-center"

    return (
        <div className={parentStyle}>
            <div className='flex justify-between items-center gap-5 max-w-[400px] w-full   bg-white py-2 px-4  shadow-black-50  shadow-2xl  rounded-b-lg mb-6'>
                <Link className='border-2 hover:text-amber-600  hover:border-amber-600 py-1 px-3 m-0 h-fit text-blue-400  border-blue-400 rounded-sm' href={"/"}> ← Back</Link>
                <h4 className='text-[#51ceb5]' style={{ fontFamily: "cursive" }} >
                    Pokemon Id :{id}
                </h4 >
            </div>
            <div className='shadow-blue-400 rounded-lg overflow-hidden'>
                <div className="p-4 flex justify-center items-center bg-[#60e2c8]">
                    <Image height={200} width={200} src={imageUrl} alt={name} />
                </div>
                <div className="p-4  pt-8 flex flex-col gap-2 bg-[#fdc767]">
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
