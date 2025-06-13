
import React from 'react';
import { Star } from 'lucide-react';

interface RatingQuestionProps {
  maxRating: number;
  value: number;
  onChange: (value: number) => void;
}

const RatingQuestion = ({ maxRating, value, onChange }: RatingQuestionProps) => {
  const renderStars = () => {
    return Array.from({ length: maxRating }, (_, index) => {
      const rating = index + 1;
      const isSelected = rating <= value;
      
      return (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-2 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-300 ${
            isSelected
              ? 'bg-gradient-to-r from-yellow-400 to-orange-400 border-yellow-500 shadow-lg'
              : 'bg-white/80 border-gray-300 hover:border-yellow-400 hover:bg-yellow-50'
          }`}
        >
          <Star
            className={`w-8 h-8 md:w-10 md:h-10 mx-auto transition-colors duration-300 ${
              isSelected ? 'text-white' : 'text-gray-400'
            }`}
            fill={isSelected ? 'currentColor' : 'none'}
          />
        </button>
      );
    });
  };

  const renderNumbers = () => {
    return Array.from({ length: maxRating }, (_, index) => {
      const rating = index + 1;
      const isSelected = rating === value;
      
      return (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-300 ${
            isSelected
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 shadow-lg text-white'
              : 'bg-white/80 border-gray-300 hover:border-purple-400 hover:bg-purple-50 text-gray-700'
          }`}
        >
          <span className="font-bold text-xl md:text-2xl">{rating}</span>
        </button>
      );
    });
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 flex-wrap">
        {maxRating <= 5 ? renderStars() : renderNumbers()}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 max-w-lg mx-auto">
        <span>{maxRating <= 5 ? 'Poor' : 'Not at all likely'}</span>
        <span>{maxRating <= 5 ? 'Excellent' : 'Extremely likely'}</span>
      </div>
      
      {value > 0 && (
        <div className="mt-4 text-lg font-medium text-gray-700">
          Selected: {value}/{maxRating}
        </div>
      )}
    </div>
  );
};

export default RatingQuestion;
