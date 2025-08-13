import confetti from 'canvas-confetti';

const celebrationPatterns = [
  // Pattern 1: Classic burst from sides
  () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.2, y: 0.6 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.8, y: 0.6 },
        colors: ['#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43']
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#f39c12', '#e67e22', '#d35400', '#f1c40f']
      });
    }, 400);
  },

  // Pattern 2: Fireworks explosion
  () => {
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#ff0066', '#ff6600', '#ffcc00', '#33ff00', '#0066ff', '#6600ff']
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { x: 0.3, y: 0.7 },
        colors: ['#ff3366', '#33ff66', '#3366ff', '#ff33ff', '#ffff33']
      });
    }, 300);

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { x: 0.7, y: 0.7 },
        colors: ['#ff6633', '#66ff33', '#3366ff', '#ff3366', '#33ffff']
      });
    }, 500);
  },

  // Pattern 3: Rainbow cascade
  () => {
    const colors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff80', '#0080ff', '#8000ff'];
    
    colors.forEach((color, index) => {
      setTimeout(() => {
        confetti({
          particleCount: 60,
          spread: 50,
          origin: { x: 0.1 + (index * 0.13), y: 0.3 },
          colors: [color],
          gravity: 0.8
        });
      }, index * 100);
    });
  },

  // Pattern 4: Heart burst
  () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#ff69b4', '#ff1493', '#dc143c', '#b22222', '#ff6347'],
      shapes: ['circle'],
      gravity: 0.6
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1'],
        gravity: 1.2
      });
    }, 250);
  },

  // Pattern 5: Spiral celebration
  () => {
    let duration = 2000;
    let animationEnd = Date.now() + duration;
    
    const spiralInterval = setInterval(() => {
      let timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        clearInterval(spiralInterval);
        return;
      }
      
      let particleCount = 30 * (timeLeft / duration);
      
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5 + 0.3
        },
        colors: ['#bb0000', '#ffffff', '#00bb00', '#0000bb', '#ffff00', '#ff00ff']
      });
    }, 250);
  },

  // Pattern 6: Golden shower
  () => {
    confetti({
      particleCount: 200,
      spread: 30,
      origin: { x: 0.5, y: 0 },
      colors: ['#ffd700', '#ffed4e', '#f39c12', '#e67e22', '#d35400'],
      gravity: 1.5,
      drift: 0
    });

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 50,
        origin: { x: 0.3, y: 0.1 },
        colors: ['#ffd700', '#ffed4e', '#f1c40f'],
        gravity: 1.2
      });
    }, 400);

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 50,
        origin: { x: 0.7, y: 0.1 },
        colors: ['#ffd700', '#ffed4e', '#f1c40f'],
        gravity: 1.2
      });
    }, 600);
  }
];

export const triggerConfetti = () => {
  // Randomly select one of the celebration patterns
  const randomPattern = celebrationPatterns[Math.floor(Math.random() * celebrationPatterns.length)];
  randomPattern();
};