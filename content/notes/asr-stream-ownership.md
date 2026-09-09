# Debugging Stream Lifecycle and Audio Buffer Ownership in Local ASR

- **Date**: January 2026
- **Domain**: Systems Programming / C++ / Audio Engineering
- **Status**: Resolved Bug

## Question
Why did consecutive speech recognition utterances intermittently produce repeated transcript segments and corrupted audio buffers during rapid dictation sessions?

## Observation
In the streaming ASR bridge between the audio capture loop and the native whisper.cpp context, new native streams were being allocated asynchronously whenever energy thresholds indicated speech onset. 
If an utterance concluded abruptly, the previous circular audio buffer had not fully drained before the subsequent stream began writing into shared memory blocks. This race condition created phantom audio frames from the previous sentence in the new inference window.

## What Changed
- Replaced eager stream spawning with a strict synchronous state machine:
  `FINISH → DRAIN_BUFFERS → DESTROY_CONTEXT → IDLE → RECREATE_CONTEXT`.
- Isolated audio capture buffers using immutable ring-buffer snapshots passed by value to the inference worker thread.
- Result: 100 consecutive same-process utterances passed regression testing without repeated-word leakage or memory growth.
