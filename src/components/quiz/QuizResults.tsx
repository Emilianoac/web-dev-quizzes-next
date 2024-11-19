
import { Quiz, Technology, Area, Answer, Question } from "@prisma/client";
import Image from "next/image";
import ButtonAddToFavorite from "./ButtonAddToFavorite";


interface QuizResultsProps {
  history: string[];
  quiz: Quiz & {
    technology: Technology & {
      area: Area;
    };
    questions: (Question & {
      answers: Answer[];
    })[];
  };
  isFavorite: boolean;
}


export default function QuizResults({ history,  quiz, isFavorite }: QuizResultsProps) {

  const setResults = () => {
    return history.map((answer) => {
      const [questionId, answerId] = answer.split(":");
      const question = quiz.questions.find((q) => q.id === questionId);
  
      if (!question) {
        throw new Error(`Pregunta con ID ${questionId} no encontrada`);
      }
  
      return {
        question: question.questionText,
        id: question.id,
        answers: question.answers,
        userAnswer: answerId,
        codeExample: question.codeExample,
        answerExplain: question.answerExplain,
      };
    });
  };
  
  let results;
  try {
    results = setResults();
  } catch (error) {
    console.error(error);
    results = null;
  }
  
  if (!results) return <div>Algún error ha ocurrido</div>;
  
  const correctAnswers = results.reduce((count, question) => {
    return count + (question.answers.some((answer) => answer.id === question.userAnswer && answer.isCorrect) ? 1 : 0);
  }, 0);
  
  return (
   <div>

      {/* Header Resultados */}
      <div className="bg-secondary-700 p-5 md:p-10 text-center rounded-md text-white relative">
        <ButtonAddToFavorite isFavorite={isFavorite} quizId={quiz.id} className="absolute right-3 top-3 text-xl p-2" />
        <p className="font-semibold text-base md:text-xl">Resultados Quiz</p>
        <h4 className="text-xl md:text-3xl font-bold">{quiz.title}</h4>
        <div className="bg-slate-100 w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full mx-auto flex justify-center items-center mt-4 relative">
          <Image 
            src={quiz.technology.icon} 
            alt={quiz.technology.area.name} 
            className=" w-11 md:w-16 mx" 
            width={64}
            height={64}
          />
        </div>
        {/* Preguntas Correctas */}
        <p className="font-bold mt-4">Preguntas Correctas</p>
        <p className="font-bold text-xl"> {correctAnswers} de {quiz.questions.length}  </p>
      </div>

      {/* Listado de Preguntas */}
     <ul className="mt-10 bg-white dark:bg-blue-gray p-4 md:p-10 rounded-md">
        {results && results.map((question, i) => (
          <li key={question.id} className="mb-[4em]">
            {/* Pregunta */}
            <span className="text-base md:text-[1.3em] font-bold">{i + 1}. {question.question}</span>

            {/* Respuestas */}
            <ul className="mt-4">
              { question.answers && question.answers.map((answer) => (
                <li 
                  className={`
                    ${answer.isCorrect && "!border-green-500"} 
                    ${question.userAnswer === answer.id && !answer.isCorrect && "!border-red-500"}
                    border border-slate-200 
                    dark:border-slate-700 p-2 mb-2 rounded-md  
                    flex flex-col
                    text-sm md:text-base
                    `
                  }
                  key={answer.id}>
                    {answer.answerText} 
                    {question.userAnswer === answer.id && 
                      <span className={`
                        font-bold text-sm mt-2 
                        ${answer.isCorrect ? "text-green-500" : "text-red-500"}` 
                        }>
                        Tu respuesta
                      </span>
                    }
                    {question.userAnswer != answer.id && answer.isCorrect && 
                      <span className="text-green-500 font-bold text-sm mt-2">Respuesta Correcta</span>
                    }
                </li>
              ))}
            </ul>

            {/* Explicación */}
            <div>
              <p className="mt-6 mb-2 font-bold">Explicación</p>
              <p className="text-sm mb-4 bg-slate-100 dark:bg-slate-700 p-4 rounded-md">
                {question.answerExplain}
              </p>
            </div>

            {/* Código de Ejemplo */}
            {question.codeExample && 
              <pre className="bg-slate-900 p-4 rounded-md font-mono text-white overflow-x-auto text-sm">
                <code>{question.codeExample}</code>
              </pre>}
          </li>
        ))}
     </ul>
   </div>
  )
}
