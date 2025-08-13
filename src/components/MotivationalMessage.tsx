import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MotivationalMessageProps {
  message: string;
  visible: boolean;
}

const MotivationalMessage: React.FC<MotivationalMessageProps> = ({ 
  message, 
  visible 
}) => {
  if (!visible) return null;

  return (
    <Card className={`w-full max-w-md mx-auto mt-4 border-0 bg-gradient-celebration text-white shadow-xl ${visible ? 'fade-in-message' : ''}`}>
      <CardContent className="p-6 text-center">
        <p className="text-lg font-semibold">
          {message}
        </p>
      </CardContent>
    </Card>
  );
};

export default MotivationalMessage;