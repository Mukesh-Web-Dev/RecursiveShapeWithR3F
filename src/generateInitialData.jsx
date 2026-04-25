import { generateRandomBoxTree } from "./treeGenerator";


// This runs exactly once when the file is first parsed by the browser.
export const generateInitialData = () => {
  const numberOfStartingBoxes = 1;
  const maxDepth = 3;
  const generatedRoots = [];

  for (let i = 0; i < numberOfStartingBoxes; i++) {
    const rootNode = generateRandomBoxTree(0, maxDepth);
    // Math.random() is now safe to use because it's not inside a React render cycle
    // The first root box to be exactly at [0, 0, 0]
    if (i === 0) {
      rootNode.initialPosition = [0, 0, 0];
      rootNode.targetPosition = [1, 1, 0];
    } else {
      // If you increase numberOfStartingBoxes > 1, the others will scatter randomly
      rootNode.initialPosition = [
        Math.random() * 6 - 3,
        0,
        Math.random() * 6 - 3,
      ];
    }
    generatedRoots.push(rootNode);
  }

  console.log("Generated Tree Data:", generatedRoots);
  return generatedRoots;
};