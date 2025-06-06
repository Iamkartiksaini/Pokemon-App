import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { createPortal } from "react-dom";

export default function PokemonCard({ index, pokemon }) {
  const { sprites, name, id } = pokemon;
  const imageUrl = sprites['dream_world']?.front_default
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="300"
      style={{ transition: "all .3s ease-in-out" }}
      className="Card hover:scale-[1.1] overflow-hidden shadow-black-50 flex flex-col justify-between gap-4 shadow-2xl rounded-lg  m-2">
      <Image loading="lazy" height={120} width={120} src={imageUrl} alt={name} className="w-[120px] h-[120px] object-contain mx-auto" />
      <div className="bg-gray-100 px-4 py-2 text-center ">
        {/* <h3 className=""></h3> */}
        <Link className=" text-lg capitalize hover:underline" href={`/pokemon/${id || 1}`}>
          {name}
        </Link>
      </div>
    </div>
  );
}


export const ObserverComponent = ({ pokemon, index, handlePageChange, currentItemsArr, }) => {
  const ref = useRef();
  const [isLoading, setisLoading] = useState(false)

  async function fetchData(key) {
    try {
      setisLoading(true)
      await handlePageChange({ key });
    } catch (error) {
      console.log(error.message)
    }
    finally {
      setisLoading(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const currentPageNumber = currentItemsArr.length / 20;
          fetchData(currentPageNumber)
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [index]);
  return (
    <div ref={ref}>
      <PokemonCard pokemon={pokemon} />
      {isLoading &&
        createPortal(<Loader height="50vh" />, document.getElementById("moreItemLoader"), "loadingPageNo_" + index)
      }
    </div>
  );
}
