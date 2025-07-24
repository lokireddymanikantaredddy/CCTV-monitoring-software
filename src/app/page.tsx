"use client";
import IncidentPlayer from './components/IncidentPlayer';
import IncidentList from './components/IncidentList';
import ControlBar from './components/ControlBar';
import TimelineWidget from './components/TimelineWidget';
import React, { useState } from 'react';

const TIMELINE_START = 0; // 0:00
const TIMELINE_END = 16 * 60 * 60; // 16:00 in seconds

export default function Home() {
  // Shared selected camera index for highlighting
  const [selectedCameraIndex, setSelectedCameraIndex] = useState(0);
  // Current time in seconds
  const [currentTime, setCurrentTime] = useState(3 * 60 * 60 + 12 * 60 + 37); // 03:12:37 as default

  return (
    <div className="flex flex-col items-center gap-6 w-full px-8 py-6">
      {/* Top Section: Player and List */}
      <div className="flex flex-row gap-8 w-full max-w-[1392px]">
        <div className="w-[796px] flex-shrink-0">
          <IncidentPlayer selectedCameraIndex={selectedCameraIndex} setSelectedCameraIndex={setSelectedCameraIndex} />
        </div>
        <div className="flex-1">
          <IncidentList />
        </div>
      </div>
      {/* Bottom Section: Control Bar and Timeline */}
      <div className="w-full max-w-[1392px] flex flex-col items-center gap-4">
        <ControlBar currentTime={currentTime} />
        <TimelineWidget selectedCameraIndex={selectedCameraIndex} currentTime={currentTime} setCurrentTime={setCurrentTime} />
      </div>
    </div>
  );
}
