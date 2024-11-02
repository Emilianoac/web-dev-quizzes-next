import { Answer, Question } from "@/types/quiz";
import { Question as StoredQuestion, Answer as StoredAnswer } from "@prisma/client";

type StoredData = QuestionData[];


interface QuestionData extends StoredQuestion {
  answers: StoredAnswer[]; // Mover las respuestas aquí
}

const generateEmptyQuestion = (
  index: number, 
  answersCount: number, 
  questionData?:QuestionData )
  : Question => ({
  id: questionData?.id || `new-question-${index + 1}`,
  questionText: questionData?.questionText || "",
  answers: Array.from(
    { length: answersCount }, 
    (_, anserIndex) => ({
      id: questionData?.answers[anserIndex].id || `new-answer-${index + 1}-${anserIndex + 1}`,
      answerText: questionData?.answers[anserIndex].answerText || "",
      isCorrect: questionData?.answers[anserIndex].isCorrect || false
    })
  ) as Answer[],
  codeExample: questionData?.codeExample || "",
  answerExplain: questionData?.answerExplain || ""
});

export function useQuiz() {

  function createInitialQuestions(
    initialQuestionCount = 10, answersPerQuestion = 4, storedData?: StoredData)
    : Question[] {

    if (storedData) {
      return Array.from(
        { length: initialQuestionCount }, 
        (_, index) => generateEmptyQuestion(index, answersPerQuestion, storedData[index])
      )
    }

    return Array.from({ length: initialQuestionCount }, (_, index) => generateEmptyQuestion(index, answersPerQuestion)
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
