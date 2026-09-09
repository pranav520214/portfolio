export interface Project {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  statusType: 'active' | 'validated' | 'prototype' | 'research';
  year: string;
  disciplines: string[];
  summary: string;
  problem: string;
  solution: string;
  architecture: {
    steps: { name: string; desc: string; type: 'input' | 'process' | 'validation' | 'output' }[];
    notes: string;
  };
  results: string[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  externalValidation?: string;
  isFeatured: boolean;
  disclaimer?: string;
}

export interface Achievement {
  id: string;
  code: string;
  date: string;
  title: string;
  organizer: string;
  outcome: string;
  proofId: string;
  proofTitle: string;
  proofImage: string;
  category: 'competition' | 'research' | 'recognition' | 'academic';
  highlight: string;
}

export interface TechItem {
  name: string;
  category: 'AI & ML' | 'Systems & Languages' | 'Embedded & Hardware' | 'Frameworks & Web' | 'Tools & CAD';
  icon: string;
  level: string;
  usageDescription: string;
  color: string;
}

export interface BrainNode {
  id: string;
  label: string;
  category: 'core' | 'ai' | 'systems' | 'embedded' | 'simulation';
  x: number;
  y: number;
  z: number;
  connectedTo: string[];
  projectIds: string[];
  description: string;
}

export const PERSONAL_INFO = {
  name: "Pranav Mishra",
  shortName: "PRANAV",
  role: "AI × Systems × Hardware",
  headline: "I build at the intersection of artificial intelligence, software and engineering systems.",
  school: "Student Engineer",
  location: "Punjab, India",
  github: "https://github.com/pranav520214",
  githubUsername: "pranav520214",
  email: "pranav520214@gmail.com",
  motto: "Ideas. Code. Design. Build. Repeat.",
  subMottos: [
    "Human ideas + AI = bigger possibilities.",
    "Think. Design. Solve.",
    "Learn. Create. Iterate. Improve. Infinite ∞",
    "Better systems, a brighter tomorrow."
  ],
  bio: "I am a student engineer building at the intersection of artificial intelligence, software, and engineering systems. My work focuses on low-latency local speech and language models, embedded microcontroller firmware with real-time sensor fusion, and mechanistic bio-mathematical simulation engines.",
  capabilities: [
    "Local AI & Speech Systems",
    "Desktop Systems & Windows IPC",
    "Embedded Microcontroller Firmware",
    "Sensor Fusion & Control Theory",
    "Dynamic Simulation & ODE Modeling",
    "Hardware Bringup & Rapid Prototyping"
  ]
};

export const SOCIAL_LINKS = {
  instagram: {
    id: "instagram",
    name: "Instagram",
    handle: "@quantav_pranvx_",
    url: "https://www.instagram.com/quantav_pranvx_?stkn=dzMxd3ZuNXU4aG0=",
    tagline: "Behind the Builds • Visual Work • Projects",
    ariaLabel: "Open Pranav's Instagram profile",
    category: "Visual & Behind the Scenes",
    description: "Visual projects, hardware bench tests, and behind-the-scenes engineering documentation.",
    color: "#E1306C"
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    handle: "pranav-kumar-mishra",
    url: "https://www.linkedin.com/in/pranav-kumar-mishra-9981693b8?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    tagline: "Engineering • Research • Professional Network",
    ariaLabel: "Open Pranav's LinkedIn profile",
    category: "Professional & Academic Network",
    description: "Professional engineering profile, project updates, and research collaboration.",
    color: "#0A66C2"
  },
  x: {
    id: "x",
    name: "X",
    handle: "@theaviatorpran",
    url: "https://x.com/theaviatorpran",
    tagline: "Ideas • Building • Tech • Experiments",
    ariaLabel: "Open Pranav's X profile",
    category: "Technical Thoughts & Experiments",
    description: "Technical observations, rapid prototypes, robotics experiments, and engineering commentary.",
    color: "#FFFFFF"
  },
  github: {
    id: "github",
    name: "GitHub",
    handle: "pranav520214",
    url: "https://github.com/pranav520214",
    tagline: "Code Repositories • Open Source",
    ariaLabel: "Open Pranav's GitHub profile",
    category: "Code Repositories",
    description: "Production codebases, open-source models, and embedded hardware firmware.",
    color: "#F59E0B"
  }
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "localflow",
    title: "LocalFlow — Private Desktop Dictation & Prompt Engineering",
    subtitle: "Offline Windows Assistant Powered by NeMo-Speech.cpp & llama.cpp",
    status: "Active Desktop Flagship",
    statusType: "active",
    year: "2026",
    disciplines: ["Local AI", "Desktop Systems", "C++", "Electron"],
    summary: "A private, zero-cloud Windows desktop application providing global push-to-talk speech dictation, grammar cleaning, and structured prompt engineering using local speech and language models.",
    problem: "Cloud-based dictation and prompt engineering tools send sensitive raw audio and proprietary drafts to remote servers, require costly subscriptions, and fail when working offline or under strict privacy constraints.",
    solution: "Engineered an Electron and native C++ desktop client that runs NeMo-Speech.cpp streaming ASR and llama.cpp text refinement entirely on local hardware. Uses a global shortcut (Ctrl+Shift+Space), loopback HTTP IPC (127.0.0.1:8178 and 8179) with ephemeral session keys, and hybrid resource scheduling (GPU for streaming ASR, CPU for LLM editing) to maintain responsive real-time interaction on modest consumer hardware like a GTX 1650 4GB.",
    architecture: {
      steps: [
        { name: "Audio Capture", desc: "16kHz 16-bit PCM microphone capture with ring buffer and global shortcut hook (Ctrl+Shift+Space)", type: "input" },
        { name: "Streaming ASR", desc: "NeMo-Speech.cpp running Nemotron 3.5 ASR Streaming 0.6B Q8 with CUDA acceleration", type: "process" },
        { name: "IPC Orchestration", desc: "Electron main process routing transcript to loopback server (127.0.0.1:8179) via ephemeral bearer token", type: "process" },
        { name: "Prompt Refinement", desc: "llama.cpp executing Qwen3 1.7B Q8_0 on CPU with mode dispatch (Transcribe, Clean, Prompt Engineer)", type: "process" },
        { name: "System Injection", desc: "Automated clipboard injection and OS-level keystroke delivery into active application", type: "output" }
      ],
      notes: "Process isolation ensures that if a model worker crashes, the Electron shell safely restarts the backend without data loss."
    },
    results: [
      "Sub-400ms end-to-end transcription and prompt generation on consumer hardware",
      "Zero cloud dependencies: 100% private audio processing and local prompt transformation",
      "Engineered for modest 4GB VRAM GPUs via dual-engine hybrid GPU/CPU allocation"
    ],
    techStack: ["Electron", "Node.js", "C++", "NeMo-Speech.cpp", "llama.cpp", "CUDA", "Windows API"],
    githubUrl: "https://github.com/pranav520214/LocalFlow",
    isFeatured: true
  },
  {
    id: "autostabi",
    title: "AUTOSTABI — Flight Stabilizer",
    subtitle: "Experimental Fixed-Wing Flight Stabilization Firmware with WebSocket Ground Station",
    status: "Experimental Flight Firmware",
    statusType: "prototype",
    year: "2026",
    disciplines: ["Embedded Systems", "Avionics", "Control Theory", "C++"],
    summary: "An experimental fixed-wing flight stabilization firmware engineered for ESP32 and MPU6500 IMU, featuring IBus RC input decoding, servo mixing, and real-time browser-based WebSocket telemetry.",
    problem: "Commercial flight controllers are often closed black boxes that prevent custom aerodynamic experimentation, sensor fusion debugging, and lightweight live browser telemetry without proprietary software.",
    solution: "Built custom ESP32 firmware running a 500Hz attitude estimation loop with MPU6500 IMU sensing, IBus digital RC receiver decoding on HardwareSerial, programmable servo mixing for 5 channels, and a built-in WiFi Access Point hosting an HTML5 WebSocket ground station.",
    architecture: {
      steps: [
        { name: "IMU Sensing", desc: "MPU6500 6-DOF gyro & accelerometer data sampled at 500Hz via I2C (GPIO 21 SDA, GPIO 22 SCL)", type: "input" },
        { name: "RC Receiver Decoding", desc: "FlySky FS-i6 IBus digital protocol decoded on Serial2 (GPIO 16) at 115200 baud", type: "process" },
        { name: "Sensor Fusion & PID", desc: "Attitude state estimation fusing gyro angular rate and gravity vector for pitch/roll servo stabilization", type: "process" },
        { name: "PWM Servo Mixing", desc: "5-channel PWM outputs (GPIO 18, 19, 23, 5, 4) driving aileron, elevator, and rudder surfaces", type: "validation" },
        { name: "Ground Station Telemetry", desc: "ESP32 AP hosting HTTP server (port 80) and WebSocket broadcast (port 81) at 50ms intervals", type: "output" }
      ],
      notes: "Telemetry web UI runs entirely from ESP32 flash memory, requiring no external internet connection."
    },
    results: [
      "Experimental stabilization firmware tested on bench rig with simulated dynamic perturbations",
      "20Hz bidirectional telemetry streaming attitude, receiver channels, and servo states to mobile/desktop browser",
      "Dedicated FreeRTOS tasks separating high-frequency control loops from network telemetry"
    ],
    techStack: ["ESP32", "C++", "Arduino", "MPU6500", "IBusBM", "WebSockets", "HTML5 Canvas"],
    githubUrl: "https://github.com/pranav520214/autostabi-esp32-mpu6500-flight-stabilizer",
    isFeatured: true,
    disclaimer: "Experimental prototype: flight readiness or airworthiness certification is explicitly not established. Intended strictly for bench testing and low-risk test airframes."
  },
  {
    id: "wand-mouse",
    title: "ESP32 BLE Wand Mouse",
    subtitle: "Motion-Controlled Bluetooth LE Air Mouse with Gesture & Touch Click Sensing",
    status: "Working Hardware Prototype",
    statusType: "active",
    year: "2026",
    disciplines: ["Embedded Hardware", "BLE HID", "Human Interface", "C++"],
    summary: "A handheld Bluetooth LE air mouse built with an ESP32 and MPU6500 6-axis IMU, featuring Kalman-filtered motion translation, an optical touch click sensor, and persistent flash calibration.",
    problem: "Traditional optical desktop mice require flat surfaces, while generic presenter remotes lack fluid multi-axis analog cursor precision, configurable deadzones, and gesture ergonomics.",
    solution: "Designed a handheld wand combining an ESP32 microcontroller with an MPU6500 IMU. Angular velocities are filtered, scaled, and translated into Bluetooth HID cursor movement, complemented by an active-LOW optical touch sensor on GPIO 27 for tap clicks, drag holds, and gesture detection. Gyro calibration offsets are saved to ESP32 Preferences flash storage.",
    architecture: {
      steps: [
        { name: "6-DOF Motion Capture", desc: "Continuous 3-axis gyro and accelerometer sampling from MPU6500 over I2C", type: "input" },
        { name: "Digital Filtering & Deadzone", desc: "Kalman state filtering and dynamic deadzone processing to eliminate hand tremor", type: "process" },
        { name: "Optical Click Detection", desc: "Active-LOW IR touch sensor on GPIO 27 with debounced state machine (tap, drag, drop)", type: "process" },
        { name: "Non-Volatile Calibration", desc: "Zero-rate gyro bias offsets computed at boot and stored persistently via ESP32 Preferences", type: "validation" },
        { name: "BLE HID Transmission", desc: "Standard Bluetooth LE Mouse HID reports transmitted to host PC with zero driver installation", type: "output" }
      ],
      notes: "Standard BLE HID implementation makes the wand universally compatible across Windows, macOS, Linux, and Android."
    },
    results: [
      "Smooth analog 2D cursor steering across desktop and presentation displays",
      "Native driverless Bluetooth HID pairing on Windows, macOS, Linux, and Android",
      "Touch-activated drag-and-drop and gesture shortcuts with low-latency responsiveness"
    ],
    techStack: ["ESP32", "C++", "MPU6500", "BLE HID (BleMouse)", "Preferences (NVS)", "IR Sensing"],
    githubUrl: "https://github.com/pranav520214/esp32-ble-wand-mouse",
    isFeatured: true
  },
  {
    id: "privaveda",
    title: "PRIVAVEDA — Mechanistic Simulation Engine",
    subtitle: "Local-First Mechanistic Dynamic Simulation, Bayesian Calibration & Uncertainty Analysis",
    status: "Research Prototype",
    statusType: "research",
    year: "2026",
    disciplines: ["Scientific Computing", "Dynamic Simulation", "Bayesian Methods", "Python"],
    summary: "A local-first research prototype for mechanistic bio-mathematical simulation, solving coupled ordinary differential equations with Bayesian parameter calibration and Monte Carlo uncertainty analysis.",
    problem: "Biophysical and pharmacokinetic modeling platforms typically rely on proprietary cloud platforms that expose proprietary formulation data, lack dimensional unit verification, and don't provide rigorous parameter uncertainty estimation.",
    solution: "Constructed a local Python simulation core utilizing SciPy's solve_ivp (Radau / BDF / RK45) for stiff ODE dynamics, Pint for strict physical unit enforcement, NetworkX for compartmental topologies, and Bayesian MAP estimation for parameter fitting with Monte Carlo uncertainty bands. Secured with local AES-256-GCM encrypted storage.",
    architecture: {
      steps: [
        { name: "Compartmental Graph", desc: "Multi-compartment mechanistic graph constructed using NetworkX with flow rate boundaries", type: "input" },
        { name: "Dimensional Unit Validation", desc: "Strict physical unit consistency checking via Pint before numerical integration", type: "process" },
        { name: "Stiff ODE Solver", desc: "Coupled non-linear differential equations solved via SciPy solve_ivp (Radau / BDF algorithms)", type: "process" },
        { name: "Bayesian Calibration", desc: "MAP parameter estimation using bounded optimization (scipy.optimize.minimize L-BFGS-B)", type: "validation" },
        { name: "Uncertainty & Vault", desc: "Monte Carlo stochastic error propagation with local AES-256-GCM encrypted database storage", type: "output" }
      ],
      notes: "Strict separation between deterministic ODE integration math and local encrypted persistence."
    },
    results: [
      "Rigorous numerical benchmark validation on synthetic pharmacokinetic reference models",
      "100% offline, zero-cloud execution with local encrypted artifact storage",
      "Quantified confidence intervals generated through automated Monte Carlo uncertainty propagation"
    ],
    techStack: ["Python 3.11", "NumPy", "SciPy (solve_ivp)", "NetworkX", "Pint", "Cryptography (AES-256-GCM)", "Pytest"],
    githubUrl: "https://github.com/pranav520214/privaveda",
    isFeatured: true,
    disclaimer: "Research simulation prototype: strictly not validated for direct patient care, clinical diagnosis, or medical dosing decisions."
  },
  {
    id: "fpv-controller",
    title: "FS-i6X BLE FPV Controller",
    subtitle: "ESP32 Hardware Bridge Converting FlySky PPM Output to Bluetooth LE Gamepad",
    status: "Working Hardware Utility",
    statusType: "active",
    year: "2026",
    disciplines: ["Embedded Systems", "Signal Processing", "BLE HID", "C++"],
    summary: "An ESP32 hardware bridge converting PPM signals from the FlySky FS-i6X RC transmitter trainer port into a wireless Bluetooth LE gamepad for FPV drone flight simulators.",
    problem: "RC pilots practicing on PC drone simulators (Liftoff, Velocidrone) are tethered by cumbersome USB cables, audio-jack dongles, or proprietary adapters that introduce signal jitter and driver conflicts.",
    solution: "Engineered an ultra-compact ESP32 adapter that captures raw PPM pulses from the 3.5mm trainer port using microsecond hardware rising-edge interrupts on GPIO 4. The firmware detects sync frames, decodes 6 analog channels, scales them to standard 16-bit joystick axes, and advertises as a native BLE HID Gamepad with a 250ms failsafe timeout.",
    architecture: {
      steps: [
        { name: "Signal Conditioning", desc: "Trainer port PPM pulse stream fed into ESP32 GPIO 4 with inline current-limiting resistor", type: "input" },
        { name: "Microsecond Interrupt", desc: "Hardware rising-edge interrupt timer measuring exact pulse widths (1000µs–2000µs)", type: "process" },
        { name: "Sync Frame Alignment", desc: "Frame boundary identification using >3000µs separation pulse to prevent channel desynchronization", type: "process" },
        { name: "Channel-to-Axis Mapping", desc: "PPM channels mapped to Roll (X), inverted Pitch (Y), Throttle (RX), Yaw (Z), and switch buttons", type: "validation" },
        { name: "Failsafe & BLE Dispatch", desc: "250ms timeout centering axes on disconnect; BLE HID Gamepad packet transmission", type: "output" }
      ],
      notes: "Microsecond interrupt handling bypasses polling delays for immediate sub-millisecond stick response."
    },
    results: [
      "Low-latency wireless bridge for FPV flight simulators (Liftoff, Velocidrone, Uncrashed)",
      "Hardware interrupt-driven pulse capture achieving microsecond timing fidelity",
      "Plug-and-play operation with no host computer drivers required"
    ],
    techStack: ["ESP32", "C++", "GPIO Interrupts", "BLE HID Gamepad", "Signal Processing", "FreeRTOS"],
    githubUrl: "https://github.com/pranav520214/esp32-fsi6x-ble-fpv-controller",
    isFeatured: true
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "A01",
    code: "LOG A01 // 2026.04",
    date: "April 2026",
    title: "STEM-A-THON 2026 — Top Young Innovator of India",
    organizer: "Robocraze",
    outcome: "Rank #56 Nationwide · Awarded 'Top Young Innovator of India' Certificate",
    proofId: "P01",
    proofTitle: "STEM-A-THON 2026 Certificate",
    proofImage: "/certificates/proof-stem-a-thon.jpg",
    category: "competition",
    highlight: "Ranked #56 across India for excellence in STEM innovation, creativity, and hands-on engineering execution."
  },
  {
    id: "A02",
    code: "LOG A02 // 2026.03",
    date: "March 2026",
    title: "Indian Space Olympiad 2026 — Advanced Level",
    organizer: "Indian Space School",
    outcome: "92nd Percentile · Advanced Level AIR 47 · Class XI Grade AIR 24 · Invited to Young Space Scientist Workshop",
    proofId: "P02",
    proofTitle: "Indian Space Olympiad Official Scorecard",
    proofImage: "/certificates/proof-space-olympiad.png",
    category: "recognition",
    highlight: "Achieved 92nd percentile nationwide; invited to the Young Space Scientist Workshop with premier space researchers."
  },
  {
    id: "A03",
    code: "LOG A03 // 2026.01",
    date: "January 2026",
    title: "Confluence 2.0 International Innovation Hackathon",
    organizer: "Confluence 2.0 / The Helpers",
    outcome: "Recognized as Top 100 Participant for Innovative Problem-Solving",
    proofId: "P04",
    proofTitle: "Confluence 2.0 Achievement Record",
    proofImage: "/certificates/proof-confluence-hackathon.png",
    category: "competition",
    highlight: "Selected into the Top 100 globally for technical contribution and problem-solving architecture."
  },
  {
    id: "A04",
    code: "LOG A04 // 2026.01",
    date: "January 2026",
    title: "Vibe2Ship — India's Biggest Vibe Coding Hackathon",
    organizer: "Coding Ninjas with Google for Developers",
    outcome: "Certificate of Participation for AI Solution Building",
    proofId: "P03",
    proofTitle: "Vibe2Ship Official Certificate",
    proofImage: "/certificates/proof-vibe2ship.png",
    category: "competition",
    highlight: "Built rapid AI-assisted software prototypes under competitive 24-hour shipping constraints."
  },
  {
    id: "A05",
    code: "LOG A05 // 2026.01",
    date: "January 2026",
    title: "Samsung Solve for Tomorrow 2026",
    organizer: "Samsung",
    outcome: "Selected Participant in National Innovation Program",
    proofId: "P07",
    proofTitle: "Samsung Solve for Tomorrow Record",
    proofImage: "/certificates/proof-samsung-learnix-devengers.png",
    category: "competition",
    highlight: "Engineered community problem-solving hardware concept targeting youth innovation."
  },
  {
    id: "A13",
    code: "LOG A13 // 2026.01",
    date: "January 2026",
    title: "AI for Bharat Hackathon 2026 — Eliminator Round",
    organizer: "IIIT Delhi / Unstop",
    outcome: "Official Participation — 'Build AI Solutions for India's Real Problems'",
    proofId: "Cert01",
    proofTitle: "IIIT Delhi AI for Bharat Certificate",
    proofImage: "/certificates/cert-ai-for-bharat.png",
    category: "competition",
    highlight: "Formulated and submitted AI-driven societal problem-solving architecture in competition with engineering teams."
  },
  {
    id: "A07",
    code: "LOG A07 // 2026.01",
    date: "January 2026",
    title: "DEVENGERS PromptWars 2026",
    organizer: "DEVENGERS",
    outcome: "Full-Stack Rapid Prototype Engineering Participant",
    proofId: "Cert03",
    proofTitle: "DEVENGERS PromptWars Certificate",
    proofImage: "/certificates/cert-promptwars-devengers.png",
    category: "competition",
    highlight: "Rapidly engineered full-stack interactive prototype within strict hackathon constraints."
  },
  {
    id: "A14",
    code: "LOG A14 // 2026.01",
    date: "January 2026",
    title: "The ₹100 Founder Challenge — Startup Blueprint",
    organizer: "TechVerse Solutions / Unstop",
    outcome: "Participation in Startup Blueprint Submission Stage",
    proofId: "Cert02",
    proofTitle: "The ₹100 Founder Challenge Certificate",
    proofImage: "/certificates/cert-100-rupee-founder.png",
    category: "competition",
    highlight: "Formulated lean technical feasibility blueprint for scalable student-built hardware."
  }
];

