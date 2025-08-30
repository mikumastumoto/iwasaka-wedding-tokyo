"use client" // Reactフックを使用するため宣言

import type React from "react"
import { useState } from "react"

// 必須タグ
const RequiredTag = () => (
  <span className="border border-[#F99D8C] text-[#F99D8C] text-xs font-semibold px-2 py-0.5 rounded-sm">必須</span>
)

// 任意タグ
const OptionalTag = () => (
  <span className="border border-[#DDDDDD] text-gray-400 text-xs font-semibold px-2 py-0.5 rounded-sm">任意</span>
)

const TextInput = ({
  label,
  type = "text",
  placeholder = "",
  name,
  value,
  onChange,
  error,
}: {
  label: string
  type?: string
  placeholder?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}) => (
  <div>
    <label className="text-sm text-[#202F55]">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-transparent border-b ${
        error ? "border-red-500" : "border-[#DDDDDD]"
      } focus:border-[#202F55] focus:outline-none py-2 transition-colors`}
    />
    {/* エラー文をフィールド直下に赤字で表示 */}
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
)

const WeddingForm = () => {
  const [guestType, setGuestType] = useState("bride")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    furigana: "",
    zipCode: "",
    address: "",
    building: "",
    phone: "",
    email: "",
    allergies: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // 名前の検証
    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください"
    }

    // ふりがな検証
    if (!formData.furigana.trim()) {
      newErrors.furigana = "ふりがなを入力してください"
    } else if (!/^[ぁ-ん\s]+$/.test(formData.furigana)) {
      newErrors.furigana = "ふりがなはひらがなで入力してください"
    }

    // 郵便番号検証
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "郵便番号を入力してください"
    } else if (!/^\d{7}$/.test(formData.zipCode)) {
      newErrors.zipCode = "郵便番号は7桁の数字で入力してください（例：1234567）"
    }

    // 住所の検証
    if (!formData.address.trim()) {
      newErrors.address = "住所を入力してください"
    }

    // 電話番号検証
    if (!formData.phone.trim()) {
      newErrors.phone = "電話番号を入力してください"
    } else if (!/^(0\d{1,4}-\d{1,4}-\d{4}|0\d{9,10})$/.test(formData.phone)) {
      newErrors.phone = "正しい電話番号を入力してください（例：090-1234-5678）"
    }

    // メールアドレス検証
    if (formData.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "正しいメールアドレスを入力してください"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // 入力開始時にエラーを消す
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // 擬似API呼び出し
      console.log("Form submitted successfully", { guestType, ...formData })
      // 成功時の処理（メッセージ表示やリダイレクトなど）
    } catch (error) {
      console.error("Submit error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="text-[#202F55] p-4 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-center text-4xl md:text-5xl font-thin mb-12">Wedding Invitation</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-10">
          {/* 新郎/新婦ゲスト選択 */}
          <fieldset>
            <div className="flex items-center gap-3 mb-4">
              <legend>いずれかをお選びください</legend>
              <RequiredTag />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <label
                className={`flex-1 flex items-center gap-3 px-6 py-3 border rounded-full cursor-pointer transition-colors ${
                  guestType === "groom" ? "border-[#F99D8C]" : "border-[#DDDDDD]"
                }`}
              >
                <input
                  type="radio"
                  name="guestType"
                  value="groom"
                  checked={guestType === "groom"}
                  onChange={() => setGuestType("groom")}
                  className="sr-only"
                />
                <span
                  className={`w-5 h-5 rounded-full border transition-colors ${
                    guestType === "groom" ? "bg-[#F99D8C] border-[#F99D8C]" : "border-[#DDDDDD]"
                  }`}
                ></span>
                <span>新郎ゲスト</span>
              </label>
              <label
                className={`flex-1 flex items-center gap-3 px-6 py-3 border rounded-full cursor-pointer transition-colors ${
                  guestType === "bride" ? "border-[#F99D8C]" : "border-[#DDDDDD]"
                }`}
              >
                <input
                  type="radio"
                  name="guestType"
                  value="bride"
                  checked={guestType === "bride"}
                  onChange={() => setGuestType("bride")}
                  className="sr-only"
                />
                <span
                  className={`w-5 h-5 rounded-full border transition-colors ${
                    guestType === "bride" ? "bg-[#F99D8C] border-[#F99D8C]" : "border-[#DDDDDD]"
                  }`}
                ></span>
                <span>新婦ゲスト</span>
              </label>
            </div>
          </fieldset>

          {/* お名前入力 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <label className="font-semibold">お名前</label>
              <RequiredTag />
            </div>
            <TextInput
              label="名前"
              placeholder="名前"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            <TextInput
              label="ふりがな"
              placeholder="ふりがな"
              name="furigana"
              value={formData.furigana}
              onChange={handleInputChange}
              error={errors.furigana}
            />
          </div>

          {/* ご連名入力 */}
          <div>
            <div className="flex items-center gap-3">
              <label className="font-semibold">ご連名</label>
              <OptionalTag />
            </div>
            <p className="text-sm text-gray-500 mt-1">※4名までご入力いただけます。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-4">
              <TextInput label="名前" placeholder="連名1" name="companion1" value="" onChange={() => {}} />
              <TextInput
                label="ふりがな"
                placeholder="ふりがな"
                name="companion1Furigana"
                value=""
                onChange={() => {}}
              />
            </div>
          </div>

          {/* 住所入力 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <label className="font-semibold">ご住所</label>
              <RequiredTag />
            </div>
            {/* 郵便番号 */}
            <div>
              <label className="text-sm text-[#202F55]">郵便番号</label>
              <div
                className={`flex items-center border-b ${
                  errors.zipCode ? "border-red-500" : "border-[#DDDDDD]"
                } focus-within:border-[#202F55] transition-colors`}
              >
                <span className="text-gray-400 pb-1">〒</span>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="1234567"
                  className="w-full bg-transparent focus:outline-none p-2"
                />
              </div>
              {errors.zipCode && <div className="text-red-500 text-sm mt-1">{errors.zipCode}</div>}
            </div>
            <TextInput
              label="都道府県・市区町村・番地"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              error={errors.address}
            />
            <div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-[#202F55]">建物名など</label>
                <OptionalTag />
              </div>
              <input
                type="text"
                name="building"
                value={formData.building}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-[#DDDDDD] focus:border-[#202F55] focus:outline-none py-2 transition-colors"
              />
            </div>
          </div>

          {/* 電話番号入力 */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <label className="font-semibold">電話番号</label>
              <RequiredTag />
            </div>
            <TextInput
              label="電話番号"
              type="tel"
              placeholder="090-1234-5678"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
            />
          </div>

          {/* メールアドレス入力 */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <label className="font-semibold">メールアドレス</label>
              <OptionalTag />
            </div>
            <TextInput
              label="メールアドレス"
              type="email"
              placeholder="example@email.com"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          </div>

          {/* アレルギーなど */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <label className="font-semibold">アレルギーなど</label>
              <OptionalTag />
            </div>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              placeholder="アレルギーや食事制限などございましたらご記入ください"
              className="w-full bg-transparent border border-[#DDDDDD] rounded-md focus:border-[#202F55] focus:ring-0 focus:outline-none p-3 h-28 transition-colors resize-y"
            ></textarea>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#3B4A7A] to-[#2A3B6B] text-white text-lg font-medium py-4 px-8 rounded-full hover:from-[#2A3B6B] hover:to-[#1F2B5A] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  送信中...
                </>
              ) : (
                "送信"
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default WeddingForm
