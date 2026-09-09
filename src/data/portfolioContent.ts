export interface ResearchQuestion {
  id: string;
  question: string;
  domain: string;
  context: string;
  relatedSlug: string;
  relatedTitle: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  type: "input" | "process" | "decision" | "output";
}

export interface ExperimentCardData {
  id: string;
  title: string;
  hypothesis: string;
  setup: string;
  variable: string;
  measurement: string;
  result: string;
  status: "PASS" | "FAIL" | "ITERATING" | "VALIDATED";
  notes: string;
}

export interface FailureAutopsy {
  id: string;
  title: string;
  cause: string;
  change: string;
  result: string;
}

export interface FlagshipProject {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  domain: string;
  year: string;
  status: "ACTIVE RESEARCH" | "VALIDATED TEST" | "PROTOTYPE" | "RESEARCH PAPER";
  question: string;
  constraint: string;
  firstApproach: string;
  architectureNodes: ArchitectureNode[];
  build: {
    coreTech: string[];
    description: string;
    codeSnippet?: {
      filename: string;
      language: string;
      code: string;
    };
  };
  experiments: ExperimentCardData[];
  whatBroke: FailureAutopsy[];
  result: string;
  iteration: string;
  currentLimitation: string;
  nextQuestion: string;
  reflection: string;
  evidence: {
    type: "CODE" | "REPORT" | "EMAIL" | "PHOTO" | "DATA";
    label: string;
    detail: string;
    link?: string;
  }[];
}

export interface ArchiveProject {
  year: string;
  title: string;
  question: string;
  domain: string;
  tech: string[];
  status: "PROTOTYPE" | "ACTIVE" | "ARCHIVED";
  summary: string;
  githubUrl?: string;
}

export interface EngineeringNoteMeta {
  slug: string;
  date: string;
  title: string;
  domain: string;
  question: string;
  observation: string;
  whatChanged: string;
}

export interface ExternalFeedbackItem {
  id: string;
  source: string;
  reviewer: string;
  role: string;
  project: string;
  feedbackSummary: string;
  whatPranavChanged: string;
  proofImage?: string;
}

export interface MilestoneItem {
  id: string;
  date: string;
  title: string;
  organizer: string;
  outcome: string;
  highlight: string;
  category: "recognition" | "program";
  proofId?: string;
  proofTitle?: string;
  proofImage?: string;
}

export interface ToolboxCategory {
  category: string;
  description: string;
  items: {
    name: string;
    role: string;
    application: string;
  }[];
}

// ----------------------------------------------------------------------
// 01 — RESEARCH QUESTIONS
// ----------------------------------------------------------------------
export const RESEARCH_QUESTIONS: ResearchQuestion[] = [
  {
    id: "Q01",
    question: "How can AI-generated code and vulnerabilities be verified before reaching production?",
    domain: "Software Assurance / Compilers",
    context: "Generative models produce plausible code that often introduces subtle AST mutations and security regressions. Verification must precede generation.",
    relatedSlug: "rudra-sentinel",
    relatedTitle: "Rudra Sentinel",
  },
  {
    id: "Q02",
    question: "How small can a speech recognition model become while remaining practical on ordinary hardware?",
    domain: "Edge AI / Audio Systems",
    context: "Standard whisper checkpoints require gigabytes of VRAM. Making speech recognition practical means optimizing stream lifecycle and memory bandwidth.",
    relatedSlug: "compact-asr",
    relatedTitle: "Compact Multilingual ASR",
  },
  {
    id: "Q03",
    question: "How much flight stabilization can be achieved with low-cost sensors and microcontrollers?",
    domain: "Avionics / Sensor Fusion",
    context: "Vibration and MEMS gyro drift degrade raw sensor readings. Solving this requires Kalman state estimation, mechanical isolation, and microsecond loop control.",
    relatedSlug: "flight-control",
    relatedTitle: "Fixed-Wing Flight Control",
  },
  {
    id: "Q04",
    question: "Can electromagnetic launch assistance meaningfully reduce the propulsion burden of launch vehicles?",
    domain: "Aerospace / Propulsion Physics",
    context: "Modeling how much orbital first-stage propellant mass can be saved by ground-assisted acceleration without structural payload failure.",
    relatedSlug: "escl",
    relatedTitle: "ESCL-II Launch Assist",
  },
  {
    id: "Q05",
    question: "Where does model quantization degrade structural syntax long before linguistic fluency breaks down?",
    domain: "Quantization / Compiler ASTs",
    context: "4-bit quantization preserves conversational text well, but destroys structured JSON output and AST parsing invariants.",
    relatedSlug: "rudra-sentinel",
    relatedTitle: "Engineering Note // Quantization Limits",
  },
  {
    id: "Q06",
    question: "Where can photonics actually improve neural computation rather than merely sounding futuristic?",
    domain: "Optical Physics / Hardware",
    context: "Investigating whether passive optical wave interference can accelerate matrix-vector multiplication without optical-to-electrical conversion bottlenecks.",
    relatedSlug: "photonic-computing",
    relatedTitle: "Experiment Archive // Photonic Experiments",
  },
];

