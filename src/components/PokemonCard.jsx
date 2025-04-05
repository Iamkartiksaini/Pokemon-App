import Image from "next/image";
import Link from "next/link";

export default function PokemonCard({ pokemon, index }) {
  const { sprites, name, id } = pokemon;
  const imageUrl = sprites['dream_world']?.front_default

  return (
    <div className="hover:scale-[1.1] overflow-hidden transition-all shadow-black-50 flex flex-col justify-between gap-4 shadow-2xl rounded-lg  m-2">
      <Image loading="lazy" height={120} width={120} src={imageUrl} alt={name} className="w-[120px] h-[120px] object-contain mx-auto" />
      <div className="bg-gray-100 px-6 py-4 ">
        <h3 className="text-xl capitalize">{name}</h3>
        <Link className="text-blue-500 hover:underline" href={`/pokemon/${id || 1}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}
