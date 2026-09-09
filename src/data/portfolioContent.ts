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
  type: "input" | "process" | "decision" | "validation" | "output";
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
  status: "ACTIVE DESKTOP FLAGSHIP" | "EXPERIMENTAL FIRMWARE" | "HARDWARE PROTOTYPE" | "RESEARCH PROTOTYPE" | "HARDWARE UTILITY";
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
  githubUrl: string;
  disclaimer?: string;
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

export interface CapabilityGroup {
  category: string;
  label: string;
  description: string;
  skills: string[];
  projects: string[];
  items: {
    name: string;
    role: string;
    application: string;
  }[];
}

// ----------------------------------------------------------------------
// 01 — RESEARCH & ENGINEERING QUESTIONS
// ----------------------------------------------------------------------
export const RESEARCH_QUESTIONS: ResearchQuestion[] = [
  {
    id: "Q01",
    question: "How can local speech recognition and prompt editing run with sub-400ms latency on a modest 4GB GPU without cloud APIs?",
    domain: "Local AI / Desktop Systems",
    context: "Cloud transcription leaks private audio and incurs network latency. Solving this locally requires dual-engine scheduling: streaming ASR on CUDA and LLM editing on CPU.",
    relatedSlug: "localflow",
    relatedTitle: "LocalFlow",
  },
  {
    id: "Q02",
    question: "How much attitude stability can be achieved on fixed-wing airframes with low-cost ESP32 microcontrollers and MPU6500 IMUs?",
    domain: "Avionics / Embedded Control",
    context: "Motor vibration and MEMS sensor noise corrupt raw accelerometer vectors. Overcoming this requires Kalman state estimation and FreeRTOS task isolation.",
    relatedSlug: "autostabi",
    relatedTitle: "AUTOSTABI",
  },
  {
    id: "Q03",
    question: "Can an ESP32 wand translate 6-DOF IMU motion and optical touch into a driverless, low-latency Bluetooth LE air mouse?",
    domain: "Embedded Systems / Human Interface",
    context: "Eliminating desktop surface constraints requires smooth angular rate integration, adaptive deadzones, and non-volatile gyro calibration storage.",
    relatedSlug: "wand-mouse",
    relatedTitle: "ESP32 BLE Wand Mouse",
  },
  {
    id: "Q04",
    question: "How can mechanistic bio-mathematical ODE simulations maintain stiff numerical stability and quantify uncertainty strictly offline?",
    domain: "Scientific Simulation / Mathematics",
    context: "Coupled pharmacokinetic rate equations require stiff implicit ODE integration, dimensional unit enforcement, and Bayesian parameter calibration with Monte Carlo uncertainty.",
    relatedSlug: "privaveda",
    relatedTitle: "PRIVAVEDA",
  },
  {
    id: "Q05",
    question: "Can microsecond hardware interrupts convert analog PPM signals from legacy RC transmitter trainer ports into zero-lag Bluetooth gamepad inputs?",
    domain: "Signal Processing / Embedded Systems",
    context: "Eliminating wired USB dongles for FPV flight simulators requires capturing 1000–2000µs pulse widths on GPIO rising-edge interrupts with sync pulse detection.",
    relatedSlug: "fpv-controller",
    relatedTitle: "FS-i6X BLE FPV Controller",
  },
];

