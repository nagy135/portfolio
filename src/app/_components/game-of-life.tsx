"use client";
import { type FC, Fragment, useCallback, useState, useEffect } from "react";

const HEIGHT = 300;
const WIDTH = 600;
const REFRESH_RATE = 300;

const GameOfLife: FC = () => {
  const [id, setId] = useState(Math.floor(Math.random() * 100000));
  const [grid, setGrid] = useState<number[][] | null>([[0, 0], [0, 0]]);

  const newGame = useCallback(() => {
    setId(Math.floor(Math.random() * 100000));
  }, [setId])


  useEffect(() => {
    if (!id) return;

    const intervalId = setInterval(() => {
      fetch(`${process.env.NEXT_PUBLIC_GO_GOL_URL}/tick?id=${id}`)
        .then(e => e.json())
        .then(e => setGrid(e as number[][]))
        .catch(e => console.error(e))
    }, REFRESH_RATE);

    return () => clearInterval(intervalId);
  }, [id]);

  const gridWidth = grid?.[0] ? grid[0].length : 0;
  const gridHeight = grid ? grid.length : 0;
  const cellHeight = HEIGHT / gridHeight;
  const cellWidth = WIDTH / gridWidth;

  return !grid ? null : (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
      }}
      className="my-3 mx-auto"
      onClick={() => newGame()}
    >
      <svg
        width={WIDTH}
        height={HEIGHT}
      >
        {grid.map((row, y) => {
          return (
            <Fragment key={`row-${y}`}>
              {row.map((val, x) => {
                return (
                  <path
                    key={`cell-${x}x${y}`}
                    d={`
M${x * cellWidth},${y * cellHeight} 
h${cellWidth} 
v${cellHeight} 
h-${cellWidth} 
v-${cellHeight} 
z`}
                    fill={val ? "#0b0b0b" : "#ffffff"}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </svg>
    </div>
  );
};

export default GameOfLife;
