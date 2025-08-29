import { CharacterData, gradeSystem, studyActivities, consistencyBonus } from '@/data/character';

export const calculateGradeFromPES = (totalPES: number): number => {
  for (let grade = 7; grade >= 1; grade--) {
    const gradeData = gradeSystem[grade as keyof typeof gradeSystem];
    if (totalPES >= gradeData.pesRequired) {
      return grade;
    }
  }
  return 1;
};

export const getPESForNextGrade = (currentGrade: number): number | null => {
  if (currentGrade >= 7) return null;
  const nextGradeData = gradeSystem[(currentGrade + 1) as keyof typeof gradeSystem];
  return nextGradeData.pesRequired;
};

export const getCurrentGradeInfo = (grade: number) => {
  return gradeSystem[grade as keyof typeof gradeSystem];
};

export const getStreakMultiplier = (streakDays: number): number => {
  const streakKeys = Object.keys(consistencyBonus).map(Number).sort((a, b) => b - a);
  
  for (const threshold of streakKeys) {
    if (streakDays >= threshold) {
      return consistencyBonus[threshold as keyof typeof consistencyBonus].pesMultiplier;
    }
  }
  
  return 1.0;
};

export const getStreakMessage = (streakDays: number): string | null => {
  const streakKeys = Object.keys(consistencyBonus).map(Number).sort((a, b) => b - a);
  
  for (const threshold of streakKeys) {
    if (streakDays >= threshold) {
      return consistencyBonus[threshold as keyof typeof consistencyBonus].message;
    }
  }
  
  return null;
};

export const performStudyActivity = (
  character: CharacterData,
  activityKey: keyof typeof studyActivities
): CharacterData => {
  const activity = studyActivities[activityKey];
  const newCharacter = { ...character };
  
  // Calculate PES with streak bonus
  const basePoints = activity.pesGain;
  const streakMultiplier = getStreakMultiplier(character.streakDays);
  const totalPES = Math.floor(basePoints * streakMultiplier);
  
  // Add PES
  newCharacter.totalPES += totalPES;
  
  // Update grade based on new PES
  newCharacter.currentGrade = calculateGradeFromPES(newCharacter.totalPES);
  
  // Update title based on new grade
  newCharacter.title = getCurrentGradeInfo(newCharacter.currentGrade).title;
  
  // Increase specific skill
  const skillKey = activity.skillBonus;
  const currentSkillValue = newCharacter.skills[skillKey];
  const skillIncrease = activity.skillPoints;
  newCharacter.skills[skillKey] = Math.min(100, currentSkillValue + skillIncrease);
  
  // Increase virtue associated with current grade
  const gradeInfo = getCurrentGradeInfo(newCharacter.currentGrade);
  const virtueKey = gradeInfo.virtueBonus as keyof CharacterData['virtues'];
  newCharacter.virtues[virtueKey] = Math.min(100, newCharacter.virtues[virtueKey] + 1);
  
  return newCharacter;
};

export const incrementStreak = (character: CharacterData): CharacterData => {
  return {
    ...character,
    streakDays: character.streakDays + 1
  };
};

export const resetStreak = (character: CharacterData): CharacterData => {
  return {
    ...character,
    streakDays: 0
  };
};

export const getSkillProgress = (skillValue: number): {
  level: string;
  description: string;
  color: string;
} => {
  if (skillValue >= 90) return { 
    level: "Magister", 
    description: "Master level understanding",
    color: "text-yellow-500" 
  };
  if (skillValue >= 75) return { 
    level: "Expertus", 
    description: "Expert knowledge",
    color: "text-purple-500" 
  };
  if (skillValue >= 50) return { 
    level: "Competens", 
    description: "Competent understanding",
    color: "text-blue-500" 
  };
  if (skillValue >= 25) return { 
    level: "Progressus", 
    description: "Making good progress",
    color: "text-green-500" 
  };
  if (skillValue >= 10) return { 
    level: "Initium", 
    description: "Beginning to understand",
    color: "text-orange-500" 
  };
  return { 
    level: "Novitius", 
    description: "Just starting the journey",
    color: "text-gray-500" 
  };
};

// Save game state to localStorage
export const saveCharacter = (character: CharacterData): void => {
  localStorage.setItem('academia-mystica-character', JSON.stringify(character));
};

// Load game state from localStorage
export const loadCharacter = (): CharacterData | null => {
  const saved = localStorage.getItem('academia-mystica-character');
  return saved ? JSON.parse(saved) : null;
};