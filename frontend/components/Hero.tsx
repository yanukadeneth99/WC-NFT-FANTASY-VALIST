import React from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";

const Hero = () => {
   const { address } = useAccount();
  return (
    <section className="px-2 py-20 text-white">
      <div className="flex justify-start">
        <div className="md:w-3/5 md:px-12 px-4">
          <h2 className="text-4xl text-skin-base my-4 leading-tight lg:text-7xl tracking-tighter mb-6">
            World Cup{" "}
            <span
              className="bg-gradient-to-r bg-clip-text text-transparent 
            from-pink-400 via-purple-500 to-green-400
            animate-text"
            >
              2022
            </span>
            <br /> NFT Fantasy
          </h2>
          <p className="text-base text-skin-muted dark:text-skin-darkMuted lg:text-2xl sm:mb-8 mb-10">
            Purchase Team cards as NFTs and use them for prediction and play
            other games to gain extra points and earn your chance to win a grand
            prize!
          </p>
          <Link href="/HowToPlay">
            <a
              className=" text-3xl bg-gradient-to-r bg-clip-text text-transparent 
            from-pink-400 via-purple-500 to-green-400
            animate-text cursor-pointer"
            >
              Click here to learn how to play like an expert!
            </a>
          </Link>
          {address === undefined ? (
              <span onClick={() => {
                toast.error("Please Connect Wallet First");
              }} className="play-btn text-center py-4 mt-8 w-[90%] sm:w-[60%] block animate-text cursor-pointer hover:animate-text-hover text-2xl">
                PlayGame
              </span>
          ) : (
            <Link href="/MainGame">
              <span className="play-btn text-center py-4 mt-8 w-[90%] sm:w-[60%] block animate-text cursor-pointer hover:animate-text-hover text-2xl">
                PlayGame
              </span>
            </Link>
          )}

          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
