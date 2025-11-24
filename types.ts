export enum VibrationIntensity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface VibrationSegment {
  id: string;
  start: number; // Start time in seconds
  end: number;   // End time in seconds
  pattern: number | number[]; // Vibration pattern (ms)
  name: string; // Display name for the mode
  intensity: VibrationIntensity;
}

export interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  volume: number;
  isFullscreen: boolean;
}