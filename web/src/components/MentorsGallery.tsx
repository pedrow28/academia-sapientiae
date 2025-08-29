import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Crown } from 'lucide-react';

// Import mentor images
import thomasAquinasImg from '@/assets/mentors/thomas-aquinas.png';
import saintAugustineImg from '@/assets/mentors/saint-augustine.png';
import saintJeromeImg from '@/assets/mentors/saint-jerome.png';
import mosesImg from '@/assets/mentors/moses.png';
import peterAbelardImg from '@/assets/mentors/peter-abelard.png';
import saintBernardImg from '@/assets/mentors/saint-bernard.png';
import saintJohnCrossImg from '@/assets/mentors/saint-john-cross.png';

interface Mentor {
  name: string;
  title: string;
  specialty: string;
  description: string;
  chatUrl: string;
  icon: string;
  image: string;
  color: string;
}

const mentors: Mentor[] = [
  {
    name: "Santo Tomás de Aquino",
    title: "Doctor Angelicus",
    specialty: "Filosofia e Metafísica",
    description: "O Doutor Angélico, mestre da síntese entre fé e razão, guiará seus estudos nas profundezas da filosofia aristotélica e metafísica cristã.",
    chatUrl: "https://chatgpt.com/g/g-p-689f9be77c148191a9673eeab656a1dd-philosophiae-et-theologiae-catholica/c/68a0eed2-8ed4-832a-8d94-1844458a0cbc",
    icon: "👑",
    image: thomasAquinasImg,
    color: "from-amber-500/20 to-yellow-600/20"
  },
  {
    name: "Santo Agostinho de Hipona", 
    title: "Doctor Gratiae",
    specialty: "Teologia",
    description: "O Doutor da Graça, convertido pelas Confissões, será seu guia nos mistérios da fé e na compreensão do coração inquieto que busca a Deus.",
    chatUrl: "https://chatgpt.com/g/g-p-689f9be77c148191a9673eeab656a1dd-philosophiae-et-theologiae-catholica/c/68a3107c-d3c0-8333-857e-dced2822aa11",
    icon: "❤️",
    image: saintAugustineImg,
    color: "from-red-500/20 to-rose-600/20"
  },
  {
    name: "São Jerônimo",
    title: "Doctor Maximus",
    specialty: "Latim e Grego", 
    description: "O grande tradutor da Vulgata e erudito das línguas clássicas orientará seus estudos no latim eclesiástico e grego patrístico.",
    chatUrl: "https://chatgpt.com/c/68a3111c-c830-8331-b4db-c8abf486ca43",
    icon: "📜",
    image: saintJeromeImg,
    color: "from-purple-500/20 to-violet-600/20"
  },
  {
    name: "Moisés",
    title: "Legislator",
    specialty: "Hebraico Bíblico",
    description: "O grande legislador e profeta, que recebeu a Torah no Sinai, será seu mestre nas profundezas da língua sagrada do povo eleito.",
    chatUrl: "https://chatgpt.com/g/g-p-689f9be77c148191a9673eeab656a1dd-philosophiae-et-theologiae-catholica/c/68a311c4-f0b8-8332-a36d-321f948cc704",
    icon: "⚡",
    image: mosesImg,
    color: "from-blue-500/20 to-indigo-600/20"
  },
  {
    name: "Pedro Abelardo",
    title: "Magister Dialecticus", 
    specialty: "Lógica e Disputationes",
    description: "O mestre da dialética escolástica ensinará a arte da argumentação rigorosa e do debate intelectual ordenado à descoberta da verdade.",
    chatUrl: "https://chatgpt.com/g/g-p-689f9be77c148191a9673eeab656a1dd-philosophiae-et-theologiae-catholica/c/68a3125c-c05c-832e-a3ab-583ccb3783d6",
    icon: "⚖️",
    image: peterAbelardImg,
    color: "from-green-500/20 to-emerald-600/20"
  },
  {
    name: "São Bernardo de Claraval",
    title: "Doctor Mellifluus",
    specialty: "Síntese e Contemplação",
    description: "O Doutor Melífluo, abade de Claraval, guiará sua síntese entre vida contemplativa e ativa, unindo conhecimento e amor divino.",
    chatUrl: "https://chatgpt.com/g/g-p-689f9be77c148191a9673eeab656a1dd-philosophiae-et-theologiae-catholica/c/68a312dd-4e58-8320-95ca-43622d1b5ec7",
    icon: "🍯",
    image: saintBernardImg,
    color: "from-orange-500/20 to-amber-600/20"
  },
  {
    name: "São João da Cruz",
    title: "Doctor Mysticus",
    specialty: "Espiritualidade",
    description: "O Doutor Místico conduzirá sua alma através da noite escura rumo à união transformante com o Amado, integrando estudo e santidade.",
    chatUrl: "https://chatgpt.com/g/g-p-689f9be77c148191a9673eeab656a1dd-philosophiae-et-theologiae-catholica/project",
    icon: "🌟",
    image: saintJohnCrossImg,
    color: "from-slate-500/20 to-gray-600/20"
  }
];

export const MentorsGallery: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-manuscript-title flex items-center justify-center gap-3">
          <Crown className="w-8 h-8 text-divine-light" />
          Magistri Aeterni
          <Crown className="w-8 h-8 text-divine-light" />
        </h1>
        <p className="text-manuscript-text text-lg">
          <em>Os Mestres Eternos que guiarão sua jornada sapiencial</em>
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor, index) => (
          <Card key={index} className="medieval-border hover:shadow-divine transition-all duration-300">
            <CardHeader className={`bg-gradient-to-br ${mentor.color} relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20">
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-center relative z-10">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-divine-light/50">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-manuscript-title">
                  {mentor.name}
                </h3>
                <p className="text-sm text-manuscript-accent font-normal italic">
                  {mentor.title}
                </p>
                <p className="text-xs text-manuscript-text font-normal mt-1">
                  {mentor.specialty}
                </p>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              <p className="text-manuscript-text text-sm leading-relaxed mb-4">
                {mentor.description}
              </p>
              
              <Button 
                variant="divine" 
                className="w-full"
                onClick={() => window.open(mentor.chatUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Consultar Mestre
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center text-manuscript-text italic text-sm mt-8 p-4 bg-manuscript-glow/5 rounded-lg border border-divine-light/20">
        "Stantes super humeros gigantum" - Standing on the shoulders of giants
      </div>
    </div>
  );
};