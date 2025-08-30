"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Countdown() {
  const targetDate = new Date("2025-08-31T21:55:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 py-18">
      <div className="relative text-center text-[#202f55] font-normal border border-[#202f55]">
        {/* タイトル */}
        <h3 className="relative -top-4 inline-block bg-[#fef8f2] px-4 text-[20px] font-normal">
          COUNT DOWN
        </h3>

        {/* Countdown */}
        <div className="mt-5 pb-6">
          {/* Days with palms */}
          <div className="flex justify-center items-center gap-[10%]">
            <Image src="/images/palm3.png" alt="palm-left" width={40} height={40} />
            <div>
              <div className="text-[80px] text-center leading-[1] mt-5">{timeLeft.days}</div>
              <div className="text-[24px] text-center leading-[1]">days</div>
            </div>
            <Image src="/images/palm3.png" alt="palm-right" width={40} height={40} />
          </div>

          {/* Hours, Minutes, Seconds */}
          <div className="flex justify-around mt-8">
            <div>
              <div className="text-[28px] leading-[1]">{timeLeft.hours}</div>
              <div className="text-[16px] leading-[1]">hours</div>
            </div>
            <div>
              <div className="text-[28px] leading-[1]">{timeLeft.minutes}</div>
              <div className="text-[16px] leading-[1]">min.</div>
            </div>
            <div>
              <div className="text-[28px] leading-[1]">{timeLeft.seconds}</div>
              <div className="text-[16px] leading-[1]">seconds</div>
            </div>
          </div>

          {/* Target Date */}
          <div className="mt-5 text-[12px]">To 2025.08.31 21:55</div>
        </div>
      </div>
    </section>
  );
}