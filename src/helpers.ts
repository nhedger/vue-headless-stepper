/**
 * Clamps a value between and including a minimum and maximum value.
 *
 * @param num the value to clamp
 * @param min the minimum value that can be returned
 * @param max the maximum value that can be returned
 *
 * @returns the clamped value
 */
export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}
