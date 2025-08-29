import React, { useState } from 'react';
import { CharacterSheet } from './CharacterSheet';
import { StudyActivities } from './StudyActivities';
import { GradeDescriptions } from './GradeDescriptions';
import { StudyJournal } from './StudyJournal';
import { MentorsGallery } from './MentorsGallery';
import { Navigation, GameScreen } from './Navigation';
import { studyActivities } from '@/data/character';
import { performStudyActivity, incrementStreak, getStreakMessage } from '@/utils/gameLogic';
import { useToast } from '@/hooks/use-toast';
import { useCharacterProgress } from '@/hooks/useCharacterProgress';
import manuscriptBg from '@/assets/manuscript-bg.jpg';

const ComingSoonScreen: React.FC<{ title: string; description: string }> = ({ 
  title, 
  description 
}) => (
  <div className="text-center space-y-4 py-12">
    <h2 className="text-3xl font-bold illuminated-text">{title}</h2>
    <p className="text-lg text-muted-foreground">{description}</p>
    <div className="manuscript-card p-8 max-w-md mx-auto">
      <p className="text-sm">
        This sacred space is being prepared by the scribes of the monastery. 
        Return soon to continue your journey in wisdom.
      </p>
    </div>
  </div>
);

export const AcademiaMystica: React.FC = () => {
  const { character, saveCharacter, loading } = useCharacterProgress();
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('character');
  const [showActivities, setShowActivities] = useState(false);
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-manuscript-text">Carregando progresso...</div>
      </div>
    );
  }

  const handleActivityComplete = async (activityKey: keyof typeof studyActivities) => {
    const activity = studyActivities[activityKey];
    const oldGrade = character.currentGrade;
    const oldSkillValue = character.skills[activity.skillBonus];
    
    // Perform the study activity
    let updatedCharacter = performStudyActivity(character, activityKey);
    
    // Increment streak (assuming daily activity)
    updatedCharacter = incrementStreak(updatedCharacter);
    
    await saveCharacter(updatedCharacter);

    const pesGained = updatedCharacter.totalPES - character.totalPES;
    const skillGained = updatedCharacter.skills[activity.skillBonus] - oldSkillValue;
    
    // Show toast notification for progress
    toast({
      title: "Sapientia Crescit! 📚",
      description: `+${pesGained} PES, +${skillGained} ${activity.skillBonus}`,
      duration: 2000,
    });

    // Check for grade advancement
    if (updatedCharacter.currentGrade > oldGrade) {
      toast({
        title: "✨ Gradus Novus! ✨",
        description: `Bem-vindo, ${updatedCharacter.title}!`,
        duration: 4000,
      });
    }

    // Check for streak bonus message
    const streakMessage = getStreakMessage(updatedCharacter.streakDays);
    if (streakMessage && updatedCharacter.streakDays > character.streakDays) {
      setTimeout(() => {
        toast({
          title: "🔥 Perseverantia!",
          description: streakMessage,
          duration: 3000,
        });
      }, 2500);
    }
  };

  const renderCurrentScreen = () => {
    if (showActivities) {
      return (
        <div className="space-y-4">
          <div className="text-center">
            <button 
              onClick={() => setShowActivities(false)}
              className="text-primary hover:text-primary/80 underline"
            >
              ← Voltar ao Personagem
            </button>
          </div>
          <StudyActivities 
            character={character} 
            onActivityComplete={handleActivityComplete}
          />
        </div>
      );
    }

    switch (currentScreen) {
      case 'character':
        return (
          <CharacterSheet 
            character={character} 
            onShowActivities={() => setShowActivities(true)}
          />
        );
      case 'grades':
        return <GradeDescriptions />;
      case 'study':
        return <StudyJournal />;
      case 'library':
        return (
          <ComingSoonScreen 
            title="Bibliotheca Aeterna"
            description="Google Drive integration coming soon"
          />
        );
      case 'mentors':
        return <MentorsGallery />;
      default:
        return (
          <CharacterSheet 
            character={character} 
            onShowActivities={() => setShowActivities(true)}
          />
        );
    }
  };

  return (
    <div 
      className="min-h-screen bg-background"
      style={{
        backgroundImage: `url(${manuscriptBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="min-h-screen bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          {/* Game Title */}
          <header className="text-center mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold illuminated-text mb-2">
              Academia Mystica Sapientiae
            </h1>
            <p className="text-lg text-muted-foreground">
              The Sacred Academy of Wisdom
            </p>
          </header>

          {/* Navigation */}
          <Navigation 
            currentScreen={currentScreen}
            onScreenChange={setCurrentScreen}
          />

          {/* Main Content */}
          <main>
            {renderCurrentScreen()}
          </main>

          {/* Footer */}
          <footer className="text-center mt-12 text-sm text-muted-foreground">
            <p>Ad Majorem Dei Gloriam et Sapientiae Aeternam</p>
          </footer>
        </div>
      </div>
    </div>
  );
};