import type { Evidence } from '../../lib/types';
import { Animation2DPlayer } from './Animation2DPlayer';
import { Animation3DPlayer } from './Animation3DPlayer';
import { ARCube } from './ARCube';
import { EvidenceEditor } from './EvidenceEditor';
import { InfographicPlayer } from './InfographicPlayer';
import { Model3DPlayer } from './Model3DPlayer';
import { OsmosisLab } from './OsmosisLab';
import { QuiverStation } from './QuiverStation';
import { ReadingPlayer } from './ReadingPlayer';
import { Video360Player } from './Video360Player';
import type { ActivityRuntimeProps } from './types';

interface ActivityPlayerProps extends ActivityRuntimeProps {
  onEvidenceSubmitted: (result: {
    evidence: Evidence;
    missionCompleted: boolean;
    badgeAwarded: { code: string; name: string; description: string; icon: string } | null;
  }) => void;
}

export function ActivityPlayer({ activity, mission, onProgressChange, onEvidenceSubmitted }: ActivityPlayerProps) {
  switch (activity.type) {
    case 'video360':
      return <Video360Player activity={activity} mission={mission} onProgressChange={onProgressChange} />;
    case 'reading':
      return <ReadingPlayer activity={activity} />;
    case 'model3d':
      return <Model3DPlayer activity={activity} />;
    case 'animation3d':
      return <Animation3DPlayer activity={activity} mission={mission} onProgressChange={onProgressChange} />;
    case 'animation2d':
      return <Animation2DPlayer activity={activity} />;
    case 'ar_cube':
      return <ARCube activity={activity} mission={mission} onProgressChange={onProgressChange} />;
    case 'quiver':
      return <QuiverStation activity={activity} />;
    case 'infographic':
      return <InfographicPlayer activity={activity} />;
    case 'lab':
      return <OsmosisLab activity={activity} />;
    case 'evidence':
      return (
        <EvidenceEditor
          activity={activity}
          mission={mission}
          onSubmitted={onEvidenceSubmitted}
        />
      );
    case 'quiz':
      return null;
    default:
      return (
        <div className="rounded-2xl border border-amber-400/25 bg-amber-400/8 p-4 text-sm text-amber-100">
          Esta actividad todavía no tiene un reproductor disponible.
        </div>
      );
  }
}
