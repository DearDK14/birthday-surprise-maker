import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  const colors = ['#C8102E', '#D4AF37', '#F7E7B4', '#111111', '#FFFFFF', '#A00C24'];

  // Left burst
  confetti({
    particleCount: 65,
    angle: 60,
    spread: 70,
    origin: { x: 0.1, y: 0.65 },
    colors,
    ticks: 300,
    shapes: ['circle', 'square'],
    scalar: 1.1,
  });

  // Right burst
  confetti({
    particleCount: 65,
    angle: 120,
    spread: 70,
    origin: { x: 0.9, y: 0.65 },
    colors,
    ticks: 300,
    shapes: ['circle', 'square'],
    scalar: 1.1,
  });

  // Center golden star burst
  setTimeout(() => {
    confetti({
      particleCount: 85,
      spread: 100,
      origin: { x: 0.5, y: 0.4 },
      colors,
      ticks: 350,
      scalar: 1.2,
    });
  }, 250);
}

export function fireGentleSparkles() {
  const colors = ['#D4AF37', '#F7E7B4', '#C8102E', '#FFFFFF'];
  confetti({
    particleCount: 35,
    spread: 60,
    origin: { x: 0.5, y: 0.5 },
    colors,
    ticks: 200,
    scalar: 0.8,
    gravity: 0.6,
  });
}