// ----------------------------------------------------------------------
// 02 — FLAGSHIP PROJECTS
// ----------------------------------------------------------------------
export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    slug: "rudra-sentinel",
    number: "01",
    title: "Rudra Sentinel",
    subtitle: "Verification-First Software Assurance Pipeline",
    domain: "AI Systems • Compilers • Security",
    year: "2026",
    status: "ACTIVE RESEARCH",
    question: "Can an autonomous assistant patch repository security vulnerabilities without hallucinating syntax or breaking hidden AST contracts?",
    constraint: "Generative models produce plausible code that breaks compilation or introduces secondary vulnerabilities when operating on multi-file repositories under tight latency budgets.",
    firstApproach: "Initially prompted general-purpose language models with flat code snippets and vulnerability descriptions, relying on model self-evaluations. This failed: the model routinely proposed syntactically invalid patches and hallucinated nonexistent helper functions.",
    architectureNodes: [
      { id: "repo", label: "Repository", sublabel: "Target codebase and AST indexing", type: "input" },
      { id: "ast", label: "AST Analysis", sublabel: "Tree-sitter syntactic call graph", type: "process" },
      { id: "ctx", label: "Context Retrieval", sublabel: "Selective symbol and CWE invariants", type: "process" },
      { id: "slm", label: "Local Model", sublabel: "Quantized SLM synthesis", type: "process" },
      { id: "patch", label: "Candidate Patch", sublabel: "Isolated syntax subtree diff", type: "process" },
      { id: "verifier", label: "Verification", sublabel: "Static AST contract validation", type: "decision" },
      { id: "sandbox", label: "Sandbox", sublabel: "Containerized compilation and tests", type: "decision" },
      { id: "gate", label: "Accept / Reject", sublabel: "Cryptographic patch diff output", type: "output" },
    ],
    build: {
      coreTech: ["Python", "Tree-sitter", "Docker", "GGUF / llama.cpp", "PyTorch"],
      description: "Built a multi-tool verification pipeline that treats the language model merely as a candidate generator. Patches must pass static AST type verification and containerized compiler checks before being surfaced.",
      codeSnippet: {
        filename: "verification_pipeline.py",
        language: "python",
        code: `def verify_candidate_patch(repo_ast, original_fn, patch_diff):\n    # 1. Parse patch diff into isolated syntax sub-tree\n    patched_ast = apply_diff_to_ast(repo_ast, patch_diff)\n    if not patched_ast.is_valid():\n        return VerificationResult(passed=False, reason="AST_SYNTAX_ERROR")\n        \n    # 2. Assert functional contracts and CWE boundaries are preserved\n    if violates_cwe_invariants(patched_ast, original_fn.cwe_id):\n        return VerificationResult(passed=False, reason="CWE_INVARIANT_VIOLATION")\n        \n    # 3. Execute isolated containerized test run\n    sandbox_status = run_in_sandbox(patched_ast.to_source())\n    return VerificationResult(passed=sandbox_status.exit_code == 0, diagnostics=sandbox_status.stderr)`,
      },
    },
    experiments: [
      {
        id: "EXP // RUDRA-04",
        title: "Multi-Tool AST Indexing vs Naive Zero-Shot Generation",
        hypothesis: "Supplying the model with targeted AST call-graph context rather than raw file text will reduce syntax hallucination by over 50%.",
        setup: "Evaluated across 40 synthetic CWE benchmark vulnerabilities in C and Python repositories.",
        variable: "Context retrieval strategy (Full file dump vs Tree-sitter call-graph subtrees).",
        measurement: "Percentage of first-pass candidate patches that successfully compile in Docker.",
        result: "First-pass compilation rate increased from 31% to 84%.",
        status: "PASS",
        notes: "Tree-sitter context pruning also decreased prompt token consumption by 68%, cutting inference latency by 2.4x.",
      },
    ],
    whatBroke: [
      {
        id: "WB-01",
        title: "AST Memory Exhaustion on Macro-Heavy C Repositories",
        cause: "Early Tree-sitter recursive traversals attempted to expand deeply nested preprocessor macros, causing rapid memory allocation exceeding 1.2 GB.",
        change: "Implemented strict traversal depth clipping and lazy function-body expansion for out-of-scope files.",
        result: "Memory stabilized below 220 MB across test repositories with over 50,000 lines of code.",
      },
    ],
    result: "Demonstrated that small, domain-specialized language models (1B–3B parameters) paired with strict static analysis tools outperform unconstrained 70B models in code patching reliability.",
    iteration: "Added automated diagnostic feedback where sandbox compiler error traces are fed back to the model for up to 3 iterative self-correction loops.",
    currentLimitation: "Running full containerized builds takes 3–5 seconds per test cycle, which is noticeable during interactive developer sessions.",
    nextQuestion: "Can symbolic execution approximate sandbox testing for common pointer-safety violations without paying the container spin-up penalty?",
    reflection: "The hardest part of AI engineering is not prompting models to generate code; it is building deterministic software gates that verify whether the output should ever be trusted.",
    evidence: [
      { type: "REPORT", label: "Ablation Test Record", detail: "Evaluation benchmark report isolating model-only vs multi-tool verification gates." },
      { type: "CODE", label: "Architecture Source", detail: "Multi-tool AST indexing pipeline & Docker test sandbox." },
    ],
  },
  {
    slug: "compact-asr",
    number: "02",
    title: "Compact Multilingual ASR",
    subtitle: "Real-Time Speech Recognition Under Compute Constraints",
    domain: "Edge AI • Audio Systems • C++",
    year: "2026",
    status: "ACTIVE RESEARCH",
    question: "Can streaming speech recognition remain practical and low-latency on ordinary consumer laptops without cloud dependencies?",
    constraint: "Large speech models produce high transcription accuracy but require dedicated GPUs and >1GB VRAM. Running on CPU leads to buffer overruns, thermal throttling, and unusable latency (>1.2s).",
    firstApproach: "Tested raw 4-bit quantizations of whisper-medium on CPU. Latency remained above 800ms per utterance chunk, and the model frequently fell into repetitive looping tokens on non-English audio.",
    architectureNodes: [
      { id: "mic", label: "Microphone", sublabel: "16kHz 16-bit PCM audio stream", type: "input" },
      { id: "buf", label: "Buffer", sublabel: "Circular ring buffer", type: "process" },
      { id: "seg", label: "Segmentation", sublabel: "Energy VAD windowing", type: "process" },
      { id: "asr", label: "Streaming ASR", sublabel: "Quantized acoustic core", type: "process" },
      { id: "ctx", label: "Context Reconstruction", sublabel: "Token history state", type: "process" },
      { id: "clean", label: "Cleaner", sublabel: "Inverse text normalization", type: "process" },
      { id: "out", label: "Transcript", sublabel: "Low-latency word stream", type: "output" },
    ],
    build: {
      coreTech: ["C++", "Python", "whisper.cpp", "Web Audio API", "FFmpeg"],
      description: "Constructed a native C++ audio capture pipeline that isolates the speech buffer, passes fixed-window Mel spectrograms to an optimized whisper core, and emits word tokens with <350ms latency.",
      codeSnippet: {
        filename: "audio_stream_manager.cpp",
        language: "cpp",
        code: `void AudioStreamManager::process_chunk(const float* pcm_data, size_t n_samples) {\n    std::lock_guard<std::mutex> lock(buffer_mutex);\n    if (vad_detector.is_speech(pcm_data, n_samples)) {\n        speech_ring_buffer.write(pcm_data, n_samples);\n        if (speech_ring_buffer.available_ms() >= CHUNK_TRIGGER_MS) {\n            dispatch_inference_job(speech_ring_buffer.snapshot());\n        }\n    } else if (state == STATE_TRANSCRIBING && speech_ring_buffer.silence_exceeded_ms(300)) {\n        flush_and_reset_stream(); // Prevents audio frame bleed\n    }\n}`,
      },
    },
    experiments: [
      {
        id: "EXP // ASR-017",
        title: "Stream Lifecycle Management Under Rapid Utterances",
        hypothesis: "Flushing and recreating the decoder context after silence detection eliminates repeated-word leakage between adjacent sentences.",
        setup: "100 sequential spoken sentences read with varying pause intervals (100ms to 2000ms).",
        variable: "Stream teardown protocol (Eager asynchronous recreation vs Synchronous state machine).",
        measurement: "Count of repeated phrases or memory leaks detected in output stream.",
        result: "100 / 100 trials passed with zero buffer bleed.",
        status: "PASS",
        notes: "Synchronous state machine: FINISH → DRAIN → DESTROY → IDLE → RECREATE.",
      },
    ],
    whatBroke: [
      {
        id: "WB-02",
        title: "Repeated Utterance Corruption",
        cause: "A new native inference stream was spawned before the previous circular buffer was fully drained, mixing old audio frames into the new inference window.",
        change: "Refactored stream lifecycle into an explicit state machine with clean buffer resets.",
        result: "100% of consecutive utterance tests passed without token duplication.",
      },
    ],
    result: "Achieved continuous local transcription under 350ms latency with <150MB peak RAM consumption on an Intel Core i5 processor.",
    iteration: "Introduced dynamic energy-threshold adaptation to maintain accurate speech chunking in ambient classroom and lab environments.",
    currentLimitation: "Phonetic accuracy degrades on noisy audio (>60dB ambient noise) for low-resource regional dialects.",
    nextQuestion: "Can a 2-stage tiny neural noise filter pre-process audio frames on a separate thread within an 8ms window?",
    reflection: "In streaming audio, systems engineering (buffer management, mutex contention, memory ownership) matters as much as the neural network architecture itself.",
    evidence: [
      { type: "REPORT", label: "Research Abstract", detail: "ISEF-oriented research exploration on compute-constrained multilingual speech transcription." },
      { type: "DATA", label: "Bench Test Logs", detail: "Latency and memory measurements across 100 consecutive stream cycles." },
    ],
  },
  {
    slug: "flight-control",
    number: "03",
    title: "Fixed-Wing Flight Control & Stabilizer",
    subtitle: "Closed-Loop Attitude Estimation & Sensor Fusion",
    domain: "Avionics • Embedded C++ • Control Theory",
    year: "2025 – 2026",
    status: "VALIDATED TEST",
    question: "How much attitude estimation accuracy and gust stability can be extracted from an inexpensive 6-DOF IMU on a microcontroller?",
    constraint: "Brushless motor vibration couples into the MEMS sensor silicon, corrupting raw accelerometer measurements and causing naive complementary filters to diverge rapidly.",
    firstApproach: "Wrote a basic complementary filter on an Arduino Nano. Once the motor reached 50% throttle, the pitch reading drifted by over 35° within 10 seconds due to mechanical vibration noise.",
    architectureNodes: [
      { id: "imu", label: "MPU6500", sublabel: "Raw 3-axis gyro + 3-axis accel at 500Hz", type: "input" },
      { id: "calib", label: "Calibration", sublabel: "Static offset & noise attenuation", type: "process" },
      { id: "state", label: "State Estimation", sublabel: "Kalman attitude & gyro bias filter", type: "process" },
      { id: "pid", label: "PID", sublabel: "Dual-axis angular rate loop", type: "decision" },
      { id: "servo", label: "Servo Output", sublabel: "Deflection PWM commands", type: "output" },
      { id: "aircraft", label: "Aircraft (↺ feedback)", sublabel: "Dynamic aerodynamics & state loop", type: "output" },
    ],
    build: {
      coreTech: ["C++", "ESP32", "FreeRTOS", "MPU6500", "iBUS Protocol"],
      description: "Engineered custom flight stabilization firmware on ESP32. Pinned the 500Hz Kalman filter loop to Core 0 with microsecond timer interrupts, while Core 1 handles RC receiver telemetry and failsafe checks.",
      codeSnippet: {
        filename: "kalman_attitude.cpp",
        language: "cpp",
        code: `void KalmanFilter::update(float dt, float gyro_rate, float accel_angle) {\n    // 1. Predict state\n    angle += dt * (gyro_rate - bias);\n    P[0][0] += dt * (dt*P[1][1] - P[0][1] - P[1][0] + Q_angle);\n    P[0][1] -= dt * P[1][1];\n    P[1][0] -= dt * P[1][1];\n    P[1][1] += Q_gyro * dt;\n    \n    // 2. Compute Kalman gain & correct estimate\n    float S = P[0][0] + R_measure;\n    float K[2] = { P[0][0] / S, P[1][0] / S };\n    float y = accel_angle - angle;\n    angle += K[0] * y;\n    bias  += K[1] * y;\n}`,
      },
    },
    experiments: [
      {
        id: "EXP // AV-003",
        title: "Vibration Dampening & Filter Noise Attenuation",
        hypothesis: "Adding silicone dampening silicone grommets and a 40Hz software filter will reduce throttle-induced pitch variance below 1.0°.",
        setup: "Bench-mounted airframe on test rig, swept motor throttle from 0% to 100% in 10% steps.",
        variable: "Mounting isolation (Rigid PLA mount vs Decoupled silicone tray).",
        measurement: "Standard deviation of pitch angle during 10 seconds of full throttle.",
        result: "Pitch standard deviation dropped from 4.8° to 0.72°.",
        status: "PASS",
        notes: "Kalman covariance matrices tuned: Q_angle=0.001, Q_gyro=0.003, R_measure=0.03.",
      },
    ],
    whatBroke: [
      {
        id: "WB-03",
        title: "Control Loop Jitter from Serial Logging",
        cause: "Printing debug telemetry over USB serial in the main loop introduced 15–20ms blocking spikes, causing servos to stutter violently.",
        change: "Moved all telemetry to a separate FreeRTOS task on Core 1 communicating via a non-blocking queue.",
        result: "Control loop jitter dropped to <120 microseconds, restoring smooth servo deflection.",
      },
    ],
    result: "Achieved robust real-time pitch and roll stabilization with <12ms latency from physical perturbation to servo reaction.",
    iteration: "Designed a 3D printed mechanical bracket providing dual-axis sensor isolation and centered mass balance inside the fuselage.",
    currentLimitation: "Does not have a pitot tube airspeed sensor, so PID parameters remain constant across slow glide and high-speed dive.",
    nextQuestion: "Can differential pressure data from a digital pitot sensor dynamically scale PID gains based on dynamic pressure $q = \\frac{1}{2}\\rho v^2$?",
    reflection: "Hardware does not forgive lazy math. When a model flies at 60 km/h, every microsecond of timing jitter manifests as physical instability.",
    evidence: [
      { type: "PHOTO", label: "Bench Test & Airframe", detail: "Custom avionics wiring and silicone isolation assembly built in school ATL lab." },
      { type: "DATA", label: "Attitude Telemetry", detail: "Serial UART log curves demonstrating pitch stability under vibration." },
    ],
  },
  {
    slug: "escl",
    number: "04",
    title: "ESCL-II: Electromagnetic Space-Launch Assist",
    subtitle: "Physics Modeling & Trajectory Assist Simulation",
    domain: "Aerospace • Physics Modeling • Numerical Simulation",
    year: "2026",
    status: "RESEARCH PAPER",
    question: "Can ground-based electromagnetic acceleration meaningfully reduce the propellant burden of an orbital launch vehicle?",
    constraint: "Supersonic sea-level exit speeds ($>1500\\text{ m/s}$) induce extreme dynamic pressure ($Q > 250\\text{ kPa}$) and thermal ablation in dense atmosphere, negating the rocket's propellant savings with thermal shielding mass.",
    firstApproach: "Initially modeled an aggressive high-velocity railgun launcher at sea level. Aerodynamic drag in the lower troposphere decimated kinetic energy within 3 km of launch, and required g-forces exceeded 60g.",
    architectureNodes: [
      { id: "power", label: "Pulse Power Capacitor Bank", sublabel: "Capacitive energy storage discharge", type: "input" },
      { id: "rail", label: "Linear Induction Track", sublabel: "Progressive coil excitation profile", type: "process" },
      { id: "exit", label: "Elevated High-Altitude Exit", sublabel: "Reduced atmospheric density (300-500 m/s)", type: "process" },
      { id: "aero", label: "Supersonic Transonic Flight", sublabel: "Aerodynamic heating and drag modeling", type: "decision" },
      { id: "rocket", label: "Upper Stage Rocket Ignition", sublabel: "Orbital injection burn", type: "output" },
    ],
    build: {
      coreTech: ["Python", "NumPy", "Matplotlib", "Physics Modeling", "US Standard Atmosphere 1976"],
      description: "Built numerical simulation models calculating drag force, aerodynamic heating, structural g-loads, and $\\Delta v$ reduction for an inclined electromagnetic launch-assist track.",
      codeSnippet: {
        filename: "launch_trajectory_sim.py",
        language: "python",
        code: `def simulate_launch_assist(v_exit, angle_deg, payload_mass):\n    # Calculate atmospheric density as function of altitude\n    alt = 0.0\n    v = v_exit\n    dt = 0.01\n    trajectory = []\n    while v > 0 and alt < 50000:\n        rho = atmospheric_density_1976(alt)\n        drag = 0.5 * rho * v**2 * Cd * Area\n        q = 0.5 * rho * v**2 # Dynamic pressure\n        v -= (drag / payload_mass + g * math.sin(angle_rad)) * dt\n        alt += v * math.sin(angle_rad) * dt\n        trajectory.append({"alt": alt, "v": v, "q": q})\n    return trajectory`,
      },
    },
    experiments: [
      {
        id: "EXP // ESCL-SIM",
        title: "Exit Velocity vs Aerodynamic Drag Tradeoff",
        hypothesis: "A moderate exit velocity of 400–500 m/s from an elevated launch point maximizes propellant savings while keeping payload g-loads under 25g.",
        setup: "Simulated 500 payload launch profiles varying exit speed from 200 m/s to 1200 m/s.",
        variable: "Muzzle exit velocity and track elevation angle.",
        measurement: "Net payload mass fraction delivered to 200 km Low Earth Orbit.",
        result: "Optimal efficiency achieved at 450 m/s at 35° incline, reducing first-stage propellant by ~18%.",
        status: "VALIDATED",
        notes: "Peak dynamic pressure kept below 65 kPa, avoiding heavy ablative thermal shields.",
      },
    ],
    whatBroke: [
      {
        id: "WB-04",
        title: "Unrealistic Instantaneous Acceleration Spikes",
        cause: "Initial discharge curves assumed idealized square power pulses, producing unphysical 80g acceleration spikes that would destroy standard commercial electronics.",
        change: "Replaced square pulse models with realistic RLC capacitor discharge profiles with distributed coil switching.",
        result: "Smoothed acceleration curve to an achievable peak of 22g, well within shock-hardened avionics tolerances.",
      },
    ],
    result: "Demonstrated theoretically that ground electromagnetic acceleration functions best as a velocity-assist system for upper stages rather than a direct-to-orbit cannon.",
    iteration: "Authored technical concept paper and submitted to the ISRO Science Programme Office for review.",
    currentLimitation: "Lacks physical micro-scale track data for electromagnetic rail wear and thermal dissipation during rapid successive discharges.",
    nextQuestion: "Can a small-scale linear induction bench test track validate switching timing with optical interrupt sensors?",
    reflection: "In aerospace physics, the atmosphere is not just an empty medium you fly through; at high velocity, air becomes a rigid physical barrier.",
    evidence: [
      { type: "EMAIL", label: "ISRO SPO Technical Review", detail: "Formal encouraging response from ISRO Science Programme Office motivating continued study." },
      { type: "REPORT", label: "Simulation Trajectory Script", detail: "Python atmospheric trajectory & dynamic pressure calculations." },
    ],
  },
];

