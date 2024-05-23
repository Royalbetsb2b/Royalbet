import React from "react";

export default function Cardwin({
  handleClose,
  handleShare,
  divRef,
  toggleMenu,
  isMenuOpen,
}) {
  return (
    <div className="">
      <div className="cardResult p-5" ref={divRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
          viewBox="0 0 64 64"
        >
          <path
            fill="#f2b200"
            d="M12.7 31.7c-.5 0-1.1-.1-1.5-.4c-1.3-.7-2.9-2.5-2.9-7.3c0-10-5.4-15.8-5.4-15.8l-.9-1L6.7 2l.8 1.2c.1.1 2.6 3.7 6.5 2.7l.5 2.6c-3.9 1-6.7-1.1-8.1-2.6l-1 1.3c1.7 2.2 5.3 8 5.3 16.8c0 2.6.5 4.4 1.5 4.9c.7.4 1.8 0 2.8-1c2.6-2.6 4.5-9 4.5-9l2.2.8c-.1.3-2.1 7.2-5.2 10.2c-1.3 1.2-2.6 1.8-3.8 1.8m38.6 0c.5 0 1.1-.1 1.5-.4c1.3-.7 2.9-2.5 2.9-7.3c0-10.1 5.3-15.8 5.4-15.9l.9-.9L57.3 2l-.8 1.2c-.1.1-2.6 3.7-6.5 2.7l-.5 2.6c3.9 1 6.7-1.1 8.1-2.6l1.2 1.3c-1.7 2.2-5.3 8-5.3 16.8c0 2.6-.5 4.4-1.5 4.9c-.7.4-1.8 0-2.8-1c-2.6-2.6-4.5-9-4.5-9l-2.2.8c.1.3 2.1 7.2 5.2 10.2c1.1 1.2 2.4 1.8 3.6 1.8M29 24.9h6.1v24.5H29z"
          />
          <path fill="#ffce31" d="M30.2 24.9h3.6v24.5h-3.6z" />
          <path
            fill="#f2b200"
            d="M11.8 2C13.5 17.4 21.9 29.7 32 29.7S50.5 17.4 52.2 2H11.8z"
          />
          <path
            fill="#ffce31"
            d="M15.7 2c1.4 15.6 8.2 28 16.3 28S46.9 17.6 48.3 2H15.7z"
          />
          <path fill="#f2b200" d="M47.6 54H16.4s7-9 15.6-9s15.6 9 15.6 9" />
          <path
            fill="#ffce31"
            d="M43.9 54H20.1s5.3-9.2 11.9-9.2S43.9 54 43.9 54z"
          />
          <path fill="#bc845e" d="M11.8 56h40.4v6H11.8z" />
          <path fill="#916140" d="M16.4 54h31.3v2H16.4z" />
          <path fill="#f2b200" d="M22 57.5h20v3H22z" />
          <path fill="#ce9c7a" d="M11.8 56h2v6h-2z" />
          <path fill="#916140" d="M50.2 56h2v6h-2z" />
          <path fill="#ffce31" d="M23 57.5h18v3H23z" />
        </svg>

        <p className="cookieHeading">You've Won.</p>
        <p className="cookieDescription">Win Sent to your wallet</p>
        <div className="buttonContainer">
          <button
            className="acceptButton font-semibold text-sm"
            onClick={toggleMenu}
          >
            Share
          </button>
          <button className="declineButton font-semibold text-sm">
            Win Again
          </button>
        </div>

        <div className="cursor-pointer" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6l-5.6 5.6Z"
            />
          </svg>
        </div>

        {isMenuOpen && (
          <div className="share-menu absolute top-[75%] w-[100%] flex justify-center gap-5">
            <button onClick={() => handleShare("twitter")}>
              <div className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="#888888"
                    d="M247.39 68.94A8 8 0 0 0 240 64h-30.43a48.66 48.66 0 0 0-41.47-24a46.91 46.91 0 0 0-33.75 13.7A47.9 47.9 0 0 0 120 88v6.09C79.74 83.47 46.81 50.72 46.46 50.37a8 8 0 0 0-13.65 4.92c-4.31 47.79 9.57 79.77 22 98.18a110.93 110.93 0 0 0 21.88 24.2c-15.23 17.53-39.21 26.74-39.47 26.84a8 8 0 0 0-3.85 11.93c.75 1.12 3.75 5.05 11.08 8.72C53.51 229.7 65.48 232 80 232c70.67 0 129.72-54.42 135.75-124.44l29.91-29.9a8 8 0 0 0 1.73-8.72Zm-45 29.41a8 8 0 0 0-2.32 5.14C196 166.58 143.28 216 80 216c-10.56 0-18-1.4-23.22-3.08c11.51-6.25 27.56-17 37.88-32.48A8 8 0 0 0 92 169.08c-.47-.27-43.91-26.34-44-96c16 13 45.25 33.17 78.67 38.79A8 8 0 0 0 136 104V88a32 32 0 0 1 9.6-22.92A30.94 30.94 0 0 1 167.9 56c12.66.16 24.49 7.88 29.44 19.21a8 8 0 0 0 7.33 4.79h16Z"
                  />
                </svg>
              </div>
            </button>
            <button onClick={() => handleShare("discord")}>
              <div className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#888888"
                    d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"
                  />
                </svg>
              </div>
            </button>
            <button onClick={() => handleShare("telegram")}>
              <div className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"
                    fill="#888888"
                  />
                </svg>
              </div>
            </button>
            {/* Add more social media buttons as needed */}
          </div>
        )}
      </div>
    </div>
  );
}
