import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Scroll, Crown } from 'lucide-react';
import { gradeSystem } from '@/data/character';

export const GradeDescriptions: React.FC = () => {
  const gradeDescriptions = {
    1: {
      duration: "Primeiros 6 meses do Ano I",
      description: "O Novitius Sapientiae é aquele que acaba de cruzar a Porta da Humildade e se encontra na Planície dos Fundamentos. Neste estágio, o estudante está aprendendo os elementos mais básicos de cada disciplina e desenvolvendo os hábitos fundamentais de estudo e oração que sustentarão toda a jornada posterior.",
      characteristics: "As características distintivas deste grau incluem a capacidade de reconhecer a própria ignorância sem desespero, a disposição de aceitar correção e orientação, e o desenvolvimento de uma rotina diária estável de estudo e oração.",
      challenges: "Os desafios típicos deste estágio incluem o combate contra a Sirena da Curiosidade, que tenta distrair o estudante com conhecimentos fascinantes mas irrelevantes, e a resistência aos Lemures da Preguiça."
    },
    2: {
      duration: "Segundos 6 meses do Ano I", 
      description: "O Discipulus Fundamentorum demonstrou capacidade de manter uma disciplina consistente de estudo e começou a dominar os elementos básicos de cada disciplina. Este estudante pode conjugar verbos latinos regulares, compreende os princípios fundamentais da lógica aristotélica.",
      characteristics: "Neste estágio, o estudante enfrenta pela primeira vez a Hydra da Confusão de forma séria, pois os conceitos se tornam mais complexos e as interconexões entre disciplinas começam a emergir.",
      challenges: "É crucial desenvolver a virtude da perseverança, pois este é frequentemente um período de dificuldade onde o entusiasmo inicial pode diminuir diante da realidade do trabalho árduo necessário."
    },
    3: {
      duration: "Primeiros 6 meses do Ano II",
      description: "O Studiosus Progressus deixou para trás a Planície dos Fundamentos e começou a escalar as Colinas do Desenvolvimento. Este estudante demonstra competência sólida nos fundamentos e está pronto para enfrentar materiais mais complexos.",
      characteristics: "As características deste grau incluem a capacidade de trabalhar com textos originais simples nas línguas clássicas, de construir argumentos válidos e sólidos, e de ver conexões básicas entre diferentes disciplinas.",
      challenges: "Os desafios deste estágio incluem a tentação de se contentar com o progresso já alcançado e a resistência a materiais mais difíceis. O Minotauro do Erro torna-se uma ameaça mais séria neste estágio."
    },
    4: {
      duration: "Segundos 6 meses do Ano II",
      description: "O Contemplativus Veritatis desenvolveu a capacidade de ver além da superfície dos textos e conceitos para perceber as verdades mais profundas que eles contêm. Este estudante não apenas compreende os argumentos, mas começa a contemplar as realidades que eles descrevem.",
      characteristics: "Neste estágio, o estudante desenvolve uma relação mais íntima com os Magistri Aeterni, começando a compreender não apenas o que eles ensinaram, mas como eles pensavam e por que chegaram às suas conclusões.",
      challenges: "O principal desafio deste grau é evitar o isolamento intelectual. O Contemplativus pode ficar tão absorto na beleza das verdades descobertas que negligencie a dimensão comunitária do aprendizado."
    },
    5: {
      duration: "Primeiros 6 meses do Ano III",
      description: "O Disputator Expertus alcançou as Montanhas do Aperfeiçoamento e demonstra maestria nas artes da argumentação e do debate intelectual. Este estudante pode defender posições complexas, refutar objeções sofisticadas.",
      characteristics: "As características distintivas deste grau incluem a capacidade de ver múltiplas perspectivas sobre questões complexas, de identificar rapidamente falácias e sofismas, e de construir sínteses originais que reconciliam posições aparentemente contraditórias.",
      challenges: "O principal perigo deste estágio é o desenvolvimento de um amor excessivo pelo debate em si, perdendo de vista que a argumentação é um meio para a descoberta da verdade, não um fim em si mesmo."
    },
    6: {
      duration: "Segundos 6 meses do Ano III",
      description: "O Synthesista Sapiens desenvolveu a capacidade rara de integrar conhecimentos de diferentes disciplinas em visões coerentes e unificadas. Este estudante vê as conexões profundas entre filosofia e teologia, entre as línguas clássicas e a exegese.",
      characteristics: "Neste estágio, o estudante começa a desenvolver sua própria síntese pessoal da tradição católica, não através da inovação arbitrária, mas através da compreensão profunda de como diferentes elementos da tradição se iluminam mutuamente.",
      challenges: "O desafio principal deste grau é evitar o sincretismo - a tentação de harmonizar elementos que são genuinamente incompatíveis ou de sacrificar a precisão doutrinal em favor de uma síntese superficialmente atrativa."
    },
    7: {
      duration: "Todo o Ano IV",
      description: "O Magister Sapientiae alcançou os Picos da Sabedoria e está preparado para se tornar um mestre para outros. Este estudante demonstra não apenas conhecimento extenso e habilidades refinadas, mas também a sabedoria prática necessária para aplicar este conhecimento de forma benéfica na vida real.",
      characteristics: "As características do Magister incluem a capacidade de ensinar outros de forma eficaz, de contribuir originalmente para a tradição católica através de pesquisa e reflexão, e de integrar completamente vida intelectual e vida espiritual.",
      challenges: "O Magister Sapientiae não é o fim da jornada, mas o início de uma nova fase onde o estudante se torna um colaborador na grande obra de transmitir e desenvolver a tradição católica para as gerações futuras."
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-manuscript-title flex items-center justify-center gap-3">
          <Crown className="w-8 h-8 text-divine-light" />
          Os Sete Graus da Sabedoria
          <Crown className="w-8 h-8 text-divine-light" />
        </h1>
        <p className="text-manuscript-text text-lg">
          <em>"Sapientia septem columnas fecit sibi" - A Sabedoria construiu para si sete colunas</em>
        </p>
      </div>

      <div className="grid gap-6">
        {Object.entries(gradeSystem).map(([gradeNum, gradeInfo]) => {
          const gradeNumber = parseInt(gradeNum);
          const details = gradeDescriptions[gradeNumber as keyof typeof gradeDescriptions];
          
          return (
            <Card key={gradeNumber} className="medieval-border">
              <CardHeader className="bg-gradient-to-r from-divine-glow/20 to-manuscript-accent/20">
                <CardTitle className="flex items-center gap-4">
                  <span className="text-4xl">{gradeInfo.symbol}</span>
                  <div>
                    <h3 className="text-xl font-bold text-manuscript-title">
                      {gradeNumber}º GRAU: {gradeInfo.name.toUpperCase()}
                    </h3>
                    <p className="text-sm text-manuscript-text font-normal">
                      {gradeInfo.title}
                    </p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    {details.duration}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4 pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-manuscript-title mb-2 flex items-center gap-2">
                        <Scroll className="w-4 h-4" />
                        Descrição
                      </h4>
                      <p className="text-manuscript-text text-sm leading-relaxed">
                        {details.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-manuscript-title mb-2">Características</h4>
                      <p className="text-manuscript-text text-sm leading-relaxed">
                        {details.characteristics}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-manuscript-title mb-2">Desafios</h4>
                      <p className="text-manuscript-text text-sm leading-relaxed">
                        {details.challenges}
                      </p>
                    </div>
                    
                    <div className="bg-manuscript-glow/10 p-4 rounded-lg border border-divine-light/20">
                      <h4 className="font-semibold text-manuscript-title mb-2">Virtude Dominante</h4>
                      <Badge variant="outline" className="capitalize">
                        {gradeInfo.virtueBonus}
                      </Badge>
                      <p className="text-xs text-manuscript-text mt-2">
                        PES necessário: {gradeInfo.pesRequired} - {gradeInfo.pesNext || "∞"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center text-manuscript-text italic text-sm mt-8 p-4 bg-manuscript-glow/5 rounded-lg border border-divine-light/20">
        "Ad Majorem Dei Gloriam et Sapientiae Aeternam!"
      </div>
    </div>
  );
};