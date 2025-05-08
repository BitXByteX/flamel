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
      <div className="w-5 h-5 flex items-center justify-center cursor-default text-white/70 hover:text-white/90 transition-colors hover:bg-white/15">
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

export default CloseIconComponent;
