"use client";

const Info = () => {
  return (
    // 背景色、文字色、フォント、中央寄せ、パディングを設定
    <div className="bg-[#202F55] text-[#FEF8F2] text-center px-5 py-16">
      {/* メインタイトル */}
      <h2 className="text-5xl font-light tracking-wider mb-12 font-thin">
        Information
      </h2>

      {/* Event セクション */}
      <section className="mb-12">
        <div className="inline-block border border-[#FEF8F2] px-8 py-2 mb-6">
          <h3 className="text-2xl font-thin">Event</h3>
        </div>
        <div className="leading-relaxed font-thin">
          <p>2025年11月23日(土)</p>
          <p>受付開始 18:25~</p>
          <p>パーティー開始 18:45~</p>
        </div>
      </section>

      {/* Location セクション */}
      <section>
        <div className="inline-block border border-[#FEF8F2] px-8 py-2 mb-6">
          <h3 className="text-2xl font-thin">Location</h3>
        </div>
        <h4 className="text-2xl mt-4 mb-2.5 font-thin">IWAI OMOTESANDO</h4>
        <a
          href="https://iwai.official-wedding.jp/map/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm no-underline hover:underline break-all"
        >
          https://iwai.official-wedding.jp/map/
        </a>

        {/* 地図 */}
        <div className="max-w-2xl mx-auto my-8 px-2.5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.383196924845!2d139.70428387635645!3d35.66759713023199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c9e1605051f%3A0x2984b553c3017a2!2sIWAI%20OMOTESANDO!5e0!3m2!1sja!2sjp!4v1724996911364!5m2!1sja!2sjp"
            className="w-full h-[350px] border-0 rounded"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="IWAI OMOTESANDO Location"
          ></iframe>
        </div>

        {/* アクセス情報 */}
        <div className="text-sm leading-relaxed">
          <p>最寄駅：表参道駅</p>
          <p>「表参道駅」A1出口より 徒歩5分</p>
          <p>「明治神宮前駅」4番出口より 徒歩8分</p>
        </div>
      </section>
    </div>
  );
};

export default Info;
