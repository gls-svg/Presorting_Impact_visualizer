import React from 'react';

interface BinarySearchVisualizerProps {
  step: any;
  stepIndex: number;
  totalSteps: number;
}

const BinarySearchVisualizer: React.FC<BinarySearchVisualizerProps> = ({
  step,
  stepIndex,
  totalSteps,
}) => {
  if (!step) return null;
  
  // Helper function to get the element status class
  const getElementClass = (index: number) => {
    if (step.type === 'sort') {
      return 'bg-gray-200';
    }
    
    if (step.type === 'search') {
      if (step.algorithm === 'binarySearch') {
        if (index === step.mid) return 'bg-yellow-300 border-yellow-500';
        if (index >= step.left && index <= step.right) return 'bg-blue-100';
        return 'bg-gray-100';
      } else {
        // Linear search
        if (index === step.current) return 'bg-yellow-300 border-yellow-500';
        if (index < step.current) return 'bg-gray-300';
        return 'bg-gray-100';
      }
    }
    
    if (step.type === 'found' && index === step.index) {
      return 'bg-green-300 border-green-500';
    }
    
    return 'bg-gray-100';
  };
  
  return (
    <div className="space-y-4">
      {step.type === 'error' ? (
        <div className="p-3 bg-red-100 text-red-800 rounded-md">
          {step.message}
        </div>
      ) : (
        <>
          <div className="p-2 bg-blue-50 rounded-md">
            {step.type === 'sort' && (
              <p className="text-blue-800">
                Sorting array using {step.algorithm === 'quickSort'
                  ? 'Quick Sort'
                  : step.algorithm === 'mergeSort'
                  ? 'Merge Sort'
                  : 'Bubble Sort'
                }...
              </p>
            )}
            
            {step.type === 'sorted' && (
              <p className="text-blue-800">
                Array sorted successfully! Ready for searching.
              </p>
            )}
            
            {step.type === 'search' && step.algorithm === 'binarySearch' && (
              <p className="text-blue-800">
                Binary Search: Checking middle element at position <span className="font-mono">{step.mid}</span>. 
                Search range: <span className="font-mono">[{step.left}, {step.right}]</span>.
              </p>
            )}
            
            {step.type === 'search' && step.algorithm === 'linearSearch' && (
              <p className="text-blue-800">
                Linear Search: Checking element at position <span className="font-mono">{step.current}</span>.
              </p>
            )}
            
            {step.type === 'found' && (
              <p className="text-green-800">
                Element <span className="font-mono">{step.target}</span> found at position <span className="font-mono">{step.index}</span>!
              </p>
            )}
            
            {step.type === 'notFound' && (
              <p className="text-red-800">
                Element <span className="font-mono">{step.target}</span> not found in the array.
              </p>
            )}
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 overflow-x-auto">
            <div className="flex flex-wrap gap-2 min-w-max">
              {step.array.map((value: number, index: number) => (
                <div
                  key={index}
                  className={`flex flex-col items-center transition-all duration-300`}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center font-mono border ${getElementClass(index)}`}
                  >
                    {value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{index}</div>
                </div>
              ))}
            </div>
          </div>
          
          {step.type === 'search' && step.algorithm === 'binarySearch' && (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2 bg-gray-100 rounded-md">
                <div className="text-xs text-gray-600">Left</div>
                <div className="font-mono font-medium">{step.left}</div>
              </div>
              <div className="p-2 bg-yellow-100 rounded-md">
                <div className="text-xs text-gray-600">Middle</div>
                <div className="font-mono font-medium">{step.mid}</div>
              </div>
              <div className="p-2 bg-gray-100 rounded-md">
                <div className="text-xs text-gray-600">Right</div>
                <div className="font-mono font-medium">{step.right}</div>
              </div>
            </div>
          )}
          
          <div className="text-sm text-gray-600 mt-1">
            Step {stepIndex + 1} of {totalSteps}
          </div>
        </>
      )}
    </div>
  );
};

export default BinarySearchVisualizer;