export const TECH_STACK: TechItem[] = [
  {
    name: "Python",
    category: "AI & ML",
    icon: "python",
    level: "Advanced",
    usageDescription: "Mechanistic ODE simulations with SciPy solve_ivp, Bayesian MAP calibration, and Pint unit checking in PRIVAVEDA.",
    color: "#3776AB"
  },
  {
    name: "C++",
    category: "Systems & Languages",
    icon: "cpp",
    level: "Advanced",
    usageDescription: "High-frequency ESP32 avionics loops (500Hz), MPU6500 IMU drivers, and low-latency BLE HID controllers.",
    color: "#00599C"
  },
  {
    name: "TypeScript",
    category: "Systems & Languages",
    icon: "typescript",
    level: "Advanced",
    usageDescription: "Primary language for desktop shells, Electron IPC architecture, and interactive engineering frontends.",
    color: "#3178C6"
  },
  {
    name: "NeMo-Speech & llama.cpp",
    category: "AI & ML",
    icon: "terminal",
    level: "Advanced",
    usageDescription: "Local streaming ASR (Nemotron 3.5 0.6B Q8) and local language models (Qwen3 1.7B Q8_0) running without cloud APIs.",
    color: "#F59E0B"
  },
  {
    name: "ESP32 & FreeRTOS",
    category: "Embedded & Hardware",
    icon: "cpu",
    level: "Advanced",
    usageDescription: "Flight stabilizer avionics, microsecond GPIO rising-edge interrupts, and BLE HID peripheral firmware.",
    color: "#E7352C"
  },
  {
    name: "MPU6500 IMU & Kalman",
    category: "Embedded & Hardware",
    icon: "activity",
    level: "Advanced",
    usageDescription: "6-DOF IMU sensor fusion, Kalman attitude estimation, and gyro drift calibration stored in non-volatile flash.",
    color: "#4ADE80"
  },
  {
    name: "Electron",
    category: "Frameworks & Web",
    icon: "layout",
    level: "Advanced",
    usageDescription: "Desktop shell orchestrating native background C++ inference servers with loopback HTTP IPC and session authentication.",
    color: "#47848F"
  },
  {
    name: "Next.js & React",
    category: "Frameworks & Web",
    icon: "globe",
    level: "Advanced",
    usageDescription: "High-performance full-stack web applications, telemetry dashboards, and interactive portfolio systems.",
    color: "#FFFFFF"
  },
  {
    name: "SciPy & NumPy",
    category: "AI & ML",
    icon: "database",
    level: "Advanced",
    usageDescription: "Stiff ordinary differential equation solvers (Radau/BDF), numerical Jacobians, and Monte Carlo stochastic modeling.",
    color: "#8CAAE6"
  },
  {
    name: "Git & GitHub",
    category: "Tools & CAD",
    icon: "git",
    level: "Advanced",
    usageDescription: "Version control, branching workflows, release packaging, and open-source project management.",
    color: "#F05032"
  }
];

