import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  // First burst - colorful confetti from left
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.2, y: 0.6 },
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
  });

  // Second burst - colorful confetti from right
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.8, y: 0.6 },
      colors: ['#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43']
    });
  }, 200);

  // Third burst - golden confetti from center
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#f39c12', '#e67e22', '#d35400', '#f1c40f']
    });
  }, 400);
};