// ----------------------------------------------------------------------
// 03 — EXPERIMENT ARCHIVE (SECONDARY BUILDS)
// ----------------------------------------------------------------------
export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    year: "2026",
    title: "FlowDictate",
    question: "How can voice dictation run completely offline with zero telemetry on personal workstations?",
    domain: "C++ • Qt • whisper.cpp",
    tech: ["C++", "Qt6", "whisper.cpp", "Windows API"],
    status: "ACTIVE",
    summary: "A private desktop dictation tool providing global keyboard injection without cloud audio transmission.",
    githubUrl: "https://github.com/pranav520214/FlowDictate",
  },
  {
    year: "2026",
    title: "VID-ED X",
    question: "Can desktop video editors automate semantic search across hours of raw video footage locally?",
    domain: "Tauri • Rust • React",
    tech: ["Tauri", "Rust", "React", "SQLite", "FFmpeg"],
    status: "PROTOTYPE",
    summary: "Desktop video editing application with local frame segmentation and semantic footage indexing.",
  },
  {
    year: "2026",
    title: "Bharat One / Civic AI",
    question: "How can municipal grievance portals cluster duplicate reports without manual human triaging?",
    domain: "Full-Stack • Geospatial AI",
    tech: ["Next.js", "Firebase", "Sentence-Transformers", "Leaflet"],
    status: "PROTOTYPE",
    summary: "Civic report clustering platform engineered during the DEVENGERS PromptWars build.",
  },
  {
    year: "2025",
    title: "Envirosynk AI / Ecosentinel",
    question: "Can distributed soil and air sensors predict crop disease indicators on low-power microcontrollers?",
    domain: "Edge AI • Embedded Sensors",
    tech: ["Arduino", "ESP32", "Edge Impulse", "Sensirion IMU"],
    status: "PROTOTYPE",
    summary: "Physical AI environmental sensing prototype built for Qualcomm-Arduino challenge.",
  },
  {
    year: "2025",
    title: "Sanjeevani Edge-AI Medical Kit",
    question: "How can first-aid medical triage function in remote disaster zones when internet infrastructure collapses?",
    domain: "Offline AI • Resilient Systems",
    tech: ["Python", "TensorFlow Lite", "Raspberry Pi", "E-Ink Display"],
    status: "ARCHIVED",
    summary: "Compact offline triage station delivering verified emergency treatment steps.",
  },
  {
    year: "2025",
    title: "Photonic & Neuromorphic Computing Experiments",
    question: "Can optical wave interference realistically accelerate matrix-vector multiplications for neural networks?",
    domain: "Optical Physics • Simulation",
    tech: ["Python", "NumPy", "Wave Optics Modeling"],
    status: "ARCHIVED",
    summary: "Numerical simulation exploring passive Mach-Zehnder interferometer meshes for optical matrix math.",
  },
];

