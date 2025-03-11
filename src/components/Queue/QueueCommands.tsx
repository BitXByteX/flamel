import React, { useState, useEffect, useRef } from "react";

import { supabase } from "../../lib/supabase";
import { useToast } from "../../contexts/toast";
import { LanguageSelector } from "../shared/LanguageSelector";
import { COMMAND_KEY } from "../../utils/platform";
import { ThemeSelector } from "../shared/ThemeSelector";

interface QueueCommandsProps {
  onTooltipVisibilityChange: (visible: boolean, height: number) => void;
  screenshotCount?: number;
  credits: number;
  currentLanguage: string;
  setLanguage: (language: string) => void;
  currentTheme: string;
  setTheme: (theme: string) => void;
}

const TooltipMenuComponent: React.FC<any> = ({
  showToast,
  screenshotCount,
  currentLanguage,
  setLanguage,
  currentTheme,
  setTheme,
  credits,
  handleSignOut,
  onTooltipVisibilityChange,
  isTooltipVisible,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tooltipHeight = 0;
    if (tooltipRef.current && isTooltipVisible) {
      tooltipHeight = tooltipRef.current.offsetHeight + 10;
    }
    onTooltipVisibilityChange(isTooltipVisible, tooltipHeight);
  }, [isTooltipVisible]);

  {
    /* Tooltip Content */
  }
  return (
    <div
      ref={tooltipRef}
      className="text-left absolute top-8 left-[125px] mt-2 w-80 transform -translate-x-[calc(50%-12px)]"
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
              className="cursor-default rounded px-2 py-1.5 hover:bg-white/10 transition-colors"
              onClick={async () => {
                try {
                  const result = await window.electronAPI.toggleMainWindow();
                  if (!result.success) {
                    console.error("Failed to toggle window:", result.error);
                    showToast("Error", "Failed to toggle window", "error");
                  }
                } catch (error) {
                  console.error("Error toggling window:", error);
                  showToast("Error", "Failed to toggle window", "error");
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
              className="cursor-default rounded px-2 py-1.5 hover:bg-white/10 transition-colors"
              onClick={async () => {
                try {
                  const result = await window.electronAPI.decreaseOpacity();
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
                  console.error("Error decreasing window opacity:", error);
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
              className="cursor-default rounded px-2 py-1.5 hover:bg-white/10 transition-colors"
              onClick={async () => {
                try {
                  const result = await window.electronAPI.increaseOpacity();
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
                  console.error("Error increasing window opacity:", error);
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
              className="cursor-default rounded px-2 py-1.5 hover:bg-white/10 transition-colors"
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
              className={`cursor-default rounded px-2 py-1.5 hover:bg-white/10 transition-colors ${
                screenshotCount > 0 ? "" : "opacity-50 cursor-not-allowed"
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
                  console.error("Error processing screenshots:", error);
                  showToast("Error", "Failed to process screenshots", "error");
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
            className="cursor-default rounded px-2 py-1.5 hover:bg-white/10 transition-colors"
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

            <ThemeSelector currentTheme={currentTheme} setTheme={setTheme} />

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
                  onClick={() => window.electronAPI.openSettingsPortal()}
                >
                  https://www.crackcodinginterview.com/settings
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
  );
};

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
        <div className="flex items-center justify-center min-h-[280px] ">
          <div className="relative bg-white/10 bg-cciGradientPrimary backdrop-blur-md border border-white/20 rounded-3xl p-6 w-80 shadow-xl">
            {/* Circular Button */}
            <div className="relative mt-2">
              <div className="absolute inset-0 bg-gradient-to-t from-pink-200 to-blue-200 rounded-full blur-xl opacity-40"></div>
              <div
                className="flex items-center justify-center w-32 h-32 rounded-full shadow-2xl mx-auto"
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
                <div className="relative flex items-center justify-center w-32 h-32 rounded-full shadow-2xl mx-auto">
                  {/* White Lens Flare - Top Right */}
                  <div className="absolute top-0 right-0 w-10 h-10 bg-white opacity-30 blur-xl rounded-full"></div>
                  {/* White Lens Flare - Bottom Left */}
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-20 blur-2xl rounded-full"></div>
                  <img src="./cameraimg.svg" className=" opacity-65" />
                </div>
              </div>
            </div>

            <p
              className="text-center text-white text-base font-light mt-1 py-2"
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
              {screenshotCount === 0
                ? "Take screenshot"
                : screenshotCount === 1
                ? "Take second screenshot"
                : "Reset first screenshot"}
            </p>

            {screenshotCount ? (
              <div>
                <div className="border-b mb-2 border-gray-500 border w-[280px] mx-auto"></div>
                <div
                  className="flex items-center justify-center"
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
                      console.error("Error processing screenshots:", error);
                      showToast(
                        "Error",
                        "Failed to process screenshots",
                        "error"
                      );
                    }
                  }}
                >
                  <span className="text-[14px] leading-none text-white/70">
                    Generate solution{" "}
                  </span>
                  <div className="flex gap-1 ml-2 ">
                    <button className="bg-white/10 rounded-md px-1.5 py-1 text-[12px] leading-none text-white/70 cursor-default">
                      {COMMAND_KEY}
                    </button>
                    <button className="bg-white/10 rounded-md px-1.5 py-1 text-[12px] leading-none text-white/70 cursor-default">
                      ↵
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="border-b mt-2 border-gray-500 border w-[280px] mx-auto"></div>

            {/* Settings Buttons */}
            <div
              className="mt-3 text-center relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className=" text-sm bg-cciGradientPrimary px-4 py-2 rounded-3xl text-white shadow-md shadow-black cursor-default"
                onClick={handleToggleSettings}
              >
                Settings
              </button>
              {(isTooltipVisible || stayTooltipVisible) && (
                <TooltipMenuComponent
                  showToast={showToast}
                  screenshotCount={screenshotCount}
                  currentLanguage={currentLanguage}
                  setLanguage={setLanguage}
                  currentTheme={currentTheme}
                  setTheme={setTheme}
                  credits={credits}
                  handleSignOut={handleSignOut}
                  onTooltipVisibilityChange={onTooltipVisibilityChange}
                  isTooltipVisible={isTooltipVisible}
                />
              )}
            </div>

            {/* Side Buttons */}
            <div className="absolute top-12 left-6 flex flex-col gap-3">
              {/* Increase opacity */}
              <div>
                <button
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white shadow-md cursor-default"
                  onClick={async () => {
                    try {
                      const result = await window.electronAPI.increaseOpacity();
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
                      console.error("Error increasing window opacity:", error);
                      showToast(
                        "Error",
                        "Failed to increase window opacity",
                        "error"
                      );
                    }
                  }}
                >
                  <svg
                    className="w-5 h-5"
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
                      {" "}
                      <path
                        d="M12 0C11.4477 0 11 0.447715 11 1V3C11 3.55228 11.4477 4 12 4C12.5523 4 13 3.55228 13 3V1C13 0.447715 12.5523 0 12 0Z"
                        fill="#ffffff"
                      ></path>{" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM9.21518 14.7848C8.50248 14.0721 8.06167 13.0875 8.06167 12C8.06167 9.82492 9.82492 8.06167 12 8.06167C13.0875 8.06167 14.0721 8.50248 14.7848 9.21518L9.21518 14.7848Z"
                        fill="#ffffff"
                      ></path>{" "}
                      <path
                        d="M19.0711 3.51472C19.4616 3.12419 20.0947 3.12419 20.4853 3.51472C20.8758 3.90524 20.8758 4.53841 20.4853 4.92893L19.0711 6.34315C18.6805 6.73367 18.0474 6.73367 17.6568 6.34315C17.2663 5.95262 17.2663 5.31946 17.6568 4.92893L19.0711 3.51472Z"
                        fill="#ffffff"
                      ></path>{" "}
                      <path
                        d="M0 12C0 12.5523 0.447715 13 1 13H3C3.55228 13 4 12.5523 4 12C4 11.4477 3.55228 11 3 11H1C0.447715 11 0 11.4477 0 12Z"
                        fill="#ffffff"
                      ></path>{" "}
                      <path
                        d="M3.51472 4.92893C3.1242 4.53841 3.1242 3.90524 3.51472 3.51472C3.90525 3.12419 4.53841 3.12419 4.92894 3.51472L6.34315 4.92893C6.73368 5.31946 6.73368 5.95262 6.34315 6.34314C5.95263 6.73367 5.31946 6.73367 4.92894 6.34314L3.51472 4.92893Z"
                        fill="#ffffff"
                      ></path>{" "}
                      <path
                        d="M12 20C11.4477 20 11 20.4477 11 21V23C11 23.5523 11.4477 24 12 24C12.5523 24 13 23.5523 13 23V21C13 20.4477 12.5523 20 12 20Z"
                        fill="#ffffff"
                      ></path>{" "}
                      <path
                        d="M4.92894 17.6569C5.31946 17.2663 5.95263 17.2663 6.34315 17.6569C6.73368 18.0474 6.73368 18.6805 6.34315 19.0711L4.92894 20.4853C4.53842 20.8758 3.90525 20.8758 3.51473 20.4853C3.1242 20.0948 3.1242 19.4616 3.51473 19.0711L4.92894 17.6569Z"
                        fill="#ffffff"
                      ></path>{" "}
                      <path
                        d="M20 12C20 12.5523 20.4477 13 21 13H23C23.5523 13 24 12.5523 24 12C24 11.4477 23.5523 11 23 11H21C20.4477 11 20 11.4477 20 12Z"
                        fill="#ffffff"
                      ></path>{" "}
                      <path
                        d="M17.6568 19.0711C17.2663 18.6805 17.2663 18.0474 17.6568 17.6569C18.0474 17.2663 18.6805 17.2663 19.0711 17.6569L20.4853 19.0711C20.8758 19.4616 20.8758 20.0948 20.4853 20.4853C20.0947 20.8758 19.4616 20.8758 19.0711 20.4853L17.6568 19.0711Z"
                        fill="#ffffff"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
                <p className="text-left text-white text-xs font-light mt-1 -ml-1">
                  Increase
                </p>
              </div>
              {/* Decrease opacity */}
              <div>
                <button
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white shadow-md cursor-default"
                  onClick={async () => {
                    try {
                      const result = await window.electronAPI.decreaseOpacity();
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
                      console.error("Error decreasing window opacity:", error);
                      showToast(
                        "Error",
                        "Failed to decrease window opacity",
                        "error"
                      );
                    }
                  }}
                >
                  <svg
                    className="w-5 h-5"
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
                      {" "}
                      <path
                        d="M12 0C11.4477 0 11 0.447715 11 1V3C11 3.55228 11.4477 4 12 4C12.5523 4 13 3.55228 13 3V1C13 0.447715 12.5523 0 12 0Z"
                        fill="#adadad"
                      ></path>{" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM9.21518 14.7848C8.50248 14.0721 8.06167 13.0875 8.06167 12C8.06167 9.82492 9.82492 8.06167 12 8.06167C13.0875 8.06167 14.0721 8.50248 14.7848 9.21518L9.21518 14.7848Z"
                        fill="#adadad"
                      ></path>{" "}
                      <path
                        d="M19.0711 3.51472C19.4616 3.12419 20.0947 3.12419 20.4853 3.51472C20.8758 3.90524 20.8758 4.53841 20.4853 4.92893L19.0711 6.34315C18.6805 6.73367 18.0474 6.73367 17.6568 6.34315C17.2663 5.95262 17.2663 5.31946 17.6568 4.92893L19.0711 3.51472Z"
                        fill="#adadad"
                      ></path>{" "}
                      <path
                        d="M0 12C0 12.5523 0.447715 13 1 13H3C3.55228 13 4 12.5523 4 12C4 11.4477 3.55228 11 3 11H1C0.447715 11 0 11.4477 0 12Z"
                        fill="#adadad"
                      ></path>{" "}
                      <path
                        d="M3.51472 4.92893C3.1242 4.53841 3.1242 3.90524 3.51472 3.51472C3.90525 3.12419 4.53841 3.12419 4.92894 3.51472L6.34315 4.92893C6.73368 5.31946 6.73368 5.95262 6.34315 6.34314C5.95263 6.73367 5.31946 6.73367 4.92894 6.34314L3.51472 4.92893Z"
                        fill="#adadad"
                      ></path>{" "}
                      <path
                        d="M12 20C11.4477 20 11 20.4477 11 21V23C11 23.5523 11.4477 24 12 24C12.5523 24 13 23.5523 13 23V21C13 20.4477 12.5523 20 12 20Z"
                        fill="#adadad"
                      ></path>{" "}
                      <path
                        d="M4.92894 17.6569C5.31946 17.2663 5.95263 17.2663 6.34315 17.6569C6.73368 18.0474 6.73368 18.6805 6.34315 19.0711L4.92894 20.4853C4.53842 20.8758 3.90525 20.8758 3.51473 20.4853C3.1242 20.0948 3.1242 19.4616 3.51473 19.0711L4.92894 17.6569Z"
                        fill="#adadad"
                      ></path>{" "}
                      <path
                        d="M20 12C20 12.5523 20.4477 13 21 13H23C23.5523 13 24 12.5523 24 12C24 11.4477 23.5523 11 23 11H21C20.4477 11 20 11.4477 20 12Z"
                        fill="#adadad"
                      ></path>{" "}
                      <path
                        d="M17.6568 19.0711C17.2663 18.6805 17.2663 18.0474 17.6568 17.6569C18.0474 17.2663 18.6805 17.2663 19.0711 17.6569L20.4853 19.0711C20.8758 19.4616 20.8758 20.0948 20.4853 20.4853C20.0947 20.8758 19.4616 20.8758 19.0711 20.4853L17.6568 19.0711Z"
                        fill="#adadad"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
                <p className="text-left text-white text-xs font-light mt-1 -ml-1">
                  Decrease
                </p>
              </div>
            </div>

            {/* Close icon */}
            <div className=" absolute top-4 right-5">
              <CloseIconComponent showToast={showToast} />
            </div>

            {/* Toggle icon */}
            <div className="absolute top-12 right-4 flex flex-col gap-3">
              <div className="w-4 h-4 flex items-center justify-center cursor-default text-white/70 hover:text-white/90 transition-colors"></div>
              <div>
                <button
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white shadow-md cursor-default"
                  onClick={async () => {
                    try {
                      const result =
                        await window.electronAPI.toggleMainWindow();
                      if (!result.success) {
                        console.error("Failed to toggle window:", result.error);
                        showToast("Error", "Failed to toggle window", "error");
                      }
                    } catch (error) {
                      console.error("Error toggling window:", error);
                      showToast("Error", "Failed to toggle window", "error");
                    }
                  }}
                >
                  <svg
                    viewBox="-2.4 -2.4 28.80 28.80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g
                      id="SVGRepo_bgCarrier"
                      stroke-width="0"
                      transform="translate(2.879999999999999,2.879999999999999), scale(0.76)"
                    ></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke="#CCCCCC"
                      stroke-width="0.192"
                    >
                      {" "}
                      <path
                        d="M6.8874 5.17157C7.46546 4.59351 7.75449 4.30448 8.12203 4.15224C8.48957 4 8.89832 4 9.71582 4H14.326C15.1517 4 15.5646 4 15.9351 4.15505C16.3056 4.31011 16.5954 4.60419 17.175 5.19234L18.849 6.89105C19.4171 7.46745 19.7011 7.75566 19.8505 8.12024C20 8.48482 20 8.88945 20 9.69871V14.3431C20 15.1606 20 15.5694 19.8478 15.9369C19.6955 16.3045 19.4065 16.5935 18.8284 17.1716L17.1716 18.8284C16.5935 19.4065 16.3045 19.6955 15.9369 19.8478C15.5694 20 15.1606 20 14.3431 20H9.69871C8.88945 20 8.48482 20 8.12024 19.8505C7.75566 19.7011 7.46745 19.4171 6.89105 18.849L5.19235 17.175C4.60419 16.5954 4.31011 16.3056 4.15505 15.9351C4 15.5646 4 15.1517 4 14.326V9.71583C4 8.89832 4 8.48957 4.15224 8.12203C4.30448 7.75449 4.59351 7.46546 5.17157 6.8874L6.8874 5.17157Z"
                        fill="#697886"
                        fill-opacity="0.24"
                        stroke="#ffffff"
                        stroke-width="1.2"
                      ></path>{" "}
                      <path
                        d="M8 11L8.42229 11.2111C10.6745 12.3373 13.3255 12.3373 15.5777 11.2111L16 11"
                        stroke="#ffffff"
                        stroke-width="1.2"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M12 12.5V14"
                        stroke="#ffffff"
                        stroke-width="1.2"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M9 12L8.5 13"
                        stroke="#ffffff"
                        stroke-width="1.2"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M15 12L15.5 13"
                        stroke="#ffffff"
                        stroke-width="1.2"
                        stroke-linecap="round"
                      ></path>{" "}
                    </g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M6.8874 5.17157C7.46546 4.59351 7.75449 4.30448 8.12203 4.15224C8.48957 4 8.89832 4 9.71582 4H14.326C15.1517 4 15.5646 4 15.9351 4.15505C16.3056 4.31011 16.5954 4.60419 17.175 5.19234L18.849 6.89105C19.4171 7.46745 19.7011 7.75566 19.8505 8.12024C20 8.48482 20 8.88945 20 9.69871V14.3431C20 15.1606 20 15.5694 19.8478 15.9369C19.6955 16.3045 19.4065 16.5935 18.8284 17.1716L17.1716 18.8284C16.5935 19.4065 16.3045 19.6955 15.9369 19.8478C15.5694 20 15.1606 20 14.3431 20H9.69871C8.88945 20 8.48482 20 8.12024 19.8505C7.75566 19.7011 7.46745 19.4171 6.89105 18.849L5.19235 17.175C4.60419 16.5954 4.31011 16.3056 4.15505 15.9351C4 15.5646 4 15.1517 4 14.326V9.71583C4 8.89832 4 8.48957 4.15224 8.12203C4.30448 7.75449 4.59351 7.46546 5.17157 6.8874L6.8874 5.17157Z"
                        fill="#697886"
                        fill-opacity="0.24"
                        stroke="#ffffff"
                        stroke-width="0.00024000000000000003"
                      ></path>{" "}
                      <path
                        d="M8 11L8.42229 11.2111C10.6745 12.3373 13.3255 12.3373 15.5777 11.2111L16 11"
                        stroke="#ffffff"
                        stroke-width="0.00024000000000000003"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M12 12.5V14"
                        stroke="#ffffff"
                        stroke-width="0.00024000000000000003"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M9 12L8.5 13"
                        stroke="#ffffff"
                        stroke-width="0.00024000000000000003"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M15 12L15.5 13"
                        stroke="#ffffff"
                        stroke-width="0.00024000000000000003"
                        stroke-linecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
                <p className="text-center text-white text-xs font-light mt-1">
                  Hide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
                    "You are out of credits. Please refill at https://www.crackcodinginterview.com/settings.",
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
                            https://www.crackcodinginterview.com/settings
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