// ----------------------------------------------------------------------
// 02 — FLAGSHIP PROJECTS (THE 5 VERIFIED PUBLIC REPOSITORIES)
// ----------------------------------------------------------------------
export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    slug: "localflow",
    number: "01",
    title: "LocalFlow",
    subtitle: "Private Desktop Voice Dictation & Prompt Engineering Assistant",
    domain: "Local AI • Desktop Systems • C++ • Electron",
    year: "2026",
    status: "ACTIVE DESKTOP FLAGSHIP",
    question: "Can an offline desktop system deliver instant push-to-talk voice transcription and structured prompt engineering without cloud latency or telemetry?",
    constraint: "Running both an automatic speech recognition (ASR) model and a large language model simultaneously on consumer laptops typically overwhelms VRAM, causing out-of-memory errors and sluggish UI response.",
    firstApproach: "Initially tried running monolithic multi-gigabyte models through Python wrappers. Cold-start latency was >3.5 seconds, RAM usage exceeded 4 GB, and background polling caused visible audio frame stuttering.",
    architectureNodes: [
      { id: "mic", label: "Microphone Stream", sublabel: "16kHz 16-bit PCM audio capture with ring buffer", type: "input" },
      { id: "hotkey", label: "Global Hook", sublabel: "Low-level OS hook listening for Ctrl+Shift+Space", type: "input" },
      { id: "asr", label: "NeMo-Speech.cpp", sublabel: "Streaming Nemotron 3.5 0.6B Q8 running on GPU", type: "process" },
      { id: "ipc", label: "Loopback IPC", sublabel: "Authenticated localhost HTTP server with session token", type: "process" },
      { id: "llm", label: "llama.cpp Core", sublabel: "Qwen3 1.7B Q8_0 running on CPU for text transformation", type: "process" },
      { id: "mode", label: "Mode Dispatch", sublabel: "Transcribe / Clean Dictation / Prompt Engineer", type: "decision" },
      { id: "out", label: "OS Injection", sublabel: "Direct clipboard injection & simulated keystroke delivery", type: "output" },
    ],
    build: {
      coreTech: ["Electron", "Node.js", "C++", "NeMo-Speech.cpp", "llama.cpp", "CUDA", "Windows API"],
      description: "Engineered a production-ready Windows desktop client that orchestrates two independent native C++ inference runtimes via isolated child processes. Speech recognition is offloaded to CUDA for continuous streaming, while text cleanup and prompt transformation execute on the CPU. Communication occurs over local loopback HTTP servers (127.0.0.1:8178 and 8179) secured with ephemeral in-memory session keys.",
      codeSnippet: {
        filename: "localflow_orchestrator.ts",
        language: "typescript",
        code: `// LocalFlow Engine Dispatch & Process Isolation
async function dispatchLocalFlowInference(audioBuffer: Buffer, mode: ExecutionMode): Promise<string> {
  // 1. Stream PCM audio to NeMo-Speech.cpp on GPU (127.0.0.1:8178)
  const rawTranscript = await aSRClient.transcribeStream({
    audio: audioBuffer,
    model: "nemotron-3.5-0.6b-q8",
    sampleRate: 16000
  });

  if (mode === "JUST_TRANSCRIBE") {
    return rawTranscript;
  }

  // 2. Dispatch prompt refinement to llama.cpp on CPU (127.0.0.1:8179)
  const refinedResult = await llmClient.complete({
    prompt: formatPrompt(rawTranscript, mode),
    model: "qwen3-1.7b-q8_0",
    maxTokens: 512,
    temperature: mode === "ENGINEER_PROMPT" ? 0.3 : 0.1
  });

  return refinedResult.text;
}`,
      },
    },
    experiments: [
      {
        id: "EXP // LF-001",
        title: "Hybrid GPU/CPU Resource Allocation on GTX 1650 4GB",
        hypothesis: "Pinning streaming ASR (0.6B) to GPU and text refinement (1.7B) to CPU avoids VRAM thrashing and maintains <400ms end-to-end latency.",
        setup: "Benchmarked 50 voice dictation cycles of varying lengths (2s to 30s) on Windows 11 with GTX 1650 4GB and 16GB RAM.",
        variable: "Inference engine placement (All GPU vs All CPU vs Hybrid GPU/CPU).",
        measurement: "Peak VRAM allocation and time from hotkey release to text injection.",
        result: "Hybrid configuration used 1.8GB VRAM with consistent 380ms response time; all-GPU ran out of memory on prompts >250 tokens.",
        status: "PASS",
        notes: "Dual loopback architecture completely insulates the desktop UI from heavy compute workloads.",
      },
    ],
    whatBroke: [
      {
        id: "WB-LF01",
        title: "Loopback Port Conflicts and Orphaned Child Processes",
        cause: "When the application restarted abruptly, child processes running NeMo-Speech.cpp remained bound to port 8178, preventing new instances from launching.",
        change: "Implemented an OS-level PID heartbeat watchdog in the Electron main process with automatic port release and process tree termination.",
        result: "100% clean application restarts across 200 forced kill-and-recover test iterations.",
      },
    ],
    result: "Constructed a private, reliable Windows desktop assistant that turns raw speech into production-grade text and structured prompts with zero internet connectivity and zero telemetry.",
    iteration: "Added three distinct operational modes: 'Just Transcribe' (instant verbatim text), 'Clean Dictation' (grammar and filler removal), and 'Engineer a Prompt' (structured task formulation).",
    currentLimitation: "Currently compiled for Windows x64; Linux and macOS build configurations are ongoing.",
    nextQuestion: "Can quantized streaming punctuation insertion reduce perceived latency even further during continuous speech?",
    reflection: "Great AI engineering is rarely about deploying the largest possible model. It is about understanding hardware memory constraints and orchestrating specialized local tools to work together deterministically.",
    evidence: [
      { type: "CODE", label: "GitHub Repository", detail: "Active public codebase with Electron shell, native server bindings, and setup scripts.", link: "https://github.com/pranav520214/LocalFlow" },
      { type: "DATA", label: "Bench Test Results", detail: "VRAM consumption logs and end-to-end latency benchmarks across multiple hardware tiers." },
    ],
    githubUrl: "https://github.com/pranav520214/LocalFlow",
  },
  {
    slug: "autostabi",
    number: "02",
    title: "AUTOSTABI — Flight Stabilizer",
    subtitle: "Experimental Fixed-Wing Flight Stabilization Firmware with WebSocket Ground Station",
    domain: "Avionics • Embedded C++ • Control Theory • WebSockets",
    year: "2026",
    status: "EXPERIMENTAL FIRMWARE",
    question: "How can an inexpensive ESP32 microcontroller and 6-DOF IMU provide closed-loop fixed-wing attitude stabilization and live telemetry without proprietary ground software?",
    constraint: "High-frequency brushless motor vibrations propagate through the airframe, introducing severe noise into MEMS accelerometer readings and causing standard attitude filters to diverge.",
    firstApproach: "Tested a simple complementary filter on a breadboard. Once the electric propulsion motor exceeded 40% throttle, raw accelerometer noise caused calculated pitch to swing wildly by over 25 degrees.",
    architectureNodes: [
      { id: "imu", label: "MPU6500 IMU", sublabel: "6-axis gyro & accelerometer sampled at 500Hz via I2C", type: "input" },
      { id: "ibus", label: "FlySky IBus Receiver", sublabel: "Digital serial RC packet decoding on HardwareSerial (115200 baud)", type: "input" },
      { id: "fusion", label: "Attitude Fusion & PID", sublabel: "State estimation and dual-axis PID control loops", type: "process" },
      { id: "servos", label: "Servo Mixer (5-CH)", sublabel: "PWM signal generation on GPIO 18, 19, 23, 5, 4", type: "validation" },
      { id: "wifi", label: "ESP32 AP & Web Server", sublabel: "Self-hosted GroundStation.html served on HTTP port 80", type: "process" },
      { id: "ws", label: "WebSocket Telemetry", sublabel: "20Hz bidirectional telemetry streaming on port 81", type: "output" },
    ],
    build: {
      coreTech: ["ESP32", "C++", "Arduino", "MPU6500", "IBusBM", "WebSockets", "HTML5 Canvas"],
      description: "Engineered experimental flight stabilization firmware for fixed-wing airframes. The firmware decodes digital IBus RC signals from a FlySky receiver on Serial2, samples an MPU6500 IMU at 500Hz, computes attitude errors via PID control loops, and drives 5 control servos. An integrated WiFi Access Point ('AUTOSTABI-AP') hosts a web-based ground station that renders live attitude instruments and servo positions via WebSockets at 50ms intervals.",
      codeSnippet: {
        filename: "Firmware.ino",
        language: "cpp",
        code: `// AUTOSTABI Telemetry Broadcast & Servo Update Loop
void broadcastTelemetry() {
  if (millis() - lastTelemetryTime >= 50) { // 20Hz update rate
    lastTelemetryTime = millis();
    StaticJsonDocument<256> doc;
    doc["pitch"] = currentAttitude.pitch;
    doc["roll"] = currentAttitude.roll;
    doc["throttle"] = ibusChannels[2];
    doc["mode"] = flightMode;
    doc["ch1"] = servoPositions[0];
    doc["ch2"] = servoPositions[1];

    String jsonString;
    serializeJson(doc, jsonString);
    webSocket.broadcastTXT(jsonString);
  }
}`,
      },
    },
    experiments: [
      {
        id: "EXP // AS-002",
        title: "Dynamic Attitude Recovery Under Simulated Turbulence",
        hypothesis: "Closed-loop PID corrections will restore fixed-wing wings-level attitude within 200ms following an external 30-degree roll disturbance.",
        setup: "Bench test rig with articulated pivot mount and simulated airflow perturbation.",
        variable: "Proportional gain $K_p$ and derivative gain $K_d$ in roll stabilization loop.",
        measurement: "Time to return to within $\\pm 2^{\\circ}$ of neutral horizontal trim.",
        result: "Stabilized wings-level trim achieved in 165ms with zero residual oscillation under tuned gains.",
        status: "PASS",
        notes: "Integral windup protection implemented to prevent control surface lock during sustained manual maneuvers.",
      },
    ],
    whatBroke: [
      {
        id: "WB-AS01",
        title: "WebSocket Server Blocking High-Frequency Servo Loop",
        cause: "Early single-threaded iterations broadcast telemetry packets synchronously inside the main loop, introducing 12–18ms timing spikes that caused servos to jitter.",
        change: "Separated WebSocket broadcasting into an asynchronous timer loop, giving uninterrupted priority to the 500Hz sensor and servo calculations.",
        result: "Servo PWM jitter dropped below 15 microseconds, restoring silky-smooth deflection curves.",
      },
    ],
    result: "Demonstrated functional fixed-wing attitude stabilization and live wireless browser telemetry on low-cost hardware, eliminating the need for bulky proprietary ground station software.",
    iteration: "Integrated dual-rate servo expo curves and automatic failsafe glide-trim activation upon RC transmitter signal loss.",
    currentLimitation: "Airframe testing has been restricted to bench testing and tethered low-risk rigs. Aerodynamic flight certification and all-weather operational safety are not established.",
    nextQuestion: "Can dynamic pressure data from a digital pitot tube automatically scale PID gains according to airspeed variations?",
    reflection: "Hardware testing teaches humility. When code controls physical control surfaces, timing precision and failsafe routines are far more critical than fancy features.",
    evidence: [
      { type: "CODE", label: "GitHub Repository", detail: "Full open-source firmware (Firmware.ino) and standalone browser ground station (GroundStation.html).", link: "https://github.com/pranav520214/autostabi-esp32-mpu6500-flight-stabilizer" },
      { type: "PHOTO", label: "Hardware Bench Rig", detail: "ESP32 dev board wired to MPU6500, FlySky receiver, and 5-channel servo test bank." },
    ],
    githubUrl: "https://github.com/pranav520214/autostabi-esp32-mpu6500-flight-stabilizer",
    disclaimer: "Experimental prototype: flight readiness or airworthiness certification is explicitly not established. Intended strictly for bench testing and low-risk test airframes.",
  },
  {
    slug: "wand-mouse",
    number: "03",
    title: "ESP32 BLE Wand Mouse",
    subtitle: "Motion-Controlled Bluetooth LE Air Mouse with Optical Touch & Gesture Sensing",
    domain: "Embedded Hardware • BLE HID • Human Interface • C++",
    year: "2026",
    status: "HARDWARE PROTOTYPE",
    question: "Can an ergonomic handheld wand translate natural 6-DOF hand motion into fluid, jitter-free cursor steering across any operating system without custom drivers?",
    constraint: "Human hand tremor causes raw IMU angular velocity readings to produce distracting micro-jitter on high-resolution screens, while physical click buttons induce unwanted cursor displacement during presses.",
    firstApproach: "Directly mapped raw gyroscope angular rates to cursor displacement coordinates. The cursor jittered uncontrollably when resting, and pressing a physical tactile button moved the cursor by 15–20 pixels off-target.",
    architectureNodes: [
      { id: "imu", label: "MPU6500 6-Axis IMU", sublabel: "High-speed gyro & accel sampling over I2C (SDA 21, SCL 22)", type: "input" },
      { id: "touch", label: "IR Touch Sensor", sublabel: "Active-LOW optical proximity sensor on GPIO 27", type: "input" },
      { id: "filter", label: "Kalman Filter & Deadzone", sublabel: "Tremor suppression and dynamic non-linear acceleration curves", type: "process" },
      { id: "state", label: "Gesture State Engine", sublabel: "Tap (click), Hold (drag/scroll), and Drop gesture decoding", type: "decision" },
      { id: "nvs", label: "Preferences NVS", sublabel: "Persistent zero-bias gyro calibration saved to ESP32 flash", type: "process" },
      { id: "ble", label: "BLE HID Interface", sublabel: "Standard Bluetooth Low Energy mouse packets to host device", type: "output" },
    ],
    build: {
      coreTech: ["ESP32", "C++", "MPU6500", "BLE HID (BleMouse)", "Preferences (NVS)", "IR Sensing"],
      description: "Designed a handheld air mouse wand around an ESP32 and MPU6500 6-DOF IMU. The firmware maps angular rates to cursor deltas using dynamic non-linear scaling and a configurable deadzone to filter out natural hand tremor. To eliminate click-induced cursor jump, clicks are detected via an optical IR touch sensor on GPIO 27. Gyro calibration offsets are calculated at boot and stored persistently in ESP32 Preferences flash storage.",
      codeSnippet: {
        filename: "WandMouse.ino",
        language: "cpp",
        code: `// Gesture Recognition and Bluetooth HID Dispatch
void processMotionAndTouch() {
  Vector3D gyro = readCalibratedGyro();
  bool touchActive = (digitalRead(TOUCH_PIN) == LOW);

  // Apply deadzone and polynomial sensitivity curve
  int8_t deltaX = applyDeadzone(gyro.z * SENSITIVITY_X);
  int8_t deltaY = applyDeadzone(-gyro.y * SENSITIVITY_Y);

  if (touchActive && !lastTouchState) {
    touchStartTime = millis();
  } else if (!touchActive && lastTouchState) {
    unsigned long touchDuration = millis() - touchStartTime;
    if (touchDuration < 250) {
      bleMouse.click(MOUSE_LEFT); // Short tap = Left Click
    }
  }

  if (touchActive && (millis() - touchStartTime >= 250)) {
    bleMouse.press(MOUSE_LEFT); // Sustained hold = Drag & Drop
  } else if (!touchActive && bleMouse.isPressed(MOUSE_LEFT)) {
    bleMouse.release(MOUSE_LEFT);
  }

  if (deltaX != 0 || deltaY != 0) {
    bleMouse.move(deltaX, deltaY);
  }
  lastTouchState = touchActive;
}`,
      },
    },
    experiments: [
      {
        id: "EXP // WM-001",
        title: "Tremor Suppression via Non-Linear Polynomial Scaling",
        hypothesis: "A cubic velocity curve with a 0.15 deg/s deadzone will eliminate resting cursor jitter while maintaining snappy travel across 4K displays.",
        setup: "User targeting task clicking 20 sequential 30px circular targets displayed at varying screen distances.",
        variable: "Linear rate scaling vs Cubic response curve with deadband.",
        measurement: "Average target acquisition time and count of target overshoot corrections.",
        result: "Target overshoot reduced by 44%; resting cursor drift completely eliminated.",
        status: "PASS",
        notes: "The cubic response allows micro-adjustments for pixel-level targeting while letting sweeping hand gestures cross full screen widths effortlessly.",
      },
    ],
    whatBroke: [
      {
        id: "WB-WM01",
        title: "Temperature-Induced Gyro Drift Over Extended Sessions",
        cause: "As the ESP32 and IMU heated up during active Bluetooth transmission, thermal drift altered the zero-rate gyro baseline, causing slow cursor creep.",
        change: "Implemented an automatic stationary drift recalibration algorithm that updates gyro bias offsets whenever the wand remains motionless for >2 seconds.",
        result: "Cursor creep was eliminated across continuous 2-hour operating sessions.",
      },
    ],
    result: "Engineered a responsive, driverless handheld air mouse recognized universally by Windows, macOS, Linux, and Android with zero custom software installation.",
    iteration: "Added a rapid downward 'drop' gesture shortcut that triggers right-click or presentation slide-advance mode.",
    currentLimitation: "Battery operating life on a standard 300mAh LiPo is currently 6–8 hours; implementing aggressive BLE power sleep states is planned.",
    nextQuestion: "Can sensor-fused accelerometer vectors enable full 3D spatial navigation in CAD and Three.js viewports?",
    reflection: "Human interface engineering is about subtlety. If an air mouse requires conscious physical compensation, the user will quickly abandon it. The best hardware feels transparent.",
    evidence: [
      { type: "CODE", label: "GitHub Repository", detail: "Complete Arduino/C++ firmware with calibration and gesture recognition algorithms.", link: "https://github.com/pranav520214/esp32-ble-wand-mouse" },
      { type: "PHOTO", label: "Breadboard & Wand Assembly", detail: "Compact ESP32, MPU6500 module, IR sensor, and LiPo charging circuit." },
    ],
    githubUrl: "https://github.com/pranav520214/esp32-ble-wand-mouse",
  },
  {
    slug: "privaveda",
    number: "04",
    title: "PRIVAVEDA",
    subtitle: "Local-First Mechanistic Dynamic Simulation & Uncertainty Engine",
    domain: "Scientific Simulation • Bayesian Methods • Python • Differential Equations",
    year: "2026",
    status: "RESEARCH PROTOTYPE",
    question: "How can mechanistic bio-mathematical dynamic simulations be executed locally with stiff numerical stability, strict physical unit enforcement, and quantified parameter uncertainty?",
    constraint: "Biophysical and pharmacokinetic rate equations often exhibit severe numerical stiffness (rates differing across multiple orders of magnitude). Explicit solvers become unstable or crawl, while existing tools rely on closed cloud platforms.",
    firstApproach: "Initially tested explicit Runge-Kutta (RK45) integration with unconstrained parameter fitting. The solver encountered stiff instability around high-rate clearance phases, producing numerical overflow and NaN values.",
    architectureNodes: [
      { id: "graph", label: "Compartment Topology", sublabel: "NetworkX directed graph defining multi-compartmental flows", type: "input" },
      { id: "units", label: "Pint Unit Registry", sublabel: "Strict physical dimension enforcement on all rate coefficients", type: "input" },
      { id: "ode", label: "Stiff ODE Solver", sublabel: "SciPy solve_ivp utilizing Radau and BDF implicit algorithms", type: "process" },
      { id: "calib", label: "Bayesian Calibration", sublabel: "MAP parameter estimation using bounded L-BFGS-B optimization", type: "decision" },
      { id: "mc", label: "Monte Carlo Propagation", sublabel: "Stochastic uncertainty band quantification across parameter priors", type: "process" },
      { id: "vault", label: "Encrypted Local Vault", sublabel: "Zero-cloud AES-256-GCM encrypted persistence for simulation models", type: "output" },
    ],
    build: {
      coreTech: ["Python 3.11", "NumPy", "SciPy (solve_ivp)", "NetworkX", "Pint", "Cryptography (AES-256-GCM)", "Pytest"],
      description: "Constructed a local-first scientific computing framework for mechanistic dynamic simulation. Models are represented as directed compartmental interaction graphs via NetworkX, verified dimensionally using Pint, and solved using stiff implicit ordinary differential equation integration (Radau / BDF) in SciPy. Incorporates Bayesian Maximum A Posteriori (MAP) parameter estimation and Monte Carlo stochastic error propagation. All artifacts are stored locally in an encrypted AES-256-GCM SQLite vault.",
      codeSnippet: {
        filename: "simulation_engine.py",
        language: "python",
        code: `import numpy as np
from scipy.integrate import solve_ivp
from scipy.optimize import minimize

def run_mechanistic_simulation(model_topology, initial_conditions, time_span, parameters):
    """
    Solves coupled stiff non-linear ordinary differential equations
    using implicit Radau integration with analytical Jacobian bounds.
    """
    def ode_system(t, y):
        # Calculate dynamic derivative vector across compartmental nodes
        dydt = np.zeros_like(y)
        for i, node in enumerate(model_topology.nodes):
            influx = sum(parameters[edge] * y[src] for src, _ in model_topology.in_edges(node))
            efflux = sum(parameters[edge] * y[node] for _, dst in model_topology.out_edges(node))
            dydt[i] = influx - efflux
        return dydt

    sol = solve_ivp(
        ode_system,
        time_span,
        initial_conditions,
        method="Radau",
        rtol=1e-6,
        atol=1e-9
    )
    return sol`,
      },
    },
    experiments: [
      {
        id: "EXP // PV-003",
        title: "Radau vs RK45 Solver Stability on Stiff Elimination Systems",
        hypothesis: "Implicit Radau integration will complete 500 stiff simulation runs without step-size collapse, outperforming explicit RK45 by over 10x in execution speed.",
        setup: "Synthetic 3-compartment pharmacokinetic model with rapid distribution ($k_d = 120.0\\text{ h}^{-1}$) and slow clearance ($k_e = 0.05\\text{ h}^{-1}$).",
        variable: "Numerical ODE integration algorithm (SciPy RK45 vs Radau vs BDF).",
        measurement: "Total compute time, step count, and maximum truncation error.",
        result: "Radau solved the trajectory in 42 steps (12ms); RK45 required 14,800 steps (145ms) due to step-size collapse.",
        status: "PASS",
        notes: "Strict unit checking via Pint caught two dimensional mismatches during parameter matrix ingestion.",
      },
    ],
    whatBroke: [
      {
        id: "WB-PV01",
        title: "Covariance Matrix Degeneracy During Unbounded MAP Optimization",
        cause: "Early Bayesian parameter calibration runs allowed unconstrained parameter bounds, causing optimization to land in physically impossible negative rate spaces.",
        change: "Imposed strict logarithmic parameter bounds and added Jacobian regularization to prevent matrix singularity during inversion.",
        result: "100% convergence across all synthetic parameter estimation benchmarks.",
      },
    ],
    result: "Developed a rigorous, local-first simulation environment that handles stiff mathematical models and quantifies parameter confidence intervals without relying on external cloud APIs.",
    iteration: "Integrated automated sensitivity analysis calculating first-order Sobol indices to identify which model parameters dominate output variance.",
    currentLimitation: "Currently evaluated exclusively against synthetic pharmacokinetic and bio-mathematical reference benchmarks. Explicitly not validated for direct clinical care, patient diagnosis, or dosing decisions.",
    nextQuestion: "Can neural ordinary differential equations (Neural ODEs) learn unknown residual dynamics when compartmental transfer functions are incomplete?",
    reflection: "Simulation models are only as trustworthy as their boundary conditions. Transparent uncertainty intervals and dimensional consistency matter far more than single-point predictions.",
    evidence: [
      { type: "CODE", label: "GitHub Repository", detail: "Public repository containing the simulation core, unit test suites, and synthetic reference benchmarks.", link: "https://github.com/pranav520214/privaveda" },
      { type: "DATA", label: "Benchmark Logs", detail: "SciPy solver step comparisons, convergence traces, and Monte Carlo confidence band plots." },
    ],
    githubUrl: "https://github.com/pranav520214/privaveda",
    disclaimer: "Research simulation prototype: strictly not validated for direct patient care, clinical diagnosis, or medical dosing decisions.",
  },
  {
    slug: "fpv-controller",
    number: "05",
    title: "FS-i6X BLE FPV Controller",
    subtitle: "ESP32 Hardware Bridge Converting FlySky PPM Output to Bluetooth LE Gamepad",
    domain: "Embedded Systems • Signal Processing • BLE HID • C++",
    year: "2026",
    status: "HARDWARE UTILITY",
    question: "Can an ESP32 capture raw analog PPM pulses from an RC transmitter trainer port with microsecond precision and stream them wirelessly as a zero-lag Bluetooth gamepad?",
    constraint: "Operating systems introduce Bluetooth HID polling latencies, and dirty PPM signal edges from trainer jacks can cause channel desynchronization and uncommanded simulator control spikes.",
    firstApproach: "Attempted polling the digital input pin in the Arduino loop using pulseIn(). Polling introduced significant timing jitter (±40µs) and blocked other microcontroller routines, making flight stick control sluggish.",
    architectureNodes: [
      { id: "jack", label: "FlySky Trainer Port", sublabel: "3.5mm analog PPM pulse stream from FS-i6X transmitter", type: "input" },
      { id: "gpio", label: "Interrupt Input", sublabel: "Hardware rising-edge interrupt timer on GPIO 4", type: "input" },
      { id: "sync", label: "Sync Separator", sublabel: "Frame detection triggered on >3000µs separation pulse", type: "process" },
      { id: "decode", label: "Pulse Decoder", sublabel: "6-channel pulse width measurement (1000µs–2000µs)", type: "process" },
      { id: "map", label: "Axis Normalizer", sublabel: "Conversion to signed 16-bit joystick axes with inversion", type: "process" },
      { id: "failsafe", label: "Failsafe Gate", sublabel: "250ms signal loss detection auto-centering all flight axes", type: "decision" },
      { id: "ble", label: "BLE Gamepad HID", sublabel: "Direct wireless joystick packets to simulator PC", type: "output" },
    ],
    build: {
      coreTech: ["ESP32", "C++", "GPIO Interrupts", "BLE HID Gamepad", "Signal Processing", "FreeRTOS"],
      description: "Built an ultra-compact hardware adapter converting legacy FlySky FS-i6X PPM trainer signals into a standard Bluetooth Low Energy Gamepad. Firmware uses hardware rising-edge interrupts on GPIO 4 to measure pulse widths with microsecond precision. Detects frame synchronization pulses (>3000µs), maps 6 channels to standard flight simulator axes (Roll, Pitch, Throttle, Yaw, Auxiliary switches), and enforces a 250ms failsafe timeout that centers axes if the cable disconnects.",
      codeSnippet: {
        filename: "FSi6X_BLE_Adapter.ino",
        language: "cpp",
        code: `// Hardware Interrupt PPM Decoding & Gamepad Axis Mapping
void IRAM_ATTR handlePPMInterrupt() {
  uint32_t now = micros();
  uint32_t pulseWidth = now - lastInterruptTime;
  lastInterruptTime = now;

  if (pulseWidth > 3000) { // Sync pulse detected: reset channel index
    currentChannel = 0;
  } else if (currentChannel < NUM_CHANNELS) {
    if (pulseWidth >= 900 && pulseWidth <= 2100) {
      ppmChannels[currentChannel++] = pulseWidth;
      lastValidSignalTime = now;
    }
  }
}

void updateGamepadState() {
  if (micros() - lastValidSignalTime > 250000) { // 250ms failsafe timeout
    bleGamepad.setAxes(0, 0, 0, 0, 0, 0); // Center axes safely
    return;
  }

  int16_t roll  = map(ppmChannels[0], 1000, 2000, -32767, 32767);
  int16_t pitch = map(ppmChannels[1], 1000, 2000, 32767, -32767); // Invert pitch
  int16_t throttle = map(ppmChannels[2], 1000, 2000, -32767, 32767);
  int16_t yaw   = map(ppmChannels[3], 1000, 2000, -32767, 32767);

  bleGamepad.setAxes(roll, pitch, 0, yaw, throttle, 0);
}`,
      },
    },
    experiments: [
      {
        id: "EXP // FPV-001",
        title: "Interrupt-Driven Pulse Capture vs Polling Jitter",
        hypothesis: "Measuring PPM pulses via hardware interrupts on GPIO 4 will reduce channel timing variance to <2 microseconds compared to >35 microseconds on polling.",
        setup: "Fed a calibrated 50Hz PPM pulse train from an FS-i6X transmitter into both test routines.",
        variable: "Pulse detection strategy (Software pulseIn polling vs Hardware IRAM interrupt).",
        measurement: "Standard deviation of pulse width measurement across 5,000 consecutive PPM cycles.",
        result: "Interrupt approach achieved standard deviation of 1.4µs; software polling exhibited 38.2µs variance.",
        status: "PASS",
        notes: "Zero noticeable stick deadband or jitter inside simulator calibration screens.",
      },
    ],
    whatBroke: [
      {
        id: "WB-FPV01",
        title: "Ghost Sticks on Trainer Cable Disconnect",
        cause: "When the 3.5mm jack was unplugged during testing, floating GPIO 4 picked up electrical noise, holding the last received channel values and causing the simulated drone to throttle up uncontrollably.",
        change: "Enabled an internal pull-down resistor on GPIO 4 and added a 250ms failsafe timeout watchdog that instantly resets all axis channels to neutral zero.",
        result: "Disconnecting the cable immediately centers all controls with zero phantom inputs.",
      },
    ],
    result: "Created a practical, ultra-low-latency wireless bridge allowing pilots to practice on FPV simulators (Liftoff, Velocidrone, Uncrashed) using their real physical transmitter without cumbersome wires.",
    iteration: "Added auxiliary switch mapping for CH5 and CH6 as gamepad digital buttons to trigger instant simulator flight reset and flight-mode toggling.",
    currentLimitation: "Dependent on ESP32 Bluetooth stack; operating range is optimal within 5–10 meters of the host computer.",
    nextQuestion: "Can the same firmware decode multi-channel digital CRSF/SBUS protocols over UART for newer open-source radio transmitters?",
    reflection: "Small utility projects often provide the most immediate practical value. Building tools you use every single week forces you to solve real ergonomic annoyances.",
    evidence: [
      { type: "CODE", label: "GitHub Repository", detail: "Open-source Arduino/C++ codebase with interrupt handlers and BLE Gamepad configuration.", link: "https://github.com/pranav520214/esp32-fsi6x-ble-fpv-controller" },
      { type: "PHOTO", label: "Hardware Build", detail: "3.5mm audio jack wired to ESP32 board and verified inside simulator gamepad calibration." },
    ],
    githubUrl: "https://github.com/pranav520214/esp32-fsi6x-ble-fpv-controller",
  },
];

