import React, { useEffect, useState, useContext, useRef } from "react";
import Confetti from "react-dom-confetti";
import Cardwin from "./Cardwin";
import CardLoss from "./CardLoss";
import { ShopContext } from "../../utils/contextShop";
import html2canvas from "html2canvas";

const Result = () => {
  const {
    confettiWin,
    setConfettiWin,
    confettiLoss,
    setConfettiLoss,
    setGameResult,
  } = useContext(ShopContext);
  const [confettiActive, setConfettiActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClose = () => {
    setConfettiWin(false);
    setConfettiLoss(false);
    setGameResult(false);
  };

  useEffect(() => {
    if (confettiWin) {
      setConfettiActive(true);
      // Reset confetti after a delay
      setTimeout(() => {
        setConfettiActive(false);
      }, 3000);
    }
  }, [confettiWin, confettiLoss]);

  const config = {
    angle: 90,
    spread: 500,
    startVelocity: 40,
    elementCount: 70,
    decay: 0.75,
  };

  const divRef = useRef(null);

  const handleShare = async (platform) => {
    try {
      const canvas = await html2canvas(divRef.current);
      const imageUrl = canvas.toDataURL("image/png");

      let shareUrl;

      switch (platform) {
        case "twitter":
          // Encode image as base64
          const base64Image = encodeURIComponent(imageUrl.split(",")[1]);
          shareUrl = `https://twitter.com/intent/tweet?text=Check%20out%20this%20image&url=${base64Image}`;
          break;

        case "discord":
          // Discord Share Button
          console.log("Share on Discord logic here");
          break;

        case "telegram":
          // Telegram Share Button
          console.log("Share on Telegram logic here");
          break;

        default:
          console.error("Invalid platform");
      }

      // Open share URL in new window
      window.open(shareUrl, "_blank");

      console.log("Shared successfully");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#00000069] w-[100%] h-screen z-30 absolute flex justify-center  ">
      <div className="w-100 mt-10 relative">
        {confettiWin ? (
          <div>
            <Confetti active={confettiActive} config={config} />
            <Cardwin
              handleClose={handleClose}
              divRef={divRef}
              handleShare={handleShare}
              toggleMenu={toggleMenu}
              isMenuOpen={isMenuOpen}
            />
          </div>
        ) : (
          confettiLoss && <CardLoss handleClose={handleClose} />
        )}
      </div>
    </div>
  );
};

export default Result;
