export interface Quiz {
  slug: string;
  title: string;
  description: string;
  technology : Technology;
  questions: Question[];
}

export interface Question {
  id?: string;
  questionText: string;
  answers: Answer[];
  codeExample: string;
  codeLanguage: string;
  answerExplain: string;
}

export interface Answer {
  questionId?: string;
  id: string;
  answerText: string;
  isCorrect: boolean;
}

export interface Technology {
  id: string;
  name: string;
  icon: string;
  area: Area;
}

export interface Area {
  id: string;
  name: string;
}


