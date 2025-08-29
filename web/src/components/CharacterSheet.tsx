import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CharacterData, skillDescriptions, virtueDescriptions, gradeSystem } from '@/data/character';
import { getPESForNextGrade, getStreakMultiplier } from '@/utils/gameLogic';
import characterAvatar from '@/assets/character-avatar.png';

interface CharacterSheetProps {
  character: CharacterData;
  onShowActivities: () => void;
}

const SkillBar: React.FC<{
  name: string;
  value: number;
  description: string;
  icon: string;
  color: string;
}> = ({ name, value, description, icon, color }) => {
  const getSkillRank = (skillValue: number): string => {
    if (skillValue >= 81) return "Master";
    if (skillValue >= 61) return "Expert";
    if (skillValue >= 41) return "Journeyman";
    if (skillValue >= 21) return "Apprentice";
    return "Novice";
  };

  return (
    <div className="manuscript-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h4 className="font-semibold text-lg illuminated-text">{name}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
            <p className="text-xs text-primary font-medium">{getSkillRank(value)}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{value}/100</div>
        </div>
      </div>
      <Progress value={value} className="h-3" />
    </div>
  );
};

const VirtueDisplay: React.FC<{
  virtue: keyof CharacterData['virtues'];
  value: number;
}> = ({ virtue, value }) => {
  const info = virtueDescriptions[virtue];
  
  return (
    <div className="text-center space-y-1">
      <div className="text-xs font-medium text-muted-foreground">{info.name}</div>
      <div className="virtue-bar h-2 w-16">
        <div 
          className="virtue-progress h-full" 
          style={{ width: `${(value / 100) * 100}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground">{value}/100</div>
    </div>
  );
};

export const CharacterSheet: React.FC<CharacterSheetProps> = ({ 
  character, 
  onShowActivities 
}) => {
  const gradeInfo = gradeSystem[character.currentGrade as keyof typeof gradeSystem];
  const nextGradePES = getPESForNextGrade(character.currentGrade);
  const streakMultiplier = getStreakMultiplier(character.streakDays);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Character Header */}
      <Card className="medieval-border p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img 
              src={characterAvatar} 
              alt="Character Avatar" 
              className="w-24 h-24 rounded-lg border-2 border-gold-500"
            />
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              {gradeInfo.symbol}
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold illuminated-text">{character.name}</h1>
            <h2 className="text-xl text-muted-foreground mb-2">{character.title}</h2>
            <p className="text-sm text-muted-foreground mb-3">{gradeInfo.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">PES Total:</span>
                <span className="ml-2 font-semibold">{character.totalPES}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Grau:</span>
                <span className="ml-2 font-semibold">{character.currentGrade}/7</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Sequência:</span>
                <span className="ml-2 font-semibold">{character.streakDays} dias</span>
                {streakMultiplier > 1 && (
                  <span className="ml-1 text-xs text-primary">({streakMultiplier.toFixed(1)}x)</span>
                )}
              </div>
              {nextGradePES && (
                <div>
                  <span className="text-sm text-muted-foreground">Próximo Grau:</span>
                  <span className="ml-2 font-semibold">{nextGradePES - character.totalPES} PES</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Study Activities Button */}
      <div className="text-center">
        <Button 
          onClick={onShowActivities}
          size="lg"
          className="manuscript-card px-8 py-4 text-lg"
        >
          📚 Exercitia Sapientiae
        </Button>
      </div>

      {/* The Seven Sacred Skills */}
      <div>
        <h2 className="text-2xl font-bold illuminated-text mb-4">
          Septem Artes Sapientiae
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Object.entries(character.skills).map(([skill, value]) => {
            const skillInfo = skillDescriptions[skill as keyof typeof skillDescriptions];
            return (
              <SkillBar
                key={skill}
                name={skillInfo.name}
                value={value}
                description={skillInfo.description}
                icon={skillInfo.icon}
                color={skillInfo.color}
              />
            );
          })}
        </div>
      </div>

      {/* The Eight Virtues */}
      <Card className="medieval-border p-6">
        <h3 className="text-xl font-bold illuminated-text mb-4 text-center">
          Octo Virtutes Sanctae
        </h3>
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
          {Object.entries(character.virtues).map(([virtue, value]) => (
            <VirtueDisplay
              key={virtue}
              virtue={virtue as keyof CharacterData['virtues']}
              value={value}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};