// ----------------------------------------------------------------------
// 04 — HOW I BUILD (METHODOLOGY PIPELINE)
// ----------------------------------------------------------------------
export const HOW_I_BUILD_STEPS = [
  {
    step: "01",
    name: "QUESTION",
    headline: "Begin with a genuine constraint or unknown",
    supportingLabel: "problem framing & constraints",
    description: "I don't begin with a trendy framework or an API wrapper. I start with a physical constraint, a broken expectation, or an engineering question I don't know how to solve.",
    example: "Example: 'Why does streaming ASR stutter on CPU while batch processing runs fine?'",
  },
  {
    step: "02",
    name: "READ",
    headline: "Study documentation, papers, and datasheets",
    supportingLabel: "papers / datasheets / documentation",
    description: "Before writing code, I read the underlying literature: academic papers, MEMS sensor datasheets, hardware manuals, and compiler specifications.",
    example: "Example: Reading MPU6500 silicon noise specifications and whisper.cpp audio buffer allocations.",
  },
  {
    step: "03",
    name: "SKETCH",
    headline: "Diagram architecture and mathematical boundaries",
    supportingLabel: "state graphs & equations",
    description: "Draw the state transitions, coordinate systems, data flow graphs, and error conditions on paper before touching the keyboard.",
    example: "Example: Mapping the Kalman prediction/update step and state covariance matrices.",
  },
  {
    step: "04",
    name: "BUILD",
    headline: "Construct minimal, instrumented prototypes",
    supportingLabel: "software / electronics / CAD / simulation",
    description: "Build the simplest possible prototype that can test the core hypothesis. Add telemetry, timer interrupts, and micro-benchmarks from day one.",
    example: "Example: Writing lean C++ code on ESP32 running FreeRTOS with microsecond timing.",
  },
  {
    step: "05",
    name: "BREAK",
    headline: "Stress test and identify where assumptions fail",
    supportingLabel: "noise injection & edge stress",
    description: "Push the prototype past its comfort zone: high vibration, noisy audio, corrupted syntax, memory limits. Failures reveal the true physics of the system.",
    example: "Example: Discovering that motor vibration destroyed accelerometer attitude readings at 8,000 RPM.",
  },
  {
    step: "06",
    name: "MEASURE",
    headline: "Collect concrete empirical data",
    supportingLabel: "latency / accuracy / sensor drift / stability",
    description: "Never guess why something broke. Measure with oscilloscope traces, UART serial logs, latency timers, and memory profilers.",
    example: "Example: Logging pitch standard deviation across 10 throttle steps to isolate harmonic vibration peaks.",
  },
  {
    step: "07",
    name: "REBUILD",
    headline: "Iterate based on measured evidence",
    supportingLabel: "hardware decoupling & firmware patches",
    description: "Redesign the hardware mount, rewrite the stream state machine, or add a verification gate based on the empirical measurements.",
    example: "Example: Adding silicone vibration isolators and a 40Hz digital Chebyshev filter.",
  },
  {
    step: "08",
    name: "DOCUMENT",
    headline: "Record findings and seek external critique",
    supportingLabel: "logs / GitHub / diagrams / notes",
    description: "Write down what broke, what changed, and what questions remain unresolved. Share unfinished work with researchers who know more than I do.",
    example: "Example: Publishing engineering notes and sending concept papers to domain experts.",
  },
];

