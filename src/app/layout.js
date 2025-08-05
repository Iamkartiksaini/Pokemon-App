import { Poppins } from "next/font/google";
import "./globals.css";
import "./app.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
export const metadata = {
  title: "Pokémon",
  description: "Pokemon App to know everything about pokemons",
  keywords: ["Pokemon", "Pokemon App", "Find My Pokemon"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${poppins.variable} antialiased overflow-x-hidden flex flex-col justify-start min-h-screen items-center relative`}
      >
        <div className="max-w-[1600px] w-full">{children}</div>
      </body>
    </html>
  );
}
