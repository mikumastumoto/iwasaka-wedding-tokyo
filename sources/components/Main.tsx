"use client";
import { useEffect } from "react";
import Image from "next/image";
import "./MainSection.css";

export default function MainSection() {
  useEffect(() => {
    function setVh() {
      const vh = window.visualViewport
        ? window.visualViewport.height * 0.01
        : window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <header className="relative w-full h-screen overflow-hidden">
      {/* ヘッダーコンテンツ */}
      <div
        className="flex flex-col justify-center items-center px-4 pb-8"
        style={{
          minHeight: "calc(var(--vh, 1vh) * 100)",
          minHeight: "100dvh",
        }}
      >
        <h1 className="font-serif text-[40px] text-center text-[#202f55]">
          Wedding Party Invitation
        </h1>
        <p className="mx-auto w-4/5 text-black font-normal py-8 border-t border-b border-[#202f55] tracking-[14px] z-10 text-center mt-8 text-[#202f55]">
          RIKU&nbsp; & &nbsp;MIKU
        </p>
      </div>

      {/* パーム画像 */}
      {/* 768px以上: PC用 */}
      <Image
        src="/images/pc-palms.png"
        alt="palms"
        className="hidden md:block absolute bottom-0 w-full object-contain"
        width={0}
        height={0}
        sizes="100vw"
      />
      {/* 768px未満: スマホ用 */}
      <Image
        src="/images/palms.png"
        alt="palms"
        className="block md:hidden absolute bottom-0 w-full object-contain"
        width={0}
        height={0}
        sizes="100vw"
      />

      {/* ウミガメセクション */}
      <section className="absolute top-0 left-0 w-full h-screen">
        <div className="relative w-full h-[300px] overflow-hidden">
          <Image
            id="turtle"
            src="/images/honu.png"
            alt="honu"
            className="absolute bottom-[50px] right-[-200px] w-[150px] animate-swim animate-wiggle"
            width={150}
            height={150}
          />
        </div>
      </section>
    </header>
  );
}