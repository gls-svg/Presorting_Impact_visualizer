interface SearchResult {
  found: boolean;
  position: number | null;
  comparisons: number;
}

export function binarySearch(array: number[], target: number): SearchResult {
  let left = 0;
  let right = array.length - 1;
  let comparisons = 0;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons++;
    
    if (array[mid] === target) {
      return {
        found: true,
        position: mid,
        comparisons,
      };
    }
    
    comparisons++;
    if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return {
    found: false,
    position: null,
    comparisons,
  };
}

export function linearSearch(array: number[], target: number): SearchResult {
  let comparisons = 0;
  
  for (let i = 0; i < array.length; i++) {
    comparisons++;
    if (array[i] === target) {
      return {
        found: true,
        position: i,
        comparisons,
      };
    }
  }
  
  return {
    found: false,
    position: null,
    comparisons,
  };
}