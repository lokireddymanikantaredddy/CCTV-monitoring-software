"use client";
import React from "react";

const cameras = [
  {
    id: 1,
    name: "Camera - 01",
    location: "Shop Floor A",
    main: "/thumbnail1.png",
    thumbnails: [
        { id: 2, name: "Camera - 02", src: "/camera2.png" },
        { id: 3, name: "Camera - 03", src: "/camera3.png" },
    ],
    timestamp: "11/7/2025 – 03:12:37",
  },
  {
    id: 2,
    name: "Camera - 02",
    location: "Vault",
    main: "/camera2.png",
    thumbnails: [
        { id: 1, name: "Camera - 01", src: "/thumbnail1.png" },
        { id: 3, name: "Camera - 03", src: "/camera3.png" },
    ],
    timestamp: "11/7/2025 – 03:12:37",
  },
  {
    id: 3,
    name: "Camera - 03",
    location: "Entrance",
    main: "/camera3.png",
    thumbnails: [
        { id: 1, name: "Camera - 01", src: "/thumbnail1.png" },
        { id: 2, name: "Camera - 02", src: "/camera2.png" },
    ],
    timestamp: "11/7/2025 – 03:12:37",
  },
];


function Thumbnail({ thumb, onClick }: { thumb: { id: number; name: string; src: string; }, onClick: () => void }) {
    return (
        <div 
            onClick={onClick}
            className="relative w-40 h-24 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#FFD600] transition-all group"
        >
            <img src={thumb.src} className="w-full h-full object-cover" alt={thumb.name}/>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
            <div className="absolute bottom-1 left-2 text-white text-xs font-semibold bg-black/50 px-1.5 py-0.5 rounded">
              {thumb.name}
            </div>
            <div className="absolute top-1 right-2 text-white text-xs cursor-pointer">
                  &#x22EE;
            </div>
        </div>
    );
}


export default function IncidentPlayer({ selectedCameraIndex, setSelectedCameraIndex }: { selectedCameraIndex: number, setSelectedCameraIndex: (idx: number) => void }) {
  const camera = cameras[selectedCameraIndex];

  const handleThumbnailClick = (thumbId: number) => {
    const newIndex = cameras.findIndex(c => c.id === thumbId);
    if (newIndex !== -1) {
        setSelectedCameraIndex(newIndex);
    }
  };

  return (
    <div className="bg-[#181A20] rounded-xl shadow-lg w-[796px] h-[449px] flex flex-col relative overflow-hidden">
      
      <img src={camera.main} alt={camera.name} className="object-cover w-full h-full" />

      
      <div className="absolute top-4 left-4 bg-[#23262F]/80 text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-2">
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 4V8L10 10" stroke="#FFD600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {camera.timestamp}
      </div>

      <div className="absolute bottom-16 left-4 bg-[#181A20]/90 text-white text-sm px-4 py-1.5 rounded-full font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          {camera.name}
      </div>

      <div className="absolute bottom-16 right-4 flex gap-3">
        {camera.thumbnails.map((thumb) => (
            <Thumbnail 
                key={thumb.id} 
                thumb={thumb} 
                onClick={() => handleThumbnailClick(thumb.id)} 
            />
        ))}
      </div>
    </div>
  );
} 