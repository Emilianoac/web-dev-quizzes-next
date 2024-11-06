"use client";


import Image from "next/image";
import { useState, useEffect } from "react";
import AppButton from "@/components/AppButton";
import { Quiz, Technology, Question, Answer } from "@prisma/client";
import styles from "./QuizOngoing.module.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FaTimes } from "react-icons/fa";


type QuestionsProps = (Question & {answers: Answer[]})[];

interface QuizOnGoingProps {
  quiz: Quiz & {
    technology: Technology;
    questions: QuestionsProps
  }
  setFinish: (value: {
    status: boolean;
    history: string[];
  }) => void;
}

interface CorrrectAnswerExplanationModalProps {
  closeModal: () => void;
  question: Question & {
    answers: Answer[];
  }
}

export default function QuizOnGoing({ quiz, setFinish }: QuizOnGoingProps) {

  const [questions, setQuestions] = useState<QuestionsProps>(quiz.questions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [checkAnswer, setCheckAnswer] = useState<boolean>(false);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  function handleCheckAnwer() {
    if (selectedAnswer === null) return;

    scrollToTop();
    setCheckAnswer(true);

    questions[currentQuestion].answers.map((answer) => {
      if (selectedAnswer === answer.id) {
        const questionId = questions[currentQuestion].id;
        setHistory([...history, `${questionId}:${answer.id}` ]);
        setIsCorrect(answer.isCorrect);
      };
    })
  }

  function handleNextQuestion() {
    setCheckAnswer(false);

    if (currentQuestion  === questions.length - 1) {
      setProgressPercentage(100);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }

    setSelectedAnswer(null);
  }

  function finishQuiz() {
    setFinish({
      status: true,
      history: history
    });
  }

  function scrollToTop() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer?.scrollIntoView({block: "start", behavior: "smooth"});
  }


  useEffect(() => {
    // Solo ordenar una vez al montar el componente
    setQuestions(prevQuestions => 
      [...prevQuestions].sort(() => Math.random() - 0.5)
    );
  }, [])

  useEffect(() => {
    setProgressPercentage(currentQuestion / questions.length  * 100)
  }, [currentQuestion, questions.length])

  return (
    <>
      {/* Feedback */ }
      <div className="h-[40px] relative mt-5">
        { ( checkAnswer &&
          <p 
            className="text-center font-semibold left-[50%] translate-x-[-50%] top-0 absolute">
              {isCorrect ? "¡Correcto! 😃" : "Incorrecto 😔"}
          </p>
        )}
      </div>
      <div className="rounded-md w-full shadow-md bg-white dark:bg-blue-gray">
        <div 
          className="
            p-6 pb-0 
            max-h-[65vh] 
            min-h-[65vh]
            md:min-h-max
            md:max-h-none 
            overflow-auto
          ">
          <div id="quiz-container">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="bg-slate-100 p-1 h-[40px] w-[40px] rounded-full flex items-center justify-center">
                <Image
                  src={quiz?.technology.icon}
                  width={25}
                  height={25}
                  alt={quiz?.technology.name}
                  className="w-[25px] h-[25px] object-scale-down"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="me-2">Pregunta</span>
                <span>
                  {currentQuestion + 1} de {questions.length}
                </span>
              </div>
            </div>

            {/* Barra de progreso */}
            <div className="w-full bg-slate-100 h-2 mb-4 rounded-md">
              <div
                className="h-2 bg-secondary-500 rounded-md transition-all duration-300"
                style={{
                  width: `${progressPercentage}%`,
                }}
              />
            </div>

            {/* Pregunta */}
            <h4 className="font-semibold  md:text-2xl my-5">
              <strong className="me-1"> {currentQuestion + 1}. </strong>
              {questions[currentQuestion].questionText}
            </h4>

            {/* Opciones */}
            <ul>
              {questions[currentQuestion].answers.map((answer, index) => (
                <li
                  key={index}
                  className={`
                    ${styles['quiz-option']}
                    ${selectedAnswer && checkAnswer && answer.isCorrect && styles['correct-option']}
                    ${selectedAnswer && checkAnswer && !answer.isCorrect && styles['wrong-option'] }
                    ${selectedAnswer === answer.id ? styles['selected-option'] : ""}
                  `}>
                    
                      <input
                        type="radio"
                        disabled={checkAnswer}
                        className={`
                          ${styles['quiz-option-input']} 
                          peer disabled:cursor-not-allowed 
                          disabled:opacity-65
                          disabled:peer-checked:bg-secondary-500
                        `}
                        name="answer"
                        id={`answer-${index}`}
                        checked={selectedAnswer === answer.id}
                        onChange={() => setSelectedAnswer(answer.id)}
                      />
                      <label
                        className={`
                          ${styles['quiz-option-label']} 
                          peer-disabled:cursor-not-allowed
                          peer-disabled:opacity-65
                        `}
                        htmlFor={`answer-${index}`}
                      >
                        <span className="block">
                          {answer.answerText}
                        </span>
                        { checkAnswer &&
                          <span className="mt-4 md:mt-0 font-bold block text-end text-sm">
                          {selectedAnswer === answer.id &&  "Tu respuesta"}
                          {answer.isCorrect && selectedAnswer !== answer.id && "Respuesta correcta"}
                          </span>
                        }
                      </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Siguiente pregunta */}
        <div className={styles["quiz-controls"]}>
          {
            checkAnswer &&
          <AppButton
            onClick={() => setShowExplanation(true)}
            className="
              text-sm md:text-base 
              bg-slate-200 !text-gray-900
              hover:bg-slate-100"
            >
            Ver detalles
          </AppButton>
          }
          { currentQuestion  !== questions.length - 1 ?
            <AppButton
              disabled={selectedAnswer === null || progressPercentage === 100}
              className="text-sm md:text-base"
              onClick={() => !checkAnswer ? handleCheckAnwer() : handleNextQuestion()}
            >
              {checkAnswer ? "Siguiente Pregunta" : "Verificar"}
              {checkAnswer && progressPercentage === 100 && "Finalizar"}
            </AppButton>:
            <AppButton
              className="text-sm md:text-base"
              onClick={() => !checkAnswer ? handleCheckAnwer() : finishQuiz()}
            >
              {checkAnswer ? "Finalizar Quiz" : "Verificar"}
            </AppButton>
          }
        </div>
      </div>

      {showExplanation && 
        <CorrrectAnswerExplanationModal 
          question={questions[currentQuestion]}  
          closeModal={() => setShowExplanation(false)}
        />
      }
    </>
  );
}

export function CorrrectAnswerExplanationModal({ question, closeModal } : CorrrectAnswerExplanationModalProps) {

  function copyToClipboard() {
    if (!navigator.clipboard || !question.codeExample) return;
    navigator.clipboard.writeText(question.codeExample);

    const copyButton = document.getElementById("copy-button");
    if (!copyButton) return;
    copyButton.innerText = "¡Copiado!";

    setTimeout(() => {
      copyButton.innerText = "Copiar";
    }, 900) 
  }

  return (
    <div 
      onClick={ () => closeModal() }
      className="absolute  w-full top-0 left-0 h-full bg-black/60 backdrop-blur-[14px] shadow-md z-[9999]">
      <div className=" 
        max-w-[700px] w-[90%]
        absolute top-[50%] left-[50%] translate-y-[-50%]  translate-x-[-50%]
        shadow-xl rounded-lg
        bg-white dark:bg-blue-gray p-4 md:p-6"
        onClick={ (e) => e.stopPropagation() }
        >
        <div className="flex justify-between items-center border-b dark:border-b-gray-800 border-slate-300 pb-3">
          <h4 className="font-bold text-xl md:text-2xl ">Detalles</h4>
          <button  onClick={ () => closeModal() } title="Cerrar modal" className="text-lg text-gray-900 dark:text-gray-50">
            <FaTimes/>
          </button>
        </div>

        <div className="mt-4">
          {/* Pregunta */}
          <div className="mb-4">
            <strong>Pregunta</strong>
            <p className="text-sm">{question.questionText}</p>
          </div>

          {/* Respuesta correcta */}
          <div className="flex flex-col mb-4">
            <strong>Respuesta correcta</strong>
            <span className="text-sm">{question.answers.find(answer => answer.isCorrect)?.answerText}</span>
          </div>

          {/* Explicación */}
          <p className="bg-slate-200 dark:bg-slate-800 px-3 py-2 rounded-md "> {question.answerExplain} </p>

          {/* Código de ejemplo */}
          { question.codeExample &&
          <div className="overflow-hidden rounded-md mt-5 text-sm">
            <div className="flex justify-between items-center dark:bg-slate-900  bg-slate-100 py-2 px-4">
              <h5 className="font-semibold">Código de ejemplo</h5>
              <button 
                id="copy-button"
                onClick={copyToClipboard}
                className="text-gray-900 dark:text-gray-50 p-1 rounded-md hover:opacity-40 ">
                Copiar
              </button>
            </div>
            <SyntaxHighlighter 
              customStyle={{padding: "1rem"}}
              lineNumberContainerStyle={{padding: "1rem"}}
              language="javascript"
              style={anOldHope}>
                {question.codeExample}
            </SyntaxHighlighter>
          </div>
          }
        </div>
      </div>
    </div>
  )
} 