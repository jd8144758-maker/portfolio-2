import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  animationDelay: number;
  animationDuration: number;
}

export default function SakuraPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const petalCount = 15;
    const newPetals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      newPetals.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 20,
        animationDuration: 20 + Math.random() * 10,
      });
    }

    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal absolute"
          style={{
            left: `${petal.left}%`,
            top: '-20px',
            animationDelay: `${petal.animationDelay}s`,
            animationDuration: `${petal.animationDuration}s`,
            animationName: 'float',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
      ))}
    </div>
  );
}
