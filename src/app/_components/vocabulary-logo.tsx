"use client";

import { useRef, useState } from "react";
import { useAnimationFrame } from "../../hooks/use-animation";

type Piece = {
  path: string;
  center: {
    x: number;
    y: number;
  };
};

const pieces: Piece[] = [
  {
    center: {
      x: 110,
      y: 120,
    },
    path: `M 528.12,567.19
           C 528.12,567.19 528.12,635.94 528.12,635.94
             528.12,635.94 271.88,635.94 271.88,635.94
             271.88,635.94 271.88,567.19 271.88,567.19
             271.88,567.19 528.12,567.19 528.12,567.19 Z`,
  },
  {
    center: {
      x: 163,
      y: 101,
    },
    path: `M 376.56,465.62
           C 376.56,465.62 376.56,535.94 376.56,535.94
             376.56,535.94 221.88,535.94 221.88,535.94
             221.88,535.94 221.88,465.62 221.88,465.62
             221.88,465.62 376.56,465.62 376.56,465.62 Z`,
  },
  {
    path: `M 190.62,465.62
           C 190.62,465.62 190.62,535.94 190.62,535.94
             190.62,535.94 37.50,535.94 37.50,535.94
             37.50,535.94 37.50,465.62 37.50,465.62
             37.50,465.62 190.62,465.62 190.62,465.62 Z`,
    center: {
      x: 100,
      y: 120
    }
  },

  {
    path: `M 21.73,567.19
           C 21.73,567.19 3.12,567.19 3.12,567.19
             3.12,567.19 3.12,635.94 3.12,635.94
             3.12,635.94 240.62,635.94 240.62,635.94
             240.62,635.94 240.62,567.19 240.62,567.19
             240.62,567.19 206.66,567.19 206.66,567.19
             206.66,567.19 21.73,567.19 21.73,567.19 Z`,
    center: {
      x: 100,
      y: 120
    }
  },
  {
    path: `M 745.31,465.62
           C 745.31,465.62 745.31,535.94 745.31,535.94
             745.31,535.94 592.19,535.94 592.19,535.94
             592.19,535.94 592.19,465.62 592.19,465.62
             592.19,465.62 745.31,465.62 745.31,465.62 Z`,
    center: {
      x: 100,
      y: 120
    }
  },
  {
    path: `M 576.52,567.19
           C 576.52,567.19 559.38,567.19 559.38,567.19
             559.38,567.19 559.38,635.94 559.38,635.94
             559.38,635.94 796.88,635.94 796.88,635.94
             796.88,635.94 796.88,567.19 796.88,567.19
             796.88,567.19 761.46,567.19 761.46,567.19
             761.46,567.19 576.52,567.19 576.52,567.19 Z`,
    center: {
      x: 100,
      y: 120
    }
  },
  {
    path: `M 560.94,465.62
           C 560.94,465.62 560.94,535.94 560.94,535.94
             560.94,535.94 407.81,535.94 407.81,535.94
             407.81,535.94 407.81,465.62 407.81,465.62
             407.81,465.62 560.94,465.62 560.94,465.62 Z`,
    center: {
      x: 100,
      y: 120
    }
  },
  {
    path: `M 796.88,365.62
           C 796.88,365.62 796.88,434.38 796.88,434.38
             796.88,434.38 559.38,434.38 559.38,434.38
             559.38,434.38 559.38,365.62 559.38,365.62
             559.38,365.62 796.88,365.62 796.88,365.62 Z`,
    center: {
      x: 100,
      y: 120
    }
  },
  {
    path: `M 560.94,264.06
           C 560.94,264.06 560.94,334.38 560.94,334.38
             560.94,334.38 407.81,334.38 407.81,334.38
             407.81,334.38 407.81,264.06 407.81,264.06
             407.81,264.06 560.94,264.06 560.94,264.06 Z`,
    center: {
      x: 100,
      y: 120
    }
  },
  {
    path: `M 745.31,264.06
           C 745.31,264.06 745.31,334.38 745.31,334.38
             745.31,334.38 592.19,334.38 592.19,334.38
             592.19,334.38 592.19,264.06 592.19,264.06
             592.19,264.06 745.31,264.06 745.31,264.06 Z`,
    center: {
      x: 100,
      y: 120
    }
  },
  {
    path: `M 271.88,365.62
           C 271.88,365.62 271.88,434.38 271.88,434.38
             271.88,434.38 391.59,434.38 391.59,434.38
             391.59,434.38 528.12,434.38 528.12,434.38
             528.12,434.38 528.12,365.62 528.12,365.62
             528.12,365.62 391.59,365.62 391.59,365.62
             391.59,365.62 271.88,365.62 271.88,365.62 Z`,
    center: {
      x: 100,
      y: 120
    }
  },
  {
    path: `M 528.12,232.81
           C 528.12,232.81 528.12,164.06 528.12,164.06
             528.12,164.06 271.88,164.06 271.88,164.06
             271.88,164.06 271.88,232.81 271.88,232.81
             271.88,232.81 391.59,232.81 391.59,232.81
             391.59,232.81 528.12,232.81 528.12,232.81 Z`,
    center: {
      x: 100,
      y: 120
    }
  },
  {
    path: `M 240.62,365.62
           C 240.62,365.62 240.62,434.38 240.62,434.38
             240.62,434.38 3.12,434.38 3.12,434.38
             3.12,434.38 3.12,365.62 3.12,365.62
             3.12,365.62 240.62,365.62 240.62,365.62 Z`,
    center: {
      x: 100,
      y: 120
    }
  },
  {
    path: `M 190.62,264.06
           C 190.62,264.06 190.62,334.38 190.62,334.38
             190.62,334.38 37.50,334.38 37.50,334.38
             37.50,334.38 37.50,264.06 37.50,264.06
             37.50,264.06 190.62,264.06 190.62,264.06 Z`,
    center: {
      x: 100,
      y: 120
    }
  },
  {
    path: `M 376.56,264.06
           C 376.56,264.06 376.56,334.38 376.56,334.38
             376.56,334.38 221.88,334.38 221.88,334.38
             221.88,334.38 221.88,264.06 221.88,264.06
             221.88,264.06 376.56,264.06 376.56,264.06 Z`,
    center: {
      x: 100,
      y: 120
    }
  },
  {
    path: `M 206.66,232.81
           C 206.66,232.81 240.62,232.81 240.62,232.81
             240.62,232.81 240.62,164.06 240.62,164.06
             240.62,164.06 3.12,164.06 3.12,164.06
             3.12,164.06 3.12,232.81 3.12,232.81
             3.12,232.81 21.73,232.81 21.73,232.81
             21.73,232.81 206.66,232.81 206.66,232.81 Z`,
    center: {
      x: 100,
      y: 120
    }
  },
];