// ----------------------------------------------------------------------
// 05 — ENGINEERING NOTEBOOK ENTRIES
// ----------------------------------------------------------------------
export const ENGINEERING_NOTES: EngineeringNoteMeta[] = [
  {
    slug: "model-size-tradeoffs",
    date: "2026.02",
    title: "Why I stopped treating model size as the only optimization target",
    domain: "Edge AI • Quantization",
    question: "Does aggressive 4-bit quantization actually solve edge device interaction latency?",
    observation: "Memory bandwidth saturation and KV-cache allocation dominate streaming latency far more than parameter count.",
    whatChanged: "Shifted focus to prompt pruning, KV-cache quantization, and AST-level verification rather than squeezing models into 4-bit edge cases.",
  },
  {
    slug: "asr-stream-ownership",
    date: "2026.01",
    title: "Debugging stream lifecycle and audio buffer ownership in local ASR",
    domain: "C++ • Systems Audio",
    question: "Why did rapid consecutive utterances cause audio buffer bleed and phantom transcripts?",
    observation: "Asynchronous stream creation outpaced the circular buffer drain loop, leading to cross-utterance memory leaks.",
    whatChanged: "Implemented a strict synchronous state machine: FINISH → DRAIN → DESTROY → IDLE → RECREATE.",
  },
  {
    slug: "noisy-imu-measurements",
    date: "2025.11",
    title: "What cheap IMUs teach you about noisy measurements and vibration",
    domain: "Avionics • Sensor Fusion",
    question: "Why does raw accelerometer integration diverge during motor throttle transients?",
    observation: "Brushless motor vibration couples into MEMS silicon, producing noise spikes that overwhelm gravity vectors.",
    whatChanged: "Added silicone physical dampers and a 40Hz software low-pass filter, tuning Kalman covariance matrices for gyro reliance during throttle.",
  },
  {
    slug: "verification-over-generation",
    date: "2026.02",
    title: "Why verification matters more than generation in code agents",
    domain: "Compilers • Software Security",
    question: "Can AI coding assistants be trusted to patch security vulnerabilities without static verification?",
    observation: "Generative models produce syntactically plausible patches that routinely break unseen repository invariants.",
    whatChanged: "Re-architected Rudra Sentinel so patches must pass AST type checks and isolated Docker builds before human review.",
  },
  {
    slug: "electromagnetic-launch-physics",
    date: "2026.02",
    title: "What I misunderstood about electromagnetic launch systems",
    domain: "Aerospace • Physics Modeling",
    question: "Can a ground electromagnetic railgun eliminate a rocket's first stage at sea level?",
    observation: "Aerodynamic drag and heating in the dense lower atmosphere cancel out propellant savings with excessive heat-shield mass.",
    whatChanged: "Re-scoped ESCL-II as a moderate-speed (450 m/s) velocity assist from an elevated altitude track, minimizing dynamic pressure.",
  },
  {
    slug: "hardware-constraints-experiments",
    date: "2025.10",
    title: "Designing experiments when you don't have expensive hardware",
    domain: "Methodology • Embedded",
    question: "How do you conduct rigorous engineering experiments without industrial lab gear?",
    observation: "Hardware constraints force disciplined mathematical isolation of variables and micro-benchmarks.",
    whatChanged: "Built deterministic serial UART logging harnesses and standardized standard-deviation error reporting across repeated trials.",
  },
];

