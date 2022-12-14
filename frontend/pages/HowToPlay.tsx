import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Tut1 from "../public/img/Tutorial-1.png";
import Tut2 from "../public/img/Tutorial-2.png";
import Tut3 from "../public/img/Tutorial-3.png";
import Tut4 from "../public/img/Tutorial-4.png";
import Tut5 from "../public/img/Tutorial-5.png";
import Tut6 from "../public/img/Tutorial-6.png";
import { CircleLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { NextSeo } from "next-seo";

type Props = {};

const HowToPlay = (props: Props) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <div className="flex justify-center items-center min-w-[100vw] min-h-screen">
      <NextSeo
        title="How To Play | WC NFT Fantasy"
        description="Learn How to play WC NFT Fantasy Game"
      />
      {loading ? (
        <CircleLoader
          color="#9a00ff"
          cssOverride={{}}
          loading
          size={150}
          speedMultiplier={0.5}
        />
      ) : (
        <section className="flex flex-col ">
          <Navbar />
          <div>
            <div className="flex justify-center pb-40">
              <div className="relative inline-block">
                <div
                  className="absolute -inset-1 bg-[#D100D1]
              to-[#F20089] blur-xl"
                ></div>
                <h1 className="relative border-t-4 border-[#D100D1] py-2 text-white text-3xl lg:text-4xl">
                  How To Play
                </h1>
              </div>
            </div>

            <article className="flex px-4 justify-between items-center flex-wrap mb-36">
              <div className="md:w-1/2">
                <p className="text-white text-2xl tracking-wider mb-10 text-justiy">
                  Once the first countdown ends and the tournament begins you
                  can start minting your NFTs start building your team with the
                  countries you think will make it the furthest to win the
                  prestigious World Cup trophy!
                </p>
              </div>
              <div className="max-w-xl border-8 border-shade-2">
                <Image src={Tut1} alt="First Tutorial image" />
              </div>
            </article>
            <article className="flex px-4 justify-between items-center flex-wrap mb-36">
              <div className="md:w-1/2">
                <p className="text-white text-2xl tracking-wider mb-10 text-justiy">
                  In this image you can see the price of the NFTs you have
                  chosen to mint as well as a mint button.
                </p>
              </div>
              <div className="max-w-xl border-8 border-shade-2">
                <Image src={Tut2} alt="Second Tutorial imgae" />
              </div>
            </article>
            <article className="flex px-4 justify-between items-center flex-wrap mb-36">
              <div className="md:w-1/2">
                <p className="text-white text-2xl tracking-wider mb-10 text-justiy">
                  After clicking on the mint button you will be able to see a
                  modal that will ask for the amount of matic you want to pay to
                  mint. Now keep in mind you will need to pay a certain amount
                  but this input allows you to send more money to the contract
                  if you wish to.
                </p>
              </div>
              <div className="max-w-xl border-8 border-shade-2">
                <Image src={Tut3} alt="Third tutorial image" />
              </div>
            </article>
            <article className="flex px-4 justify-between items-center flex-wrap mb-36">
              <div className="md:w-1/2">
                <p className="text-white text-2xl tracking-wider mb-10 text-justiy">
                  After you choose the order of your teams, And if any of the
                  teams you chose makes it to the next round will then be able
                  to evolve them by clicking on the NFT which will evolve your
                  NFT to another level.
                </p>
              </div>
              <div className="max-w-xl border-8 border-shade-2">
                <Image src={Tut4} alt="Fourth Tutorial image" />
              </div>
            </article>
            <article className="flex px-4 justify-between items-center flex-wrap mb-36">
              <div className="md:w-1/2">
                <p className="text-white text-2xl tracking-wider mb-10 text-justiy">
                  You can also swap the order of the teams that you think will be winners, runner ups, third place of fourth place in the competition by clicking the shown button. This will pop up a modal and then you would be inputting the two teams you want to swap inside the modal.
                </p>
              </div>
              <div className="max-w-xl border-8 border-shade-2">
                <Image src={Tut5} alt="Third tutorial image" />
              </div>
            </article>
            <article className="flex px-4 justify-between items-center flex-wrap mb-10">
              <div className="md:w-1/2">
                <p className="text-white text-2xl tracking-wider mb-10 text-justiy">
                  Here you can click on the deposit points button to finally deposit your points into your main game page. This is necessary since this process is not automated so everytime you buy, upgrade or earn a new NFT make sure to deposit your points into the main game dapp.
                </p>
              </div>
              <div className="max-w-xl border-8 border-shade-2">
                <Image src={Tut6} alt="Fourth Tutorial image" />
              </div>
            </article>
          </div>
          <Footer />
        </section>
      )}
    </div>
  );
};
export default HowToPlay;
