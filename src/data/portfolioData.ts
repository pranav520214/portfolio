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
  category: 'core' | 'ai' | 'systems' | 'embedded' | 'aerospace';
  x: number;
  y: number;
  z: number;
  connectedTo: string[];
  projectIds: string[];
  description: string;
}

export const PERSONAL_INFO = {
  name: "Pranav Kumar Mishra",
  shortName: "PRANAV",
  role: "AI Researcher · Embedded Systems & Aerospace Builder",
  headline: "CS + AI + ENGINEERING DESIGN",
  school: "Class XI (Non-Medical)",
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
  bio: "I am a Class XI student builder who learns by turning difficult technical questions into working prototypes. My work spans compact multilingual speech recognition models, verification-first software assurance agents, embedded flight controllers with Kalman filtering, and electromagnetic aerospace architectures. I believe in honest prototypes, logged experiments, and engineering from first principles.",
  capabilities: [
    "AI / ML & Local SLMs",
    "Data Structures & Algorithms",
    "System Design & Architecture",
    "Embedded Hardware & Avionics",
    "Aerospace & CAD Modeling",
    "Product Building & UI Engineering"
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
    description: "Professional engineering profile, research outreach, and academic collaboration updates.",
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
    description: "Technical thoughts, rapid prototypes, robotics experiments, and engineering commentary.",
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
    description: "Production codebases, open-source models, and hardware schematics.",
    color: "#F05032"
  }
};