// ----------------------------------------------------------------------
// 06 — EXTERNAL FEEDBACK
// ----------------------------------------------------------------------
export const EXTERNAL_FEEDBACK: ExternalFeedbackItem[] = [
  {
    id: "FB-02",
    source: "Aerospace Agency Appraisal",
    reviewer: "ISRO Science Programme Office",
    role: "Technical Correspondence (ISRO HQ)",
    project: "ESCL-II Launch Assist",
    feedbackSummary: "Provided formal encouraging technical feedback on the electromagnetic launch-assist concept paper, noting the ambitious scope and advising deeper thermodynamic modeling.",
    whatPranavChanged: "Refined aerodynamic heating calculations and lowered exit velocity targets to 450 m/s to reduce lower-atmosphere dynamic pressure.",
    proofImage: "/certificates/proof-isro-response.png",
  },
  {
    id: "FB-03",
    source: "Engineering Faculty Commendation",
    reviewer: "IIT Delhi Faculty",
    role: "Faculty Reviewers",
    project: "Technical Innovation Presentation",
    feedbackSummary: "Commended the presentation quality, technical depth, and systems thinking demonstrated in the prototype showcase, recommending expert mentorship.",
    whatPranavChanged: "Reinforced commitment to rigorous first-principles prototyping and sought out academic research critiques.",
    proofImage: "/certificates/proof-iit-delhi-appreciation.png",
  },
];

