export type ChapterId =
  | "constellation"
  | "portal"
  | "hero"
  | "philosophy"
  | "projects"
  | "capabilities"
  | "subsystem"
  | "privantrix"
  | "vision"
  | "contact";

export interface ChapterDef {
  id: ChapterId;
  index: number;
  numberStr: string;
  title: string;
  subtitle: string;
  range: [number, number]; // [startProgress, endProgress]
  camPos: [number, number, number];
  camLookAt: [number, number, number];
}

export const STORY_CHAPTERS: ChapterDef[] = [
  {
    id: "constellation",
    index: 0,
    numberStr: "01",
    title: "CONSTELLATION",
    subtitle: "34 Languages • Inside the Starfield • Central Namaste",
    range: [0.00, 0.09],
    camPos: [0, 0, 6.5],
    camLookAt: [0, 0, 0],
  },
  {
    id: "portal",
    index: 1,
    numberStr: "02",
    title: "THE PORTAL",
    subtitle: "Electromagnetic Plasma Arc • Aperture Threshold",
    range: [0.09, 0.18],
    camPos: [0, 0, 1.8],
    camLookAt: [0, 0, -5],
  },
  {
    id: "hero",
    index: 2,
    numberStr: "03",
    title: "ARCHITECT",
    subtitle: "Pranav Kumar Mishra • Autonomous Systems",
    range: [0.18, 0.28],
    camPos: [0, 0, -5.5],
    camLookAt: [0, 0, -10],
  },
  {
    id: "philosophy",
    index: 3,
    numberStr: "04",
    title: "PHILOSOPHY",
    subtitle: "Build. Test. Fail. Measure. Rebuild.",
    range: [0.28, 0.38],
    camPos: [0, 0.5, -16],
    camLookAt: [0, 0, -26],
  },
  {
    id: "projects",
    index: 4,
    numberStr: "05",
    title: "PROJECT UNIVERSE",
    subtitle: "5 Engineered Instruments • 3D Physical Architecture",
    range: [0.38, 0.54],
    camPos: [0, 1.2, -34],
    camLookAt: [0, 0, -40],
  },
  {
    id: "capabilities",
    index: 5,
    numberStr: "06",
    title: "CAPABILITY MACHINE",
    subtitle: "Concentric Mechanical Core • 5 Satellite Engines",
    range: [0.54, 0.68],
    camPos: [0, 0.8, -50],
    camLookAt: [0, 0, -56],
  },
  {
    id: "subsystem",
    index: 6,
    numberStr: "07",
    title: "SUBSYSTEM HARDWARE",
    subtitle: "Inside the Machine • 500Hz Deterministic Loop",
    range: [0.68, 0.80],
    camPos: [0, 0, -68],
    camLookAt: [0, 0, -74],
  },
  {
    id: "privantrix",
    index: 7,
    numberStr: "08",
    title: "PRIVANTRIX AEROSPACE",
    subtitle: "Mach 5.8 Trajectory • Hypersonic Tracking Shot",
    range: [0.80, 0.88],
    camPos: [0, 4.0, -88],
    camLookAt: [0, 12.0, -105],
  },
  {
    id: "vision",
    index: 8,
    numberStr: "09",
    title: "FUTURE SYSTEMS GRAPH",
    subtitle: "Deep Space Research Constellation",
    range: [0.88, 0.94],
    camPos: [0, 8.0, -125],
    camLookAt: [0, 6.0, -138],
  },
  {
    id: "contact",
    index: 9,
    numberStr: "10",
    title: "OPEN CHANNEL",
    subtitle: "Illuminated Beacon • Direct Signal Dispatch",
    range: [0.94, 1.00],
    camPos: [0, 0, -155],
    camLookAt: [0, 0, -165],
  },
];
