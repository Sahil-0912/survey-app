
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, MessageCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Star className="w-12 h-12 text-white" fill="currentColor" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-yellow-800" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Welcome!
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
          Help us serve you better by sharing your thoughts about your shopping experience today
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-10">
          <p className="text-white/80 text-lg mb-4">
            This survey takes about 2 minutes to complete
          </p>
          <div className="flex items-center justify-center gap-4 text-white/70">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              5 Questions
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Anonymous
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Secure
            </span>
          </div>
        </div>
        
        <Button
          onClick={onStart}
          size="lg"
          className="bg-white text-purple-600 hover:bg-white/90 font-semibold text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 border-0"
        >
          Start Survey
        </Button>
        
        <p className="text-white/60 text-sm mt-6">
          Touch the button above to begin
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
