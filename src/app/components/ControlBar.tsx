import React from "react";
import { MdReplay10, MdForward10, MdPlayArrow, MdPause, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";

export default function ControlBar({ currentTime }: { currentTime: number }) {
  function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  return (
    <div className="w-full max-w-[1392px] h-[56px] bg-[#131313] rounded-xl shadow flex items-center px-4">
      {/* All Controls and Time Left-Aligned */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <button className="rounded-full bg-[#131313] w-10 h-10 cursor-pointer flex items-center justify-center">
          <MdReplay10 className="w-5 h-5 text-white" />
        </button>
        <button className="rounded-full bg-[#131313] w-10 h-10 cursor-pointer flex items-center justify-center">
          <MdSkipPrevious className="w-5 h-5 text-white" />
        </button>
        <button className="rounded-full bg-white w-11 h-11 cursor-pointer flex items-center justify-center">
          <MdPlayArrow className="w-6 h-6 text-[#181A20]" />
        </button>
        <button className="rounded-full bg-[#131313] w-10 h-10 cursor-pointer flex items-center justify-center">
          <MdSkipNext className="w-5 h-5 text-white" />
        </button>
        <button className="rounded-full bg-[#131313] w-10 h-10 cursor-pointer flex items-center justify-center">
          <MdForward10 className="w-5 h-5 text-white" />
        </button>
        <div className="text-base font-mono text-white tracking-wider flex-shrink-0 ml-4">
          {formatTime(currentTime)} (15-Jun-2025)
        </div>
        <button className="rounded-full bg-[#131313] w-10 h-10 cursor-pointer flex items-center justify-center text-white text-base font-semibold ml-4">
          1x
        </button>
        <button className="rounded-full bg-[#131313] w-10 h-10 cursor-pointer flex items-center justify-center ml-2">
          <AiOutlineClockCircle className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
} 