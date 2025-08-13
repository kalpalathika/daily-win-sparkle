import React, { useState, useEffect } from "react";
import WinInput from "@/components/WinInput";
import MotivationalMessage from "@/components/MotivationalMessage";
import WinHistory from "@/components/WinHistory";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { triggerConfetti } from "@/utils/confetti";

interface Win {
  id: string;
  text: string;
  date: string;
}

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
  const [wins, setWins] = useLocalStorage<Win[]>('little-wins', []);
  const [streak, setStreak] = useLocalStorage<number>('win-streak', 0);
  const [lastWinDate, setLastWinDate] = useLocalStorage<string>('last-win-date', '');
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  // Calculate streak on component mount
  useEffect(() => {
    calculateStreak();
  }, []);

  const calculateStreak = () => {
    if (!lastWinDate) {
      setStreak(0);
      return;
    }

    const today = new Date();
    const lastWin = new Date(lastWinDate);
    const diffTime = today.getTime() - lastWin.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      // Streak broken
      setStreak(0);
    }
    // If diffDays === 0 or 1, streak continues
  };

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const hasWinToday = () => {
    const today = getTodayString();
    return wins.some(win => win.date.startsWith(today));
  };

  const handleWinSubmit = (winText: string) => {
    const today = getTodayString();
    const newWin: Win = {
      id: Date.now().toString(),
      text: winText,
      date: new Date().toISOString()
    };

    // Add new win
    setWins(prevWins => [newWin, ...prevWins]);

    // Update streak
    if (!hasWinToday()) {
      const todayDate = getTodayString();
      const lastDate = lastWinDate ? lastWinDate.split('T')[0] : '';
      
      if (lastDate === '') {
        // First win ever
        setStreak(1);
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];
        
        if (lastDate === yesterdayString) {
          // Continuing streak
          setStreak(prevStreak => prevStreak + 1);
        } else if (lastDate === todayDate) {
          // Already had a win today, don't change streak
        } else {
          // Streak broken, start new
          setStreak(1);
        }
      }
      
      setLastWinDate(newWin.date);
    }

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
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <WinInput onSubmit={handleWinSubmit} />
        
        <MotivationalMessage 
          message={currentMessage}
          visible={showMessage}
        />
        
        <WinHistory wins={wins} streak={streak} />
      </div>
    </div>
  );
};

export default Index;
