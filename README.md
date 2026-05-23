# 🌌 Recursive 3D Instancing with React Three Fiber

## URL -> https://mukesh-web-dev.github.io/RecursiveShapeWithR3F/

A highly optimized, interactive 3D React application that procedurally generates and animates a recursive tree of spheres. Built with **Three.js** and **React Three Fiber**, this project handles massive amounts of animated 3D objects at 60 FPS using WebGL Instancing and custom math optimizations.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)

---

## ✨ Features

- 🚀 **Extreme GPU Performance:** Uses `@react-three/drei` `<Instances>` to render thousands of dynamic spheres in a single GPU draw call.
- 🌳 **Procedural Recursion:** Automatically generates a branching hierarchy of spheres using dependent spherical coordinates (zigzagging positive/negative).
- 🎬 **Fluid Animation:** Custom `Math.exp()` exponential dampening creates buttery-smooth, frame-independent spring physics without external animation libraries.
- 🔄 **Interactive Reversal:** Clicking the 3D scene triggers a synced, recursive collapse, sending every sphere back to its parent's origin seamlessly.
- 🛡 **Z-Fighting Prevention:** Spheres dynamically scale to `0` when resting at their parent's center to prevent geometry overlapping.
- 🎥 **Cinematic Auto-Rotation:** The camera smoothly orbits the origin using built-in `<OrbitControls>`.

---

## 📂 Project Architecture

The codebase is strictly modularized to maintain pure React rendering cycles and eliminate prop-drilling:

- `App.jsx` — The master canvas, lighting, shadow bounds, and `<Instances>` master wrapper.
- `RecursiveShape.jsx` — The core logic containing the `useFrame` animation loop and Phase state machine.
- `treeGenerator.js` — The pure math helper that handles procedural spherical coordinates and random color generation.
- `AnimationProvider.jsx` & `useAnimation.js` — The global React Context allowing any sphere at any depth to instantly trigger the reverse collapse sequence.

---

## 🚀 Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser at the address shown by Vite, typically:

```text
http://localhost:5173
```

## 🌍 Deployment to GitHub Pages

This project is configured to deploy the built `dist` folder to GitHub Pages using `gh-pages`.

1. Build the app:

```bash
npm run build
```

2. Publish to GitHub Pages:

```bash
npm run deploy
```

Your site will be available at:

`https://Mukesh-Web-Dev.github.io/RecursiveShapeWithR3F/`
