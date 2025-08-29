import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Map, 
  BookOpen, 
  Library, 
  Crown,
  Scroll,
  LogOut
} from 'lucide-react';

export type GameScreen = 'character' | 'grades' | 'study' | 'library' | 'mentors';

interface NavigationProps {
  currentScreen: GameScreen;
  onScreenChange: (screen: GameScreen) => void;
}

const navigationItems = [
  {
    id: 'character' as GameScreen,
    label: 'Character',
    icon: User,
    description: 'View your academic progress'
  },
  {
    id: 'grades' as GameScreen,
    label: 'Grades',
    icon: Crown,
    description: 'Learn about the seven grades'
  },
  {
    id: 'study' as GameScreen,
    label: 'Study Journal',
    icon: Scroll,
    description: 'Record your daily studies'
  },
  {
    id: 'library' as GameScreen,
    label: 'Library',
    icon: Library,
    description: 'Access sacred texts'
  },
  {
    id: 'mentors' as GameScreen,
    label: 'Mentors',
    icon: Crown,
    description: 'Seek wisdom from the masters'
  }
];

export const Navigation: React.FC<NavigationProps> = ({ 
  currentScreen, 
  onScreenChange 
}) => {
  const { signOut, user } = useAuth();
  
  return (
    <nav className="medieval-border p-4 mb-6">
      <div className="flex flex-wrap justify-center gap-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "divine" : "manuscript"}
              size="lg"
              onClick={() => onScreenChange(item.id)}
              className="flex-col h-auto p-3 gap-1 min-w-[120px]"
              title={item.description}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
      
      {user && (
        <div className="flex justify-center mt-4">
          <Button
            variant="ghost"
            onClick={signOut}
            className="text-muted-foreground hover:text-foreground"
            size="sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout ({user.email})
          </Button>
        </div>
      )}
    </nav>
  );
};