export const BRAIN_NODES: BrainNode[] = [
  {
    id: "core",
    label: "PRANAV // CORE",
    category: "core",
    x: 0,
    y: 0,
    z: 0,
    connectedTo: ["ai", "systems", "embedded", "simulation"],
    projectIds: ["localflow", "autostabi", "wand-mouse", "privaveda", "fpv-controller"],
    description: "Interdisciplinary nexus combining local AI inference, desktop systems, embedded microcontrollers, and simulation."
  },
  {
    id: "ai",
    label: "LOCAL AI & ASR",
    category: "ai",
    x: -3,
    y: 1.8,
    z: 0.5,
    connectedTo: ["core", "systems"],
    projectIds: ["localflow"],
    description: "Low-latency streaming ASR with NeMo-Speech.cpp and local LLM refinement with llama.cpp."
  },
  {
    id: "systems",
    label: "DESKTOP SYSTEMS",
    category: "systems",
    x: 3,
    y: 1.8,
    z: -0.5,
    connectedTo: ["core", "ai"],
    projectIds: ["localflow"],
    description: "Electron process isolation, Windows global hotkeys, loopback IPC, and hybrid GPU/CPU resource allocation."
  },
  {
    id: "embedded",
    label: "EMBEDDED & AVIONICS",
    category: "embedded",
    x: -2.5,
    y: -2.5,
    z: -0.8,
    connectedTo: ["core"],
    projectIds: ["autostabi", "wand-mouse", "fpv-controller"],
    description: "ESP32 firmware, MPU6500 IMU sensor fusion, Kalman filtering, PPM interrupts, and BLE HID devices."
  },
  {
    id: "simulation",
    label: "DYNAMIC SIMULATION",
    category: "simulation",
    x: 2.5,
    y: -2.5,
    z: 0.8,
    connectedTo: ["core"],
    projectIds: ["privaveda"],
    description: "Mechanistic ODE systems, SciPy solve_ivp stiff solvers, Bayesian calibration, and Monte Carlo uncertainty."
  }
];
