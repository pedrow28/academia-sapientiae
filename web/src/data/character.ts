export interface CharacterData {
  name: string;
  title: string;
  currentGrade: number;     // 1-7 conforme sistema de graus
  totalPES: number;         // Pontos de Experiência Sapiencial
  streakDays: number;       // Dias consecutivos de estudo
  
  // The 7 Fundamental Skills (1-100)
  skills: {
    philosophia: number;      // Filosofia - Ícone: Coruja de Minerva
    theologia: number;        // Teologia - Ícone: Cruz Gloriosa  
    linguaeSacrae: number;    // Línguas Sagradas - Ícone: Torre de Babel Restaurada
    logica: number;          // Lógica - Ícone: Balança da Justiça
    metaphysica: number;     // Metafísica - Ícone: Olho que Tudo Vê
    synthesis: number;       // Síntese - Ícone: Ouroboros Sagrado
    spiritualitas: number;   // Espiritualidade - Ícone: Pomba do Espírito Santo
  };
  
  // The 8 Sacred Virtues (0-100, funcionam como "armaduras")
  virtues: {
    humilitas: number;       // Humildade - Protege contra Orgulho
    perseverantia: number;   // Perseverança - Protege contra Preguiça
    diligentia: number;      // Diligência - Aumenta eficiência de estudo
    contemplatio: number;    // Contemplação - Facilita sínteses
    fortitudo: number;       // Fortaleza - Resiste a desânimo
    prudentia: number;       // Prudência - Evita erros de julgamento
    sapientia: number;       // Sabedoria - Integra todas as habilidades
    caritas: number;         // Caridade - Melhora interações comunitárias
  };
}

export const skillDescriptions = {
  philosophia: {
    name: "Philosophia",
    description: "O amor à sabedoria, fundamento de todo conhecimento",
    icon: "🦉",
    color: "text-amber-600"
  },
  theologia: {
    name: "Theologia",
    description: "O estudo dos mistérios divinos e doutrina sagrada",
    icon: "✟",
    color: "text-blue-600"
  },
  linguaeSacrae: {
    name: "Linguae Sacrae",
    description: "Domínio do Latim, Grego e Hebraico",
    icon: "🗼",
    color: "text-purple-600"
  },
  logica: {
    name: "Logica",
    description: "A arte do raciocínio claro e argumentação",
    icon: "⚖️",
    color: "text-green-600"
  },
  metaphysica: {
    name: "Metaphysica",
    description: "Compreensão da natureza do ser e realidade",
    icon: "👁️",
    color: "text-indigo-600"
  },
  synthesis: {
    name: "Synthesis",
    description: "A capacidade de unir verdades díspares em harmonia",
    icon: "🐍",
    color: "text-red-600"
  },
  spiritualitas: {
    name: "Spiritualitas",
    description: "Crescimento em santidade e união com o Divino",
    icon: "🕊️",
    color: "text-white"
  }
};

export const virtueDescriptions = {
  humilitas: {
    name: "Humilitas",
    description: "Recognition of one's place before God",
    blessing: "Protects against Pride"
  },
  perseverantia: {
    name: "Perseverantia",
    description: "Steadfast continuation despite difficulties",
    blessing: "Protects against Despair"
  },
  diligentia: {
    name: "Diligentia",
    description: "Careful and persistent work",
    blessing: "Protects against Sloth"
  },
  contemplatio: {
    name: "Contemplatio",
    description: "Deep reflection on divine truths",
    blessing: "Protects against Distraction"
  },
  fortitudo: {
    name: "Fortitudo",
    description: "Courage in face of adversity",
    blessing: "Protects against Fear"
  },
  prudentia: {
    name: "Prudentia",
    description: "Wise judgment in all matters",
    blessing: "Protects against Folly"
  },
  sapientia: {
    name: "Sapientia",
    description: "The gift of divine wisdom",
    blessing: "Protects against Ignorance"
  },
  caritas: {
    name: "Caritas",
    description: "Love of God and neighbor",
    blessing: "Protects against Hatred"
  }
};

export const initialCharacter: CharacterData = {
  name: "Novitius",
  title: "Novitius Sapientiae",
  currentGrade: 1,
  totalPES: 0,
  streakDays: 0,
  skills: {
    philosophia: 1,
    theologia: 1,
    linguaeSacrae: 1,
    logica: 1,
    metaphysica: 1,
    synthesis: 1,
    spiritualitas: 1
  },
  virtues: {
    humilitas: 0,
    perseverantia: 0,
    diligentia: 0,
    contemplatio: 0,
    fortitudo: 0,
    prudentia: 0,
    sapientia: 0,
    caritas: 0
  }
};

