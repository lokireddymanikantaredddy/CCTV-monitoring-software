import React, { useRef } from 'react';

// Event type to icon and color mapping
const eventTypeMap: Record<string, { icon: string; color: string; border: string; bg: string }> = {
  'Unauthorized Access': {
    icon: '/door-open.png',
    color: 'text-orange-400',
    border: 'border-orange-500',
    bg: 'bg-orange-500/30',
  },
  'Face Recognised': {
    icon: '/users.png',
    color: 'text-blue-400',
    border: 'border-blue-500',
    bg: 'bg-blue-500/30',
  },
  'Gun Threat': {
    icon: '/gun.png',
    color: 'text-red-400',
    border: 'border-red-500',
    bg: 'bg-red-500/30',
  },
  'Traffic congestion': {
    icon: '/fallback.png',
    color: 'text-green-400',
    border: 'border-green-500',
    bg: 'bg-green-500/30',
  },
  '4 Multiple Events': {
    icon: '/alert.png',
    color: 'text-gray-300',
    border: 'border-gray-500',
    bg: 'bg-gray-500/30',
  },
};

// More detailed, realistic data structure
const timelineData = [
  {
    cameraName: 'Camera - 01',
    events: [
      { id: 1, type: 'Unauthorized Access', start: 20, duration: 15 },
      { id: 2, type: 'Face Recognised', icon: '/users.png', color: 'blue', start: 50, duration: 10, time: '14:45' },
      { id: 3, type: '4 Multiple Events', icon: '/alert.png', color: 'gray', start: 70, duration: 12 },
      { id: 4, type: 'Unauthorized Access', icon: '/door-open.png', color: 'orange', start: 85, duration: 10 },
      { id: 5, type: 'Gun Threat', icon: '/gun.png', color: 'red', start: 85, duration: 8, top: 30 }, // 'top' for stacking
    ]
  },
  {
    cameraName: 'Camera - 02',
    events: [
      { id: 6, type: 'Unauthorized Access', icon: '/door-open.png', color: 'orange', start: 25, duration: 12 },
      { id: 7, type: 'Face Recognised', icon: '/face-id.png', color: 'blue', start: 60, duration: 10 },
    ]
  },
  {
    cameraName: 'Camera - 03',
    events: [
      { id: 8, type: 'Traffic congestion', icon: '/traffic.png', color: 'green', start: 40, duration: 20 },
      { id: 9, type: 'Unauthorized Access', icon: '/door-open.png', color: 'orange', start: 75, duration: 10 },
    ]
  },
];

// Improved Event Block
const EventBlock = ({ event }: { event: any }) => {
  const typeInfo = eventTypeMap[event.type] || eventTypeMap['4 Multiple Events'];
  return (
    <div
      className={`absolute min-w-[90px] max-w-[220px] h-7 flex items-center px-3 text-xs font-semibold text-white ${typeInfo.bg} ${typeInfo.border} border rounded-full shadow-sm whitespace-nowrap overflow-hidden text-ellipsis`}
      style={{ 
        left: `${event.start}%`, 
        width: `${event.duration}%`,
        top: event.top ? `${event.top}px` : '0.5rem',
        zIndex: event.top ? 2 : 1,
      }}
      title={event.type + (event.time ? ' ' + event.time : '')}
    >
      <EventIcon src={typeInfo.icon} alt={event.type} color={typeInfo.color} />
      <span className="whitespace-nowrap overflow-hidden text-ellipsis">{event.type}</span>
      {event.time && <span className="ml-2 text-gray-200 font-normal">{event.time}</span>}
    </div>
  );
};

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const TIMELINE_START = 0;
const TIMELINE_END = 16 * 60 * 60; // 16:00 in seconds

// Helper: Check for icon existence (fallback to SVG if missing)
function EventIcon({ src, alt, color }: { src: string; alt: string; color: string }) {
  // For now, always render an SVG fallback if the PNG is missing
  if (!src || src === '/broken.png') {
    return (
      <svg className={`w-4 h-4 mr-2 ${color}`} viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8" fill="currentColor" /></svg>
    );
  }
  return <img src={src} alt={alt} className={`w-4 h-4 mr-2 ${color}`} onError={e => (e.currentTarget.src = '/fallback.png')} />;
}

