import React from "react";

export default function Swap() {
  return (
    <div className="flex flex-col items-center justify-center w-[100%]">
      {/* <img src="/nothing.svg" alt="nothing" className="w-56 h-auto" />
      <div className="text-white">Coming Soon</div> */}

      <div style={{ width: "100%", height: "600px" }}>
        <iframe
          allow="usb; ethereum; clipboard-write; payment; microphone; camera"
          loading="lazy"
          src=" https://widget.mtpelerin.com/?_ctkn=954139b2-ef3e-4914-82ea-33192d3f43d3&type=direct-link&tabs=buy,sell,swap&tab=swap"
          title="Mt Pelerin exchange widget"
          style={{ border: "none", width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