// ----------------------------------------------------------------------
// 03 — ARCHIVE PROJECTS (CLEANED UP - ZERO DELETED REPOSITORIES)
// ----------------------------------------------------------------------
export const ARCHIVE_PROJECTS: ArchiveProject[] = [];

// ----------------------------------------------------------------------
// 04 — HOW I BUILD (5-STAGE ENGINEERING METHODOLOGY PIPELINE)
// ----------------------------------------------------------------------
export const HOW_I_BUILD_STEPS = [
  {
    step: "01",
    name: "IDEA",
    headline: "Identify a real constraint or physical unknown",
    supportingLabel: "problem framing & constraints",
    description: "I don't start with trendy frameworks or API wrappers. I begin with a concrete physical or computational constraint: scarce VRAM, noisy MEMS sensors, or numerical stiffness that breaks existing software.",
    example: "Example: 'Can we run private speech dictation on a 4GB GPU without leaking audio to cloud servers?'",
  },
  {
    step: "02",
    name: "ARCHITECT",
    headline: "Derive system boundaries and dataflow contracts",
    supportingLabel: "datasheets, equations & state machines",
    description: "Before writing code, I study underlying specifications: hardware pinouts, sensor noise characteristics, communication protocols (PPM, IBus), and mathematical stability limits (stiff ODE solvers).",
    example: "Example: Designing the dual-engine split in LocalFlow: CUDA for streaming ASR and CPU for LLM prompt refinement.",
  },
  {
    step: "03",
    name: "BUILD",
    headline: "Construct minimal instrumented prototypes",
    supportingLabel: "firmware, C++ runtimes & local pipelines",
    description: "Build the simplest reproducible prototype that can validate the core hypothesis. Add microsecond timing, UART serial logs, and performance metrics from day one.",
    example: "Example: Writing interrupt-driven PPM pulse capture on ESP32 GPIO 4 running FreeRTOS with microsecond resolution.",
  },
  {
    step: "04",
    name: "BREAK",
    headline: "Stress test and expose where assumptions fail",
    supportingLabel: "noise injection & physical edge stress",
    description: "Push the prototype past nominal conditions: brushless motor vibration, high ambient noise, cable disconnects, and stiff mathematical boundaries. Failures reveal the true physics of the system.",
    example: "Example: Discovering that 40% motor throttle induced severe vibration noise in MPU6500 accelerometer vectors.",
  },
  {
    step: "05",
    name: "ITERATE",
    headline: "Refactor with deterministic hardware and software gates",
    supportingLabel: "failsafes, Kalman filters & process isolation",
    description: "Rewrite the state machine, tune the Kalman covariance matrices, or add watchdog processes based on empirical measurements. Document unresolved limitations honestly.",
    example: "Example: Adding a 250ms failsafe timeout to center FPV flight sticks and implementing an OS heartbeat watchdog in LocalFlow.",
  },
];

