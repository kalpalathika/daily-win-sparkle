import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Flame, X } from "lucide-react";

interface Win {
  id: string;
  text: string;
  date: string;
}

interface WinHistoryProps {
  wins: Win[];
  streak: number;
  onDeleteWin: (winId: string) => void;
}

const WinHistory: React.FC<WinHistoryProps> = ({ wins, streak, onDeleteWin }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Streak Counter */}
      <Card className="border-0 bg-gradient-primary text-white shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className="w-6 h-6" />
            <span className="text-2xl font-bold">{streak}</span>
          </div>
          <p className="text-white/90">
            {streak === 1 ? 'Day Streak' : 'Day Streak'}
          </p>
          {streak > 0 && (
            <p className="text-sm text-white/80 mt-1">
              Keep it going! 🔥
            </p>
          )}
        </CardContent>
      </Card>

      {/* Wins History */}
      {wins.length > 0 && (
        <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-celebration" />
              Your Recent Wins
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {wins.map((win, index) => (
                <div
                  key={win.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Badge variant="outline" className="border-celebration text-celebration-foreground bg-celebration/10">
                      #{wins.length - index}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-medium break-words">
                      {win.text}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatDate(win.date)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteWin(win.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WinHistory;