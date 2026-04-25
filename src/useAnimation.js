import { createContext, useContext } from "react";

// 1. Create and export the Context
export const AnimationContext = createContext();

// 2. Create and export the Hook
export const useAnimation = () => useContext(AnimationContext);