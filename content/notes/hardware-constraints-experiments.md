# Designing Experiments When You Don't Have Expensive Hardware

- **Date**: October 2025
- **Domain**: Engineering Methodology / Experimental Design
- **Status**: Practical Methodology

## Question
How can meaningful, publication-quality experiments in AI and physical robotics be conducted without access to GPU clusters or wind tunnels?

## Observation
Lack of expensive equipment often forces more rigorous isolation of variables. When you cannot brute-force a problem with a 70B parameter model or an expensive RTK GPS, you must understand the underlying physics and mathematical constraints.
A low-cost ESP32 microcontroller with an MPU6500 forces you to write lean C++ code, manage loop times at the microsecond level, and understand statistical noise covariance.

## What Changed
- Focused experiments on deterministic, repeatable micro-benchmarks (e.g. latency per token under strict CPU thread pinning, loop timing jitter, angular drift over 10-minute intervals).
- Built custom Python data logging harnesses running over serial UART at 921600 baud to visualize sensor telemetry in real time.
- Standardized error reporting: always documenting standard deviation, worst-case outlier spikes, and thermal degradation curves across repeated trials.
