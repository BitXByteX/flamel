import React, { useState } from "react"
import { supabase } from "../../lib/supabase"

interface ThemeSelectorProps {
  currentTheme: string
  setTheme: (language: string) => void
}

export const  ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  setTheme
}) => {

  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: "default", label: "Default" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "special", label: "Special" },
  ];


  const handleThemeChange = async (
    value: string
  ) => {
    const newTheme = value
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (user) {
      const { error } = await supabase
        .from("subscriptions")
        .update({ preferred_theme: newTheme })
        .eq("user_id", user.id)

      if (error) {
        console.error("Error updating language:", error)
      } else {
        // window.__LANGUAGE__ = newTheme
        setTheme(newTheme)
      }
    }
    setIsOpen(false); // Close dropdown after selection
  }

  return (
    <div className="mb-3 px-2 space-y-1">
      {/* Custom Dropdown */}
      <div className="flex justify-between text-[13px] font-medium text-white/90">
        <span>Theme</span>
        <div className="relative inline-block w-32">
          {/* Dropdown Button */}
          <div
            className="flex items-center justify-between bg-white/10 text-white/90 text-[13px] font-medium 
                      rounded px-2 py-1.5 border border-white/10 hover:border-white/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{themes.find((theme) => theme.value === currentTheme)?.label}</span>
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
              {themes.map((theme) => (
                <div
                  key={theme.value}
                  className="px-3 py-2 hover:bg-gray-700"
                  onClick={() => handleThemeChange(theme.value)}
                >
                  {theme.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
