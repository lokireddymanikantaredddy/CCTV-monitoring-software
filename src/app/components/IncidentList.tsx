"use client";
import React, { useState } from "react";


type Incident = {
  id: number;
  type: string;
  typeColor: string;
  icon: string;
  camera: string;
  time: string;
  thumbnail: string;
  resolved: boolean;
};


const initialIncidents: Incident[] = [
  {
    id: 1,
    type: "Unauthorized Access",
    typeColor: "#FF9900",
    icon: "/door-open.png",
    camera: "Shop Floor Camera A",
    time: "14:35 - 14:37 on 7-Jul-2025",
    thumbnail: "/incident1.png",
    resolved: false,
  },
  {
    id: 2,
    type: "Gun Threat",
    typeColor: "#FF3B3B",
    icon: "/gun.png",
    camera: "Shop Floor Camera A",
    time: "14:30 - 14:32 on 7-Jul-2025",
    thumbnail: "/incident2.png",
    resolved: false,
  },
  {
    id: 3,
    type: "Unauthorized Access",
    typeColor: "#FF9900",
    icon: "/door-open.png",
    camera: "Vault Entrance",
    time: "13:55 - 13:56 on 7-Jul-2025",
    thumbnail: "/camera2.png",
    resolved: false,
  },
  {
    id: 4,
    type: "Face Recognised",
    typeColor: "#34C759",
    icon: "/users.png",
    camera: "Main Entrance",
    time: "12:10 - 12:11 on 7-Jul-2025",
    thumbnail: "/incident2.png",
    resolved: true,
  },
   {
    id: 5,
    type: "Traffic Congestion",
    typeColor: "#007AFF",
    icon: "/fallback.png",
    camera: "Parking Lot",
    time: "11:45 - 11:50 on 7-Jul-2025",
    thumbnail: "/camera3.png",
    resolved: true,
  },
  {
    id: 6,
    type: "Unauthorized Access",
    typeColor: "#FF9900",
    icon: "/door-open.png",
    camera: "Shop Floor Camera A",
    time: "14:35 - 14:37 on 7-Jul-2025",
    thumbnail: "/camera2.png",
    resolved: false,
  },
  {
    id: 7,
    type: "Unauthorized Access",
    typeColor: "#FF9900",
    icon: "/door-open.png",
    camera: "Shop Floor Camera A",
    time: "14:35 - 14:37 on 7-Jul-2025",
    thumbnail: "/thumbnail1.png",
    resolved: false,
  },
  {
    id: 8,
    type: "Gun Threat",
    typeColor: "#FF3B3B",
    icon: "/gun.png",
    camera: "Vault Entrance",
    time: "15:10 - 15:12 on 7-Jul-2025",
    thumbnail: "/camera2.png",
    resolved: false,
  },
  {
    id: 9,
    type: "Unauthorized Access",
    typeColor: "#FF9900",
    icon: "/door-open.png",
    camera: "Main Entrance",
    time: "16:00 - 16:05 on 7-Jul-2025",
    thumbnail: "/camera3.png",
    resolved: false,
  },
  {
    id: 10,
    type: "Face Recognised",
    typeColor: "#34C759",
    icon: "/users.png",
    camera: "Shop Floor Camera A",
    time: "17:20 - 17:22 on 7-Jul-2025",
    thumbnail: "/thumbnail1.png",
    resolved: true,
  },
  {
    id: 11,
    type: "Traffic Congestion",
    typeColor: "#007AFF",
    icon: "/fallback.png",
    camera: "Parking Lot",
    time: "18:00 - 18:10 on 7-Jul-2025",
    thumbnail: "/camera2.png",
    resolved: false,
  },
  {
    id: 12,
    type: "Gun Threat",
    typeColor: "#FF3B3B",
    icon: "/gun.png",
    camera: "Main Entrance",
    time: "19:00 - 19:05 on 7-Jul-2025",
    thumbnail: "/camera3.png",
    resolved: false,
  },
  {
    id: 13,
    type: "Unauthorized Access",
    typeColor: "#FF9900",
    icon: "/door-open.png",
    camera: "Vault Entrance",
    time: "20:00 - 20:10 on 7-Jul-2025",
    thumbnail: "/camera2.png",
    resolved: true,
  },
  {
    id: 14,
    type: "Face Recognised",
    typeColor: "#34C759",
    icon: "/users.png",
    camera: "Shop Floor Camera A",
    time: "21:00 - 21:05 on 7-Jul-2025",
    thumbnail: "/thumbnail1.png",
    resolved: false,
  },
  {
    id: 15,
    type: "Traffic Congestion",
    typeColor: "#007AFF",
    icon: "/fallback.png",
    camera: "Parking Lot",
    time: "22:00 - 22:15 on 7-Jul-2025",
    thumbnail: "/camera3.png",
    resolved: false,
  },
];