// Os Sete Graus da Sabedoria
export const gradeSystem = {
  1: {
    name: "Novitius Sapientiae",
    title: "Novício da Sabedoria",
    pesRequired: 0,
    pesNext: 2500,
    symbol: "🕯️",
    virtueBonus: "humilitas",
    description: "Aprendendo os elementos básicos, desenvolvendo humildade intelectual"
  },
  2: {
    name: "Discipulus Fundamentorum", 
    title: "Discípulo dos Fundamentos",
    pesRequired: 2501,
    pesNext: 6000,
    symbol: "🏛️",
    virtueBonus: "perseverantia",
    description: "Demonstrou disciplina consistente, dominando fundamentos"
  },
  3: {
    name: "Studiosus Progressus",
    title: "Estudioso do Progresso", 
    pesRequired: 6001,
    pesNext: 11000,
    symbol: "⛰️",
    virtueBonus: "diligentia",
    description: "Escalando as Colinas do Desenvolvimento com competência sólida"
  },
  4: {
    name: "Contemplativus Veritatis",
    title: "Contemplativo da Verdade",
    pesRequired: 11001,
    pesNext: 17500,
    symbol: "👁️",
    virtueBonus: "contemplatio", 
    description: "Vê além da superfície, contempla verdades profundas"
  },
  5: {
    name: "Disputator Expertus",
    title: "Disputador Experiente",
    pesRequired: 17501,
    pesNext: 25500,
    symbol: "⚔️",
    virtueBonus: "fortitudo",
    description: "Mestre em argumentação, nas Montanhas do Aperfeiçoamento"
  },
  6: {
    name: "Synthesista Sapiens", 
    title: "Sintetizador Sábio",
    pesRequired: 25501,
    pesNext: 35000,
    symbol: "⭕",
    virtueBonus: "prudentia",
    description: "Integra conhecimentos, vê conexões profundas entre disciplinas"
  },
  7: {
    name: "Magister Sapientiae",
    title: "Mestre da Sabedoria", 
    pesRequired: 35001,
    pesNext: null,
    symbol: "👑",
    virtueBonus: "sapientia",
    description: "Alcançou os Picos da Sabedoria, pronto para ensinar outros"
  }
} as const;