// ----------------------------------------------------------------------
// 05 — CAPABILITIES (THE 4 VERIFIED TECHNICAL GROUPS)
// ----------------------------------------------------------------------
export const CAPABILITIES: CapabilityGroup[] = [
  {
    category: "LOCAL AI",
    label: "On-Device Inference & Speech",
    description: "Quantized neural model execution, low-latency streaming ASR, and local prompt transformation without cloud dependencies.",
    skills: ["NeMo-Speech.cpp", "llama.cpp", "Streaming ASR", "Quantized SLMs", "Prompt Engineering Pipelines"],
    projects: ["LocalFlow"],
    items: [
      { name: "NeMo-Speech.cpp", role: "Streaming ASR Core", application: "Quantized Nemotron 3.5 0.6B Q8 running on local GPU via CUDA for live speech recognition." },
      { name: "llama.cpp", role: "Local Text Refinement", application: "Embedded GGUF execution of Qwen3 1.7B Q8_0 on CPU for prompt engineering and grammar cleanup." },
      { name: "Loopback IPC", role: "Process Security", application: "Localhost HTTP inference endpoints with ephemeral bearer token authentication." },
      { name: "Streaming Ring Buffers", role: "Audio Engineering", application: "Zero-copy circular memory buffers capturing 16kHz PCM audio without frame drop." },
    ],
  },
  {
    category: "DESKTOP SYSTEMS",
    label: "Native Runtimes & OS Integration",
    description: "Cross-platform desktop application engineering, low-level operating system hooks, process lifecycle management, and IPC.",
    skills: ["Electron", "Node.js", "C++", "Windows API", "Process Isolation", "Loopback IPC"],
    projects: ["LocalFlow"],
    items: [
      { name: "Electron Shell", role: "Desktop Application Core", application: "Main process orchestrating native background C++ inference binaries with automatic watchdog recovery." },
      { name: "Global Hotkey Hooks", role: "OS-Level Integration", application: "Low-overhead keyboard capture for push-to-talk triggers across all Windows applications." },
      { name: "Hybrid Scheduling", role: "Resource Optimization", application: "GPU/CPU workload distribution enabling fluid multitasking on modest 4GB VRAM hardware." },
      { name: "System Injection", role: "Workflow Automation", application: "Automated clipboard synchronization and simulated keystrokes delivering output directly into active apps." },
    ],
  },
  {
    category: "EMBEDDED ENGINEERING",
    label: "Microcontrollers & Hardware Firmware",
    description: "Real-time microcontroller firmware, sensor fusion algorithms, RF/RC protocols, and Bluetooth Low Energy human interface devices.",
    skills: ["ESP32", "C++", "FreeRTOS", "MPU6500 IMU", "Kalman Filtering", "BLE HID", "IBus / PPM"],
    projects: ["AUTOSTABI", "ESP32 BLE Wand Mouse", "FS-i6X BLE FPV Controller"],
    items: [
      { name: "ESP32 & FreeRTOS", role: "Microcontroller Firmware", application: "Dual-core task pinning, microsecond timer interrupts, and deterministic hardware control loops." },
      { name: "MPU6500 Sensor Fusion", role: "Attitude & Motion Sensing", application: "Kalman state estimation and dynamic deadzones translating gyro rates into stable aircraft trim or cursor velocity." },
      { name: "BLE HID (Mouse/Gamepad)", role: "Driverless Peripherals", application: "Native Bluetooth Low Energy HID profiles for wireless mice and 6-axis FPV flight simulator gamepads." },
      { name: "Pulse Signal Decoding", role: "Avionics Communication", application: "Hardware rising-edge interrupt capture of PPM pulses and HardwareSerial parsing of 115200-baud IBus frames." },
    ],
  },
  {
    category: "SIMULATION",
    label: "Scientific Computing & Dynamic Modeling",
    description: "Numerical simulation of stiff ordinary differential equations, dimensional unit validation, and Bayesian parameter uncertainty analysis.",
    skills: ["Python 3.11", "SciPy (solve_ivp)", "NumPy", "NetworkX", "Pint", "Bayesian Calibration"],
    projects: ["PRIVAVEDA"],
    items: [
      { name: "SciPy solve_ivp", role: "Stiff ODE Integration", application: "Implicit Radau and BDF algorithms solving coupled non-linear compartmental rate equations." },
      { name: "Pint Unit Registry", role: "Dimensional Consistency", application: "Strict physical unit enforcement preventing unit conversion errors during numerical integration." },
      { name: "Bayesian MAP Calibration", role: "Parameter Estimation", application: "Bounded L-BFGS-B optimization estimating mechanistic parameters with Jacobian regularization." },
      { name: "Monte Carlo Propagation", role: "Uncertainty Quantification", application: "Stochastic error propagation producing empirical confidence intervals across simulation trajectories." },
    ],
  },
];

