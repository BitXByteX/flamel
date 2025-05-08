import React from "react";
import SettingsTooltipMenu from "./SettingsTooltipMenu";
import CloseIconComponent from "../CloseIconComponent";

export const ElegantDesign: React.FC<any> = ({
  showToast,
  isProcessing,
  extraScreenshots,
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
    <div className="flex items-center justify-center w-[90px]">
      <div className="relative bg-white/10 bg-cciGradientPrimary backdrop-blur-md border border-white/20 rounded-2xl p-6 px-4 py-6 w-80 shadow-xl">
        {/* Side Buttons */}
        <div className="flex flex-col gap-3 items-center text-center">
          {/* Take Screenshot */}
          <div className="flex flex-col items-center">
            <button
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white shadow-md cursor-default hover:bg-white/25"
              onClick={async () => {
                {
                  /* Screenshot and Debug commands - Only show if not processing */
                }
                if (!isProcessing) {
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
                }
              }}
            >
              <svg
                width="26px"
                height="26px"
                viewBox="0 0 50.8 50.8"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g
                    fill="none"
                    stroke="#ffffff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3.175"
                  >
                    {" "}
                    <path d="M19.844 7.938H7.938v11.905m0 11.113v11.906h11.905m23.019-11.906v11.906H30.956m11.906-23.018V7.938H30.956"></path>{" "}
                    <circle cx="25.4" cy="25.4" r="8.731"></circle>{" "}
                  </g>{" "}
                </g>
              </svg>
            </button>
            <p className="text-white text-xs font-light mt-1 leading-3">
              Take screenshot
            </p>
          </div>

          {/* Screenshot and Debug commands - Only show if not processing */}
          {extraScreenshots.length > 0 && !isProcessing ? (
            <div className="flex flex-col items-center">
              <button
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white shadow-md cursor-default hover:bg-white/25 animate-pulse"
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
                    showToast(
                      "Error",
                      "Failed to process screenshots",
                      "error"
                    );
                  }
                }}
              >
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 512 512"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>AI</title>{" "}
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      {" "}
                      <g
                        id="icon"
                        fill="#ffffff"
                        transform="translate(64.000000, 64.000000)"
                      >
                        {" "}
                        <path
                          d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.749388,128 L146.817842,128 L99.4840387,256 L121.976629,256 L130.913039,230.977 L187.575039,230.977 L196.319607,256 L220.167172,256 L171.749388,128 Z M260.093778,128 L237.691519,128 L237.691519,256 L260.093778,256 L260.093778,128 Z M159.094727,149.47526 L181.409039,213.333 L137.135039,213.333 L159.094727,149.47526 Z M341.333333,256 L384,256 L384,298.666667 L341.333333,298.666667 L341.333333,256 Z M85.3333333,341.333333 L128,341.333333 L128,384 L85.3333333,384 L85.3333333,341.333333 Z M170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L170.666667,384 L170.666667,341.333333 Z M85.3333333,0 L128,0 L128,42.6666667 L85.3333333,42.6666667 L85.3333333,0 Z M256,341.333333 L298.666667,341.333333 L298.666667,384 L256,384 L256,341.333333 Z M170.666667,0 L213.333333,0 L213.333333,42.6666667 L170.666667,42.6666667 L170.666667,0 Z M256,0 L298.666667,0 L298.666667,42.6666667 L256,42.6666667 L256,0 Z M341.333333,170.666667 L384,170.666667 L384,213.333333 L341.333333,213.333333 L341.333333,170.666667 Z M0,256 L42.6666667,256 L42.6666667,298.666667 L0,298.666667 L0,256 Z M341.333333,85.3333333 L384,85.3333333 L384,128 L341.333333,128 L341.333333,85.3333333 Z M0,170.666667 L42.6666667,170.666667 L42.6666667,213.333333 L0,213.333333 L0,170.666667 Z M0,85.3333333 L42.6666667,85.3333333 L42.6666667,128 L0,128 L0,85.3333333 Z"
                          id="Combined-Shape"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </button>
              <p className="text-white text-xs font-light mt-1 leading-3">
                Debug
              </p>
              {/* <div className="flex gap-1 ml-2">
                <button className="bg-white/10 rounded-md px-1.5 py-1 text-[11px] leading-none text-white/70">
                  {COMMAND_KEY}
                </button>
                <button className="bg-white/10 rounded-md px-1.5 py-1 text-[11px] leading-none text-white/70">
                  ↵
                </button>
              </div> */}
            </div>
          ) : null}

          {/* Reset */}
          <div className="flex flex-col items-center">
            <button
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white shadow-md cursor-default hover:bg-white/25"
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
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 21 21"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                stroke="#ffffff"
                stroke-width="1.05"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    stroke="#ffffff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    transform="matrix(0 1 1 0 2.5 2.5)"
                  >
                    {" "}
                    <path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"></path>{" "}
                    <path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)"></path>{" "}
                  </g>{" "}
                </g>
              </svg>
            </button>
            <p className="text-white text-xs font-light mt-1">Start over</p>
          </div>

          {/* Increase opacity */}
          <div className="flex flex-col items-center">
            <button
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white shadow-md cursor-default hover:bg-white/25"
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
            <p className="text-white text-xs font-light mt-1">Increase</p>
          </div>
          {/* Decrease opacity */}
          <div className="flex flex-col items-center">
            <button
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white shadow-md cursor-default hover:bg-white/25"
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
            <p className="text-white text-xs font-light mt-1">Decrease</p>
          </div>

          {/* Toggle icon */}
          <div className="flex flex-col items-center">
            <button
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white shadow-md cursor-default hover:bg-white/25"
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
            <p className="text-white text-xs font-light mt-1">Hide</p>
          </div>
          {/* Separator */}
          <div className="mx-2 h-[1px] w-full bg-white/20" />

          {/* Settings icon */}
          <div
            className="relative hover:bg-white/20 flex flex-col items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white shadow-md cursor-default"
              onClick={handleToggleSettings}
            >
              <svg
                width="26px"
                height="26px"
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
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="#ffffff"
                    stroke-width="1.5"
                  ></circle>{" "}
                  <path
                    d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                    stroke="#ffffff"
                    stroke-width="1.5"
                  ></path>{" "}
                </g>
              </svg>
            </button>
            <p className="text-white text-xs font-light mt-1">Settings</p>
            {(isTooltipVisible || stayTooltipVisible) && (
              <SettingsTooltipMenu
                showToast={showToast}
                extraScreenshots={extraScreenshots}
                currentLanguage={currentLanguage}
                setLanguage={setLanguage}
                currentTheme={currentTheme}
                setTheme={setTheme}
                credits={credits}
                handleSignOut={handleSignOut}
                onTooltipVisibilityChange={onTooltipVisibilityChange}
                isTooltipVisible={isTooltipVisible}
                isProcessing={isProcessing}
              />
            )}
          </div>
        </div>

        {/* Close icon */}
        <div className=" absolute top-2 right-2">
          <CloseIconComponent showToast={showToast} />
        </div>
      </div>
    </div>
  );
};

export default ElegantDesign;