function IncidentItem({ incident, onResolve }: { incident: Incident, onResolve: (id: number) => void }) {
  return (
    <div className="flex items-center gap-4 bg-[#23262F] rounded-lg p-2 pr-4 transition-all hover:bg-[#2a2d38]">
      <img src={incident.thumbnail} alt={incident.type} className="w-[120px] h-[67px] object-cover rounded-md" />
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1">
          <img src={incident.icon} alt={incident.type} className="w-5 h-5" />
          <span className="font-semibold text-base" style={{ color: incident.typeColor }}>
            {incident.type}
          </span>
        </div>
        <span className="text-xs text-[#B1B5C3]">{incident.camera}</span>
        <span className="text-xs text-[#B1B5C3]">{incident.time}</span>
      </div>
      {!incident.resolved && (
         <button
            className="text-[#FFD600] font-bold text-xs cursor-pointer font-Plus Jakarta Sans hover:text-yellow-100 transition-colors"
            onClick={() => onResolve(incident.id)}
         >
             Resolve &gt;
         </button>
      )}
    </div>
  );
}


export default function IncidentList() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [showResolved, setShowResolved] = useState(false);

  const handleResolve = (id: number) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, resolved: true } : inc))
    );
  };
  
  const unresolvedCount = incidents.filter(i => !i.resolved).length;
  const resolvedCount = incidents.filter(i => i.resolved).length;

  const incidentsToDisplay = showResolved 
      ? incidents.filter(i => i.resolved) 
      : incidents.filter(i => !i.resolved);

  return (
    <aside className="w-full max-w-[572px] font-Plus Jakarta Sans h-full bg-[#131313] rounded-xl shadow-lg p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#131313] flex items-center justify-center">
                <img src="/alert.png" alt="alert" className="w-7 h-6" />
            </span>
            <span className="text-lg font-bold text-white">
                {unresolvedCount} Unresolved Incidents
            </span>
        </div>
        {resolvedCount > 0 && (
            <button 
                onClick={() => setShowResolved(!showResolved)}
                className="flex items-center gap-2 text-sm cursor-pointer font-Plus Jakarta Sans text-[#B1B5C3] hover:text-white bg-[#23262F] px-3 py-1.5 rounded-lg transition-colors"
            >
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M13.5 4.5L6.5 11.5L3.5 8.5" stroke="#34C759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {showResolved ? 'View Unresolved' : `${resolvedCount} resolved incidents`}
            </button>
        )}
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto pr-2 -mr-2 max-h-[375px] hide-scrollbar">
        {incidentsToDisplay.map((incident) => (
            <IncidentItem key={incident.id} incident={incident} onResolve={handleResolve} />
        ))}
        {incidentsToDisplay.length === 0 && (
            <div className="text-center text-[#B1B5C3] py-10">
                No {showResolved ? 'resolved' : 'unresolved'} incidents.
            </div>
        )}
      </div>
    </aside>
  );
} 