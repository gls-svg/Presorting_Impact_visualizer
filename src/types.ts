export type Algorithm = 'binarySearch' | 'linearSearch';
export type SortingAlgorithm = 'quickSort' | 'mergeSort' | 'bubbleSort';
export type VisualizerState = 'idle' | 'running' | 'completed';

export interface TimeComplexity {
  best: string;
  average: string;
  worst: string;
  space: string;
}

export interface AlgorithmResult {
  executionTime: number;
  comparisons: number;
  found: boolean;
  position: number | null;
  timeComplexity: TimeComplexity;
}

export interface ResultData {
  unsortedResult: AlgorithmResult;
  sortedResult: AlgorithmResult;
  algorithm: Algorithm;
  sortingAlgorithm: SortingAlgorithm;
  arraySize: number;
  sortingComplexity: TimeComplexity;
}