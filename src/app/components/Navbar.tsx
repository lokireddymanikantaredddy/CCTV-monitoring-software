"use client"
import React, { useState } from 'react';

export default function Navbar() {
  const navItems = [
    { icon: "/dashboard.png", label: "Dashboard" },
    { icon: "/Vector.png", label: "Cameras" },
    { icon: "/Scenes.png", label: "Scenes" },
    { icon: "/inscidents.png", label: "Incidents" },
    { icon: "/users.png", label: "Users" },
  ];
  const [active, setActive] = useState("Dashboard");

  return (
    <nav className="w-full h-[72px] flex items-center justify-between px-12 bg-transparent relative z-20">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="MANDLACX Logo" className="h-10 w-10" />
        <span className="text-2xl font-extrabold text-white tracking-wide">MANDLACX</span>
      </div>
      <div className="flex items-center gap-10">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={active === item.label}
            onClick={() => setActive(item.label)}
          />
        ))}
      </div>  
      <div className="flex items-center gap-4">
        <img src="/avatar.png" alt="User" className="h-10 w-10 rounded-full border-2 border-[#353945]" />
        <div className="flex flex-col items-end">
          <span className="text-white font-semibold text-base leading-tight">Mohammed Ajhas</span>
          <span className="text-xs text-[#B1B5C3]">ajhas@mandlac.com</span>
        </div>
        <svg width="20" height="20" fill="none" className="ml-1">
          <path d="M6 8l4 4 4-4" stroke="#B1B5C3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </nav>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: string; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <div className="flex flex-row items-center gap-2 cursor-pointer select-none" onClick={onClick}>
      <img
        src={icon}
        alt={label}
        className={`h-6 w-6 transition-colors duration-150 ${active ? 'filter brightness-150' : 'grayscale opacity-70'}`}
        style={active ? { filter: 'drop-shadow(0 0 8px #FFD600)', color: '#FFD600' } : {}}
      />
      <span className="font-Plus Jakarta Sans font-semibold text-base text-[#B1B5C3]">{label}</span>
    </div>
  );
}