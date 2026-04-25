// Helper: Generates a completely random hex color
const getRandomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

// Helper: Generates a random speed between 0.3 and 1.8
const getRandomSpeed = () => parseFloat((Math.random() * 1.5 + 0.3).toFixed(2));

// NEW: Generates [x, y, z] locking distance (1 to 8) AND alternating positive/negative
const getAlternatingCoordinates = (depth) => {
  // 1. Lock the distance (radius) strictly between 1 and 8
  const minDistance = 1;
  const maxDistance = 8;
  const radius = Math.random() * (maxDistance - minDistance) + minDistance;

  // 2. Pick a random 3D angle (Spherical Coordinates)
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.acos(Math.random() * 2 - 1);

  // 3. Convert back into raw X, Y, Z
  let x = radius * Math.sin(phi) * Math.cos(theta);
  let y = radius * Math.sin(phi) * Math.sin(theta);
  let z = radius * Math.cos(phi);

  // 4. THE ALTERNATING RULE:
  // Even depths (0, 2, 4) get +1 (Positive direction)
  // Odd depths (1, 3, 5) get -1 (Negative direction)
  const directionMultiplier = depth % 2 === 0 ? 1 : -1;

  // 5. Force the sign based on the depth!
  // Math.abs() removes any accidental negatives from the random angle
  x = Math.abs(x) * directionMultiplier;
  y = Math.abs(y) * directionMultiplier;
  z = Math.abs(z) * directionMultiplier;

  return [
    parseFloat(x.toFixed(2)),
    parseFloat(y.toFixed(2)),
    parseFloat(z.toFixed(2)),
  ];
};

// Recursive generation function
export const generateRandomBoxTree = (currentDepth, maxDepth) => {
  const node = {
    color: getRandomColor(),

    // Pass the current depth so it knows which direction to bounce!
    targetPosition: getAlternatingCoordinates(currentDepth),
    // move: Math.random() > 0.5,
    move: false,
    speed: getRandomSpeed(),
    children: [],
  };

  if (currentDepth < maxDepth) {
    const numChildren = Math.floor(Math.random() * 10);
    for (let i = 0; i < numChildren; i++) {
      node.children.push(generateRandomBoxTree(currentDepth + 1, maxDepth));
    }
  }

  return node;
};