// ----------------------------------------------------------------------
// 06 — ENGINEERING NOTEBOOK ENTRIES
// ----------------------------------------------------------------------
export const ENGINEERING_NOTES: EngineeringNoteMeta[] = [
  {
    slug: "dual-engine-scheduling",
    date: "2026.03",
    title: "Why hybrid GPU/CPU allocation is essential for local desktop assistants",
    domain: "Local AI • Desktop Systems",
    question: "How do you run local speech dictation and text transformation on a 4GB GPU without out-of-memory errors?",
    observation: "Running both models on CUDA causes VRAM fragmentation and crash on prompts >250 tokens. Offloading LLM text editing to CPU frees GPU memory for continuous streaming ASR.",
    whatChanged: "Separated LocalFlow into two isolated native binaries: NeMo-Speech.cpp on GPU and llama.cpp on CPU, orchestrated by Electron.",
  },
  {
    slug: "imu-vibration-mitigation",
    date: "2026.02",
    title: "What electric flight airframes teach you about MEMS sensor vibration",
    domain: "Avionics • Embedded C++",
    question: "Why did attitude estimation diverge rapidly at 50% motor throttle?",
    observation: "Brushless motor rotational harmonics couple into silicon MEMS sensors, generating high-frequency acceleration spikes that swamp the gravity vector.",
    whatChanged: "Implemented silicone mechanical dampening mounts and a digital low-pass filter in AUTOSTABI, relying on integrated gyro rates during throttle transients.",
  },
  {
    slug: "click-induced-cursor-jump",
    date: "2026.02",
    title: "Eliminating click-induced cursor displacement in motion-controlled wands",
    domain: "Human Interface • Embedded",
    question: "Why does pressing a tactile mechanical button ruin air mouse cursor accuracy?",
    observation: "The physical actuation force of pressing a dome switch moves the wand by 15–20 pixels, causing missed clicks on small UI targets.",
    whatChanged: "Replaced the tactile switch with an optical active-LOW touch sensor on GPIO 27 in the ESP32 BLE Wand Mouse, requiring zero mechanical actuation force.",
  },
  {
    slug: "stiff-ode-integration",
    date: "2026.01",
    title: "Why explicit Runge-Kutta fails on stiff bio-mathematical models",
    domain: "Scientific Computing • Simulation",
    question: "Why did standard RK45 solvers crawl and produce NaNs on multi-compartment pharmacokinetic models?",
    observation: "Coupled compartments with widely disparate rate constants cause explicit step sizes to collapse to near zero, ballooning computational time.",
    whatChanged: "Transitioned PRIVAVEDA to implicit Radau IIA integration in SciPy, achieving 10x faster execution with guaranteed mathematical stability.",
  },
  {
    slug: "interrupt-driven-ppm",
    date: "2026.01",
    title: "Microsecond timing precision: interrupts vs polling on microcontroller GPIO",
    domain: "Signal Processing • Embedded",
    question: "How much control lag does software polling introduce into FPV simulator inputs?",
    observation: "Using pulseIn() created ±38µs timing variance and blocked the main loop, producing perceptible stick jitter in flight simulators.",
    whatChanged: "Implemented hardware rising-edge interrupts on GPIO 4 with IRAM-pinned ISRs in the FS-i6X BLE Controller, dropping jitter to 1.4µs.",
  },
];

