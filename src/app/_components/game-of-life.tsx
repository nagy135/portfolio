"use client";
import { type FC, Fragment, useCallback, useState, useEffect } from "react";

const HEIGHT = 300;
const WIDTH = 600;
const REFRESH_RATE = 200;

const GameOfLife: FC = () => {
  const [id, setId] = useState(Math.floor(Math.random() * 100000));
  const [grid, setGrid] = useState<number[][] | null>([[0, 0], [0, 0]]);

  const newGame = useCallback(() => {
    setId(Math.floor(Math.random() * 100000));
  }, [setId])


  useEffect(() => {
    if (!id) return;

    const intervalId = setInterval(async () => {
      const response = await fetch(`https://go-gol.infiniter.tech/tick?id=${id}`)
      const data = await response.json();
      setGrid(data);
    }, REFRESH_RATE);

    return () => clearInterval(intervalId);
  }, [id]);

  const gridWidth = grid && grid[0] ? grid[0].length : 0;
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
