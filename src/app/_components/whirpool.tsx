"use client";

import { useCallback, useRef, type MouseEvent } from "react";
import { useAnimationFrame } from "../../hooks/use-animation";


const width = 80;
const height = 80;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 350;
const spacingX = CANVAS_WIDTH / width;
const spacingY = CANVAS_HEIGHT / height;
const CENTER: [number, number] = [CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2];
const RADIUS = 2;
const GLOBAL_MARGIN = 100;
const UPDATE_TICK = 1; // ms
const RENDERING_WIDTH = CANVAS_WIDTH + GLOBAL_MARGIN * 2;
const RENDERING_HEIGHT = CANVAS_HEIGHT + GLOBAL_MARGIN * 2;
const MOUSE_RADIUS = 60;
const DENSITY = 1;
const MOUSE_DAMPENING = 0.9;

const euclideanDistance = (pX: number, pY: number, x: number, y: number): number => {
  return Math.sqrt(Math.pow(pX - x, 2) + Math.pow(pY - y, 2));
}

const isInRadius = (pX: number, pY: number, x: number, y: number, r: number): boolean => {
  return euclideanDistance(pX, pY, x, y) < r;
}


const mouseMove = (e: MouseEvent, canvasRect: [number, number]) => {
  const x = Math.max(0, e.clientX - canvasRect[0]);
  const y = Math.max(0, e.clientY - canvasRect[1]);

  for (const point of points) {
    if (isInRadius(point.x, point.y, x, y, MOUSE_RADIUS)) {

      const distanceX = point.x - x;
      const pushX = (1 - (RADIUS - distanceX) / RADIUS);
      const distanceY = point.y - y;
      const pushY = (1 - (RADIUS - distanceY) / RADIUS);

      point.dx = pushX * MOUSE_DAMPENING + Math.random() * 10;
      point.dy = pushY * MOUSE_DAMPENING + Math.random() * 10;
    }
  }
};



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
    this.x = x + Math.floor(Math.random() * 25);
    this.y = y + Math.floor(Math.random() * 25);

    this.dx = this.originX - this.x;
    this.dy = this.originY - this.y;

  }
}

const points = new Array<Point>();

for (let iY = 0; iY < height; iY++) {
  for (let iX = 0; iX < width; iX++) {
    const x = iX * spacingX + GLOBAL_MARGIN;
    const y = iY * spacingY + GLOBAL_MARGIN;

    for (let i = 0; i < DENSITY; i++) {
      for (let j = 0; j < DENSITY; j++) {
        points.push(new Point(x + i * (spacingX / DENSITY), y + j * (spacingY / DENSITY)));
      }
    }
  }
}

export default function Whirpool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastUpdate = useRef<number>(0);
  const canvasRect = useRef<[number, number]>([0, 0]);

  useAnimationFrame((_deltaTime) => {
    if (!canvasRef.current) return;

    const cRect = canvasRef.current.getBoundingClientRect();
    canvasRect.current = [cRect.left, cRect.top];

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, RENDERING_WIDTH, RENDERING_HEIGHT);

    const now = Date.now();
    if (now - lastUpdate.current > UPDATE_TICK) {
      lastUpdate.current = now;
      update();
    }

    for (const point of points) {
      drawCircle(ctx, point.x, point.y);
    }

  }, 1000 / 240);

  const update = useCallback(() => {
    for (const point of points) {
      point.x += point.dx;
      point.y += point.dy;


      const diffX = (point.x - CENTER[0]);
      const diffY = (point.y - CENTER[1]);

      const angle = 20;

      const distanceX = Math.cos(angle) * diffX - Math.sin(angle) * diffY;
      const distanceY = Math.sin(angle) * diffX + Math.cos(angle) * diffY;

      point.dx += distanceX;
      point.dy += distanceY;

      point.dx *= 0.001;
      point.dy *= 0.001;

      const distanceToCenter = euclideanDistance(point.x, point.y, CENTER[0], CENTER[1]);

      const distanceMidX = point.originX - point.x;
      const distanceMidY = point.originY - point.y;

      point.dx += distanceMidX * (distanceToCenter / CANVAS_WIDTH / 2) / 100;
      point.dy += distanceMidY * (distanceToCenter / CANVAS_HEIGHT / 2) / 100;

    }
  }, [])

  const drawCircle = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, RADIUS, 0, 2 * Math.PI);
    ctx.fill();
  }, []);

  return <>
    <canvas
      onMouseMove={(e) => mouseMove(e, [canvasRect.current[0], canvasRect.current[1]])}
      className="mx-auto mt-2" ref={canvasRef} width={RENDERING_WIDTH} height={RENDERING_HEIGHT} >
    </canvas>
  </>;
}
