import React from 'react';
import { Algorithm } from '../types';
import { Search, ListFilter } from 'lucide-react';

interface AlgorithmSelectorProps {
  algorithm: Algorithm;
  onAlgorithmChange: (algorithm: Algorithm) => void;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  algorithm,
  onAlgorithmChange,
}) => {
  const algorithms: { value: Algorithm; label: string; description: string; icon: React.ReactNode }[] = [
    {
      value: 'binarySearch',
      label: 'Binary Search',
      description: 'Efficiently finds an element in a sorted array by repeatedly dividing the search space in half.',
      icon: <Search className="w-5 h-5 text-blue-500" />,
    },
    {
      value: 'linearSearch',
      label: 'Linear Search',
      description: 'Sequentially checks each element in an array until the target is found or the array ends.',
      icon: <ListFilter className="w-5 h-5 text-purple-500" />,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Algorithm</h3>
      
      <div className="space-y-2">
        {algorithms.map((algo) => (
          <div 
            key={algo.value}
            onClick={() => onAlgorithmChange(algo.value)}
            className={`cursor-pointer p-3 rounded-md border ${
              algorithm === algo.value 
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className="mr-3">
                {algo.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{algo.label}</h4>
                <p className="text-sm text-gray-600">{algo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector;