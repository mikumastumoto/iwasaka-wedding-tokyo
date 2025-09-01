"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Message = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // 一度だけ発火
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const texts = [
    "謹啓",
    "皆様におかれましては\nお健やかにお過ごしのこととお慶び申し上げます",
    "さて 私たちは\nこのたび8月23日に\nハワイのセントラルユニオン・コートヤードにて\n結婚式を挙げてまいりました",
    "つきましては 帰国後\n日ごろお世話になっている皆様にお集まりいただき\nささやかですが 結婚のご報告をかねて\n披露の場を設けたく存じます",
    "ご多用中 誠に恐縮でございますが\nぜひご出席をいただきたく\nご案内申し上げます",
    "謹白",
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[#202f55] w-full py-16 px-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* 左側の画像 */}
        <div className="w-full md:w-1/2 m-auto">
          <Image
            src="./images/message.JPEG"
            alt="bride"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* 右側のテキスト */}
        <div className="w-full md:w-1/2 text-[#fef8f2] leading-relaxed text-center md:text-left">
          {texts.map((text, i) => (
            <p
              key={i}
              className={`mb-4 transform transition-all duration-700 ease-out ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }} // 順番に0.2秒ずつ遅らせる
            >
              {text.split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Message;
