
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, SkipForward, X } from 'lucide-react';
import RatingQuestion from '@/components/RatingQuestion';
import TextQuestion from '@/components/TextQuestion';
import { Question, Answer } from '@/pages/Index';
import { saveAnswer, getAnswer } from '@/utils/surveyUtils';

interface SurveyScreenProps {
  questions: Question[];
  sessionId: string;
  onComplete: () => void;
  onCancel: () => void;
}

const SurveyScreen = ({ questions, sessionId, onComplete, onCancel }: SurveyScreenProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    // Load existing answers when component mounts
    const existingAnswers: Answer[] = [];
    questions.forEach(question => {
      const savedAnswer = getAnswer(sessionId, question.id);
      if (savedAnswer) {
        existingAnswers.push(savedAnswer);
      }
    });
    setAnswers(existingAnswers);
  }, [questions, sessionId]);

  const handleAnswerChange = (value: string | number) => {
    const answer: Answer = {
      questionId: currentQuestion.id,
      value,
      sessionId,
      timestamp: Date.now()
    };

    // Save to local storage
    saveAnswer(answer);

    // Update local state
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== currentQuestion.id);
      return [...filtered, answer];
    });
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion.id)?.value || '';
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const skipQuestion = () => {
    goToNext();
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-white/80 font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className="text-2xl font-bold text-white">
              {currentQuestionIndex + 1}/{questions.length}
            </div>
          </div>
          
          <Button
            onClick={onCancel}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto mt-4">
          <Progress value={progress} className="h-2 bg-white/20" />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-3xl mx-auto w-full">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 animate-scale-in">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
              {currentQuestion.text}
            </h2>
            
            <div className="mb-10">
              {currentQuestion.type === 'rating' ? (
                <RatingQuestion
                  maxRating={currentQuestion.maxRating || 5}
                  value={getCurrentAnswer() as number}
                  onChange={handleAnswerChange}
                />
              ) : (
                <TextQuestion
                  value={getCurrentAnswer() as string}
                  onChange={handleAnswerChange}
                  placeholder="Please share your thoughts..."
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <Button
                onClick={goToPrevious}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                size="lg"
                className="flex items-center gap-2 bg-white/50 border-gray-300 text-gray-700 hover:bg-white/70 px-6 py-3 rounded-xl"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </Button>

              <Button
                onClick={skipQuestion}
                variant="ghost"
                size="lg"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-xl"
              >
                <SkipForward className="w-5 h-5" />
                Skip
              </Button>

              <Button
                onClick={goToNext}
                size="lg"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyScreen;
