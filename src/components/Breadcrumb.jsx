"use client"
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
    const pathname = usePathname()
    const path = pathname.split('/').filter(Boolean);

    return (
        <nav style={{ color: "#60e2c8", fontDamily: "cursive" }} >
            {
                path.map((segment, index) => (
                    <span className="uppercase font-bold" key={index}>
                        {segment}
                        {index < path.length - 1 && ' > '}
                    </span>
                ))
            }
        </nav >
    );
}
