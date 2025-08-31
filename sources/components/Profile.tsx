"use client";
import Image from "next/image";

export default function Profile() {
  return (
    <section className="bg-[#202f55] text-white py-16 px-6">
      <h2 className="text-center text-4xl font-thin mb-12">Profile</h2>

      <div className="flex flex-col md:flex-row justify-center items-start gap-16">
        {/* Groom */}
        <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right w-full">
          <div className="align-center w-full">
            <div className="flex justify-center items-center gap-[10px]">
              {/* 画像 */}
              <div className="relative w-full h-40 md:h-60">
                <Image
                  src="./images/groom.png"
                  alt="riku"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="md:w-[50%] w-full">
                {/* 名前 */}
                <div className="text-3xl font-thin text-center">Riku</div>
                <div className="text-xl mb-4 font-thin text-center">Groom</div>
              </div>
            </div>

            {/* プロフィール文 */}
            <p className="text-sm leading-relaxed md:mt-4 mt-6 text-left mx-auto w-fit">
              1997年10月18日 / 茨城県出身埼玉県育ち
              <br />
              小さい頃からテニスをやっていました
              <br />
              最近は 旅行やコーヒー カフェ巡りなどにハマっています
              <br />
              <br />
              当日皆様にお会いできることを楽しみにしています
            </p>
          </div>
        </div>

        {/* Bride */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full">
          <div className="align-center w-full">
            <div className="flex justify-center items-center gap-[10px]">
              {/* 画像 */}
              <div className="relative w-full h-40 md:h-60">
                <Image
                  src="./images/bride.png"
                  alt="miku"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="md:w-[50%] w-full">
                {/* 名前 */}
                <div className="text-3xl font-thin text-center">Miku</div>
                <div className="text-xl mb-4 font-thin text-center">Bride</div>
              </div>
            </div>

            {/* プロフィール文 */}
            <p className="text-sm leading-relaxed md:mt-4 mt-6 text-left mx-auto w-fit">
              1999年4月19日 / 兵庫県出身
              <br />
              旅行・コーヒーが好きです
              <br />
              最近は半年に1回ほどハワイに訪れては 美味しい豆を探しています
              <br />
              <br />
              当日皆様にお会いできることを楽しみにしています
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
