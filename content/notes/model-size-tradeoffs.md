# Why I Stopped Treating Model Size as the Only Optimization Target

- **Date**: February 2026
- **Domain**: Edge AI / Quantization / Inference Latency
- **Status**: Validated Observation

## Question
Is reducing parameter count and quantizing weights to 4-bit (GGUF/AWQ) sufficient to achieve real-time responsive interaction on resource-constrained consumer hardware?

## Observation
In early benchmarks running speech-to-text and lightweight reasoning models on local hardware, parameter reduction yielded diminishing returns once memory bandwidth became saturated. 
A 1.5B parameter model quantized to 4-bit still stuttered during streaming generation because intermediate key-value (KV) cache allocation and memory fragmentation dominated latency, not compute operations.
Furthermore, aggressive quantization caused unexpected degradation in structured syntax generation (JSON formatting, AST node preservation) long before general language fluency degraded.

## What Changed
- Shifted optimization priority from raw parameter count to memory bandwidth efficiency, KV-cache quantization (FP8 / Q8_0), and prompt token pruning.
- Designed evaluation pipelines to score structural compliance (valid AST generation) separately from perplexity.
- In Rudra Sentinel, prioritized small, domain-specialized verification SLMs (e.g. 1B-3B) with static AST analysis rather than pushing a general-purpose model into 4-bit edge cases.
