"use client";


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizInit from "./QuizInit";
import QuizOnGoing from "./QuizOngoing";
import QuizResults from "./QuizResults";
import type { Quiz, Technology, Question, Answer, Area} from "@prisma/client";

interface QuizMainProps {
  isFavorite: boolean;
  quiz: Quiz & {
    technology: Technology & {
      area: Area;
    };
    questions: (Question & {
      answers: Answer[];
    })[];
  };
}

export default function QuizMain({ quiz, isFavorite }: QuizMainProps) {
  const [start, setStart] = useState({
    status: false,
    config: {
      hideOptions: false
    }
  });
  const [finish, setFinish] = useState({
    status: false,
    history: [] as string[],
  });

  const renderQuizContent = () => {
    if (!start.status) {
      return <QuizInit isFavorite={isFavorite} quiz={quiz} setStart={setStart} />;
    }
    if (finish.status) {
      return <QuizResults isFavorite={isFavorite} history={finish.history} quiz={quiz} />;
    }
    return <QuizOnGoing 
      quiz={quiz} 
      config={start.config}
      setFinish={setFinish} 
    />;
  };
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({
      top: 0,
      behavior: "smooth",
    })}>
      <motion.div
        key={start.status ? (finish.status ? "results" : "ongoing") : "init"}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        {renderQuizContent()}
      </motion.div>
    </AnimatePresence>
  );
}
