import { useEffect, useRef } from "react";
import { COMMAND_KEY } from "../../../utils/platform";
import { LanguageSelector } from "../../shared/LanguageSelector";
import { ThemeSelector } from "../../shared/ThemeSelector";

const SettingsTooltipMenu: React.FC<any> = ({
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
      // className="text-left absolute top-8 left-[125px] mt-2 w-80 transform -translate-x-[calc(50%-12px)]"
      className="text-left absolute bottom-[-288px] left-[185px] mt-2 w-80 transform -translate-x-[calc(50%-12px)]"
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
              className={`cursor-default rounded px-2 py-1.5 transition-colors ${
                screenshotCount > 0 ? "hover:bg-white/10" : "opacity-50"
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

          {/* Start Over - Always visible */}
          <div
            className={`cursor-default rounded px-2 py-1.5 transition-colors ${
              screenshotCount > 0 ? "hover:bg-white/10" : "opacity-50"
            }`}
            onClick={async () => {
              try {
                const result = await window.electronAPI.triggerReset();
                if (!result.success) {
                  console.error("Failed to reset:", result.error);
                  showToast("Error", "Failed to reset", "error");
                }
              } catch (error) {
                console.error("Error resetting:", error);
                showToast("Error", "Failed to reset", "error");
              }
            }}
          >
            <div className="flex items-center justify-between">
              <span className="truncate">Reset screenshot</span>
              <div className="flex gap-1 flex-shrink-0">
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                  {COMMAND_KEY}
                </span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none">
                  R
                </span>
              </div>
            </div>
            <p className="text-[10px] leading-relaxed text-white/70 truncate mt-1">
              Start fresh with a new question.
            </p>
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
              {/* <div className="text-[11px] text-white/50">
                Refill at{" "}
                <span
                  className="underline cursor-pointer hover:opacity-80"
                  onClick={() => window.electronAPI.openSettingsPortal()}
                >
                  https://www.crackcodinginterview.com/dashboard
                </span>
              </div> */}
            </div>

            <button
              onClick={handleSignOut}
              className="flex items-center place-content-end pr-[10px] gap-2 text-[11px] text-red-400 hover:text-red-300 transition-colors w-full"
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

export default SettingsTooltipMenu;
