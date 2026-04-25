import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Instance } from "@react-three/drei";
import * as THREE from "three";
import { useAnimation } from "./useAnimation";

export default function RecursiveShape({
  config,
  depth = 0,
  canStartMoving = true,
  onReverseComplete,
}) {
  const groupRef = useRef();
  
  // 1. NEW: References to control just the Instance's visibility without breaking the group
  const instanceRef = useRef(); 
  const isHidden = useRef(depth > 0); 
  
  const [childrenReady, setChildrenReady] = useState(false);
  const finishedChildren = useRef(0);
  const phase = useRef(0);

  const { isReversing, toggleAnimation } = useAnimation();

  const activeSpeed = 5 * (config.speed || 1);
  const scaleSize = 1 - depth * 0.05; // Moved up so we can use it in the loop below

  const originVec = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const targetVec = useMemo(() => {
    const pos = config.targetPosition || [0, 0, 0];
    return new THREE.Vector3(...pos);
  }, [config.targetPosition]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // --- 2. NEW: DYNAMIC VISIBILITY CHECK ---
    // If this is a child box, check if it is resting inside the parent's center
    if (depth > 0 && instanceRef.current) {
      const isAtOrigin = groupRef.current.position.distanceToSquared(originVec) < 0.0025;
      
      if (isAtOrigin && !isHidden.current) {
        instanceRef.current.scale.set(0, 0, 0); // Hide it!
        isHidden.current = true;
      } else if (!isAtOrigin && isHidden.current) {
        instanceRef.current.scale.set(scaleSize, scaleSize, scaleSize); // Show it!
        isHidden.current = false;
      }
    }

    const p = phase.current;
    if (p === 0 && !canStartMoving) return;
    if (p === 3 && !isReversing) return;
    if (p === 6 && isReversing) return;

    if (!isReversing && p === 6) {
      // (Removed groupRef.current.visible logic as the new distance check handles it better)
      if (childrenReady) setChildrenReady(false);
      else {
        phase.current = 0;
        finishedChildren.current = 0;
      }
    }

    if (canStartMoving && phase.current === 0) phase.current = 1;

    const dampFactor = 1 - Math.exp(-activeSpeed * delta);
    const targetDistance = 0.0025;

    if (phase.current === 1) {
      groupRef.current.position.lerp(targetVec, dampFactor);
      if (groupRef.current.position.distanceToSquared(targetVec) < targetDistance) {
        if (config.move === true) phase.current = 2;
        else {
          phase.current = 3;
          if (!childrenReady) setChildrenReady(true);
        }
      }
    } else if (phase.current === 2) {
      groupRef.current.position.lerp(originVec, dampFactor);
      if (groupRef.current.position.distanceToSquared(originVec) < targetDistance) {
        phase.current = 3;
        if (!childrenReady) setChildrenReady(true);
      }
    }

    if (phase.current === 3 && isReversing) phase.current = 4;

    if (phase.current === 4) {
      const numChildren = config.children ? config.children.length : 0;
      if (finishedChildren.current >= numChildren) phase.current = 5;
    }

    if (phase.current === 5) {
      groupRef.current.position.lerp(originVec, dampFactor);
      if (groupRef.current.position.distanceToSquared(originVec) < targetDistance) {
        phase.current = 6;
        if (onReverseComplete) onReverseComplete();
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    toggleAnimation(); 
  };

  return (
    <group ref={groupRef}>
      <Instance 
        ref={instanceRef} 
        // 3. NEW: If it's a child, start it with a scale of 0 so it doesn't flash on the first frame
        scale={depth > 0 ? [0, 0, 0] : [scaleSize, scaleSize, scaleSize]} 
        color={config.color || "cyan"} 
        onClick={handleClick} 
      />
      {config.children &&
        config.children.map((childConfig, index) => (
          <RecursiveShape
            key={index}
            config={childConfig}
            depth={depth + 1}
            canStartMoving={childrenReady}
            onReverseComplete={() => {
              finishedChildren.current += 1;
            }}
          />
        ))}
    </group>
  );
}