export const FEATURED_PROJECTS: Project[] = [
  {
    id: "rudra-sentinel",
    title: "Rudra Sentinel — Verification-First Software Assurance",
    subtitle: "Local Small-Model Repository-Aware Vulnerability Analysis and Safer Code Repair",
    status: "Active Research · Verification-First Architecture",
    statusType: "research",
    year: "2026",
    disciplines: ["AI / Safety", "Systems Security", "Static Analysis", "Local SLMs"],
    summary: "A local, resource-constrained small language model system designed for repository-aware vulnerability triage and verifiable code repair without cloud leaks.",
    problem: "Existing LLM-based repair engines hallucinate patches, ignore repository-wide build systems, and frequently introduce secondary security vulnerabilities without concrete validation.",
    solution: "A closed-loop verification architecture combining CWE-guided retrieval, abstract syntax tree checks, compiler feedback, containerized sandbox testing, and human sign-off before accepting any repair.",
    architecture: {
      steps: [
        { name: "Repository Ingestion", desc: "Tree-sitter AST extraction and symbol dependency resolution", type: "input" },
        { name: "CWE Retrieval", desc: "Targeted vulnerability pattern matching and security constraints", type: "process" },
        { name: "Local SLM Synthesis", desc: "Quantized LLaMA/Mistral generating candidate micro-patches", type: "process" },
        { name: "Compiler & AST Gate", desc: "Static syntax validation and compilation check in clean environment", type: "validation" },
        { name: "Containerized Sandbox", desc: "Unit test execution and dynamic payload reproduction testing", type: "validation" },
        { name: "Human Approval Gate", desc: "Cryptographic diff sign-off before applying to repository branch", type: "output" }
      ],
      notes: "Ablation study evaluating model-only patch acceptance against the multi-tool feedback verification loop."
    },
    results: [
      "Rigorous evaluation protocol focusing on model-only vs multi-tool-feedback ablations",
      "Runs fully locally on constrained consumer hardware with zero code exfiltration"
    ],
    techStack: ["Python", "Rust", "LLaMA.cpp", "Ollama", "Tree-sitter", "Docker", "CWE Database"],
    githubUrl: "https://github.com/pranav520214",
    isFeatured: true
  },
  {
    id: "compact-multilingual-asr",
    title: "Compact Multilingual ASR Small Language Model",
    subtitle: "Low-Memory Streaming Automatic Speech Recognition for Edge Devices",
    status: "ISEF-Oriented Independent Research",
    statusType: "research",
    year: "2026",
    disciplines: ["AI / Speech", "Edge Inference", "Signal Processing", "Model Compression"],
    summary: "Independent research engineering a compact, streaming automatic speech recognition system designed for low-spec consumer devices and multilingual audio.",
    problem: "State-of-the-art multilingual speech models require high VRAM and cloud APIs, rendering them unusable on edge microcomputers, rural classrooms, and offline environments.",
    solution: "A lightweight streaming architecture using short-window continuous capture, low-rank parameter-efficient adaptation (LoRA/PEFT), and quantized neural acoustic encoders for real-time edge execution.",
    architecture: {
      steps: [
        { name: "Continuous Audio Stream", desc: "16kHz 16-bit PCM buffer capture with low-latency RingBuffer", type: "input" },
        { name: "Short-Window VAD", desc: "Energy-based Voice Activity Detection and chunk segmentation", type: "process" },
        { name: "Quantized Acoustic Encoder", desc: "4-bit/8-bit quantized transformer weights calculating acoustic features", type: "process" },
        { name: "Streaming Beam Decoder", desc: "Low-memory CTC/Transducer token prediction with language constraint", type: "process" },
        { name: "Context Reassembly", desc: "Sliding window overlap handling and punctuation restoration", type: "output" }
      ],
      notes: "Architecture and evaluation protocol optimized for Indian linguistic contexts and high ambient noise."
    },
    results: [
      "Targeting ISEF computational biology & systems software submission",
      "Sub-200ms latency target on non-GPU host CPUs",
      "Under-the-hood evaluation protocol tested across synthetic noise and accented datasets"
    ],
    techStack: ["Python", "PyTorch", "Whisper.cpp", "C++", "Audio DSP", "Hugging Face", "PEFT/LoRA"],
    githubUrl: "https://github.com/pranav520214",
    isFeatured: true
  },
  {
    id: "escl-ii",
    title: "ESCL-II — Electromagnetic Space-Launch Assist Concept",
    subtitle: "Evacuated Maglev Acceleration Tube with Staged Rocket Separation",
    status: "External Critique from ISRO Science Programme Office",
    statusType: "validated",
    year: "2026",
    disciplines: ["Aerospace Engineering", "Electromagnetics", "CAD Design", "Orbital Mechanics"],
    summary: "An original concept paper modeling an evacuated linear electromagnetic launch assist system paired with an upper stage rocket for high-efficiency small-satellite deployment.",
    problem: "First-stage chemical rockets consume upwards of 85% of their total mass just fighting atmospheric drag and gravity in the initial 10km of flight.",
    solution: "An evacuated ground-based vacuum tube utilizing linear synchronous electromagnetic levitation and propulsion to accelerate a sealed payload to high suborbital velocity before atmospheric exit and upper-stage ignition.",
    architecture: {
      steps: [
        { name: "Vacuum Acceleration Tube", desc: "Evacuated track using linear synchronous magnetic propulsion", type: "input" },
        { name: "High-Speed Exit Valve", desc: "Fast-actuating magnetic plasma/diaphragm seal preserving tube vacuum", type: "process" },
        { name: "Sabot Dynamic Separation", desc: "Aerodynamic release of aerodynamic carriage sabot in upper atmosphere", type: "process" },
        { name: "Upper Stage Ignition", desc: "High-altitude rocket engine burn directly into Low Earth Orbit", type: "output" }
      ],
      notes: "Calculated structural assumptions, energy requirements, and g-force limits for satellite avionics."
    },
    results: [
      "Formal concept paper submitted to ISRO Science Programme Office",
      "Received encouraging official response praising conceptual clarity and motivating deeper aerospace research",
      "Detailed 3D CAD modeling of launch rail cross-section, sabot geometry, and thermal shielding"
    ],
    techStack: ["CAD (Blender / FreeCAD)", "Mathematical Modeling", "Physics Simulation", "System Dynamics"],
    externalValidation: "Official response and encouragement from ISRO Science Programme Office.",
    isFeatured: true
  },
  {
    id: "flight-control-stabilizer",
    title: "Fixed-Wing Flight-Control & Attitude Stabilizer",
    subtitle: "Custom Avionics Prototype with Kalman-Filtered Attitude Estimation",
    status: "School ATL Lead · Live Flight Hardware",
    statusType: "active",
    year: "2026",
    disciplines: ["Embedded Systems", "Avionics", "Control Systems", "Hardware Integration"],
    summary: "An integrated flight-control computer built from the ground up for fixed-wing aircraft, featuring Kalman sensor fusion, auto-level PID control, and failsafe logic.",
    problem: "Commercial closed-source drone flight controllers are expensive, hard to customize for research airframes, and lack transparent telemetry telemetry channels.",
    solution: "Designed and built custom hardware around an ESP32 and MPU6500 6-DOF IMU, implementing digital iBUS signal decoding, Kalman filtering for roll/pitch attitude estimation, and real-time servo mixing.",
    architecture: {
      steps: [
        { name: "iBUS Receiver & IMU", desc: "FS-i6 RC signal decoding (50Hz) + MPU6500 gyro/accelerometer data (500Hz)", type: "input" },
        { name: "Kalman Filter Fusion", desc: "Real-time state estimation eliminating accelerometer vibration noise", type: "process" },
        { name: "PID Control Loops", desc: "Separate proportional-integral-derivative controllers for Pitch, Roll, Yaw", type: "process" },
        { name: "Servo Mixer & Failsafe", desc: "PWM generation for control surfaces + automated emergency level/cut logic", type: "validation" },
        { name: "LoRa Telemetry", desc: "Long-range attitude, altitude, and battery telemetry broadcast to ground", type: "output" }
      ],
      notes: "Prototype currently serving as primary avionics testbed in school ATL lab."
    },
    results: [
      "Led technical architecture, PCB breadboarding, sensor integration, and flight-line troubleshooting",
      "Stable attitude lock demonstrated under gust simulations and ground tether testing",
      "Full failsafe triggered on signal loss with automatic gliding stabilization"
    ],
    techStack: ["C++", "ESP32", "MPU6500 IMU", "Kalman Filtering", "iBUS / RC Protocol", "LoRa", "KiCad"],
    githubUrl: "https://github.com/pranav520214",
    isFeatured: true
  },
  {
    id: "flowdictate",
    title: "FlowDictate — Private Local Voice Dictation",
    subtitle: "Zero-Cloud Desktop Dictation System with Recovery Checkpoints",
    status: "Desktop System Prototype",
    statusType: "prototype",
    year: "2026",
    disciplines: ["Desktop Systems", "C++ / Qt", "Local AI", "Audio Engineering"],
    summary: "A private, native desktop voice transcription tool using embedded whisper.cpp and llama.cpp for ultra-fast local dictation without external cloud dependencies.",
    problem: "Cloud transcription tools leak sensitive workplace or academic thoughts, require ongoing subscriptions, and stutter when internet connection drops.",
    solution: "Native C++/Qt6 desktop client with OS-level global hotkeys, audio ring buffer, localized streaming transcription, and checkpointed recovery so dictation is never lost.",
    architecture: {
      steps: [
        { name: "Global Hotkey Daemon", desc: "Low-level OS keyboard hook capturing push-to-talk triggers", type: "input" },
        { name: "WASAPI Audio RingBuffer", desc: "Circular memory buffer capturing microphone stream with zero frame drop", type: "process" },
        { name: "Quantized Whisper Worker", desc: "Embedded whisper.cpp C++ inference thread running GGML models", type: "process" },
        { name: "Text Synthesis & Punctuation", desc: "Micro-SLM punctuation restoration and capitalization cleanup", type: "process" },
        { name: "Virtual Keyboard Typing", desc: "Simulated keystrokes injecting text directly into active application", type: "output" }
      ],
      notes: "Direct precursor informing research into the Compact Multilingual ASR small language model."
    },
    results: [
      "Instant push-to-talk response time under 350ms on modest desktop CPU",
      "100% offline data integrity with zero telemetry",
      "Built with native C++ and Qt for minimal memory footprint"
    ],
    techStack: ["C++", "Qt6", "whisper.cpp", "llama.cpp", "CMake", "WASAPI Audio"],
    githubUrl: "https://github.com/pranav520214",
    isFeatured: false
  },
  {
    id: "vid-ed-x",
    title: "VID-ED X — AI-Assisted High-Performance Video Editor",
    subtitle: "Modular Desktop Video Editing Workspace with Local Timeline Inference",
    status: "Desktop Application R&D",
    statusType: "prototype",
    year: "2026",
    disciplines: ["Systems Engineering", "Rust", "Tauri", "Computer Graphics"],
    summary: "A modern desktop video editing application combining Tauri, Rust, React, and SQLite with local AI assistance for automated rough-cut generation and semantic footage search.",
    problem: "Professional video editors are bloated resource hogs, while web-based editors lack the low-level codec control required for high-throughput video timelines.",
    solution: "Engineered a hybrid desktop app leveraging Rust for multi-threaded FFmpeg timeline decoding and audio analysis, alongside a lightweight React UI with local AI semantic search.",
    architecture: {
      steps: [
        { name: "Footage Ingestion & Proxy", desc: "Rust background thread generating lightweight proxy clips via FFmpeg", type: "input" },
        { name: "Local Semantic Tagging", desc: "Local vision/speech embedding model indexing dialogue and visual scenes", type: "process" },
        { name: "SQLite Metadata Store", desc: "Fast indexed search for exact words, scene changes, and speaker turns", type: "process" },
        { name: "Interactive Timeline UI", desc: "60 FPS multi-track React canvas timeline with sub-frame scrubbing", type: "output" },
        { name: "Headless Render Engine", desc: "Hardware-accelerated FFmpeg export pipeline with filter graphs", type: "output" }
      ],
      notes: "Designed for creators working on standard laptops without requiring expensive GPU cloud rendering."
    },
    results: [
      "Sub-100ms timeline seek times using custom Rust IPC memory buffers",
      "Local semantic search finding video clips by spoken phrase or scene description",
      "Export profiles for multi-platform resolutions and aspect ratios"
    ],
    techStack: ["Rust", "Tauri", "React", "TypeScript", "SQLite", "FFmpeg", "Tailwind CSS"],
    githubUrl: "https://github.com/pranav520214",
    isFeatured: false
  },
  {
    id: "bharat-one",
    title: "Bharat One / Civic AI — Urban Issue Dispatch Grid",
    subtitle: "AI-Powered Civic Reporting, Automated Duplicate Detection, and Geospatial Prioritization",
    status: "DEVENGERS PromptWars Build",
    statusType: "validated",
    year: "2026",
    disciplines: ["Full-Stack Engineering", "AI Geospatial", "Next.js", "Civic Tech"],
    summary: "A civic problem-reporting platform utilizing multimodal AI to classify citizen grievances, detect geographic duplicates, and generate municipal worker routing heatmaps.",
    problem: "Civic authorities receive thousands of duplicated, poorly categorized complaints (potholes, water leaks, garbage), overwhelming public service dispatchers.",
    solution: "Built a responsive Next.js and Firebase app that analyzes uploaded images and descriptions to auto-categorize issues, cluster duplicates within a 50m radius, and score priority based on safety risk.",
    architecture: {
      steps: [
        { name: "Citizen Report Submission", desc: "Photo upload + GPS coordinates + voice/text description", type: "input" },
        { name: "AI Vision & Text Categorization", desc: "Multimodal classification tagging issue type and urgency score", type: "process" },
        { name: "Geospatial Duplicate Cluster", desc: "Spatial radius search merging multiple reports into single tickets", type: "process" },
        { name: "Municipal Heatmap Dispatch", desc: "Real-time interactive dashboard visualizing priority zones for field teams", type: "output" }
      ],
      notes: "Built during DEVENGERS PromptWars 2026 hackathon."
    },
    results: [
      "Completed fully interactive working prototype during DEVENGERS PromptWars 2026",
      "Real-time Firebase Firestore syncing between citizen portal and municipal dashboard",
      "Interactive map clustering eliminating up to 60% of redundant civic tickets"
    ],
    techStack: ["Next.js", "React", "Firebase", "Tailwind CSS", "Leaflet Maps", "Multimodal AI"],
    githubUrl: "https://github.com/pranav520214",
    isFeatured: false
  },
  {
    id: "envirosynk-ai",
    title: "Envirosynk AI / Ecosentinel — Physical AI Environmental Grid",
    subtitle: "Distributed Microcontroller Mesh with Predictive Air Filtration",
    status: "Qualcomm-Arduino Physical AI Challenge India",
    statusType: "prototype",
    year: "2026",
    disciplines: ["Physical AI", "IoT Systems", "Sensor Fusion", "Environmental Engineering"],
    summary: "A distributed sensor mesh monitoring air quality, particulates, and ambient gases to autonomously trigger localized purification and ventilation cycles.",
    problem: "Air purifiers typically operate on single localized sensors, reacting only after contaminants have dispersed throughout an entire living or classroom space.",
    solution: "Engineered a cooperative mesh of Arduino and ESP32 nodes running environmental particulate algorithms to predict smoke and dust dispersal and activate ventilation fans before saturation.",
    architecture: {
      steps: [
        { name: "Distributed Sensor Nodes", desc: "PMS5003 particulate + MQ135 gas + BME280 temperature sensors", type: "input" },
        { name: "Local Edge Filtering", desc: "Moving-average thresholding and noise rejection on microcontrollers", type: "process" },
        { name: "Mesh Radio Sync", desc: "ESP-NOW packet exchange synchronizing spatial particulate gradient", type: "process" },
        { name: "Proactive Actuator Control", desc: "PWM relay switching for HEPA filters and intake valves", type: "output" }
      ],
      notes: "System architecture and team coordination led for the Qualcomm-Arduino Physical AI Challenge India."
    },
    results: [
      "Multi-node sensor calibration protocol verified across variable ambient conditions",
      "Proactive purification activation before room-wide contaminant peak",
      "Zero reliance on external cloud servers for baseline autonomous safety operation"
    ],
    techStack: ["Arduino", "ESP32", "PMS5003", "ESP-NOW", "C++", "Physical AI"],
    githubUrl: "https://github.com/pranav520214",
    isFeatured: false
  },
  {
    id: "sanjeevani-edge-ai",
    title: "Sanjeevani Edge-AI Medical First-Aid Kit",
    subtitle: "Resilient Offline Emergency Triage Guidance for Disconnected Environments",
    status: "Systems Architecture & Conceptual Prototype",
    statusType: "prototype",
    year: "2026",
    disciplines: ["Edge AI", "Healthcare Systems", "Resilience Design", "Human Interface"],
    summary: "A ruggedized, low-power edge computer providing voice-guided first-aid protocols in regional Indian languages during natural disasters or zero-connectivity grid failures.",
    problem: "During floods, earthquakes, or remote expeditions, lack of internet prevents access to medical instructions, leading to preventable trauma fatalities.",
    solution: "Designed a dedicated hardware kit with an ultra-low-power compute module, localized quantized medical decision models, regional language speech guidance, and solar/hand-crank power.",
    architecture: {
      steps: [
        { name: "Voice / Symptom Input", desc: "Push-button physical dials + offline microphone voice input", type: "input" },
        { name: "Offline Medical Rule-Graph", desc: "Quantized emergency triage logic with step-by-step vocal instructions", type: "process" },
        { name: "Multi-Language Speech Engine", desc: "On-device lightweight TTS synthesizer speaking local dialects", type: "process" },
        { name: "Resilient Power Subsystem", desc: "LiFePO4 battery management with solar and mechanical hand-crank backup", type: "output" }
      ],
      notes: "Conceived for rapid deployment in rural clinics, schools, and disaster management kits."
    },
    results: [
      "Comprehensive system specification and hardware component selection",
      "Validated offline protocol decision trees based on WHO emergency triage guidelines",
      "Designed for fail-safe physical operation by non-technical first responders"
    ],
    techStack: ["Embedded Linux", "Quantized SLMs", "TTS Engine", "Solar/Power Electronics", "Systems Design"],
    isFeatured: false
  },
  {
    id: "photonic-neuromorphic-compute",
    title: "Photonic & Neuromorphic Computing Experiments",
    subtitle: "Explorations into Optical Matrix-Vector Multiplication and Hybrid FPGA Interconnects",
    status: "Long-Term Conceptual R&D",
    statusType: "research",
    year: "2026",
    disciplines: ["Advanced Hardware", "Photonics", "Neuromorphic Systems", "Physics"],
    summary: "Independent theoretical and numerical modeling exploring how optical interference and phase modulation can accelerate neural network matrix multiplications at ultra-low energy.",
    problem: "Silicon electronics suffer from capacitive RC delays and intense ohmic heat dissipation during large-scale dense matrix-vector multiplications in deep learning.",
    solution: "Investigating Mach-Zehnder interferometer mesh architectures and fiber-based optical signal pathways to perform analog optical tensor multiplications at the speed of light.",
    architecture: {
      steps: [
        { name: "Laser / Optical Carrier", desc: "Coherent light source coupled into integrated photonic waveguides", type: "input" },
        { name: "Phase Shifter Modulation", desc: "Thermo-optic or electro-optic phase modulators encoding weights", type: "process" },
        { name: "Interference Matrix Multiplier", desc: "Unitary matrix transformation computed passively via wave interference", type: "process" },
        { name: "Photodetector Array", desc: "Photodiode conversion of output intensity back to digital signals", type: "output" }
      ],
      notes: "Conceptual foundation for next-generation hardware acceleration beyond conventional CMOS limits."
    },
    results: [
      "Mathematical models of optical phase modulation for 4x4 matrix-vector multiplication",
      "Explored hybrid electronic-photonic boundary interfaces using FPGA clocking",
      "Identified critical physical challenges in phase calibration and thermal drift"
    ],
    techStack: ["Physics Simulation", "Optics Theory", "FPGA / Verilog Concepts", "Linear Algebra"],
    isFeatured: false
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
    id: "A08",
    code: "LOG A08 // 2026.02",
    date: "February 2026",
    title: "ISRO Science Programme Office Response on ESCL-II",
    organizer: "ISRO Science Programme Office (ISRO HQ)",
    outcome: "Formal Encouraging Response and Technical Critique on Concept Paper",
    proofId: "P05",
    proofTitle: "ISRO SPO Correspondence Record",
    proofImage: "/certificates/proof-isro-response.png",
    category: "research",
    highlight: "Submitted concept paper for electromagnetic launch assist; received formal encouraging appraisal motivating deeper R&D."
  },
  {
    id: "A09",
    code: "LOG A09 // 2026.01",
    date: "January 2026",
    title: "IIT Delhi Faculty Appreciation for Technical Innovation",
    organizer: "Indian Institute of Technology Delhi (IIT Delhi)",
    outcome: "Faculty Commendation for Presentation Quality and Innovative Systems Thinking",
    proofId: "P06",
    proofTitle: "IIT Delhi Commendation Record",
    proofImage: "/certificates/proof-iit-delhi-appreciation.png",
    category: "recognition",
    highlight: "Commended by IIT Delhi faculty for technical depth; advised to pursue expert domain collaborations."
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
    highlight: "Selected into the Top 100 globally for outstanding technical contribution and problem-solving architecture."
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
    highlight: "Formulated and submitted AI-driven societal problem-solving architecture in competition with engineering and developer teams."
  },
  {
    id: "A07",
    code: "LOG A07 // 2026.01",
    date: "January 2026",
    title: "DEVENGERS PromptWars 2026",
    organizer: "DEVENGERS",
    outcome: "Built Bharat One / Civic AI Full-Stack Prototype",
    proofId: "Cert03",
    proofTitle: "DEVENGERS PromptWars Certificate",
    proofImage: "/certificates/cert-promptwars-devengers.png",
    category: "competition",
    highlight: "Rapidly engineered Bharat One with Next.js, Firebase, and AI duplicate report clustering."
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
    highlight: "Formulated lean business and technical feasibility blueprint for scalable student-built hardware."
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
  }
];

