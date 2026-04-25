import React, { useState } from "react";
import { AnimationContext } from "./useAnimation";

// Create the Provider to wrap around your app
export const AnimationProvider = ({ children }) => {
  const [isReversing, setIsReversing] = useState(false);

  // Helper function to toggle the state
  const toggleAnimation = () => setIsReversing((prev) => !prev);

  return (
    <AnimationContext.Provider value={{ isReversing, toggleAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};
