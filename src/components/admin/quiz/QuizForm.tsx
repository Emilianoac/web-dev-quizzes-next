"use client";

import { useState } from "react";
import { useQuiz } from "@/hooks/useQuizForm";
import { addQuiz } from "@/lib/actions/quizActions";
import AppButton from "@/components/AppButton";
import { type Technology } from "@prisma/client";

interface QuizFormProps {
  technologies: Technology[];
}

export default function QuizForm({ technologies }: QuizFormProps) {

  const { createInitialQuestions, setCorrectAnswer } = useQuiz();

  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    technologyId: undefined as undefined | string,
    questions: createInitialQuestions(2, 4)
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", quiz.title);
    formData.append("description", quiz.description);
    formData.append("technologyId", quiz.technologyId as string);
    formData.append("questions", JSON.stringify(quiz.questions));

    try {
      await addQuiz(formData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="mt-4">
      {/*  Nombre */ }
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-bold mb-2">
          Titulo
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="p-2"
          defaultValue={quiz.title}
          onChange={(e) => quiz.title = e.target.value}
        />
      </div>

      {/* Descripción */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-bold mb-2">
          Descripción
        </label>
        <textarea
          name="description"
          id="description"
          className="p-2"
          defaultValue={quiz.description}
          onChange={(e) => {
            setQuiz((prev) => ({ ...prev, title: e.target.value }));
          }}
        ></textarea>
      </div>

      {/* Categoria */}
      <div className="mb-4">
        <label htmlFor="technology" className="block text-sm font-bold mb-2">Tecnología</label>
        <select
          name="technology"
          id="technology"
          className="p-2"
          defaultValue={quiz.technologyId}
          onChange={(e) => {
            setQuiz((prev) => ({ ...prev, technologyId: e.target.value }));
          }}
        >
          <option disabled> Selecciona una tecnología</option>
          {technologies.map((tech) => (
            <option key={tech.id} value={tech.id}>
              {tech.name}
            </option>
          ))}
        </select>
      </div>

      <hr className="my-8 dark:border-slate-700"/>

      {/* Preguntas */}
      <div className="mb-4">
        {quiz.questions.map((question, index) => (
          <details className="border-b border-b-slate-400 dark:border-slate-700 mb-4 last-of-type:border-none"  key={question.id} >
          <summary className="text-xl font-bold mb-4 cursor-pointer">Pregunta {index + 1}</summary>
          <div className="mb-4">
            <input
              type="text"
              name={`question-${index}`}
              id={`question-${index}`}
              className="p-2"
              defaultValue={question.questionText}
              onChange={(e) => {
                const newQuestions = [...quiz.questions];
                newQuestions[index].questionText = e.target.value;
                setQuiz({ ...quiz, questions: newQuestions });
              }}
            />

            {/* Respuestas */}
            <div className="mt-6">
              {question.answers.map((answer, answerIndex) => (
                <div key={answer.id} className="flex items-center mb-4">
                  <input
                    type="radio"
                    name={`correct-answer-${question.id}`}
                    id={`correct-${answer.id}`}
                    className="me-2"
                    defaultChecked={answer.isCorrect}
                    onChange={() => {
                      setCorrectAnswer(question, answer.id);
                    }}
                  />
                  <input
                    type="text"
                    name={`questions-${question.id}`}
                    id={`${answer.id}`}
                    className="w-full p-2 border border-slate-400 rounded-md text-black"
                    defaultValue={answer.answerText}
                    onChange={(e) => {
                      const newAnswers = [...question.answers];
                      newAnswers[answerIndex].answerText = e.target.value;
                      setQuiz((prev) => {
                        const newQuestions = [...prev.questions];
                        newQuestions[index].answers = newAnswers;
                        return { ...prev, questions: newQuestions };
                      });
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Explicación de la respuesta correcta */}
            <div className="mt-8">
              <div>
                <label 
                  htmlFor="explanation"
                  className="block text-sm font-bold mb-2">
                  Explicación de la respuesta correcta
                </label>
                <textarea
                  defaultValue={question.answerExplain}
                  onChange={(e) => question.answerExplain = e.target.value}
                ></textarea>
              </div>
              <div className="mt-5">
                <label 
                  htmlFor="code-example"
                  className="block text-sm font-bold mb-2">
                  Ejemplo de código
                </label>
                <textarea 
                  rows={5} 
                  onChange={(e) => question.codeExample = e.target.value}
                  defaultValue={question.codeExample}>
                </textarea>    
              </div>
            </div>
          </div>
        </details>     
        ))}
      </div>

      <div className="flex justify-end">
        <AppButton
          text="Crear Quiz"
          buttonType="button"
        />
      </div>
    </form>
  )
}