export const TECH_STACK: TechItem[] = [
  {
    name: "Python",
    category: "AI & ML",
    icon: "python",
    level: "Advanced",
    usageDescription: "Core language for ML research, dataset curation, PEFT/LoRA fine-tuning, and evaluation pipelines.",
    color: "#3776AB"
  },
  {
    name: "C++",
    category: "Systems & Languages",
    icon: "cpp",
    level: "Advanced",
    usageDescription: "Used for high-frequency ESP32 avionics loops (250Hz), Kalman filter math, and native whisper.cpp/Qt desktop engines.",
    color: "#00599C"
  },
  {
    name: "Rust",
    category: "Systems & Languages",
    icon: "rust",
    level: "Intermediate",
    usageDescription: "Used in VID-ED X for high-performance FFmpeg proxy decoding, thread-safe memory buffers, and Tauri desktop backends.",
    color: "#DEA584"
  },
  {
    name: "TypeScript",
    category: "Systems & Languages",
    icon: "typescript",
    level: "Advanced",
    usageDescription: "Primary language for building production web platforms, complex interactive state machines, and Next.js applications.",
    color: "#3178C6"
  },
  {
    name: "PyTorch",
    category: "AI & ML",
    icon: "pytorch",
    level: "Advanced",
    usageDescription: "Model prototyping, neural layer design, quantization profiling, and audio feature extraction experiments.",
    color: "#EE4C2C"
  },
  {
    name: "Hugging Face",
    category: "AI & ML",
    icon: "huggingface",
    level: "Advanced",
    usageDescription: "Transformers, tokenizers, PEFT parameter-efficient fine-tuning, and model architecture adaptation.",
    color: "#FFD21E"
  },
  {
    name: "whisper.cpp / llama.cpp",
    category: "AI & ML",
    icon: "terminal",
    level: "Advanced",
    usageDescription: "Embedded C++ GGML/GGUF inference pipelines running locally without GPU requirements.",
    color: "#FFE600"
  },
  {
    name: "ESP32 & Arduino",
    category: "Embedded & Hardware",
    icon: "cpu",
    level: "Advanced",
    usageDescription: "Flight controller avionics, MPU6500 IMU 6-DOF sensor fusion, iBUS RC parsing, and mesh telemetry.",
    color: "#E7352C"
  },
  {
    name: "Kalman Filter & Control",
    category: "Embedded & Hardware",
    icon: "activity",
    level: "Intermediate",
    usageDescription: "Mathematical state estimation fusing noisy accelerometer data with gyroscopic angular rates for auto-level stability.",
    color: "#4ADE80"
  },
  {
    name: "Next.js & React",
    category: "Frameworks & Web",
    icon: "globe",
    level: "Advanced",
    usageDescription: "Building full-stack web applications, interactive geospatial dashboards (Bharat One), and high-immersion portfolios.",
    color: "#FFFFFF"
  },
  {
    name: "Three.js / WebGL",
    category: "Frameworks & Web",
    icon: "box",
    level: "Intermediate",
    usageDescription: "Real-time 3D rendering, spatial constellations, procedural shader grids, and depth-layered interactive experiences.",
    color: "#049EF4"
  },
  {
    name: "Tauri & Qt",
    category: "Frameworks & Web",
    icon: "layout",
    level: "Intermediate",
    usageDescription: "Native cross-platform desktop UI integration with low-level C++ and Rust application backends.",
    color: "#24C8D8"
  },
  {
    name: "Firebase & SQLite",
    category: "Tools & CAD",
    icon: "database",
    level: "Advanced",
    usageDescription: "Real-time cloud database synchronization and fast local metadata caching for desktop video indexing.",
    color: "#FFCA28"
  },
  {
    name: "Git & GitHub",
    category: "Tools & CAD",
    icon: "git",
    level: "Advanced",
    usageDescription: "Version control, branching workflows, issue tracking, and collaborative open-source engineering.",
    color: "#F05032"
  },
  {
    name: "CAD (Blender & FreeCAD)",
    category: "Tools & CAD",
    icon: "compass",
    level: "Intermediate",
    usageDescription: "3D engineering visualization, ESCL-II electromagnetic launch tube modeling, and airframe prototype design.",
    color: "#EA7600"
  },
  {
    name: "Docker & Sandbox",
    category: "Tools & CAD",
    icon: "server",
    level: "Intermediate",
    usageDescription: "Isolated container environments for executing untrusted AI-generated code patches in Rudra Sentinel.",
    color: "#2496ED"
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
    connectedTo: ["ai", "systems", "embedded", "aerospace"],
    projectIds: ["rudra-sentinel", "compact-multilingual-asr", "flight-control-stabilizer", "escl-ii"],
    description: "Interdisciplinary nexus combining computational models, low-level systems, physical hardware, and aerospace physics."
  },
  {
    id: "ai",
    label: "AI & MACHINE LEARNING",
    category: "ai",
    x: -3,
    y: 1.8,
    z: 0.5,
    connectedTo: ["core", "ai_asr", "ai_safety"],
    projectIds: ["compact-multilingual-asr", "rudra-sentinel", "bharat-one"],
    description: "Compact language models, parameter-efficient fine-tuning (LoRA), and streaming acoustic transcription."
  },
  {
    id: "ai_asr",
    label: "Streaming ASR",
    category: "ai",
    x: -4.5,
    y: 3.2,
    z: 1.2,
    connectedTo: ["ai"],
    projectIds: ["compact-multilingual-asr", "flowdictate"],
    description: "Continuous buffer capture and low-memory inference on constrained consumer CPUs."
  },
  {
    id: "ai_safety",
    label: "Verification Agents",
    category: "ai",
    x: -4.8,
    y: 0.5,
    z: -0.8,
    connectedTo: ["ai"],
    projectIds: ["rudra-sentinel"],
    description: "Multi-tool feedback loops combining static analysis, CWE schemas, and containerized unit execution."
  },
  {
    id: "systems",
    label: "SYSTEMS & SOFTWARE",
    category: "systems",
    x: 3,
    y: 1.8,
    z: -0.5,
    connectedTo: ["core", "sys_rust", "sys_cpp"],
    projectIds: ["vid-ed-x", "flowdictate", "bharat-one"],
    description: "High-performance native codebases, thread-safe memory management, and cross-platform desktop architecture."
  },
  {
    id: "sys_rust",
    label: "Rust / Tauri",
    category: "systems",
    x: 4.8,
    y: 3.2,
    z: -1.0,
    connectedTo: ["systems"],
    projectIds: ["vid-ed-x"],
    description: "Multi-threaded timeline playback, FFmpeg IPC bridges, and memory-safe native execution."
  },
  {
    id: "sys_cpp",
    label: "C++ & Qt6",
    category: "systems",
    x: 4.5,
    y: 0.5,
    z: 0.8,
    connectedTo: ["systems"],
    projectIds: ["flowdictate", "flight-control-stabilizer"],
    description: "Microcontroller logic, whisper.cpp bindings, and zero-latency audio buffer streaming."
  },
  {
    id: "embedded",
    label: "EMBEDDED & AVIONICS",
    category: "embedded",
    x: -2.5,
    y: -2.5,
    z: -0.8,
    connectedTo: ["core", "emb_kalman", "emb_iot"],
    projectIds: ["flight-control-stabilizer", "envirosynk-ai", "sanjeevani-edge-ai"],
    description: "ESP32 avionics, 6-DOF IMU sensor fusion, Kalman attitude estimation, and real-time PWM control."
  },
  {
    id: "emb_kalman",
    label: "Kalman Filter & PID",
    category: "embedded",
    x: -4.2,
    y: -4.0,
    z: -1.2,
    connectedTo: ["embedded"],
    projectIds: ["flight-control-stabilizer"],
    description: "250Hz attitude loop fusing gyroscope angular velocity with accelerometer gravity vectors."
  },
  {
    id: "emb_iot",
    label: "Sensor Networks",
    category: "embedded",
    x: -1.2,
    y: -4.5,
    z: 0.2,
    connectedTo: ["embedded"],
    projectIds: ["envirosynk-ai", "sanjeevani-edge-ai"],
    description: "Environmental particulate sensing, ESP-NOW radio mesh, and autonomous actuator relays."
  },
  {
    id: "aerospace",
    label: "AEROSPACE & CAD",
    category: "aerospace",
    x: 2.5,
    y: -2.5,
    z: 0.8,
    connectedTo: ["core", "aero_maglev", "aero_cad"],
    projectIds: ["escl-ii", "flight-control-stabilizer", "photonic-neuromorphic-compute"],
    description: "Electromagnetic launch assist architectures, supersonic vacuum tubes, and airframe dynamics."
  },
  {
    id: "aero_maglev",
    label: "Maglev Launch (ESCL-II)",
    category: "aerospace",
    x: 4.2,
    y: -4.0,
    z: 1.2,
    connectedTo: ["aerospace"],
    projectIds: ["escl-ii"],
    description: "Linear synchronous motor propulsion concept evaluated and critiqued by ISRO SPO."
  },
  {
    id: "aero_cad",
    label: "3D CAD & Aerodynamics",
    category: "aerospace",
    x: 1.2,
    y: -4.5,
    z: -0.2,
    connectedTo: ["aerospace"],
    projectIds: ["escl-ii", "flight-control-stabilizer"],
    description: "Structural modeling of aerodynamic sabots, flight surfaces, and mechanical bracket assemblies."
  }
];
