"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Countdown() {
  const targetDate = new Date("2025-11-23T18:25:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const titleRef = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

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

  // Intersection Observerでタイトルの表示検知
  useEffect(() => {
    if (!titleRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target); // 一度だけ発火
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, []);

  const title = "COUNT DOWN";

  return (
    <section className="px-4 py-18">
      <div className="relative text-center text-[#202f55] font-normal border border-[#202f55]">
        {/* タイトル */}
        <h3
          ref={titleRef}
          className="relative -top-4 inline-block bg-[#fef8f2] px-4 text-[20px] font-normal flex justify-center gap-1"
        >
          {title.split("").map((char, index) => (
            <span
              key={index}
              className={`inline-block transform -translate-y-6 opacity-0 ${
                visible ? "animate-dropIn" : ""
              }`}
              style={{ animationDelay: visible ? `${index * 100}ms` : "0ms" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h3>

        {/* Countdown */}
        <div className="mt-5 pb-6">
          <div className="flex justify-center items-center gap-[10%]">
            <Image src="./images/palm3.png" alt="palm-left" width={40} height={40} />
            <div>
              <div className="text-[80px] text-center leading-[1] mt-5">{timeLeft.days}</div>
              <div className="text-[24px] text-center leading-[1]">days</div>
            </div>
            <Image src="./images/palm3.png" alt="palm-right" width={40} height={40} />
          </div>

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

          <div className="mt-5 text-[12px]">To 2025-11-23 18:25:00</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dropIn {
          0% {
            opacity: 0;
            transform: translateY(-1.5rem);
          }
          100% {
            opacity: 1;
            transform: translateY(60%);
          }
        }

        .animate-dropIn {
          animation: dropIn 0.5s forwards;
        }
      `}</style>
    </section>
  );
}
