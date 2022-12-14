type Props = {};
import { useState, useEffect, useRef } from "react";
import { TimeLeft } from "../interfaces/Countdown";
import Ball from "../public/img/ball.svg";
import Image from "next/image";
import bg from "../public/img/bg.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useContract, useProvider } from "wagmi";
import { PREDICTION_ABI, PREDICTION_CONTRACT } from "../Constants/Index";

const Countdown = ({}: Props) => {
  const provider = useProvider();
  const contract = useContract({
    addressOrName: PREDICTION_CONTRACT,
    contractInterface: PREDICTION_ABI,
    signerOrProvider: provider,
  });

  const [knockoutRound, setKnockoutRound] = useState<string | undefined>();
  const [quarterFinal, setQuarterFinal] = useState<string | undefined>();

  const fetchRoundOf16Time = async (): Promise<void> => {
    try {
      const roundOf16: any = await contract.TOP_16_STARTS();
      const _timeAfterConversion: any = roundOf16.toNumber();
      const _timestamp: number = _timeAfterConversion * 1000;
      let _date: Date = new Date(_timestamp);
      const data = {
        Date: _date.toLocaleString(),
      };
      setKnockoutRound(data.Date);
    } catch (err: any) {
      console.error(err);
    }
  };

  const fetchQuarterFinalsTime = async (): Promise<void> => {
    try {
      const _quarterFinals: any = await contract.TOP_8_STARTS();
      const _timeAfterConversion: any = _quarterFinals.toNumber();
      const _timestamp: number = _timeAfterConversion * 1000;
      let _date: Date = new Date(_timestamp);
      const data = {
        Date: _date.toLocaleDateString(),
      };
      setQuarterFinal(data.Date);
    } catch (err: any) {
      console.error(err);
    }
  };

  const textRef = useRef(null);
  const footballRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const el = textRef.current;
    gsap.fromTo(
      el,
      { rotationX: "200vw" },
      {
        rotationX: 0,
        duration: 4,
        scrollTrigger: {
          trigger: el,
        },
      }
    );
  }, []);
  useEffect(() => {
    const el = footballRef.current;
    gsap.fromTo(
      el,
      { x: "-100vw", rotate: 0 },
      {
        x: 0,
        rotate: 360,
        duration: 3,
        delay: 2,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: el,
          start: "80% 100%",
        },
      }
    );
  }, []);
  const calculateTimeLeft = (): TimeLeft => {
    let year: number = new Date().getFullYear();
    const difference: number = +new Date(`${year}-11-20`) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const timerComponents: JSX.Element[] = [];

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Get the current time every second
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
  }, []);

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval] == 0) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  useEffect(() => {
    fetchRoundOf16Time();
    fetchQuarterFinalsTime();
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div
        className="text-white
      w-full -z-10 "
      >
        <div className="w-[100vw] h-[30vh] sm:h-[70vh] overflow-hidden">
          <Image
            src={bg}
            layout="fill"
            alt="background"
            objectFit="cover"
            priority
          />
        </div>
        <div
          className="absolute top-[35%] left-[15%]  sm:left-[10%] sm:top-1/2"
          ref={textRef}
        >
          {timeLeft.days <= 0 ? (
            <div>
              <p className="md:text-3xl 3xl:text-5xl  text-xl sm:text-xl">
                Next round starts on
              </p>
              <p className="md:text-6xl 3xl:text-8xl text-2xl ">
                {knockoutRound}
              </p>
            </div>
          ) : (
            <div>
              <p className="md:text-3xl 3xl:text-5xl  text-xl sm:text-xl">
                Tournament starts in
              </p>
              <p className="md:text-6xl 3xl:text-8xl text-2xl ">
                {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} :{" "}
                {timeLeft.seconds}
              </p>
            </div>
          )}
        </div>
        <div
          className="absolute xl:-top-[10%] 3xl:-top-[0%] xl:left-[70%] 3xl:left-[70%] z-4 "
          ref={footballRef}
        >
          <Ball className="lg:text-[600px] 3xl:text-[1000px] hidden xl:block animate-spin" />
        </div>
      </div>
    </section>
  );
};

export default Countdown;
