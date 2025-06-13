
import React, { useState, useEffect } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import SurveyScreen from '@/components/SurveyScreen';
import ThankYouScreen from '@/components/ThankYouScreen';
import { generateSessionId, initializeQuestions } from '@/utils/surveyUtils';

export type Question = {
  id: string;
  text: string;
  type: 'rating' | 'text';
  maxRating?: number;
  required?: boolean;
};

export type Answer = {
  questionId: string;
  value: string | number;
  sessionId: string;
  timestamp: number;
};

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'survey' | 'thank-you'>('welcome');
  const [sessionId, setSessionId] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Initialize questions on component mount
    const initialQuestions = initializeQuestions();
    setQuestions(initialQuestions);
  }, []);

  const startSurvey = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setCurrentScreen('survey');
  };

  const completeSurvey = () => {
    setCurrentScreen('thank-you');
    // Auto-reset after 5 seconds
    setTimeout(() => {
      setCurrentScreen('welcome');
      setSessionId('');
    }, 5000);
  };

  const resetToWelcome = () => {
    setCurrentScreen('welcome');
    setSessionId('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={startSurvey} />
      )}
      
      {currentScreen === 'survey' && (
        <SurveyScreen 
          questions={questions}
          sessionId={sessionId}
          onComplete={completeSurvey}
          onCancel={resetToWelcome}
        />
      )}
      
      {currentScreen === 'thank-you' && (
        <ThankYouScreen onReset={resetToWelcome} />
      )}
    </div>
  );
};

export default Index;