for (const piece of pieces) {
  const numbers = piece.path.split(' ')
    .map(e => e.trim().split(','))
    .filter(e => e.length == 2)

  const centerX = numbers.map(e => Number(e[0])).reduce((prev, current) => prev + current, 0) / numbers.length;
  const centerY = numbers.map(e => Number(e[1])).reduce((prev, current) => prev + current, 0) / numbers.length;
  piece.center = { x: centerX / 3, y: centerY / 3 };
}

const FORCE_MULTIPLIER = 5;
const CURSOR_FORCE_MULTIPLIER = 1.0;
const FORCE_DAMPENING = 0.96;
const MAX_FORCE_DISTANCE = 70;

const WIDTH = 250;
const HEIGHT = 250;

const euclideanDistance = (
  x: number,
  y: number,
  x2: number,
  y2: number,
): number => {
  return Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
};

const newCoords = (force: [number, number]): [x: number, y: number] => {
  const newX = mapRange(force[0] * FORCE_MULTIPLIER, -200, 200, -50, 50);
  const newY = mapRange(force[1] * FORCE_MULTIPLIER, -200, 200, -50, 50);
  return [newX, newY];
};
// const k = 100; // NOTE: avoid rounding, 100 => [-3000,3000]
// function sigmoid(z: number): number {
//   return 1 / (1 + Math.exp(-z / k));
// }

const applyForces = (
  force: number,
  movement: number,
  distance: number,
): number => {
  const distanceDebuff =
    1 *
    (1 -
      mapRange(
        distance < MAX_FORCE_DISTANCE ? distance : MAX_FORCE_DISTANCE,
        0,
        MAX_FORCE_DISTANCE,
        0,
        1,
      ));
  return force + movement * distanceDebuff * CURSOR_FORCE_MULTIPLIER;
};

function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export default function VocabularyLogo() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [pieceForces, setPieceForces] = useState<[number, number][]>(
    pieces.map(() => [0, 0]),
  );

  useAnimationFrame((_deltaTime) => {
    setPieceForces((prevForces) => {
      return prevForces.map((pieceForce) => {
        return [
          pieceForce[0] * FORCE_DAMPENING,
          pieceForce[1] * FORCE_DAMPENING,
        ];
      });
    });
  }, 1000 / 140);

  return (
    <div className="w-full">
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        width="8.88889in" height="8.88889in"
        viewBox="0 0 800 800"
        ref={svgRef}
        style={{
          marginTop: 50,
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          display: 'block',
          margin: '0 auto',
          fill: "#0b0b0b",
          fillRule: "evenodd",
        }}
        onMouseMove={(e) => {
          setPieceForces((prev) =>
            prev.map((pieceForce, i) => {
              const piece = pieces[i]!;
              const newC = newCoords(pieceForces[i]!);

              const movementX =
                e.clientX - (svgRef.current?.getBoundingClientRect()?.x ?? 0);
              const movementY =
                e.clientY - (svgRef.current?.getBoundingClientRect()?.y ?? 0);

              const distance = euclideanDistance(
                movementX,
                movementY,
                piece.center.x + newC[0],
                piece.center.y + newC[1],
              );

              return [
                applyForces(pieceForce[0], Math.min(e.movementX, 5), distance),
                applyForces(pieceForce[1], Math.min(e.movementY, 5), distance),
              ];
            }),
          );
        }}
      >
        <title>v</title>
        {pieces.map((piece, i) => {
          const newC = newCoords(pieceForces[i]!);
          return (
            <path
              style={{
                transform: `translate(${newC[0]}px, ${newC[1]}px)`,
              }}
              stroke="#0b0b0b"
              strokeWidth={0.3}
              key={`path-${i}`}
              d={piece.path}
            />
          );
        })}
      </svg>
    </div>
  );
}