// ----------------------------------------------------------------------
// 07 — MILESTONES (SELECTED RECOGNITION VS PROGRAMS)
// ----------------------------------------------------------------------
export const MILESTONES: MilestoneItem[] = [
  // Selected Recognition
  {
    id: "M01",
    date: "March 2026",
    title: "Indian Space Olympiad 2026 — Advanced Level",
    organizer: "Indian Space School",
    outcome: "92nd Percentile · AIR 47 Advanced Level · AIR 24 Class XI Grade",
    highlight: "Ranked in top 8% nationwide across rigorous aerospace and physics evaluation; invited to the Young Space Scientist Workshop.",
    category: "recognition",
    proofId: "P02",
    proofTitle: "Space Olympiad Official Scorecard",
    proofImage: "/certificates/proof-space-olympiad.png",
  },
  {
    id: "M02",
    date: "February 2026",
    title: "STEM-A-THON 2026 — Top Young Innovator of India",
    organizer: "STEM-A-THON National Council",
    outcome: "Rank #56 Nationwide · Awarded 'Top Young Innovator' Commendation",
    highlight: "Recognized nationwide for hands-on technical execution, prototyping discipline, and problem solving.",
    category: "recognition",
    proofId: "P01",
    proofTitle: "STEM-A-THON National Certificate",
    proofImage: "/certificates/proof-stem-a-thon.jpg",
  },
  {
    id: "M03",
    date: "January 2026",
    title: "Confluence 2.0 International Innovation Hackathon",
    organizer: "Confluence 2.0 / The Helpers",
    outcome: "Top 100 Selected Participant Worldwide",
    highlight: "Selected into the top 100 globally for software innovation and architecture presentation.",
    category: "recognition",
    proofId: "P04",
    proofTitle: "Confluence 2.0 Achievement Record",
    proofImage: "/certificates/proof-confluence-hackathon.png",
  },

  // Participation & Programs
  {
    id: "M04",
    date: "January 2026",
    title: "Samsung Solve for Tomorrow 2026",
    organizer: "Samsung India",
    outcome: "Selected Participant in National Innovation Program",
    highlight: "Formulated community problem-solving hardware concept targeting youth innovation.",
    category: "program",
    proofId: "P07",
    proofTitle: "Samsung Solve for Tomorrow Record",
    proofImage: "/certificates/proof-samsung-learnix-devengers.png",
  },
  {
    id: "M05",
    date: "January 2026",
    title: "AI for Bharat Hackathon 2026",
    organizer: "IIIT Delhi / Unstop",
    outcome: "Eliminator Round Submission",
    highlight: "Engineered societal problem-solving architecture competing alongside university and open teams.",
    category: "program",
    proofId: "Cert01",
    proofTitle: "IIIT Delhi AI for Bharat Certificate",
    proofImage: "/certificates/cert-ai-for-bharat.png",
  },
  {
    id: "M06",
    date: "January 2026",
    title: "DEVENGERS PromptWars 2026",
    organizer: "DEVENGERS",
    outcome: "Built Bharat One / Civic AI Full-Stack Prototype",
    highlight: "Constructed civic duplicate report clustering prototype using Next.js, Firebase, and sentence embeddings.",
    category: "program",
    proofId: "Cert03",
    proofTitle: "DEVENGERS PromptWars Certificate",
    proofImage: "/certificates/cert-promptwars-devengers.png",
  },
  {
    id: "M07",
    date: "January 2026",
    title: "The ₹100 Founder Challenge",
    organizer: "TechVerse Solutions / Unstop",
    outcome: "Blueprint Submission Stage",
    highlight: "Formulated technical feasibility and economics for scalable student-built embedded hardware.",
    category: "program",
    proofId: "Cert02",
    proofTitle: "The ₹100 Founder Challenge Certificate",
    proofImage: "/certificates/cert-100-rupee-founder.png",
  },
  {
    id: "M08",
    date: "January 2026",
    title: "Vibe2Ship Hackathon",
    organizer: "Coding Ninjas & Google for Developers",
    outcome: "Certificate of Participation",
    highlight: "Rapid AI-assisted prototype construction under competitive 24-hour shipping constraints.",
    category: "program",
    proofId: "P03",
    proofTitle: "Vibe2Ship Official Certificate",
    proofImage: "/certificates/proof-vibe2ship.png",
  },
];

