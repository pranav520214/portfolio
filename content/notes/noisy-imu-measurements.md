# What Cheap IMUs Teach You About Noisy Measurements and Vibration

- **Date**: November 2025
- **Domain**: Embedded Systems / Avionics / Sensor Fusion
- **Status**: Field Tested

## Question
Why does raw accelerometer integration produce uncontrollable pitch and roll drift during bench testing of an airframe equipped with a brushless motor?

## Observation
An inexpensive 6-axis IMU (MPU6500) performs adequately under static laboratory conditions. However, once a brushless motor spins at 8,000 RPM, mechanical vibration couples directly into the MEMS silicon crystal.
The accelerometer readings spike with high-frequency noise that completely swamps the gravitational vector, making pure complementary filtering diverge within seconds.

## What Changed
- Added mechanical dual-density silicone isolation dampers between the sensor breakout board and the central fuselage frame.
- Implemented a low-pass Chebyshev pre-filter on raw acceleration samples running at 500 Hz on the ESP32 core 0.
- Tuned the measurement noise covariance matrix $R$ and process noise covariance matrix $Q$ in the Kalman filter to place higher statistical confidence in the rate gyroscope during motor throttle transients.
