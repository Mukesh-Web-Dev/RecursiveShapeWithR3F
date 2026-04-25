import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Instances } from "@react-three/drei";
import { AnimationProvider } from "./AnimationContext";
import RecursiveShape from "./RecursiveShape";
import "./App.css";
import { generateInitialData } from "./generateInitialData";


// 2. Store the result in a static constant
const multiRootData = generateInitialData();

export default function App() {
  
  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
    >
      <AnimationProvider>
        <Canvas
          shadows
          gl={{
            antialias: true,
            // alpha: false,
          }}
          dpr={[1, 2]}
          camera={{ position: [-1, 3, 20], fov: 50 }}
        >
          <ambientLight intensity={1} />

          <directionalLight position={[10, 20, 10]} intensity={3} castShadow>
            <orthographicCamera
              attach="shadow-camera"
              args={[-15, 15, 15, -15, 0.1, 50]}
            />
          </directionalLight>

          <Instances limit={2000} castShadow receiveShadow>
            <boxGeometry />
            <meshStandardMaterial color="white" />

            {/* Consume the static data here */}
            {multiRootData.map((data, index) => (
              <group key={index} position={data.initialPosition || [0, 0, 0]}>
                <RecursiveShape config={data} />
              </group>
            ))}
          </Instances>

          <OrbitControls makeDefault autoRotate={true} autoRotateSpeed={3} />

        </Canvas>
      </AnimationProvider>
    </div>
  );
}
