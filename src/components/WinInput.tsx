import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface WinInputProps {
  onSubmit: (win: string) => void;
}

const WinInput: React.FC<WinInputProps> = ({ onSubmit }) => {
  const [win, setWin] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (win.trim()) {
      onSubmit(win.trim());
      setWin("");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-card/80 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Little Wins Tracker
          </h1>
          <p className="text-muted-foreground">
            Celebrate your daily achievements
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="win-input" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              What's your win today?
            </label>
            <Input
              id="win-input"
              type="text"
              value={win}
              onChange={(e) => setWin(e.target.value)}
              placeholder="I finished my morning workout..."
              className="text-base h-12 border-2 border-border focus:border-primary transition-colors"
            />
          </div>
          
          <Button
            type="submit"
            variant="sunshine"
            size="lg"
            className="w-full text-lg font-semibold"
            disabled={!win.trim()}
          >
            Celebrate This Win! 🎉
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WinInput;