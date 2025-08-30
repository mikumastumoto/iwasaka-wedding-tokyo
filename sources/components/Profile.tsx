"use client";
import Image from "next/image";

export default function Profile() {
    return (
        <section className="bg-[#202f55] text-white py-16 px-6">
            <h2 className="text-center text-4xl font-thin mb-12">Profile</h2>

            <div className="flex flex-col md:flex-row justify-center items-start gap-16">
                {/* Groom */}
                <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right">
                    <div className="align-center w-100">
                        <div className="flex justify-center items-center gap-[60px]">
                            {/* 画像 */}
                            <Image
                                src="./images/honu.png"
                                alt="turtle"
                                width={50}
                                height={50}
                                className="my-2"
                            />

                            <div>
                                {/* 名前 */}
                                <div className="text-3xl font-thin text-center">Riku</div>
                                <div className="text-xl mb-4 font-thin text-center">Groom</div>

                                {/* 装飾アイコン */}
                                <Image
                                    src="./images/honu.png"
                                    alt="turtle"
                                    width={20}
                                    height={20}
                                    className="my-2"
                                />
                            </div>
                        </div>

                        {/* プロフィール文 */}
                        <p className="text-sm leading-relaxed mt-4 text-left mx-auto w-fit">
                            1997年10月18日 / 茨城県出身埼玉県育ち
                            <br />
                            hogehogehoge
                            <br />
                            sample text here
                            <br />
                            <br />
                            当日皆様にお会いできることを楽しみにしています
                        </p>
                    </div>
                </div>

                {/* Bride */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="align-center w-100">
                        <div className="flex justify-center items-center gap-[60px]">
                            {/* 画像 */}
                            <Image
                                src="./images/honu.png"
                                alt="turtle"
                                width={50}
                                height={50}
                                className="my-2"
                            />

                            <div>
                                {/* 名前 */}
                                <div className="text-3xl font-thin text-center">Miku</div>
                                <div className="text-xl mb-4 font-thin text-center">Bride</div>

                                {/* 装飾アイコン */}
                                <Image
                                    src="./images/honu.png"
                                    alt="turtle"
                                    width={20}
                                    height={20}
                                    className="my-2"
                                />
                            </div>
                        </div>

                        {/* プロフィール文 */}
                        <p className="text-sm leading-relaxed mt-4 mx-auto w-fit">
                            1999年4月19日 / 兵庫県出身
                            <br />
                            旅行・コーヒーが好きです                    
                            <br />
                            最近は半年に1回ほどハワイに訪れては、美味しい豆を探しています。
                            <br />
                            <br />
                            当日皆様にお会いできることを楽しみにしています
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
}