// ----------------------------------------------------------------------
// 08 — SYSTEMS TOOLBOX (AUTHENTIC BUILD CAPABILITIES)
// ----------------------------------------------------------------------
export const SYSTEMS_TOOLBOX: ToolboxCategory[] = [
  {
    category: "COMPUTE & SOFTWARE",
    description: "Languages and low-level runtimes for system tools, parsers, and desktop engines.",
    items: [
      { name: "C++", role: "Avionics & Low-Level Engines", application: "whisper.cpp streaming audio buffers, ESP32 flight loops, and high-frequency algorithms." },
      { name: "Python", role: "Research & Modeling", application: "Trajectory physics simulations, AST tree diffing, and PyTorch dataset processing." },
      { name: "Rust", role: "Desktop Backends", application: "Tauri native system integrations and memory-safe background workers." },
      { name: "TypeScript", role: "Web Platforms & UI", application: "Next.js applications, custom WebGL/Three.js interactive shaders, and frontend tooling." },
    ],
  },
  {
    category: "EMBEDDED & AVIONICS",
    description: "Microcontrollers, physical sensors, and hardware control loops.",
    items: [
      { name: "ESP32", role: "Dual-Core MCU", application: "Core 0 FreeRTOS 500Hz Kalman loop, Core 1 telemetry and iBUS decoding." },
      { name: "MPU6500", role: "6-DOF IMU", application: "Attitude estimation with hardware interrupt reading and digital filtering." },
      { name: "FreeRTOS", role: "Real-Time OS", application: "Deterministic task pinning, semaphore synchronization, and jitter prevention." },
      { name: "Arduino / STM32", role: "Prototyping & Control", application: "Rapid bench hardware bringup, PWM servo mixers, and serial logging." },
    ],
  },
  {
    category: "AI & SYSTEMS ASSURANCE",
    description: "Inference engines, parsing frameworks, and containerized verification gates.",
    items: [
      { name: "Tree-sitter", role: "Syntax Parser", application: "AST parsing, call graph extraction, and structural syntax diffing." },
      { name: "llama.cpp / GGUF", role: "Local Inference", application: "Quantized SLM execution with customized memory limits on consumer CPUs." },
      { name: "Docker", role: "Sandbox Isolation", application: "Hermetic compiler verification and regression testing of proposed code patches." },
      { name: "whisper.cpp", role: "Speech Recognition", application: "Local acoustic inference with low memory overhead." },
    ],
  },
  {
    category: "DESIGN, CAD & SIMULATION",
    description: "Mechanical brackets, 3D visualizations, and numerical modeling tools.",
    items: [
      { name: "Fusion 360 / FreeCAD", role: "Mechanical CAD", application: "Designing 3D-printable airframe brackets and silicone sensor-damping trays." },
      { name: "NumPy / SciPy", role: "Physics Simulation", application: "Atmospheric density modeling, launch trajectory $\\Delta v$ math, and matrix solvers." },
      { name: "Three.js / R3F", role: "Spatial Visualization", application: "Interactive 3D exploded views and WebGL instrumentation panels." },
      { name: "Blender", role: "3D Asset Modeling", application: "Preparing low-polygon engineering meshes for WebGL rendering." },
    ],
  },
];