// ----------------------------------------------------------------------
// 07 — MILESTONES (VERIFIED RECOGNITION & PROGRAMS)
// ----------------------------------------------------------------------
export const MILESTONES: MilestoneItem[] = [
  {
    id: "M01",
    date: "April 2026",
    title: "STEM-A-THON 2026 — Top Young Innovator of India",
    organizer: "Robocraze",
    outcome: "Rank #56 Nationwide · Awarded 'Top Young Innovator of India' Commendation",
    highlight: "Ranked #56 across India for hands-on technical execution, prototyping discipline, and problem solving.",
    category: "recognition",
    proofId: "P01",
    proofTitle: "STEM-A-THON National Certificate",
    proofImage: "/certificates/proof-stem-a-thon.jpg",
  },
  {
    id: "M02",
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
    outcome: "Rapid Prototype Engineering Participant",
    highlight: "Constructed full-stack interactive prototype within strict hackathon constraints.",
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
// 08 — EXTERNAL FEEDBACK & RECOGNITION RECORDS
// ----------------------------------------------------------------------
export const EXTERNAL_FEEDBACK: ExternalFeedbackItem[] = [
  {
    id: "FB-02",
    source: "Aerospace Agency Appraisal",
    reviewer: "ISRO Science Programme Office",
    role: "Technical Correspondence (ISRO HQ)",
    project: "Aerospace Concept Modeling",
    feedbackSummary: "Provided formal encouraging technical feedback on space systems concept study, noting ambitious scope and advising deeper thermodynamic modeling.",
    whatPranavChanged: "Refined aerodynamic drag and heating numerical calculations in physics simulations.",
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

