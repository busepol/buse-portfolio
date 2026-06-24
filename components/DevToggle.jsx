'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ModeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme?.toLowerCase() || 'light';

  // --- 1. DYNAMIC CONTAINER STYLES ---
  // This changes the background of the "pill" itself
  const getContainerStyles = () => {
    switch (currentTheme) {
      case 'terminal': 
        return 'bg-[#050505] border border-green-900/50 shadow-[0_0_15px_rgba(34,197,94,0.05)]';
      case 'comm': 
        return 'bg-[#020617] border border-blue-900/50 shadow-[0_0_15px_rgba(59,130,246,0.05)]';
      case 'italian': 
        return 'bg-white border border-orange-200 shadow-sm';
      default: 
        return 'bg-gray-100/80 backdrop-blur-md shadow-sm';
    }
  };

  // --- 2. DYNAMIC BUTTON STYLES ---
  // This changes how both the ACTIVE and INACTIVE buttons look based on the theme
  const getButtonStyles = (modeName) => {
    const isActive = currentTheme === modeName;

    if (isActive) {
      // How the selected button looks
      switch (modeName) {
        case 'terminal': return 'bg-green-950/60 text-green-400 border border-green-800 shadow-sm font-mono';
        case 'comm': return 'bg-blue-900/60 text-cyan-300 border border-blue-700 shadow-sm font-mono';
        case 'italian': return 'bg-orange-100 text-[#D2691E] font-bold shadow-sm border border-orange-200';
        default: return 'bg-white text-gray-900 shadow-sm font-medium';
      }
    } else {
      // How the unselected buttons look (making them blend in)
      switch (currentTheme) {
        case 'terminal': return 'text-green-700/70 hover:text-green-400 hover:bg-green-950/30 font-mono';
        case 'comm': return 'text-blue-600/70 hover:text-cyan-400 hover:bg-blue-900/30 font-mono';
        case 'italian': return 'text-gray-400 hover:text-orange-600 hover:bg-orange-50';
        default: return 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50';
      }
    }
  };

  return (
    <div className={`flex items-center p-1 rounded-full transition-all duration-500 ${getContainerStyles()}`}>
      <button 
        onClick={() => setTheme('light')} 
        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${getButtonStyles('light')}`}
      >
        Surface
      </button>
      <button 
        onClick={() => setTheme('terminal')} 
        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${getButtonStyles('terminal')}`}
      >
        Terminal
      </button>
      <button 
        onClick={() => setTheme('comm')} 
        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${getButtonStyles('comm')}`}
      >
        Comm_Sys
      </button>
      <button 
        onClick={() => setTheme('italian')} 
        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${getButtonStyles('italian')}`}
      >
        Italiano (A2)
      </button>
    </div>
  );
}