export type SpatialState =
  | "MAP"
  | "TRAVEL_ENGINEERING"
  | "ENGINEERING_PORTAL"
  | "ENTER_STREET"
  | "ENGINEERING_STREET"
  | "PROJECT_INSPECT"
  | "EXIT_STREET";

export interface MapNodeDef {
  id: string;
  name: string;
  category: string;
  pos: [number, number, number];
  color: string;
  accent: string;
  isUnlocked: boolean;
  isExplored: boolean;
}

export interface StreetProjectDef {
  slug: string;
  title: string;
  domain: string;
  pos: [number, number, number]; // [X, Y, Z] along the street
  color: string;
  badge: string;
  layers: { name: string; zOffset: number; color: string; desc: string }[];
  question: string;
  constraint: string;
  implementation: string[];
  githubUrl: string;
}

export const MAP_NODES: MapNodeDef[] = [
  {
    id: "identity",
    name: "IDENTITY // ARCHITECT",
    category: "FOUNDATION",
    pos: [-4.5, 2.5, 0],
    color: "#FFFFFF",
    accent: "#FF6A2A",
    isUnlocked: true,
    isExplored: true,
  },
  {
    id: "engineering",
    name: "ENGINEERING DISTRICT",
    category: "PRIMARY GATEWAY",
    pos: [0, 0, 0],
    color: "#FF6A2A",
    accent: "#FFC84A",
    isUnlocked: true,
    isExplored: false,
  },
  {
    id: "research",
    name: "RESEARCH ARCHIVE",
    category: "THEORY & NOTES",
    pos: [4.5, 2.0, -2.5],
    color: "#38BDF8",
    accent: "#7DD3FC",
    isUnlocked: true,
    isExplored: false,
  },
  {
    id: "privantrix",
    name: "PRIVANTRIX AEROSPACE",
    category: "HYPERSONICS",
    pos: [-3.8, -2.8, -4],
    color: "#F97316",
    accent: "#FF9E79",
    isUnlocked: true,
    isExplored: false,
  },
  {
    id: "vision",
    name: "FUTURE SYSTEMS GRAPH",
    category: "TOPOLOGY",
    pos: [3.8, -3.0, -6],
    color: "#8D72FF",
    accent: "#DDD6FE",
    isUnlocked: true,
    isExplored: false,
  },
  {
    id: "contact",
    name: "OPEN CHANNEL",
    category: "TERMINAL BEACON",
    pos: [0, -5.0, -8],
    color: "#10B981",
    accent: "#6EE7B7",
    isUnlocked: true,
    isExplored: false,
  },
];

