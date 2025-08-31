import Image from "next/image";

const Message = () => {
  return (
    <section className="bg-[#202f55] w-full py-16 px-4">
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
          <p className="mb-6 text-center">謹啓</p>
          <p className="mb-4">
            皆様におかれましては
            <br />
            お健やかにお過ごしのこととお慶び申し上げます
          </p>
          <p className="mb-4">
            さて 私たちは
            <br />
            このたび8月23日に
            <br />
            ハワイのセントラルユニオン・コートヤードにて
            <br />
            結婚式を挙げてまいりました
          </p>
          <p className="mb-4">
            つきましては 帰国後
            <br />
            日ごろお世話になっている皆様にお集まりいただき
            <br />
            ささやかですが 結婚のご報告をかねて
            <br />
            披露の場を設けたく存じます
          </p>
          <p className="mb-4">
            ご多用中 誠に恐縮でございますが
            <br />
            ぜひご出席をいただきたく
            <br />
            ご案内申し上げます
          </p>
          <p className="mt-6 text-center">謹白</p>
        </div>
      </div>
    </section>
  );
};

export default Message;
