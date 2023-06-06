interface Point {
  x: number;
  y: number;
}

interface Shape {
  name: string;
  clip: string;
  points: Point[];
}

const shapes: Shape[] = [
  {
    name: "triangle",
    clip: "polygon",
    points: [
      { x: 50, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ],
  },
  {
    name: "trapezoid",
    clip: "polygon",
    points: [
      { x: 25, y: 0 },
      { x: 75, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ],
  },
  {
    name: "parallelogram",
    clip: "polygon",
    points: [
      { x: 25, y: 0 },
      { x: 100, y: 0 },
      { x: 75, y: 100 },
      { x: 0, y: 100 },
    ],
  },
  {
    name: "rhombus",
    clip: "polygon",
    points: [
      { x: 50, y: 0 },
      { x: 100, y: 50 },
      { x: 50, y: 100 },
      { x: 0, y: 50 },
    ],
  },
  {
    name: "pentagon",
    clip: "polygon",
    points: [
      { x: 50, y: 0 },
      { x: 100, y: 30 },
      { x: 80, y: 100 },
      { x: 20, y: 100 },
      { x: 0, y: 30 },
    ],
  },
  {
    name: "hexagon",
    clip: "polygon",
    points: [
      { x: 25, y: 0 },
      { x: 75, y: 0 },
      { x: 100, y: 50 },
      { x: 75, y: 100 },
      { x: 25, y: 100 },
      { x: 0, y: 50 },
    ],
  },
  {
    name: "heptagon",
    clip: "polygon",
    points: [
      { x: 50, y: 0 },
      { x: 95, y: 20 },
      { x: 100, y: 65 },
      { x: 75, y: 100 },
      { x: 25, y: 100 },
      { x: 0, y: 65 },
      { x: 5, y: 20 },
    ],
  },
  {
    name: "octagon",
    clip: "polygon",
    points: [
      { x: 30, y: 0 },
      { x: 70, y: 0 },
      { x: 100, y: 30 },
      { x: 100, y: 70 },
      { x: 70, y: 100 },
      { x: 30, y: 100 },
      { x: 0, y: 70 },
      { x: 0, y: 30 },
    ],
  },
  {
    name: "nonagon",
    clip: "polygon",
    points: [
      { x: 50, y: 0 },
      { x: 83, y: 12 },
      { x: 100, y: 43 },
      { x: 94, y: 78 },
      { x: 68, y: 100 },
      { x: 32, y: 100 },
      { x: 6, y: 78 },
      { x: 0, y: 43 },
      { x: 17, y: 12 },
    ],
  },
  {
    name: "decagon",
    clip: "polygon",
    points: [
      { x: 50, y: 0 },
      { x: 75, y: 7 },
      { x: 92, y: 25 },
      { x: 100, y: 50 },
      { x: 92, y: 75 },
      { x: 75, y: 93 },
      { x: 50, y: 100 },
      { x: 25, y: 93 },
      { x: 8, y: 75 },
      { x: 0, y: 50 },
      { x: 8, y: 25 },
      { x: 25, y: 7 },
    ],
  },
  {
    name: "bevel",
    clip: "polygon",
    points: [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ],
  },
  {
    name: "rabbet",
    clip: "polygon",
    points: [
      { x: 0, y: 0 },
      { x: 80, y: 0 },
      { x: 100, y: 20 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ],
  },
  {
    name: "left arrow",
    clip: "polygon",
    points: [
      { x: 0, y: 50 },
      { x: 70, y: 0 },
      { x: 70, y: 30 },
      { x: 100, y: 30 },
      { x: 100, y: 70 },
      { x: 70, y: 70 },
      { x: 70, y: 100 },
    ],
  },
  {
    name: "right arrow",
    clip: "polygon",
    points: [
      { x: 0, y: 30 },
      { x: 30, y: 30 },
      { x: 30, y: 0 },
      { x: 100, y: 50 },
      { x: 30, y: 100 },
      { x: 30, y: 70 },
      { x: 0, y: 70 },
    ],
  },
  {
    name: "left point",
    clip: "polygon",
    points: [
      { x: 0, y: 50 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
    ],
  },
  {
    name: "right point",
    clip: "polygon",
    points: [
      { x: 0, y: 0 },
      { x: 100, y: 50 },
      { x: 0, y: 100 },
    ],
  },
  {
    name: "left chevron",
    clip: "polygon",
    points: [
      { x: 100, y: 0 },
      { x: 75, y: 50 },
      { x: 100, y: 100 },
      { x: 25, y: 100 },
      { x: 0, y: 50 },
      { x: 25, y: 0 },
    ],
  },
  {
    name: "right chevron",
    clip: "polygon",
    points: [
      { x: 75, y: 0 },
      { x: 100, y: 50 },
      { x: 75, y: 100 },
      { x: 0, y: 100 },
      { x: 25, y: 50 },
      { x: 0, y: 0 },
    ],
  },
  {
    name: "star",
    clip: "polygon",
    points: [
      { x: 50, y: 0 },
      { x: 61, y: 35 },
      { x: 98, y: 35 },
      { x: 68, y: 57 },
      { x: 79, y: 91 },
      { x: 50, y: 70 },
      { x: 21, y: 91 },
      { x: 32, y: 57 },
      { x: 2, y: 35 },
      { x: 39, y: 35 },
    ],
  },
  {
    name: "message",
    clip: "polygon",
    points: [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 75 },
      { x: 75, y: 75 },
      { x: 75, y: 100 },
      { x: 50, y: 75 },
      { x: 0, y: 75 },
    ],
  },
  {
    name: "close",
    clip: "polygon",
    points: [
      { x: 20, y: 0 },
      { x: 0, y: 20 },
      { x: 30, y: 50 },
      { x: 0, y: 80 },
      { x: 20, y: 100 },
      { x: 50, y: 70 },
      { x: 80, y: 100 },
      { x: 100, y: 80 },
      { x: 70, y: 50 },
      { x: 100, y: 20 },
      { x: 80, y: 0 },
      { x: 50, y: 30 },
    ],
  },
  {
    name: "frame",
    clip: "polygon",
    points: [
      { x: 0, y: 0 },
      { x: 0, y: 100 },
      { x: 25, y: 100 },
      { x: 25, y: 25 },
      { x: 75, y: 25 },
      { x: 75, y: 75 },
      { x: 25, y: 75 },
      { x: 25, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 0 },
    ],
  },
];

export { shapes };
export type { Shape, Point };