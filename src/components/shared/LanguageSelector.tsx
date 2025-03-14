import React, { useState } from "react"
import { supabase } from "../../lib/supabase"

interface LanguageSelectorProps {
  currentLanguage: string
  setLanguage: (language: string) => void
}

export const  LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  setLanguage
}) => {

  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "java", label: "Java" },
    { value: "golang", label: "Go" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "rust", label: "Rust" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "ruby", label: "Ruby" },
    { value: "sql", label: "SQL" },
    { value: "r", label: "R" },
  ];


  const handleLanguageChange = async (
    value: string
  ) => {
    const newLanguage = value
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (user) {
      const { error } = await supabase
        .from("subscriptions")
        .update({ preferred_language: newLanguage })
        .eq("user_id", user.id)

      if (error) {
        console.error("Error updating language:", error)
      } else {
        window.__LANGUAGE__ = newLanguage
        setLanguage(newLanguage)
      }
    }
    setIsOpen(false); // Close dropdown after selection
  }

  return (
    <div className="mb-3 px-2 space-y-1">
      {/* Commented as it is not working properly in windows */}
      {/* <div className="flex items-center justify-between text-[13px] font-medium text-white/90">
        <span>Language</span>
        <select
          value={currentLanguage}
          onChange={handleLanguageChange}
          className="bg-white/10 rounded px-2 py-1 text-sm outline-none border border-white/10 focus:border-white/20"
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="golang">Go</option>
          <option value="cpp">C++</option>
          <option value="swift">Swift</option>
          <option value="kotlin">Kotlin</option>
          <option value="ruby">Ruby</option>
          <option value="sql">SQL</option>
          <option value="r">R</option>
        </select>
      </div> */}

      {/* Custom Dropdown */}
      <div className="flex justify-between text-[13px] font-medium text-white/90">
        <span>Language</span>
        <div className="relative inline-block w-32">
          {/* Dropdown Button */}
          <div
            className="flex items-center justify-between bg-white/10 text-white/90 text-[13px] font-medium 
                      rounded px-2 py-1.5 border border-white/10 hover:border-white/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{languages.find((lang) => lang.value === currentLanguage)?.label}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Dropdown List - Now Inside Relative Container */}
          {isOpen && (
            <div className="absolute left-0 top-full mt-1 w-full bg-black/80 text-white rounded shadow-lg z-50">
              {languages.map((lang) => (
                <div
                  key={lang.value}
                  className="px-3 py-2 hover:bg-gray-700"
                  onClick={() => handleLanguageChange(lang.value)}
                >
                  {lang.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
