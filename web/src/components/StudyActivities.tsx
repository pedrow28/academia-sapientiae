import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CharacterData, studyActivities, skillDescriptions } from '@/data/character';

interface StudyActivitiesProps {
  character: CharacterData;
  onActivityComplete: (activityKey: keyof typeof studyActivities) => void;
}

const ActivityCard: React.FC<{
  activityKey: keyof typeof studyActivities;
  activity: typeof studyActivities[keyof typeof studyActivities];
  onComplete: () => void;
}> = ({ activityKey, activity, onComplete }) => {
  const skillInfo = skillDescriptions[activity.skillBonus];
  
  return (
    <Card className="manuscript-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skillInfo.icon}</span>
          <div>
            <h4 className="font-semibold illuminated-text">{activity.name}</h4>
            <p className="text-sm text-muted-foreground">
              +{activity.pesGain} PES • +{activity.skillPoints} {skillInfo.name}
            </p>
          </div>
        </div>
        <Button 
          variant="sacred" 
          size="sm" 
          onClick={onComplete}
        >
          Completar
        </Button>
      </div>
      
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">Exemplos:</p>
        {activity.examples.slice(0, 2).map((example, index) => (
          <p key={index} className="text-xs text-muted-foreground">• {example}</p>
        ))}
      </div>
    </Card>
  );
};

export const StudyActivities: React.FC<StudyActivitiesProps> = ({ 
  character, 
  onActivityComplete 
}) => {
  // Group activities by skill
  const activitiesBySkill = Object.entries(studyActivities).reduce((acc, [key, activity]) => {
    const skillKey = activity.skillBonus;
    if (!acc[skillKey]) {
      acc[skillKey] = [];
    }
    acc[skillKey].push({ key: key as keyof typeof studyActivities, activity });
    return acc;
  }, {} as Record<string, Array<{ key: keyof typeof studyActivities; activity: typeof studyActivities[keyof typeof studyActivities] }>>);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold illuminated-text mb-2">
          Exercitia Sapientiae
        </h2>
        <p className="text-muted-foreground">
          Exercícios diários para crescer em sabedoria
        </p>
      </div>

      {Object.entries(activitiesBySkill).map(([skillKey, activities]) => {
        const skillInfo = skillDescriptions[skillKey as keyof typeof skillDescriptions];
        
        return (
          <div key={skillKey} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">{skillInfo.icon}</span>
              <h3 className="text-lg font-semibold illuminated-text">{skillInfo.name}</h3>
            </div>
            
            <div className="grid gap-3">
              {activities.map(({ key, activity }) => (
                <ActivityCard
                  key={key}
                  activityKey={key}
                  activity={activity}
                  onComplete={() => onActivityComplete(key)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};