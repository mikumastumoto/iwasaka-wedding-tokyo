"use client"

import type React from "react"
import { useState,useEffect } from "react"
import Image from "next/image";

const RequiredTag = () => (
  <span className="border border-[#F99D8C] text-[#F99D8C] text-xs font-semibold px-2 py-0.5 rounded-sm">必須</span>
)

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
  name?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
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
      className={`w-full bg-transparent border-b ${error ? "border-red-500" : "border-[#DDDDDD]"
        } focus:border-[#202F55] focus:outline-none py-2 transition-colors`}
    />
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
)

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

const getCookie = (name: string) => {
  return document.cookie.split("; ").reduce((acc, c) => {
    const [key, v] = c.split("=")
    return key === name ? decodeURIComponent(v) : acc
  }, "")
}

const WeddingForm = () => {
  const [guestType, setGuestType] = useState("groom")
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
    companions: [
      { name: "", furigana: "", allergies: "" },
      { name: "", furigana: "", allergies: "" },
      { name: "", furigana: "", allergies: "" },
      { name: "", furigana: "", allergies: "" },
    ],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [companionsOpen, setCompanionsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const done = getCookie("wedding_submitted")
    if (done === "true") {
      setSubmitted(true)
    }
  }, [])


  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "お名前を入力してください"
    if (!formData.furigana.trim()) newErrors.furigana = "ふりがなを入力してください"
    else if (!/^[ぁ-ん\s]+$/.test(formData.furigana)) newErrors.furigana = "ふりがなはひらがなで入力してください"

    if (!formData.zipCode.trim()) newErrors.zipCode = "郵便番号を入力してください"
    else if (!/^\d{7}$/.test(formData.zipCode)) newErrors.zipCode = "郵便番号は7桁の数字で入力してください（例：1234567）"

    if (!formData.address.trim()) newErrors.address = "住所を入力してください"

    if (!formData.phone.trim()) newErrors.phone = "電話番号を入力してください"
    else if (!/^(0\d{1,4}-\d{1,4}-\d{4}|0\d{9,10})$/.test(formData.phone)) newErrors.phone = "正しい電話番号を入力してください（例：090-1234-5678）"

    if (formData.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email))
      newErrors.email = "正しいメールアドレスを入力してください"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleCompanionChange = (index: number, field: "name" | "furigana" | "allergies", value: string) => {
    setFormData(prev => {
      const newCompanions = [...prev.companions]
      newCompanions[index][field] = value
      return { ...prev, companions: newCompanions }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const params = new URLSearchParams()
      params.append("guestType", guestType)

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "companions") params.append(key, value)
      })

      formData.companions.forEach((comp, i) => {
        params.append(`companion${i + 1}_name`, comp.name)
        params.append(`companion${i + 1}_furigana`, comp.furigana)
        params.append(`companion${i + 1}_allergies`, comp.allergies)
      })

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyLygsBtkSpnQXVtW_gYAznXVH_4JyawPwETuOFhT6E3aZR6A52Ov9mnwtiJZ9MPtiq/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString(),
        }
      )

      const result = await response.json()

      if (result.status === "success") {
        alert("送信完了しました！")
        setSubmitted(true)
        setCookie("wedding_submitted", "true", 365)
      } else {
        alert("送信失敗：" + result.message)
      }
    } catch (err) {
      console.error(err)
      alert("送信エラーが発生しました")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    // ✅ 送信済みUI
    return (
      <section className="text-[#202F55] p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-thin mb-6">Wedding Invitation</h2>
        <p className="text-lg">すでにお申し込み済みです。<br />ありがとうございます！</p>
      </section>
    )
  }

  return (
    <section className="text-[#202F55] p-4 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-center text-4xl md:text-5xl font-thin mb-12 mt-8">Wedding Invitation</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-10">
          {/* 新郎/新婦ゲスト選択 */}
          <fieldset>
            <div className="flex items-center gap-3 mb-4">
              <legend>いずれかをお選びください</legend>
              <RequiredTag />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {["groom", "bride"].map((type) => (
                <label
                  key={type}
                  className={`flex-1 flex items-center gap-3 px-6 py-3 border rounded-full cursor-pointer transition-colors ${guestType === type ? "border-[#F99D8C]" : "border-[#DDDDDD]"}`
                  }
                >
                  <input
                    type="radio"
                    name="guestType"
                    value={type}
                    checked={guestType === type}
                    onChange={() => setGuestType(type)}
                    className="sr-only"
                  />
                  <span className={`w-5 h-5 rounded-full border transition-colors ${guestType === type ? "bg-[#F99D8C] border-[#F99D8C]" : "border-[#DDDDDD]"}`}></span>
                  <span>{type === "groom" ? "新郎ゲスト" : "新婦ゲスト"}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* お名前入力 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <label className="font-semibold">お名前</label>
              <RequiredTag />
            </div>
            <TextInput label="名前" placeholder="名前" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} />
            <TextInput label="ふりがな" placeholder="ふりがな" name="furigana" value={formData.furigana} onChange={handleInputChange} error={errors.furigana} />
          </div>

          {/* 住所入力 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <label className="font-semibold">ご住所</label>
              <RequiredTag />
            </div>
            <div>
              <label className="text-sm text-[#202F55]">郵便番号</label>
              <div className={`flex items-center border-b ${errors.zipCode ? "border-red-500" : "border-[#DDDDDD]"} focus-within:border-[#202F55] transition-colors`}>
                <span className="text-gray-400 pb-1">〒</span>
                <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="1234567" className="w-full bg-transparent focus:outline-none p-2" />
              </div>
              {errors.zipCode && <div className="text-red-500 text-sm mt-1">{errors.zipCode}</div>}
            </div>
            <TextInput label="都道府県・市区町村・番地" name="address" value={formData.address} onChange={handleInputChange} error={errors.address} />
            <div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-[#202F55]">建物名など</label>
                <OptionalTag />
              </div>
              <input type="text" name="building" value={formData.building} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#DDDDDD] focus:border-[#202F55] focus:outline-none py-2 transition-colors" />
            </div>
          </div>

          {/* 電話番号入力 */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <label className="font-semibold">電話番号</label>
              <RequiredTag />
            </div>
            <TextInput label="電話番号" type="tel" placeholder="09012345678" name="phone" value={formData.phone} onChange={handleInputChange} error={errors.phone} />
          </div>

          {/* メールアドレス入力 */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <label className="font-semibold">メールアドレス</label>
              <OptionalTag />
            </div>
            <TextInput label="メールアドレス" type="email" placeholder="example@email.com" name="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
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

          {/* ご連名入力（アコーディオン） */}
          <div>
            <div className="flex items-center align-center justify-between">
              <div>
                <label className="font-semibold pr-3">ご連名</label>
                <OptionalTag />
              </div>
              <button
                type="button"
                onClick={() => setCompanionsOpen(prev => !prev)}
                className="flex items-center gap-2 px-2 py-1 text-sm font-thin transition"
              >
                <span
                  className={`transform transition-transform duration-200 ${companionsOpen ? "rotate-180" : "rotate-0"
                    }`}
                >
                  <Image
                    src="/images/arrow1.png"
                    alt="arrow"
                    width={10}
                    height={10}
                  />
                </span>
                <span className="ml-2">
                  {companionsOpen ? "とじる" : "ひらく"}
                </span>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">※4名までご入力いただけます。</p>

            {companionsOpen && formData.companions.map((comp, i) => (
              <div key={i} className="mt-10">
                <h3 className="text-sm font-medium text-gray-600 mb-3">
                  連名 {i + 1}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <TextInput
                    label="名前"
                    placeholder={`連名${i + 1} 名前`}
                    value={comp.name}
                    onChange={(e) => handleCompanionChange(i, "name", e.target.value)}
                  />
                  <TextInput
                    label="ふりがな"
                    placeholder={`連名${i + 1} ふりがな`}
                    value={comp.furigana}
                    onChange={(e) => handleCompanionChange(i, "furigana", e.target.value)}
                  />
                </div>
                <div className="mt-8">
                <TextInput
                    label="アレルギー"
                    placeholder={`連名${i + 1} アレルギー`}
                    value={comp.allergies}
                    onChange={(e) => handleCompanionChange(i, "allergies", e.target.value)}
                  />
                </div>

              </div>
            ))}
          </div>


          <div className="pt-8 mb-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#3B4A7A] to-[#2A3B6B] text-white text-lg font-medium py-4 px-8 rounded-full hover:from-[#2A3B6B] hover:to-[#1F2B5A] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  送信中...
                </>
              ) : "送信"}
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default WeddingForm
