import React, { useState, useEffect, useRef } from "react";

import { supabase } from "../../lib/supabase";
import { useToast } from "../../contexts/toast";
import { LanguageSelector } from "../shared/LanguageSelector";
import { COMMAND_KEY } from "../../utils/platform";
import { ThemeSelector } from "../shared/ThemeSelector";
// import BigEyeDesign from "../CustomUI/Queue/BigEyeDesign";
import ElegantDesign from "../CustomUI/Queue/ElegantDesign";
interface QueueCommandsProps {
  onTooltipVisibilityChange: (visible: boolean, height: number) => void;
  screenshotCount?: number;
  credits: number;
  currentLanguage: string;
  setLanguage: (language: string) => void;
  currentTheme: string;
  setTheme: (theme: string) => void;
}

const CloseIconComponent: React.FC<any> = ({ showToast }) => {
  return (
    <div
      className="relative inline-block"
      onClick={async () => {
        try {
          const result = await window.electronAPI.quitApp();
          if (!result.success) {
            console.error("Failed to quit app", result.error);
            showToast("Error", "Failed to quit app", "error");
          }
        } catch (error) {
          console.error("Error quitting app", error);
          showToast("Error", "Failed to quit app", "error");
        }
      }}
    >
      {/* Close icon */}
      <div className="w-5 h-5 flex items-center justify-center cursor-default text-white/70 hover:text-white/90 transition-colors">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
              fill="#ffffff"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};

const QueueCommands: React.FC<QueueCommandsProps> = ({
  onTooltipVisibilityChange,
  screenshotCount = 0,
  credits,
  currentLanguage,
  setLanguage,
  currentTheme,
  setTheme,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [stayTooltipVisible, setStayTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    let tooltipHeight = 0;
    if (tooltipRef.current && isTooltipVisible) {
      tooltipHeight = tooltipRef.current.offsetHeight + 10;
    }
    onTooltipVisibilityChange(isTooltipVisible, tooltipHeight);
  }, [isTooltipVisible]);

  const handleSignOut = async () => {
    try {
      // Clear any local storage or electron-specific data first
      localStorage.clear();
      sessionStorage.clear();

      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const handleToggleSettings = (e: { target: any; currentTarget: any }) => {
    // setStayTooltipVisible((prev)=>!prev);
  };

  return (
    <div>
      <div className="w-fit">
        {/* <BigEyeDesign
          showToast={showToast}
          screenshotCount={screenshotCount}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          handleToggleSettings={handleToggleSettings}
          isTooltipVisible={isTooltipVisible}
          stayTooltipVisible={stayTooltipVisible}
          credits={credits}
          currentLanguage={currentLanguage}
          setLanguage={setLanguage}
          currentTheme={currentTheme}
          setTheme={setTheme}
          onTooltipVisibilityChange={onTooltipVisibilityChange}
          handleSignOut={handleSignOut}
        /> */}
        <ElegantDesign
          showToast={showToast}
          screenshotCount={screenshotCount}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          handleToggleSettings={handleToggleSettings}
          isTooltipVisible={isTooltipVisible}
          stayTooltipVisible={stayTooltipVisible}
          credits={credits}
          currentLanguage={currentLanguage}
          setLanguage={setLanguage}
          currentTheme={currentTheme}
          setTheme={setTheme}
          onTooltipVisibilityChange={onTooltipVisibilityChange}
          handleSignOut={handleSignOut}
        />
      </div>
    </div>
  );

  // Initial design
  return (
    <div>
      <div className="pt-2 w-fit">
        {/* <div className="text-xs text-white/90 backdrop-blur-md bg-black/60 rounded-3xl py-2 px-4 flex items-center justify-center gap-4 inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500  bg-gradient-to-r"> */}
        <div className="text-xs text-white/90 backdrop-blur-md bg-cciGradientPrimary rounded-3xl py-2 px-4 flex items-center justify-center gap-4">
          {/* Screenshot */}
          <div
            className="flex items-center gap-2 cursor-pointer rounded px-2 py-1.5 hover:bg-white/10 transition-colors"
            onClick={async () => {
              try {
                const result = await window.electronAPI.triggerScreenshot();
                if (!result.success) {
                  console.error("Failed to take screenshot:", result.error);
                  showToast("Error", "Failed to take screenshot", "error");
                }
              } catch (error) {
                console.error("Error taking screenshot:", error);
                showToast("Error", "Failed to take screenshot", "error");
              }
            }}
          >
            <span className="text-[11px] leading-none truncate">
              {screenshotCount === 0
                ? "Take screenshot"
                : screenshotCount === 1
                ? "Take second screenshot"
                : "Reset first screenshot"}
            </span>
            <div className="flex gap-1">
              <button className="bg-white/10 rounded-md px-1.5 py-1 text-[11px] leading-none text-white/70">
                {COMMAND_KEY}
              </button>
              <button className="bg-white/10 rounded-md px-1.5 py-1 text-[11px] leading-none text-white/70">
                H
              </button>
            </div>
          </div>

          {/* Solve Command */}
          {screenshotCount > 0 && (
            <div
              className={`flex flex-col cursor-pointer rounded px-2 py-1.5 hover:bg-white/10 transition-colors ${
                credits <= 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={async () => {
                if (credits <= 0) {
                  showToast(
                    "Out of Credits",
                    "You are out of credits. Please refill at https://www.crackcodinginterview.com/dashboard.",
                    "error"
                  );
                  return;
                }

                try {
                  const result =
                    await window.electronAPI.triggerProcessScreenshots();
                  if (!result.success) {
                    console.error(
                      "Failed to process screenshots:",
                      result.error
                    );
                    showToast(
                      "Error",
                      "Failed to process screenshots",
                      "error"
                    );
                  }
                } catch (error) {
                  console.error("Error processing screenshots:", error);
                  showToast("Error", "Failed to process screenshots", "error");
                }
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] leading-none">Solve </span>
                <div className="flex gap-1 ml-2">
                  <button className="bg-white/10 rounded-md px-1.5 py-1 text-[11px] leading-none text-white/70">
                    {COMMAND_KEY}
                  </button>
                  <button className="bg-white/10 rounded-md px-1.5 py-1 text-[11px] leading-none text-white/70">
                    ↵
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Separator */}
          <div className="mx-2 h-4 w-px bg-white/20" />

          {/* Settings with Tooltip */}
          <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Gear icon */}
            <div className="w-4 h-4 flex items-center justify-center cursor-pointer text-white/70 hover:text-white/90 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>

            {/* Tooltip Content */}
            {isTooltipVisible && (
              <div
                ref={tooltipRef}
                className="absolute top-full left-0 mt-2 w-80 transform -translate-x-[calc(50%-12px)]"
                style={{ zIndex: 100 }}
              >
                {/* Add transparent bridge */}
                <div className="absolute -top-2 right-0 w-full h-2" />
                {/* <div className="p-3 text-xs bg-black/80 backdrop-blur-md rounded-lg border border-white/10 text-white/90 shadow-lg"> */}
                <div className="p-3 text-xs bg-cciGradientSecondary backdrop-blur-md rounded-lg border border-white/10 text-white/90 shadow-lg">
                  <div className="space-y-4">
                    <h3 className="font-medium truncate">Keyboard Shortcuts</h3>
                    <div className="space-y-3">
                      {/* Toggle Command */}
                      <div
                        className="cursor-pointer rounded px-2 py-1.5 hover:bg-white/10 transition-colors"
                        onClick={async () => {
                          try {
                            const result =
                              await window.electronAPI.toggleMainWindow();
                            if (!result.success) {
                              console.error(
                                "Failed to toggle window:",
                                result.error
                              );
                              showToast(
                                "Error",
                                "Failed to toggle window",
                                "error"
                              );
                            }
                          } catch (error) {
                            console.error("Error toggling window:", error);
                            showToast(
                              "Error",
                              "Failed to toggle window",
                              "error"
                            );
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">Toggle Window</span>
                          <div className="flex gap-1 flex-shrink-0">
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                              {COMMAND_KEY}
                            </span>
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                              B
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] leading-relaxed text-white/70 truncate mt-1">
                          Show or hide this window.
                        </p>
                      </div>

                      {/* Decrease Opacity Command */}
                      <div
                        className="cursor-pointer rounded px-2 py-1.5 hover:bg-white/10 transition-colors"
                        onClick={async () => {
                          try {
                            const result =
                              await window.electronAPI.decreaseOpacity();
                            if (!result.success) {
                              console.error(
                                "Failed to decrease window opacity:",
                                result.error
                              );
                              showToast(
                                "Error",
                                "Failed to decrease window opacity",
                                "error"
                              );
                            }
                          } catch (error) {
                            console.error(
                              "Error decreasing window opacity:",
                              error
                            );
                            showToast(
                              "Error",
                              "Failed to decrease window opacity",
                              "error"
                            );
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">Decrease Opacity</span>
                          <div className="flex gap-1 flex-shrink-0">
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                              {COMMAND_KEY}
                            </span>
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                              {`[`}
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] leading-relaxed text-white/70 truncate mt-1">
                          Decrease window opacity.
                        </p>
                      </div>

                      {/* Increase Opacity Command */}
                      <div
                        className="cursor-pointer rounded px-2 py-1.5 hover:bg-white/10 transition-colors"
                        onClick={async () => {
                          try {
                            const result =
                              await window.electronAPI.increaseOpacity();
                            if (!result.success) {
                              console.error(
                                "Failed to increase window opacity:",
                                result.error
                              );
                              showToast(
                                "Error",
                                "Failed to increase window opacity",
                                "error"
                              );
                            }
                          } catch (error) {
                            console.error(
                              "Error increasing window opacity:",
                              error
                            );
                            showToast(
                              "Error",
                              "Failed to increase window opacity",
                              "error"
                            );
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">Increase Opacity</span>
                          <div className="flex gap-1 flex-shrink-0">
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                              {COMMAND_KEY}
                            </span>
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                              {`]`}
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] leading-relaxed text-white/70 truncate mt-1">
                          Increase window opacity.
                        </p>
                      </div>

                      {/* Screenshot Command */}
                      <div
                        className="cursor-pointer rounded px-2 py-1.5 hover:bg-white/10 transition-colors"
                        onClick={async () => {
                          try {
                            const result =
                              await window.electronAPI.triggerScreenshot();
                            if (!result.success) {
                              console.error(
                                "Failed to take screenshot:",
                                result.error
                              );
                              showToast(
                                "Error",
                                "Failed to take screenshot",
                                "error"
                              );
                            }
                          } catch (error) {
                            console.error("Error taking screenshot:", error);
                            showToast(
                              "Error",
                              "Failed to take screenshot",
                              "error"
                            );
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">Take Screenshot</span>
                          <div className="flex gap-1 flex-shrink-0">
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                              {COMMAND_KEY}
                            </span>
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                              H
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] leading-relaxed text-white/70 truncate mt-1">
                          Take a screenshot of the problem description.
                        </p>
                      </div>

                      {/* Solve Command */}
                      <div
                        className={`cursor-pointer rounded px-2 py-1.5 hover:bg-white/10 transition-colors ${
                          screenshotCount > 0
                            ? ""
                            : "opacity-50 cursor-not-allowed"
                        }`}
                        onClick={async () => {
                          if (screenshotCount === 0) return;

                          try {
                            const result =
                              await window.electronAPI.triggerProcessScreenshots();
                            if (!result.success) {
                              console.error(
                                "Failed to process screenshots:",
                                result.error
                              );
                              showToast(
                                "Error",
                                "Failed to process screenshots",
                                "error"
                              );
                            }
                          } catch (error) {
                            console.error(
                              "Error processing screenshots:",
                              error
                            );
                            showToast(
                              "Error",
                              "Failed to process screenshots",
                              "error"
                            );
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">Solve</span>
                          <div className="flex gap-1 flex-shrink-0">
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                              {COMMAND_KEY}
                            </span>
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                              ↵
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] leading-relaxed text-white/70 truncate mt-1">
                          {screenshotCount > 0
                            ? "Generate a solution based on the current problem."
                            : "Take a screenshot first to generate a solution."}
                        </p>
                      </div>
                    </div>

                    {/* Quit app */}
                    <div
                      className="cursor-pointer rounded px-2 py-1.5 hover:bg-white/10 transition-colors"
                      onClick={async () => {
                        try {
                          const result = await window.electronAPI.quitApp();
                          if (!result.success) {
                            console.error("Failed to quit app", result.error);
                            showToast("Error", "Failed to quit app", "error");
                          }
                        } catch (error) {
                          console.error("Error quitting app", error);
                          showToast("Error", "Failed to quit app", "error");
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">Quit App</span>
                        <div className="flex gap-1 flex-shrink-0">
                          <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                            {COMMAND_KEY}
                          </span>
                          <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                            {`Q`}
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] leading-relaxed text-white/70 truncate mt-1">
                        Quit application.
                      </p>
                    </div>

                    {/* Separator and Log Out */}
                    <div className="pt-3 mt-3 border-t border-white/10">
                      <LanguageSelector
                        currentLanguage={currentLanguage}
                        setLanguage={setLanguage}
                      />

                      <ThemeSelector
                        currentTheme={currentTheme}
                        setTheme={setTheme}
                      />

                      {/* Credits Display */}
                      <div className="mb-3 px-2 space-y-1">
                        <div className="flex items-center justify-between text-[13px] font-medium text-white/90">
                          <span>Credits Remaining</span>
                          <span>{credits}</span>
                        </div>
                        <div className="text-[11px] text-white/50">
                          Refill at{" "}
                          <span
                            className="underline cursor-pointer hover:opacity-80"
                            onClick={() =>
                              window.electronAPI.openSettingsPortal()
                            }
                          >
                            https://www.crackcodinginterview.com/dashboard
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-[11px] text-red-400 hover:text-red-300 transition-colors w-full"
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3 h-3"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                          </svg>
                        </div>
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Close Icon */}
          <div
            className="relative inline-block"
            onClick={async () => {
              try {
                const result = await window.electronAPI.quitApp();
                if (!result.success) {
                  console.error("Failed to quit app", result.error);
                  showToast("Error", "Failed to quit app", "error");
                }
              } catch (error) {
                console.error("Error quitting app", error);
                showToast("Error", "Failed to quit app", "error");
              }
            }}
          >
            {/* Close icon */}
            <div className="w-4 h-4 flex items-center justify-center cursor-pointer text-white/70 hover:text-white/90 transition-colors">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueCommands;
