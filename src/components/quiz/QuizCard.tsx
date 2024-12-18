import React from 'react';

import { QUIZ_CONSTANTS } from '../../constants/quiz';
import { QuizData } from '../../types/quiz/quiz';

interface QuizCardProps {
  quiz: QuizData;
  onClick: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onClick }) => {
  const renderDifficultyLevel = (difficulty: number) => {
    switch (difficulty) {
      case QUIZ_CONSTANTS.DIFFICULTY_LEVELS.LEVEL_1:
        return 'Level 1';
      case QUIZ_CONSTANTS.DIFFICULTY_LEVELS.LEVEL_2:
        return 'Level 2';
      case QUIZ_CONSTANTS.DIFFICULTY_LEVELS.LEVEL_3:
        return 'Level 3';
      default:
        return 'Unknown Level';
    }
  };

  return (
    <div
      className="flex h-[202px] w-[224px] cursor-pointer flex-col items-center gap-6 rounded-lg bg-neutral-700 p-6 transition-transform hover:scale-105 lg:h-[243px] lg:w-[264px]"
      onClick={onClick}
      style={{ minWidth: '224px' }}
    >
      <div className="flex w-full justify-between">
        <h3 className="rounded-sm text-center text-xs text-slate-400 sm:text-sm">
          {quiz.category}
        </h3>
      </div>
      <div className="flex h-3/5 w-full items-center justify-center">
        <h3 className="text-center text-xl font-bold text-slate-300 sm:text-2xl">
          {quiz.questionText}
        </h3>
      </div>

      <div className="flex w-full items-center justify-between">
        <h3 className="rounded-sm text-center text-sm text-slate-400 sm:text-base">
          {renderDifficultyLevel(quiz.difficulty)}
        </h3>
        <h3 className="text-center text-sm text-slate-400 sm:text-base">
          {quiz.triedUserCount}명이 푼 문제
        </h3>
      </div>
    </div>
  );
};

export default QuizCard;
