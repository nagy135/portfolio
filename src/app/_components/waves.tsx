"use client";

import { useCallback, useRef } from "react";
import { useAnimationFrame } from "../../hooks/use-animation";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 450;
const GLOBAL_MARGIN = 100;
const RADIUS = 5;
const GRID_WIDTH = 30;
const GRID_HEIGHT = 30;
const SLOWDOWN = 0.4;
const RENDERING_WIDTH = CANVAS_WIDTH + GLOBAL_MARGIN * 2;
const RENDERING_HEIGHT = CANVAS_HEIGHT + GLOBAL_MARGIN * 2;
const WAVE_WIDTH = 45;

class Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  dx: number;
  dy: number;
  constructor(x: number, y: number) {
    this.originX = x;
    this.originY = y;
    this.x = x;
    this.y = y;

    this.dx = this.originX - this.x;
    this.dy = this.originY - this.y;

  }
}

class Wave {
  x: number;
  y: number;
  radius: number;
  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}

const isInRadius = (pX: number, pY: number, x: number, y: number, r: number): boolean => {
  return Math.sqrt(Math.pow(pX - x, 2) + Math.pow(pY - y, 2)) < r;
}

const points: Point[] = [];
for (let x = 0; x < GRID_WIDTH; x++) {
  for (let y = 0; y < GRID_HEIGHT; y++) {
    points.push(new Point(x * ((RENDERING_WIDTH - RADIUS) / GRID_WIDTH) + RADIUS, y * ((RENDERING_HEIGHT - RADIUS) / GRID_HEIGHT) + RADIUS))
  }
}

const waves: Wave[] = [];

export default function Waves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRect = useRef<[number, number]>([0, 0]);

  const drawCircle = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, RADIUS, 0, 2 * Math.PI);
    ctx.fill();
  }, []);

  const click = useCallback((e: React.MouseEvent<HTMLCanvasElement>, rect: [number, number]) => {
    const x = Math.max(0, e.clientX - rect[0]);
    const y = Math.max(0, e.clientY - rect[1]);
    waves.push(new Wave(x, y, 1));
  }, [])

  const update = useCallback((points: Point[]) => {
    for (const wave of waves) {
      for (const point of points) {
        if (!isInRadius(point.originX, point.originY, wave.x, wave.y, wave.radius - WAVE_WIDTH / 2) &&
          isInRadius(point.originX, point.originY, wave.x, wave.y, wave.radius + WAVE_WIDTH / 2)
        ) {
          const distanceX = Math.max(0, point.originX - wave.x - wave.radius);
          const pushX = (1 - (RADIUS - distanceX) / RADIUS);
          const distanceY = Math.max(0, point.originY - wave.y - wave.radius);
          const pushY = (1 - (RADIUS - distanceY) / RADIUS);

          point.dx = pushX + Math.random() * 10 - 5;
          point.dy = pushY + Math.random() * 10 - 5;
        }
      }
      wave.radius += 1;
    }
    for (const point of points) {
      point.x += point.dx;
      point.y += point.dy;

      const distanceX = point.originX - point.x;
      const distanceY = point.originY - point.y;

      point.dx += distanceX * SLOWDOWN;
      point.dy += distanceY * SLOWDOWN;

      point.dx *= 0.50;
      point.dy *= 0.50;
    }
  }, [])

  useAnimationFrame((_deltaTime) => {

    if (!canvasRef.current) return;

    const cRect = canvasRef.current.getBoundingClientRect();
    canvasRect.current = [cRect.left, cRect.top];

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, RENDERING_WIDTH, RENDERING_HEIGHT);


    update(points);
    for (const point of points) {
      drawCircle(ctx, point.x, point.y);
    }

  }, 1000 / 140);
  return <canvas
    onClick={(e) => click(e, [canvasRect.current[0], canvasRect.current[1]])}
    className="mx-auto mt-2" ref={canvasRef} width={RENDERING_WIDTH} height={RENDERING_HEIGHT} >
  </canvas>
}