// Improved stacking: assign vertical slots to overlapping events
function getStackedEvents(events: any[]): any[] {
  // Sort by start time
  const sorted = [...events].sort((a, b) => a.start - b.start);
  const slots: { end: number }[] = [];
  return sorted.map(event => {
    let slot = 0;
    while (slots[slot] && event.start < slots[slot].end) slot++;
    slots[slot] = { end: event.start + event.duration };
    return { ...event, top: slot * 32 };
  });
}

export default function TimelineWidget({ selectedCameraIndex, currentTime, setCurrentTime }: { selectedCameraIndex: number, currentTime: number, setCurrentTime: (t: number) => void }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineWidth = 1212; // px, matches Figma

  // Calculate scrubber position as a percentage
  const percent = (currentTime - TIMELINE_START) / (TIMELINE_END - TIMELINE_START);
  const scrubberLeft = percent * timelineWidth;

  // Drag logic
  function onDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let newPercent = x / timelineWidth;
    newPercent = Math.max(0, Math.min(1, newPercent));
    const newTime = Math.round(TIMELINE_START + newPercent * (TIMELINE_END - TIMELINE_START));
    setCurrentTime(newTime);
  }

  function onDragStart(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    onDrag(e);
    window.addEventListener('mousemove', onWindowDrag);
    window.addEventListener('mouseup', onWindowUp);
  }
  function onWindowDrag(e: MouseEvent) {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let newPercent = x / timelineWidth;
    newPercent = Math.max(0, Math.min(1, newPercent));
    const newTime = Math.round(TIMELINE_START + newPercent * (TIMELINE_END - TIMELINE_START));
    setCurrentTime(newTime);
  }
  function onWindowUp() {
    window.removeEventListener('mousemove', onWindowDrag);
    window.removeEventListener('mouseup', onWindowUp);
  }

  return (
    <div className="w-full max-w-[1392px] bg-[#131313] rounded-lg shadow-lg flex flex-col p-4">
      {/* Timeline Header */}
      <div className="flex items-center w-full mb-2">
        <div className="w-[180px] flex-shrink-0 text-sm font-Plus Jakarta Sans text-white">Camera List</div>
        <div className="flex-1 relative h-6" ref={timelineRef} style={{ width: timelineWidth }}>
            {/* Time Ticks */}
            <div className="w-full flex justify-between text-xs text-gray-500 px-1 select-none">
                {Array.from({ length: 17 }).map((_, i) => <div key={i} className="flex flex-col items-center"><span className="mb-1">{String(i).padStart(2, '0')}:00</span><div className="w-px h-2 bg-gray-600"></div></div>)}
            </div>
            {/* Scrubber (Draggable) */}
            <div
              className="absolute z-30 top-0 bottom-0 w-0.5 bg-yellow-400 cursor-ew-resize"
              style={{ left: scrubberLeft,
                top: '3px',
                height: 'calc(100% + 230px)',
               }}
              onMouseDown={onDragStart}
            >
              <div className="absolute -top-5 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full select-none">
                {formatTime(currentTime)}
              </div>
            </div>
        </div>
      </div>
      {/* Timeline Body */}
      <div className="flex w-full">
        {/* Left Sidepanel: Camera Names */}
        <div className="w-[180px] flex-shrink-0 flex flex-col gap-4">
          {timelineData.map((camera, idx) => (
            <div key={camera.cameraName} className={`flex items-center gap-2 h-16 text-sm text-gray-300 ${selectedCameraIndex === idx ? 'bg-[#23262F] rounded-md' : ''}`}>
                <img src="/cctv.png" alt="camera icon" className="w-5 h-5 opacity-70" />
                {camera.cameraName}
            </div>
          ))}
        </div>
        {/* Right Side: Event Tracks */}
        <div className="flex-1 relative border-t border-gray-700" style={{ width: timelineWidth }}>
            {/* Camera Tracks */}
            <div className="flex flex-col gap-4">
                {timelineData.map((camera, idx) => {
                  const stackedEvents = getStackedEvents(camera.events);
                  return (
                    <div key={camera.cameraName} className={`relative h-16 border-b border-gray-800 ${selectedCameraIndex === idx ? 'bg-[#23262F] rounded-md' : ''}`}>
                        {stackedEvents.map(event => <EventBlock key={event.id} event={event} />)}
                    </div>
                  );
                })}
            </div>
        </div>
      </div>
    </div>
  );
} 