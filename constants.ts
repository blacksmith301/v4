import { VibrationSegment, VibrationIntensity } from './types';

export const VIDEO_SOURCE = "https://closeup-sonicexpert.com/cdn/shop/videos/c/vp/0499295a775148d0a7d38998241f1758/0499295a775148d0a7d38998241f1758.HD-720p-2.1Mbps-27295103.mp4?v=0";

// Timeline based on user request
export const VIBRATION_TIMELINE: VibrationSegment[] = [
  {
    id: 'activation',
    start: 6.0,
    end: 6.1,
    pattern: 1200, // Quick burst
    name: 'Activation',
    intensity: VibrationIntensity.LOW
  },
  {
    id: 'intense-clean',
    start: 10.5,
    end: 12.0,
    pattern: 1500, // Continuous high freq
    name: 'Intense Clean',
    intensity: VibrationIntensity.HIGH
  },
  {
    id: 'pulse-mode',
    start: 15.5,
    end: 17.0,
    // Rhythmic bursts: 1200ms on, 100ms off...
    pattern: [1200, 100, 1200, 100, 1200, 100, 1200, 100, 1200], 
    name: 'Pulse Mode',
    intensity: VibrationIntensity.MEDIUM
  },
  {
    id: 'whitening-pulse',
    start: 21.0,
    end: 22.2,
    // Vibrate - Pause - Vibrate - Pause - Vibrate - Pause
    pattern: [1500, 150, 1500, 150, 1500, 150], 
    name: 'Whitening Pulse',
    intensity: VibrationIntensity.HIGH
  },
  {
    id: 'deep-scrub',
    start: 28.0,
    end: 30.0,
    pattern: 2000, // Sustained
    name: 'Deep Scrub',
    intensity: VibrationIntensity.HIGH
  },
  {
    id: 'closing-burst',
    start: 38.0,
    end: 38.1,
    pattern: 200,
    name: 'Closing Burst',
    intensity: VibrationIntensity.LOW
  }
];