import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Smartphone } from 'lucide-react';
import { VIDEO_SOURCE, VIBRATION_TIMELINE } from '../constants';
import { VibrationSegment, VibrationIntensity } from '../types';

// Helper to format time with milliseconds (00:00.00)
const formatPreciseTime = (time: number): string => {
  if (!isFinite(time) || isNaN(time)) return "00:00.00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  const ms = Math.floor((time % 1) * 100);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
};

const SonicPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  // Vibration State
  const [activeSegment, setActiveSegment] = useState<VibrationSegment | null>(null);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  
  // Hide controls timer
  const controlsTimeoutRef = useRef<number | null>(null);
  // Animation frame loop for precise timing
  const animationFrameRef = useRef<number | null>(null);

  // Check for Vibration API support
  const hasVibrationSupport = typeof navigator !== 'undefined' && !!navigator.vibrate;

  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
    resetControlsTimeout();
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = (parseFloat(e.target.value) / 100) * duration;
    videoRef.current.currentTime = time;
    setProgress(parseFloat(e.target.value));
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Main Loop: Syncs Haptics and Time
  const syncLoop = useCallback(() => {
    if (!videoRef.current || !isPlaying) return;

    const now = videoRef.current.currentTime;
    setCurrentTime(now);
    
    // Update progress bar
    if (videoRef.current.duration) {
      setProgress((now / videoRef.current.duration) * 100);
    }

    // Check Timeline
    if (hapticsEnabled && hasVibrationSupport) {
      const currentSegment = VIBRATION_TIMELINE.find(
        (seg) => now >= seg.start && now <= seg.end
      );

      if (currentSegment) {
        if (activeSegment?.id !== currentSegment.id) {
          // New segment entered
          setActiveSegment(currentSegment);
          navigator.vibrate(currentSegment.pattern);
          console.log(`Triggering haptics: ${currentSegment.name}`);
        }
      } else {
        if (activeSegment) {
          // Segment exited
          setActiveSegment(null);
          navigator.vibrate(0); // Kill vibration immediately
        }
      }
    } else {
       // Fallback for visual only if needed (handled by logic below via activeSegment checks if we want visual only)
       // We still want activeSegment to update for visual effects even if haptics disabled
        const currentSegment = VIBRATION_TIMELINE.find(
            (seg) => now >= seg.start && now <= seg.end
        );
        if (currentSegment?.id !== activeSegment?.id) {
            setActiveSegment(currentSegment || null);
        }
    }

    animationFrameRef.current = requestAnimationFrame(syncLoop);
  }, [isPlaying, activeSegment, hapticsEnabled, hasVibrationSupport]);

  // Effect to start/stop the loop
  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(syncLoop);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      navigator.vibrate(0); // Stop vibration on pause
      setActiveSegment(null);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, syncLoop]);

  // Video Event Handlers
  const onLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const onEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
    setActiveSegment(null);
    navigator.vibrate(0);
  };

  // Determine container classes based on state
  const getContainerClasses = () => {
    let classes = "relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-zinc-800 transition-transform duration-100 ";
    if (activeSegment) {
        if (activeSegment.intensity === VibrationIntensity.HIGH) {
            classes += "animate-rumble shadow-cyan-500/20 shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)]";
        } else {
            classes += "animate-rumble-light shadow-cyan-500/10";
        }
    }
    return classes;
  };

  const getSegmentColor = (intensity: VibrationIntensity) => {
      switch (intensity) {
          case VibrationIntensity.HIGH: return 'bg-red-500/70';
          case VibrationIntensity.MEDIUM: return 'bg-yellow-400/70';
          case VibrationIntensity.LOW: return 'bg-blue-300/70';
          default: return 'bg-white/50';
      }
  };

  return (
    <div 
      ref={containerRef}
      className={getContainerClasses()}
      onMouseMove={resetControlsTimeout}
      onTouchStart={resetControlsTimeout}
    >
      <video
        ref={videoRef}
        src={VIDEO_SOURCE}
        className="w-full h-full object-cover"
        onClick={handlePlayPause}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        playsInline
      />

      {/* Center Play Button (only when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
          <button 
            onClick={handlePlayPause}
            className="w-20 h-20 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full flex items-center justify-center transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.6)]"
          >
            <Play className="w-8 h-8 fill-current ml-1" />
          </button>
        </div>
      )}

      {/* Control Bar */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 pb-4 px-6 transition-opacity duration-300 z-30 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        {/* Progress Bar */}
        <div className="relative group h-1.5 w-full bg-zinc-700/50 rounded-full mb-4 cursor-pointer">
            {/* Haptic Markers */}
            {duration > 0 && VIBRATION_TIMELINE.map((segment) => {
                const startPct = (segment.start / duration) * 100;
                const widthPct = ((segment.end - segment.start) / duration) * 100;
                return (
                    <div
                        key={segment.id}
                        className={`absolute top-0 h-full z-10 pointer-events-none ${getSegmentColor(segment.intensity)}`}
                        style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                        title={`${segment.name}: ${formatPreciseTime(segment.start)} - ${formatPreciseTime(segment.end)}`}
                    />
                );
            })}

          <div 
            className="absolute top-0 left-0 h-full bg-cyan-500 rounded-full z-0" 
            style={{ width: `${progress}%` }}
          />
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={handlePlayPause} className="text-white hover:text-cyan-400 transition-colors">
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
            </button>

            <button onClick={handleMuteToggle} className="text-zinc-300 hover:text-white transition-colors">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <span className="text-zinc-300 text-sm font-medium tabular-nums min-w-[140px]">
              {formatPreciseTime(currentTime)} / {formatPreciseTime(duration)}
            </span>
          </div>

          <div className="flex items-center space-x-4">
             {/* Haptic Toggle */}
             <button 
                onClick={() => setHapticsEnabled(!hapticsEnabled)}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors border ${hapticsEnabled ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}
                title="Toggle Haptics"
             >
                <Smartphone className={`w-3.5 h-3.5 ${hapticsEnabled ? 'animate-pulse' : ''}`} />
                <span>{hapticsEnabled ? '4D ON' : '4D OFF'}</span>
             </button>

            <button onClick={toggleFullscreen} className="text-zinc-300 hover:text-white transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SonicPlayer;