// Sistema de atividades de estudo
export const studyActivities = {
  // Estudo Diário Consistente
  dailyStudyConsistent: {
    name: "Estudo Diário Consistente",
    pesGain: 10,
    skillBonus: "spiritualitas",
    skillPoints: 1,
    examples: ["Seguir cronograma estabelecido", "Manter rotina de estudos", "Disciplina diária"]
  },
  weeklyConsistencyBonus: {
    name: "Bônus Semanal de Consistência", 
    pesGain: 20,
    skillBonus: "spiritualitas",
    skillPoints: 2,
    examples: ["Estudar todos os dias da semana", "Manter constância"]
  },
  
  // Domínio de Conceitos
  conceptMasteryBasic: {
    name: "Domínio de Conceito Básico",
    pesGain: 25,
    skillBonus: "philosophia",
    skillPoints: 3,
    examples: ["Compreender conceito fundamental", "Exercícios de fixação"]
  },
  conceptMasteryIntermediate: {
    name: "Domínio de Conceito Intermediário", 
    pesGain: 50,
    skillBonus: "theologia",
    skillPoints: 4,
    examples: ["Conceitos teológicos complexos", "Avaliações intermediárias"]
  },
  conceptMasteryAdvanced: {
    name: "Domínio de Conceito Avançado",
    pesGain: 100,
    skillBonus: "metaphysica", 
    skillPoints: 6,
    examples: ["Questões metafísicas profundas", "Sínteses complexas"]
  },

  // PHILOSOPHIA - Filosofia
  philosophyReading: { 
    name: "Leitura Filosófica",
    pesGain: 15, 
    skillBonus: "philosophia", 
    skillPoints: 2,
    examples: ["Ler Summa Theologica", "Estudar Metafísica de Aristóteles", "Comentários de Tomás"]
  },
  philosophyEssay: { 
    name: "Ensaio Filosófico",
    pesGain: 40, 
    skillBonus: "philosophia", 
    skillPoints: 5,
    examples: ["Escrever sobre problema do mal", "Ensaio sobre livre arbítrio"]
  },
  
  // THEOLOGIA - Teologia
  scriptureStudy: { 
    name: "Estudo das Escrituras",
    pesGain: 20, 
    skillBonus: "theologia", 
    skillPoints: 3,
    examples: ["Leitura meditada da Bíblia", "Estudo de Evangelhos", "Epístolas Paulinas"]
  },
  dogmaStudy: { 
    name: "Estudo Dogmático",
    pesGain: 25, 
    skillBonus: "theologia", 
    skillPoints: 4,
    examples: ["Catecismo", "Documentos Conciliares", "Encíclicas Papais"]
  },
  patristicReading: { 
    name: "Leitura Patrística",
    pesGain: 30, 
    skillBonus: "theologia", 
    skillPoints: 4,
    examples: ["Confissões de Agostinho", "Homilias de Crisóstomo", "Cappadócios"]
  },
  
  // LINGUAE SACRAE - Línguas Sagradas
  latinStudy: { 
    name: "Estudo do Latim",
    pesGain: 18, 
    skillBonus: "linguaeSacrae", 
    skillPoints: 3,
    examples: ["Gramática latina", "Tradução de textos", "Vulgata"]
  },
  greekStudy: { 
    name: "Estudo do Grego",
    pesGain: 22, 
    skillBonus: "linguaeSacrae", 
    skillPoints: 4,
    examples: ["Koiné bíblico", "Novo Testamento grego", "Patrística grega"]
  },
  hebrewStudy: { 
    name: "Estudo do Hebraico",
    pesGain: 25, 
    skillBonus: "linguaeSacrae", 
    skillPoints: 4,
    examples: ["Hebraico bíblico", "Antigo Testamento", "Massorético"]
  },
  
  // LOGICA - Lógica
  logicExercises: { 
    name: "Exercícios de Lógica",
    pesGain: 12, 
    skillBonus: "logica", 
    skillPoints: 2,
    examples: ["Silogismos aristotélicos", "Quadrado lógico", "Falácias"]
  },
  disputatio: { 
    name: "Disputatio",
    pesGain: 50, 
    skillBonus: "logica", 
    skillPoints: 6,
    examples: ["Debate formal", "Questão disputada", "Argumentação estruturada"]
  },
  
  // METAPHYSICA - Metafísica
  metaphysicsReading: { 
    name: "Leitura Metafísica",
    pesGain: 28, 
    skillBonus: "metaphysica", 
    skillPoints: 4,
    examples: ["De Ente et Essentia", "Primeiros Princípios", "Ser e Essência"]
  },
  contemplation: { 
    name: "Contemplação",
    pesGain: 35, 
    skillBonus: "metaphysica", 
    skillPoints: 5,
    examples: ["Meditação sobre o Ser", "Contemplação das Causas", "União mística"]
  },
  
  // SYNTHESIS - Síntese
  weeklySynthesis: { 
    name: "Síntese Semanal",
    pesGain: 60, 
    skillBonus: "synthesis", 
    skillPoints: 7,
    examples: ["Síntese semanal interdisciplinar", "Conexões entre matérias"]
  },
  crossReferences: { 
    name: "Referências Cruzadas",
    pesGain: 25, 
    skillBonus: "synthesis", 
    skillPoints: 3,
    examples: ["Relacionar filosofia e teologia", "Integrar línguas e exegese"]
  },
  
  // SPIRITUALITAS - Espiritualidade
  prayer: { 
    name: "Oração Pessoal",
    pesGain: 15, 
    skillBonus: "spiritualitas", 
    skillPoints: 2,
    examples: ["Oração pessoal", "Lectio Divina", "Terço", "Liturgia das Horas"]
  },
  confession: { 
    name: "Sacramento da Reconciliação",
    pesGain: 40, 
    skillBonus: "spiritualitas", 
    skillPoints: 5,
    examples: ["Sacramento da Reconciliação", "Exame de consciência"]
  },
  mass: { 
    name: "Participação na Missa",
    pesGain: 50, 
    skillBonus: "spiritualitas", 
    skillPoints: 6,
    examples: ["Participação na Missa", "Comunhão Eucarística"]
  },
  spiritualReading: { 
    name: "Leitura Espiritual",
    pesGain: 20, 
    skillBonus: "spiritualitas", 
    skillPoints: 3,
    examples: ["Imitação de Cristo", "Místicos", "Vidas dos Santos"]
  },
  
  // Sínteses Semanais
  weeklySynthesisBasic: {
    name: "Síntese Semanal Básica",
    pesGain: 50,
    skillBonus: "synthesis",
    skillPoints: 5,
    examples: ["Integração disciplinar simples", "Conexões fundamentais"]
  },
  weeklySynthesisAdvanced: {
    name: "Síntese Semanal Avançada", 
    pesGain: 100,
    skillBonus: "synthesis",
    skillPoints: 8,
    examples: ["Integração interdisciplinar profunda", "Sínteses originais"]
  },
  weeklySynthesisMaster: {
    name: "Síntese Semanal Magistral",
    pesGain: 150,
    skillBonus: "synthesis", 
    skillPoints: 10,
    examples: ["Sínteses que revelam conexões inéditas", "Integração superior"]
  },
  
  // Participação em Disputationes
  disputatioParticipation: {
    name: "Participação em Disputatio",
    pesGain: 100,
    skillBonus: "logica",
    skillPoints: 6,
    examples: ["Debate intelectual ativo", "Argumentação construtiva"]
  },
  disputatioExcellence: {
    name: "Excelência em Disputatio",
    pesGain: 200, 
    skillBonus: "logica",
    skillPoints: 10,
    examples: ["Contribuição excepcional", "Liderança no debate"]
  },
  disputatioMastery: {
    name: "Maestria em Disputatio",
    pesGain: 300,
    skillBonus: "logica",
    skillPoints: 12,
    examples: ["Moderação de debates", "Síntese de posições complexas"]
  },
  
  // Crescimento Espiritual
  spiritualGrowthBasic: {
    name: "Crescimento Espiritual Básico",
    pesGain: 25,
    skillBonus: "spiritualitas",
    skillPoints: 3,
    examples: ["Progresso na oração", "Prática das virtudes"]
  },
  spiritualGrowthIntermediate: {
    name: "Crescimento Espiritual Intermediário",
    pesGain: 50,
    skillBonus: "spiritualitas", 
    skillPoints: 5,
    examples: ["Aprofundamento contemplativo", "Testemunho de vida"]
  },
  spiritualGrowthAdvanced: {
    name: "Crescimento Espiritual Avançado",
    pesGain: 75,
    skillBonus: "spiritualitas",
    skillPoints: 7,
    examples: ["União mística", "Santidade heroica"]
  },
  
  // Contribuições Originais
  originalInsightMinor: {
    name: "Insight Original Menor",
    pesGain: 200,
    skillBonus: "synthesis",
    skillPoints: 8,
    examples: ["Nova perspectiva sobre tópico", "Conexão inédita"]
  },
  originalInsightMajor: {
    name: "Insight Original Maior", 
    pesGain: 350,
    skillBonus: "synthesis",
    skillPoints: 12,
    examples: ["Contribuição significativa", "Avanço na compreensão"]
  },
  originalInsightMaster: {
    name: "Insight Original Magistral",
    pesGain: 500,
    skillBonus: "synthesis",
    skillPoints: 15,
    examples: ["Descoberta revolucionária", "Nova síntese paradigmática"]
  },
  
  // Serviço à Comunidade
  communityServiceBasic: {
    name: "Serviço Comunitário Básico",
    pesGain: 30,
    skillBonus: "spiritualitas",
    skillPoints: 3,
    examples: ["Ajudar colegas", "Participação em discussões"]
  },
  communityServiceIntermediate: {
    name: "Serviço Comunitário Intermediário",
    pesGain: 60,
    skillBonus: "spiritualitas",
    skillPoints: 5,
    examples: ["Liderança em projetos", "Mentoria de iniciantes"]
  },
  communityServiceAdvanced: {
    name: "Serviço Comunitário Avançado", 
    pesGain: 100,
    skillBonus: "spiritualitas",
    skillPoints: 8,
    examples: ["Organização de eventos", "Coordenação comunitária"]
  }
} as const;

// Bônus por consistência
export const consistencyBonus = {
  3: { pesMultiplier: 1.1, message: "Disciplina nascente!" },
  7: { pesMultiplier: 1.2, message: "Semana perfeita!" },
  14: { pesMultiplier: 1.3, message: "Perseverança admirável!" },
  30: { pesMultiplier: 1.5, message: "Um mês de dedicação!" },
  60: { pesMultiplier: 1.7, message: "Constância heroica!" },
  100: { pesMultiplier: 2.0, message: "Cem dias de sabedoria!" }
} as const;