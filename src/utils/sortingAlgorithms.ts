import { SortingAlgorithm, TimeComplexity } from '../types';

export const getSortingComplexity = (algorithm: SortingAlgorithm): TimeComplexity => {
  switch (algorithm) {
    case 'quickSort':
      return {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)',
        space: 'O(log n)',
      };
    case 'mergeSort':
      return {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
        space: 'O(n)',
      };
    case 'bubbleSort':
      return {
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
        space: 'O(1)',
      };
  }
};

// Quick Sort
function quickSort(array: number[]): number[] {
  if (array.length <= 1) {
    return array;
  }
  
  const pivot = array[Math.floor(array.length / 2)];
  const equal: number[] = [];
  const less: number[] = [];
  const greater: number[] = [];
  
  for (const element of array) {
    if (element < pivot) {
      less.push(element);
    } else if (element > pivot) {
      greater.push(element);
    } else {
      equal.push(element);
    }
  }
  
  return [...quickSort(less), ...equal, ...quickSort(greater)];
}

// Merge Sort
function mergeSort(array: number[]): number[] {
  if (array.length <= 1) {
    return array;
  }
  
  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));
  
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
}

// Bubble Sort
function bubbleSort(array: number[]): number[] {
  const result = [...array];
  
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        // Swap elements
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }
  
  return result;
}

// Main sorting function
export function sortArray(array: number[], algorithm: SortingAlgorithm): number[] {
  switch (algorithm) {
    case 'quickSort':
      return quickSort(array);
    case 'mergeSort':
      return mergeSort(array);
    case 'bubbleSort':
      return bubbleSort(array);
    default:
      return [...array].sort((a, b) => a - b);
  }
}