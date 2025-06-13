
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart, Sparkles } from 'lucide-react';

interface ThankYouScreenProps {
  onReset: () => void;
}

const ThankYouScreen = ({ onReset }: ThankYouScreenProps) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-2xl mx-auto animate-scale-in">
        <div className="mb-8 flex justify-center relative">
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 relative">
            <CheckCircle className="w-16 h-16 text-green-400" fill="currentColor" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <Heart className="w-6 h-6 text-red-400" fill="currentColor" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Thank You!
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
          Your feedback is invaluable to us and helps improve our service for everyone
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-10">
          <div className="flex items-center justify-center gap-4 text-white/80 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-lg">Survey completed successfully</span>
          </div>
          <p className="text-white/70">
            Your responses have been saved securely and will be reviewed by our team
          </p>
        </div>
        
        <div className="mb-8">
          <p className="text-white/60 text-lg mb-4">
            Returning to welcome screen in <span className="font-bold text-white">{countdown}</span> seconds
          </p>
          
          <Button
            onClick={onReset}
            size="lg"
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 font-semibold text-lg px-8 py-4 rounded-2xl backdrop-blur-sm"
          >
            Start New Survey
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-8 text-white/50 text-sm">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            Anonymous
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            Secure
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            Encrypted
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThankYouScreen;
