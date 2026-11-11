import type { Activity, MissionDetail } from '../../lib/types';

export interface ActivityRuntimeProps {
  activity: Activity;
  mission: MissionDetail;
  onProgressChange: (value: { progress?: number; faces?: number }) => void;
}

export interface HotspotView {
  id: string;
  label: string;
  icon?: string;
  description: string;
  color?: string;
}
