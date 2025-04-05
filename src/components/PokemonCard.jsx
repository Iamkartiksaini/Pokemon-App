import Image from "next/image";
import Link from "next/link";

export default function PokemonCard({ pokemon, index }) {
  if (index == 1) {
    console.log(pokemon)
  }
  const { sprites, name, id } = pokemon;
  const imageUrl = sprites.other['dream_world']?.front_default

  return (
    <div className="hover:scale-[1.1] transition-all shadow-black-50 flex flex-col gap-4 shadow-2xl rounded-lg py-4 px-6 m-2">
      <Image loading="lazy" height={60} width={60} src={imageUrl} alt={name} className="w-32 mx-auto h-32" />
      <h3 className="text-xl capitalize">{name}</h3>
      <Link className="text-blue-500" href={`/pokemon/${id || 1}`}>
        View Details
      </Link>
    </div>
  );
}
