import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreContextProvider from "@/store/PokemonStore";
import { Fragment } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pokémon",
  description: "Pokemon App to know everything about pokemons",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreContextProvider>{children}</StoreContextProvider>
      </body>
    </html>
  );
}
