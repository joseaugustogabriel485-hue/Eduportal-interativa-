import { Calculator, Atom, Beaker, Landmark, Microscope } from 'lucide-react';

export type SubjectId = 'matematica' | 'fisica' | 'quimica' | 'historia' | 'biologia';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'Fundamental' | 'Médio';
  content: string;
}

export interface Subject {
  id: SubjectId;
  name: string;
  icon: any;
  color: string;
  description: string;
}

export const SUBJECTS: Subject[] = [
  {
    id: 'matematica',
    name: 'Matemática',
    icon: Calculator,
    color: 'bg-blue-500',
    description: 'De números básicos à aritmética complexa.',
  },
  {
    id: 'fisica',
    name: 'Física',
    icon: Atom,
    color: 'bg-purple-500',
    description: 'Entenda as leis que governam o universo.',
  },
  {
    id: 'quimica',
    name: 'Química',
    icon: Beaker,
    color: 'bg-emerald-500',
    description: 'Explore a matéria e suas transformações.',
  },
  {
    id: 'historia',
    name: 'História',
    icon: Landmark,
    color: 'bg-amber-500',
    description: 'A jornada da humanidade através do tempo.',
  },
  {
    id: 'biologia',
    name: 'Biologia',
    icon: Microscope,
    color: 'bg-rose-500',
    description: 'O estudo da vida em todas as suas formas.',
  },
];

export const LESSONS: Record<SubjectId, Lesson[]> = {
  matematica: [
    {
      id: 'mat-1',
      title: 'Frações e Decimais',
      level: 'Fundamental',
      description: 'Aprenda a dividir o todo em partes.',
      content: '# Frações e Decimais\n\nUma fração representa uma parte de um todo. Dividir uma pizza em 8 pedaços e comer 3 significa que você comeu 3/8 da pizza.\n\n## Noções Básicas\n- **Numerador**: O número de cima (quantas partes temos).\n- **Denominador**: O número de baixo (em quantas partes o todo foi dividido).\n\n### Exemplos Reais\n1. Meio quilo de arroz: 0,5kg ou 1/2kg.\n2. Um quarto de hora: 15 minutos ou 1/4h.',
    },
    {
      id: 'mat-2',
      title: 'Equações do 2º Grau',
      level: 'Médio',
      description: 'Resolvendo a famosa fórmula de Bhaskara.',
      content: '# Equações do 2º Grau\n\nUma equação do segundo grau é da forma **ax² + bx + c = 0**. Onde a, b e c são coeficientes reais e a ≠ 0.\n\n## A Fórmula de Bhaskara\nPara encontrar as raízes, usamos:\n\n`x = (-b ± √Δ) / 2a`\n\nOnde **Δ = b² - 4ac**.\n\n### Tipos de Raízes\n- Se Δ > 0: duas raízes reais distintas.\n- Se Δ = 0: uma única raiz real.\n- Se Δ < 0: não existem raízes reais.',
    },
    {
      id: 'mat-3',
      title: 'Geometria Espacial',
      level: 'Médio',
      description: 'Volumes e áreas de sólidos no espaço.',
      content: '# Geometria Espacial\n\nEstudo dos sólidos que possuem três dimensões: comprimento, largura e altura.\n\n## Principais Sólidos\n1. **Cubo**: V = a³\n2. **Esfera**: V = (4/3)πr³\n3. **Cilindro**: V = πr²h',
    }
  ],
  fisica: [
    {
      id: 'fis-1',
      title: 'Leis de Newton',
      level: 'Fundamental',
      description: 'Inércia, Dinâmica e Ação e Reação.',
      content: '# Leis de Newton\n\nIsaac Newton revolucionou a forma como entendemos o movimento...',
    },
    {
      id: 'fis-2',
      title: 'Termodinâmica',
      level: 'Médio',
      description: 'Calor, temperatura e energia.',
      content: '# Termodinâmica\n\nO estudo de como o calor se transforma em trabalho...',
    },
  ],
  quimica: [
    {
      id: 'qui-1',
      title: 'Estados da Matéria',
      level: 'Fundamental',
      description: 'Sólido, líquido e gasoso.',
      content: '# Estados da Matéria\n\nA matéria pode se apresentar em diferentes fases...',
    },
    {
      id: 'qui-2',
      title: 'Tabela Periódica',
      level: 'Médio',
      description: 'Como os elementos são organizados.',
      content: '# Tabela Periódica\n\nOs elementos químicos são organizados por número atômico...',
    },
  ],
  historia: [
    {
      id: 'his-1',
      title: 'Brasil Colônia',
      level: 'Fundamental',
      description: 'O início do período colonial português.',
      content: '# Brasil Colônia\n\nA chegada dos portugueses e a extração do pau-brasil...',
    },
    {
      id: 'his-2',
      title: 'Revolução Industrial',
      level: 'Médio',
      description: 'As mudanças tecnológicas e sociais do século XVIII.',
      content: '# Revolução Industrial\n\nO surgimento das máquinas e o fim do artesanato...',
    },
  ],
  biologia: [
    {
      id: 'bio-1',
      title: 'Reino Plantae',
      level: 'Fundamental',
      description: 'A base da vida na Terra.',
      content: '# Reino Plantae\n\nAs plantas são seres autótrofos que fazem fotossíntese...',
    },
    {
      id: 'bio-2',
      title: 'Genética e DNA',
      level: 'Médio',
      description: 'A hereditariedade e o código da vida.',
      content: '# Genética e DNA\n\nMendel e as leis da hereditariedade...',
    },
  ],
};
