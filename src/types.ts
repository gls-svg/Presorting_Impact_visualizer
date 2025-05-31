export type Algorithm = 'binarySearch' | 'linearSearch';
export type SortingAlgorithm = 'quickSort' | 'mergeSort' | 'bubbleSort';
export type VisualizerState = 'idle' | 'running' | 'completed';

export interface AlgorithmResult {
  executionTime: number;
  comparisons: number;
  found: boolean;
  position: number | null;
}

export interface ResultData {
  unsortedResult: AlgorithmResult;
  sortedResult: AlgorithmResult | null;
  algorithm: Algorithm;
  sortingAlgorithm: SortingAlgorithm | null;
  arraySize: number;
}