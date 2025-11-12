/**
 * Swipe Detection Utility
 * 
 * Provides 8-directional swipe detection for multi-choice questions
 * Uses trigonometry to map drag offsets to compass directions
 */

/**
 * Direction constants for 8-directional swipes
 */
export const DIRECTIONS = {
  UP: 'up',
  UP_RIGHT: 'upRight',
  RIGHT: 'right',
  DOWN_RIGHT: 'downRight',
  DOWN: 'down',
  DOWN_LEFT: 'downLeft',
  LEFT: 'left',
  UP_LEFT: 'upLeft'
};

/**
 * Get swipe direction based on x and y offset
 * 
 * Uses Math.atan2 to calculate angle from drag offset
 * Maps angle to one of 8 directions (45-degree segments)
 * 
 * Angle mapping (in degrees, 0° = right, increases counter-clockwise):
 * - Right (0°): -22.5° to 22.5°
 * - Up-Right (45°): 22.5° to 67.5°
 * - Up (90°): 67.5° to 112.5°
 * - Up-Left (135°): 112.5° to 157.5°
 * - Left (180°): 157.5° to -157.5° (wraps at ±180°)
 * - Down-Left (225° or -135°): -157.5° to -112.5°
 * - Down (270° or -90°): -112.5° to -67.5°
 * - Down-Right (315° or -45°): -67.5° to -22.5°
 * 
 * @param {number} offsetX - Horizontal drag offset (positive = right)
 * @param {number} offsetY - Vertical drag offset (positive = down, negative = up)
 * @returns {string} Direction constant from DIRECTIONS
 */
export const getSwipeDirection = (offsetX, offsetY) => {
  // Calculate angle in radians (-π to π)
  // Note: atan2(y, x) where positive y is down (standard DOM coordinates)
  const angleRadians = Math.atan2(offsetY, offsetX);
  
  // Convert to degrees (-180 to 180)
  let angleDegrees = angleRadians * (180 / Math.PI);
  
  // Map angle to 8 directions using 45-degree segments
  // Each direction occupies a 45-degree range centered on its cardinal/ordinal angle
  
  // Right: -22.5° to 22.5°
  if (angleDegrees >= -22.5 && angleDegrees < 22.5) {
    return DIRECTIONS.RIGHT;
  }
  // Down-Right: 22.5° to 67.5°
  else if (angleDegrees >= 22.5 && angleDegrees < 67.5) {
    return DIRECTIONS.DOWN_RIGHT;
  }
  // Down: 67.5° to 112.5°
  else if (angleDegrees >= 67.5 && angleDegrees < 112.5) {
    return DIRECTIONS.DOWN;
  }
  // Down-Left: 112.5° to 157.5°
  else if (angleDegrees >= 112.5 && angleDegrees < 157.5) {
    return DIRECTIONS.DOWN_LEFT;
  }
  // Left: 157.5° to -157.5° (wraps around ±180°)
  else if (angleDegrees >= 157.5 || angleDegrees < -157.5) {
    return DIRECTIONS.LEFT;
  }
  // Up-Left: -157.5° to -112.5°
  else if (angleDegrees >= -157.5 && angleDegrees < -112.5) {
    return DIRECTIONS.UP_LEFT;
  }
  // Up: -112.5° to -67.5°
  else if (angleDegrees >= -112.5 && angleDegrees < -67.5) {
    return DIRECTIONS.UP;
  }
  // Up-Right: -67.5° to -22.5°
  else if (angleDegrees >= -67.5 && angleDegrees < -22.5) {
    return DIRECTIONS.UP_RIGHT;
  }
  
  // Fallback (should never reach here)
  return DIRECTIONS.RIGHT;
};

/**
 * Calculate distance from origin (0, 0)
 * 
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {number} Distance using Pythagorean theorem
 */
export const getDistance = (x, y) => {
  return Math.sqrt(x * x + y * y);
};

/**
 * Check if swipe meets minimum threshold
 * 
 * @param {number} offsetX - Horizontal drag offset
 * @param {number} offsetY - Vertical drag offset
 * @param {number} threshold - Minimum distance (default: 100px)
 * @returns {boolean} True if swipe is valid
 */
export const isValidSwipe = (offsetX, offsetY, threshold = 100) => {
  const distance = getDistance(offsetX, offsetY);
  return distance >= threshold;
};
