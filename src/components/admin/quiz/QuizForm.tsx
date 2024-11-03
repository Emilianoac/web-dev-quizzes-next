"use client";

import { useState } from "react";
import { useQuiz } from "@/hooks/useQuizForm";
import { addQuiz, updateQuiz} from "@/lib/actions/quizActions";
import { useRouter } from "next/navigation";
import AppButton from "@/components/AppButton";
import AppLinkButton from "@/components/AppLinkButton";
import AppLoader from "@/components/AppLoader";
import { type Technology, Quiz, Question, Answer} from "@prisma/client";

interface QuizFormProps {
  technologies: Technology[];
  quizData?: Quiz &{
    technology: Technology;
    questions: (Question & {
      answers: Answer[];
    })[];
  }
}

export default function QuizForm({ technologies, quizData }: QuizFormProps) {

  const router = useRouter();

  const { createInitialQuestions, setCorrectAnswer } = useQuiz();
  const [isLoading, setIsLoading] = useState(false);

  const [quiz, setQuiz] = useState({
    isPublic: quizData?.isPublic ? true : false,
    title: quizData?.title || "",
    description: quizData?.description || "",
    level: quizData?.level || "",
    technologyId: quizData?.technologyId || "",
    questions: createInitialQuestions(quizData?.questions.length ?? 5, 4, quizData?.questions)
  });

  function setNumberOfQuestions(num: number) {
    setQuiz((prev) => ({
      ...prev,
      questions: createInitialQuestions(num, 4)
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", quiz.title);
    formData.append("isPublic", String(quiz.isPublic));
    formData.append("description", quiz.description);
    formData.append("technologyId", quiz.technologyId as string);
    formData.append("questions", JSON.stringify(quiz.questions));
    formData.append("level", quiz.level);

    try {
      setIsLoading(true);

      if (quizData) {
        formData.append("id", quizData.id);
        await updateQuiz(formData);
      } else {
        await addQuiz(formData);  
      }
      router.push("/admin/quizzes");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  return (
    <>
      <AppLoader isLoading={isLoading} />
      <form onSubmit={(e) => handleSubmit(e)} className="mt-4">
        {/*  Es público */ }
        <div className="flex mb-4 items-center justify-end gap-2">
          <label htmlFor="isPublic" className="block text-sm font-bold">
            Es público
          </label>
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            defaultChecked={quiz.isPublic}
            onChange={(e) => quiz.isPublic = e.target.checked}
          />
        </div>

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

        {/* Nivel */ }
        <div className="mb-4">
          <label htmlFor="level" className="block text-sm font-bold mb-2">
            Nivel
          </label>
          <select
            name="level"
            id="level"
            className="p-2"
            defaultValue={quiz.level}
            onChange={(e) => quiz.level = e.target.value}
          >
            <option value="basico">Básico</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
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
              setQuiz((prev) => ({ ...prev, description: e.target.value }));
            }}
          ></textarea>
        </div>

        {/* Categoria */}
        <div className="mb-4">
          <label htmlFor="technology" className="block text-sm font-bold mb-2">Tecnología</label>
          <select
            name="technology"
            id="technology"
            className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quizData ? true : false}
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
        <div className="mb-4 flex flex-col items-end">
          <label htmlFor="num-questions" className="block text-sm font-bold mb-2">Cantidad de preguntas</label>
          <select
            name="num-questions"
            id="num-questions"
            disabled={quizData ? true : false}
            className="p-2 w-min disabled:opacity-50 disabled:cursor-not-allowed"
            onChange={(e) => setNumberOfQuestions(+e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>

        <div className="mb-4">
          {quiz.questions.map((question, index) => (
            <details 
              className="border-b border-b-slate-400 dark:border-slate-700 mb-4 last-of-type:border-none"  
              key={question.id} >
            <summary className="text-[1.1em] font-bold mb-4 cursor-pointer">Pregunta {index + 1}</summary>
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

        <div className="flex justify-end gap-3">
          <AppLinkButton 
            href="/admin/quizzes" 
            className="bg-slate-500 hover:bg-slate-700 text-sm md:text-base">
            Cancelar
          </AppLinkButton>
          <AppButton 
            className="text-sm md:text-base"
            type="submit">
            {quizData ? "Editar Quiz" : "Crear Quiz"}
          </AppButton>
        </div>
      </form>
    </>
  )
}