export const STREET_PROJECTS: StreetProjectDef[] = [
  {
    slug: "localflow",
    title: "LocalFlow",
    domain: "STREAMING ASR & ON-DEVICE AI",
    pos: [-3.4, 1.2, -18],
    color: "#FFC84A",
    badge: "118ms • 3.2GB VRAM",
    question: "Can continuous sub-120ms speech recognition run entirely on consumer GPUs without cloud dependencies?",
    constraint: "Strict 4096MB VRAM budget • 0ms audio chunk drop • Zero network egress",
    implementation: [
      "Non-blocking Circular Audio Ring Buffer (16kHz 16-bit PCM)",
      "Streaming Voice Activity Detection (VAD) with dynamic SNR thresholding",
      "Quantized NeMo-Speech.cpp C++ inference core with CUDA acceleration",
      "Named-pipe IPC streaming transcripts to desktop window handles with sub-microsecond latency",
    ],
    githubUrl: "https://github.com/pranav520214/localflow",
    layers: [
      { name: "Audio Ring Buffer", zOffset: 1.2, color: "#FFE599", desc: "16kHz DMA Audio Stream" },
      { name: "Streaming VAD Engine", zOffset: 0.6, color: "#FFD166", desc: "Energy & Zero-Crossing Filter" },
      { name: "NeMo-Speech.cpp Core", zOffset: 0.0, color: "#FFC84A", desc: "C++ CUDA Fast-Conformer Engine" },
      { name: "Pinned VRAM Memory", zOffset: -0.6, color: "#F59E0B", desc: "3.2GB Isolated GPU Pool" },
      { name: "Local IPC Protocol", zOffset: -1.2, color: "#D97706", desc: "Zero-lag Desktop Injection" },
    ],
  },
  {
    slug: "autostabi",
    title: "AUTOSTABI",
    domain: "FIXED-WING DETERMINISTIC AVIONICS",
    pos: [3.4, 1.2, -38],
    color: "#FF6A2A",
    badge: "500Hz REALTIME PID",
    question: "How can attitude estimation maintain 500Hz loop determinism under aerodynamic turbulence on microcontrollers?",
    constraint: "Loop execution jitter < 8µs • Zero dynamic heap allocation • FreeRTOS Core 0 isolation",
    implementation: [
      "MPU6500 6-DOF IMU sampled at 500Hz over 400kHz Fast-Mode I2C with non-blocking DMA",
      "Madgwick quaternion attitude filter executed in 0.4ms fixed-time windows",
      "Cascaded Proportional-Integral-Derivative control loops computing elevon deflection angles",
      "Hardware LEDC PWM timers pulsing digital servos with sub-microsecond edge precision",
    ],
    githubUrl: "https://github.com/pranav520214/autostabi",
    layers: [
      { name: "MPU6500 6-DOF IMU", zOffset: 1.2, color: "#FF9E79", desc: "400kHz Fast-Mode I2C Bus" },
      { name: "FlySky iBUS Receiver", zOffset: 0.6, color: "#FF7E47", desc: "115200 Baud Hardware Ring Buffer" },
      { name: "ESP32 Core 0 (PID)", zOffset: 0.0, color: "#FF6A2A", desc: "500Hz FreeRTOS Fixed Frequency" },
      { name: "LEDC PWM Generator", zOffset: -0.6, color: "#EA580C", desc: "Sub-microsecond Timer Edges" },
      { name: "Control Surfaces", zOffset: -1.2, color: "#C2410C", desc: "High-Torque Aerodynamic Servos" },
    ],
  },
  {
    slug: "wand-mouse",
    title: "Wand Mouse",
    domain: "6-DOF SPATIAL INERTIAL CONTROLLER",
    pos: [-3.4, 1.2, -58],
    color: "#43D8FF",
    badge: "OPTICAL CLICK • ZERO TRAVEL",
    question: "Can 6-DOF spatial pointing eliminate mechanical switch latency while avoiding wireless report jitter?",
    constraint: "Zero mechanical debounce latency • 100Hz BLE HID report rate • Drift-free gyro bias",
    implementation: [
      "ICM-20948 low-noise inertial measurement unit with hardware DMP sensor fusion",
      "Infrared photointerrupter beam trigger providing zero-travel optical click detection",
      "ESP32-C3 RISC-V microcontroller executing low-power BLE HID mouse report descriptor",
      "Adaptive Kalman velocity integration mapping angular rates to sub-pixel cursor coordinates",
    ],
    githubUrl: "https://github.com/pranav520214/wand-mouse",
    layers: [
      { name: "Optical Beam Trigger", zOffset: 1.2, color: "#BAE6FD", desc: "Zero-travel Photointerrupter" },
      { name: "ICM-20948 Sensor", zOffset: 0.6, color: "#7DD3FC", desc: "Low-noise 6-DOF Motion Fusion" },
      { name: "ESP32-C3 Firmware", zOffset: 0.0, color: "#43D8FF", desc: "RISC-V Real-time HID Stack" },
      { name: "BLE Radio Stack", zOffset: -0.6, color: "#0284C7", desc: "100Hz HID Mouse Report Frames" },
      { name: "Ergonomic Chassis", zOffset: -1.2, color: "#0369A1", desc: "Carbon Fiber Handheld Wand" },
    ],
  },
];
