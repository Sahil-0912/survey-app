
import { Question, Answer } from '@/pages/Index';

// Generate unique session ID
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Initialize default questions
export const initializeQuestions = (): Question[] => {
  const defaultQuestions: Question[] = [
    {
      id: 'satisfaction_products',
      text: 'How satisfied are you with our products?',
      type: 'rating',
      maxRating: 5,
      required: false
    },
    {
      id: 'price_fairness',
      text: 'How fair are the prices compared to similar retailers?',
      type: 'rating',
      maxRating: 5,
      required: false
    },
    {
      id: 'value_for_money',
      text: 'How satisfied are you with the value for money of your purchase?',
      type: 'rating',
      maxRating: 5,
      required: false
    },
    {
      id: 'recommendation_score',
      text: 'On a scale of 1-10 how would you recommend us to your friends and family?',
      type: 'rating',
      maxRating: 10,
      required: false
    },
    {
      id: 'service_improvement',
      text: 'What could we do to improve our service?',
      type: 'text',
      required: false
    }
  ];

  // Store questions in localStorage for future extensibility
  const storedQuestions = localStorage.getItem('survey_questions');
  if (!storedQuestions) {
    localStorage.setItem('survey_questions', JSON.stringify(defaultQuestions));
    return defaultQuestions;
  }

  try {
    return JSON.parse(storedQuestions);
  } catch (error) {
    console.error('Error parsing stored questions:', error);
    return defaultQuestions;
  }
};

// Save answer to localStorage
export const saveAnswer = (answer: Answer): void => {
  try {
    const key = `answer_${answer.sessionId}_${answer.questionId}`;
    localStorage.setItem(key, JSON.stringify(answer));
    
    // Also maintain a list of all answers for this session
    const sessionKey = `session_answers_${answer.sessionId}`;
    const existingAnswers = getSessionAnswers(answer.sessionId);
    const updatedAnswers = existingAnswers.filter(a => a.questionId !== answer.questionId);
    updatedAnswers.push(answer);
    
    localStorage.setItem(sessionKey, JSON.stringify(updatedAnswers));
    
    console.log('Answer saved:', answer);
  } catch (error) {
    console.error('Error saving answer:', error);
  }
};

// Get answer for a specific question and session
export const getAnswer = (sessionId: string, questionId: string): Answer | null => {
  try {
    const key = `answer_${sessionId}_${questionId}`;
    const storedAnswer = localStorage.getItem(key);
    
    if (storedAnswer) {
      return JSON.parse(storedAnswer);
    }
    return null;
  } catch (error) {
    console.error('Error retrieving answer:', error);
    return null;
  }
};

// Get all answers for a session
export const getSessionAnswers = (sessionId: string): Answer[] => {
  try {
    const sessionKey = `session_answers_${sessionId}`;
    const storedAnswers = localStorage.getItem(sessionKey);
    
    if (storedAnswers) {
      return JSON.parse(storedAnswers);
    }
    return [];
  } catch (error) {
    console.error('Error retrieving session answers:', error);
    return [];
  }
};

// Get all completed surveys (for analytics)
export const getAllSurveys = (): { [sessionId: string]: Answer[] } => {
  try {
    const surveys: { [sessionId: string]: Answer[] } = {};
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('session_answers_')) {
        const sessionId = key.replace('session_answers_', '');
        const answers = localStorage.getItem(key);
        if (answers) {
          surveys[sessionId] = JSON.parse(answers);
        }
      }
    }
    
    return surveys;
  } catch (error) {
    console.error('Error retrieving all surveys:', error);
    return {};
  }
};

// Add new question (for future extensibility)
export const addQuestion = (question: Question): void => {
  try {
    const questions = initializeQuestions();
    questions.push(question);
    localStorage.setItem('survey_questions', JSON.stringify(questions));
    console.log('Question added:', question);
  } catch (error) {
    console.error('Error adding question:', error);
  }
};

// Clear all survey data (for testing/maintenance)
export const clearAllSurveyData = (): void => {
  try {
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('answer_') || key.startsWith('session_answers_'))) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log(`Cleared ${keysToRemove.length} survey records`);
  } catch (error) {
    console.error('Error clearing survey data:', error);
  }
};
