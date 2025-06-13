
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface TextQuestionProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextQuestion = ({ value, onChange, placeholder }: TextQuestionProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[200px] text-lg p-6 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-purple-200 resize-none bg-white/90 backdrop-blur-sm"
        style={{ fontSize: '18px', lineHeight: '1.6' }}
      />
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span>Your feedback helps us improve</span>
        <span>{value.length} characters</span>
      </div>
    </div>
  );
};

export default TextQuestion;
