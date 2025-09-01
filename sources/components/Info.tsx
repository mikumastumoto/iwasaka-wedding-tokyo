"use client";
import { useEffect, useRef, useState } from "react";

const Info = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const sectionMapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // sectionRef 用
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer1.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer1.observe(sectionRef.current);

    // sectionMapRef 用
    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible2(true);
          observer2.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionMapRef.current) observer2.observe(sectionMapRef.current);

    return () => {
      observer1.disconnect();
      observer2.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#202F55] text-[#FEF8F2] text-center px-5 py-16"
    >
      {/* メインタイトル */}
      <h2
        className={`
          text-5xl font-light tracking-wider mb-12 font-thin
          transition-all duration-1000 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        Information
      </h2>

      {/* Event セクション */}
      <section className="mb-12">
        <div className={`
          inline-block border border-[#FEF8F2] px-8 py-2 mb-6
          transition-all duration-1000 ease-out delay-100
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}>
          <h3 className="text-2xl font-thin">Event</h3>
        </div>
        <div className={`
          leading-relaxed font-thin
          transition-all duration-1000 ease-out delay-200
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}>
          <p>2025年11月23日(日)</p>
          <p>受付開始 18:25~</p>
          <p>パーティー開始 18:45~</p>
        </div>
      </section>

      {/* Location セクション */}
      <section>
        <div className={`
          inline-block border border-[#FEF8F2] px-8 py-2 mb-6
          transition-all duration-1000 ease-out delay-300
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}>
          <h3 className="text-2xl font-thin">Location</h3>
        </div>
        <h4 className={`
          text-2xl mt-4 mb-2.5 font-thin
          transition-all duration-1000 ease-out delay-400
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}>IWAI OMOTESANDO</h4>
        <a
          href="https://iwai.official-wedding.jp/map/"
          target="_blank"
          rel="noopener noreferrer"
          className={`
          text-sm no-underline hover:underline break-all block
          transition-all duration-1000 ease-out delay-500
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        >
          https://iwai.official-wedding.jp/map/
        </a>

        {/* 地図 */}
        <section ref={sectionMapRef} className="max-w-2xl mx-auto my-8 px-2.5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.454126200541!2d139.70572251149105!3d35.66581853070598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f30!3m3!1m2!1s0x60188d45097b4ea9%3A0x3d721cafe1762672!2sIWAI%20OMOTESANDO!5e0!3m2!1sja!2sjp!4v1756616728298!5m2!1sja!2sjp"
            className="w-full h-[350px] border-0 rounded"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="IWAI OMOTESANDO Location"
          ></iframe>
        </section>

        {/* アクセス情報 */}
        <div className={`
          text-sm leading-relaxed
          transition-all duration-1000 ease-out delay-300
          ${visible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}>
          <p>最寄駅：表参道駅</p>
          <p>「表参道駅」A1出口より 徒歩5分</p>
          <p>「明治神宮前駅」4番出口より 徒歩8分</p>
        </div>
      </section>
    </section>
  );
};

export default Info;
