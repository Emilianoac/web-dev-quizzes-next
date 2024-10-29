import { Answer, Question } from "@/types/quiz";



const generateEmptyQuestion = (index: number, answersCount: number): Question => ({
  id: `new-question-${index + 1}`,
  questionText: "",
  answers: Array.from(
    { length: answersCount }, 
    (_, anserIndex) => ({
      id: `new-answer-${index + 1}-${anserIndex + 1}`,
      answerText: "",
      isCorrect: false
    })
  ) as Answer[],
  codeExample: "",
  answerExplain: ""
});

export function useQuiz() {

  function createInitialQuestions(initialQuestionCount = 10, answersPerQuestion = 4): Question[] {
    return Array.from(
      { length: initialQuestionCount }, 
      (_, index) => generateEmptyQuestion(index, answersPerQuestion)
    )
  }

  function setCorrectAnswer(question: Question, answerId: string) {
    question.answers.forEach(answer => {
      answer.isCorrect = answer.id === answerId;
    });
  }

  return {
    createInitialQuestions,
    setCorrectAnswer
  };
}
