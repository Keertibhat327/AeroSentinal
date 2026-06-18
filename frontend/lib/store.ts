import { create } from 'zustand';

export type SubsystemHealth = {
  score: number;
  status: 'Healthy' | 'Warning' | 'Critical';
  metrics: Record<string, number | string>;
  is_synthetic_data: boolean;
};

export type AircraftState = {
  aircraftId: string;
  globalHealthScore: number;
  engine: SubsystemHealth;
  landingGear: SubsystemHealth;
  apu: SubsystemHealth;
  hydraulics: SubsystemHealth;
  ecs: SubsystemHealth;
};

interface AppState {
  // Current mocked aircraft state
  aircraft: AircraftState;
  
  // Simulator Controls
  simulator: {
    ecsFoulingPercent: number;
  };
  setEcsFouling: (val: number) => void;
  
  // Historical data for charts
  history: Array<{ time: number; engineScore: number; ecsFouling: number }>;
}

// Initial mock data
const initialAircraft: AircraftState = {
  aircraftId: "N1234A",
  globalHealthScore: 92,
  engine: {
    score: 95,
    status: 'Healthy',
    metrics: { rulCycles: 142 },
    is_synthetic_data: true,
  },
  landingGear: {
    score: 88,
    status: 'Healthy',
    metrics: { brakeWearPct: 12 },
    is_synthetic_data: true,
  },
  apu: {
    score: 98,
    status: 'Healthy',
    metrics: { egtMargin: 45 },
    is_synthetic_data: true,
  },
  hydraulics: {
    score: 100,
    status: 'Healthy',
    metrics: { pressureAnomaly: 0.01 },
    is_synthetic_data: true,
  },
  ecs: {
    score: 100,
    status: 'Healthy',
    metrics: { foulingPct: 0 },
    is_synthetic_data: true,
  }
};

const initialHistory = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  engineScore: 95 + Math.random() * 2 - 1,
  ecsFouling: 0,
}));

export const useStore = create<AppState>((set) => ({
  aircraft: initialAircraft,
  simulator: {
    ecsFoulingPercent: 0,
  },
  history: initialHistory,

  setEcsFouling: (val: number) => set((state) => {
    // Simulate cross-domain coupling:
    // If ECS fouling goes up, Engine health score drops artificially due to bleed demand
    
    const baseEngineScore = 95;
    const couplingEffect = (val / 100) * 15; // Max 15 point drop due to ECS
    const newEngineScore = Math.max(0, baseEngineScore - couplingEffect);
    const newEcsScore = Math.max(0, 100 - val);

    const newEngineStatus = newEngineScore < 75 ? 'Warning' : newEngineScore < 50 ? 'Critical' : 'Healthy';
    const newEcsStatus = newEcsScore < 75 ? 'Warning' : newEcsScore < 50 ? 'Critical' : 'Healthy';

    const newGlobalScore = Math.floor(
      (newEngineScore + newEcsScore + state.aircraft.landingGear.score + 
       state.aircraft.apu.score + state.aircraft.hydraulics.score) / 5
    );

    const newHistoryEntry = {
      time: state.history[state.history.length - 1].time + 1,
      engineScore: newEngineScore,
      ecsFouling: val,
    };

    return {
      simulator: { ecsFoulingPercent: val },
      aircraft: {
        ...state.aircraft,
        globalHealthScore: newGlobalScore,
        engine: {
          ...state.aircraft.engine,
          score: Math.floor(newEngineScore),
          status: newEngineStatus,
        },
        ecs: {
          ...state.aircraft.ecs,
          score: Math.floor(newEcsScore),
          status: newEcsStatus,
          metrics: { foulingPct: val }
        }
      },
      history: [...state.history.slice(1), newHistoryEntry],
    };
  }),
}));
