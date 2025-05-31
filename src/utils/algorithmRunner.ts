import { Algorithm, AlgorithmResult } from '../types';
import { binarySearch, linearSearch } from './searchAlgorithms';

export async function runAlgorithm(
  array: number[],
  algorithm: Algorithm,
  target: number,
  isSorted: boolean
): Promise<AlgorithmResult> {
  let executionTime = 0;
  let comparisons = 0;
  let found = false;
  let position = null;
  
  // Clone the array to avoid mutations
  const inputArray = [...array];
  
  // Run the algorithm multiple times to get a more accurate average
  const iterations = 100;
  const times: number[] = [];
  
  for (let i = 0; i < iterations; i++) {
    const startTime = performance.now();
    
    if (algorithm === 'binarySearch') {
      if (!isSorted) {
        // For unsorted binary search, we need to sort first
        const result = linearSearch(inputArray, target);
        comparisons = result.comparisons;
        found = result.found;
        position = result.position;
      } else {
        const result = binarySearch(inputArray, target);
        comparisons = result.comparisons;
        found = result.found;
        position = result.position;
      }
    } else {
      const result = linearSearch(inputArray, target);
      comparisons = result.comparisons;
      found = result.found;
      position = result.position;
    }
    
    const endTime = performance.now();
    times.push(endTime - startTime);
  }
  
  // Calculate average execution time
  executionTime = times.reduce((a, b) => a + b, 0) / iterations;
  
  return {
    executionTime,
    comparisons,
    found,
    position,
  };
}