"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { STORY_CHAPTERS } from "./StoryTypes";

interface StoryCameraRigProps {
  progress: number; // 0.0 to 1.0 (smoothly damped)
  pointerX: number; // -1 to 1 normalized
  pointerY: number; // -1 to 1 normalized
}

export function StoryCameraRig({ progress, pointerX, pointerY }: StoryCameraRigProps) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 6.5));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Keyframes from calibrated chapter definition
  const keyframes = useMemo(() => {
    return STORY_CHAPTERS.map((ch) => ({
      pMid: (ch.range[0] + ch.range[1]) / 2,
      pStart: ch.range[0],
      pEnd: ch.range[1],
      pos: new THREE.Vector3(...ch.camPos),
      lookAt: new THREE.Vector3(...ch.camLookAt),
    }));
  }, []);

  useFrame((state, delta) => {
    const p = Math.max(0, Math.min(1, progress));

    // Find bounding keyframes
    let prevIdx = 0;
    let nextIdx = 0;
    let t = 0;

    for (let i = 0; i < keyframes.length - 1; i++) {
      const kA = keyframes[i];
      const kB = keyframes[i + 1];

      if (p >= kA.pMid && p <= kB.pMid) {
        prevIdx = i;
        nextIdx = i + 1;
        const span = kB.pMid - kA.pMid;
        t = span > 0.0001 ? (p - kA.pMid) / span : 0;
        break;
      } else if (p < keyframes[0].pMid) {
        prevIdx = 0;
        nextIdx = 0;
        t = 0;
        break;
      } else if (p > keyframes[keyframes.length - 1].pMid) {
        prevIdx = keyframes.length - 1;
        nextIdx = keyframes.length - 1;
        t = 1;
        break;
      }
    }

    // High-energy acceleration curve: anticipation -> surge -> deceleration
    // Cubic hermite with slight overshoot for threshold crossings
    let smoothT = t * t * (3 - 2 * t);
    
    // Portal threshold crossing surge between chapter 1 and 2 (p ~ 0.12 to 0.20)
    if (prevIdx === 1 && nextIdx === 2) {
      // Rapid acceleration curve
      smoothT = Math.pow(t, 2.2);
    }

    const targetPos = new THREE.Vector3().lerpVectors(
      keyframes[prevIdx].pos,
      keyframes[nextIdx].pos,
      smoothT
    );

    const targetLookAt = new THREE.Vector3().lerpVectors(
      keyframes[prevIdx].lookAt,
      keyframes[nextIdx].lookAt,
      smoothT
    );

    // Subtle pointer parallax based on mouse
    const parallaxX = pointerX * 0.5;
    const parallaxY = -pointerY * 0.4;
    targetPos.x += parallaxX;
    targetPos.y += parallaxY;

    // Smoothly damp camera position and target
    const damp = Math.min(1.0, delta * 5.2);
    currentPos.current.lerp(targetPos, damp);
    currentLookAt.current.lerp(targetLookAt, damp);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);

    // Dynamic FOV warp during portal threshold transit
    if (p >= 0.12 && p <= 0.22) {
      const warpP = Math.sin(((p - 0.12) / 0.10) * Math.PI);
      if ("fov" in camera && typeof (camera as THREE.PerspectiveCamera).fov === "number") {
        const persCam = camera as THREE.PerspectiveCamera;
        persCam.fov = 48 + warpP * 12.0; // Warp from 48 up to 60 during surge
        persCam.updateProjectionMatrix();
      }
    } else {
      if ("fov" in camera && typeof (camera as THREE.PerspectiveCamera).fov === "number") {
        const persCam = camera as THREE.PerspectiveCamera;
        if (Math.abs(persCam.fov - 48) > 0.1) {
          persCam.fov = THREE.MathUtils.lerp(persCam.fov, 48, delta * 4.0);
          persCam.updateProjectionMatrix();
        }
      }
    }
  });

  return null;
}
