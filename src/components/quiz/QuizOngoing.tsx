"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AppButton from "@/components/AppButton";
import { Quiz, Technology, Question, Answer } from "@prisma/client";
import styles from "./QuizOngoing.module.css";

interface QuizOnGoingProps {
  quiz: Quiz & {
    technology: Technology;
    questions: (Question & {
      answers: Answer[];
    })[];
  }
  setFinish: (value: {
    status: boolean;
    history: string[];
  }) => void;

}

export default function QuizOnGoing({ quiz, setFinish }: QuizOnGoingProps) {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [checkAnswer, setCheckAnswer] = useState<boolean>(false);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  function handleNextQuestion() {
    if (selectedAnswer === null) return;

    scrollToTop();
    setCheckAnswer(true);

    quiz.questions[currentQuestion].answers.map((answer) => {
      if (selectedAnswer === answer.id) {
        const questionId = quiz.questions[currentQuestion].id;
        setHistory([...history, `${questionId}:${answer.id}` ]);
        setIsCorrect(answer.isCorrect);
      };
    })

    if (currentQuestion  === quiz.questions.length - 1) {
      setProgressPercentage(100);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }

    setSelectedAnswer(null);
    setTimeout(() => {
      setCheckAnswer(false);
    }, 1200)
  }

  function scrollToTop() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer?.scrollIntoView({block: "start", behavior: "smooth"});
  }

  useEffect(() => {
    setProgressPercentage(currentQuestion / quiz.questions.length  * 100)
  }, [currentQuestion, quiz.questions.length])

  useEffect(() => {
    if (progressPercentage === 100) {
      setFinish({
        status: true,
        history: history
      });
    } 
  }, [history, progressPercentage, setFinish])

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
            max-h-[70vh] 
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
                  {currentQuestion + 1} de {quiz.questions.length}
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
              {quiz.questions[currentQuestion].questionText}
            </h4>

            {/* Opciones */}
            <ul>
              {quiz.questions[currentQuestion].answers.map((answer, index) => (
                <li
                  key={index}
                  className={`
                    ${styles['quiz-option']}
                    ${selectedAnswer === answer.id ? styles['selected-option'] : ""}
                  `}>
                      <input
                        type="radio"
                        className={`${styles['quiz-option-input']} peer`}
                        name="answer"
                        id={`answer-${index}`}
                        checked={selectedAnswer === answer.id}
                        onChange={() => setSelectedAnswer(answer.id)}
                      />
                      <label
                        className={`${styles['quiz-option-label']} peer-checked:text-secondary-600`}
                        htmlFor={`answer-${index}`}
                      >
                        {answer.answerText}
                      </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Siguiente pregunta */}
        <div className={styles["quiz-controls"]}>
          <AppButton
            disabled={selectedAnswer === null || progressPercentage === 100}
            className="text-sm md:text-base"
            onClick={() => handleNextQuestion()}
          >
            Siguiente pregunta
          </AppButton>
            
        </div>
      </div>
    </>
  );
}
