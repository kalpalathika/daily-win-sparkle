import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import WinInput from "@/components/WinInput";
import MotivationalMessage from "@/components/MotivationalMessage";
import WinHistory from "@/components/WinHistory";
import { useAuth } from "@/hooks/useAuth";
import { useWins } from "@/hooks/useWins";
import { triggerConfetti } from "@/utils/confetti";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const motivationalMessages = [
  "You're absolutely amazing! 🌟",
  "Keep crushing it! 💪",
  "Small wins lead to big victories! 🏆",
  "You're building momentum! 🚀",
  "Every step counts! 👏",
  "Celebrate this moment! 🎉",
  "You're doing great! ✨",
  "Progress is progress! 📈",
  "Your effort matters! 💖",
  "Keep shining! ☀️"
];

const Index = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { wins, addWin, deleteWin, calculateStreak, loading: winsLoading } = useWins();
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  // Redirect to auth if not logged in
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  // Show loading state
  if (authLoading || winsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const handleWinSubmit = async (winText: string) => {
    try {
      await addWin(winText);

      // Trigger celebration
      triggerConfetti();
      
      // Show motivational message
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      setCurrentMessage(randomMessage);
      setShowMessage(true);

      // Hide message after 4 seconds
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    } catch (error) {
      // Error is handled by useWins hook
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const streak = calculateStreak();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Little Wins Tracker</h1>
          <Button 
            onClick={handleSignOut} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
        
        <WinInput onSubmit={handleWinSubmit} />
        
        <MotivationalMessage 
          message={currentMessage}
          visible={showMessage}
        />
        
        <WinHistory wins={wins} streak={streak} onDeleteWin={deleteWin} />
      </div>
    </div>
  );
};

export default Index;
