import React from "react";
import { COMMAND_KEY } from "../../../utils/platform";
import SettingsTooltipMenu from "./SettingsTooltipMenu";
import CloseIconComponent from "../CloseIconComponent";

export const BigEyeDesign: React.FC<any> = ({
  showToast,
  screenshotCount = 0,
  handleMouseEnter,
  handleMouseLeave,
  handleToggleSettings,
  isTooltipVisible = false,
  stayTooltipVisible = false,
  credits,
  currentLanguage,
  setLanguage,
  currentTheme,
  setTheme,
  onTooltipVisibilityChange,
  handleSignOut,
}) => {
  return (
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
                  showToast("Error", "Failed to process screenshots", "error");
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
            <SettingsTooltipMenu
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
  );
};

export default BigEyeDesign;
