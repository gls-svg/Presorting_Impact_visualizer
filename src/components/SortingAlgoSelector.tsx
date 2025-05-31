import React from 'react';
import { SortingAlgorithm } from '../types';
import { ArrowDownUp, BarChart2, SortAsc } from 'lucide-react';

interface SortingAlgoSelectorProps {
  sortingAlgorithm: SortingAlgorithm;
  onSortingAlgorithmChange: (algorithm: SortingAlgorithm) => void;
  disabled: boolean;
}

const SortingAlgoSelector: React.FC<SortingAlgoSelectorProps> = ({
  sortingAlgorithm,
  onSortingAlgorithmChange,
}) => {
  const sortingAlgorithms: { value: SortingAlgorithm; label: string; description: string; icon: React.ReactNode }[] = [
    {
      value: 'quickSort',
      label: 'Quick Sort',
      description: 'Fast, divide-and-conquer algorithm that picks a pivot and partitions the array.',
      icon: <ArrowDownUp className="w-5 h-5 text-green-500" />,
    },
    {
      value: 'mergeSort',
      label: 'Merge Sort',
      description: 'Stable, divide-and-conquer algorithm that divides, sorts, and merges sub-arrays.',
      icon: <BarChart2 className="w-5 h-5 text-indigo-500" />,
    },
    {
      value: 'bubbleSort',
      label: 'Bubble Sort',
      description: 'Simple algorithm that repeatedly steps through the array and swaps adjacent elements.',
      icon: <SortAsc className="w-5 h-5 text-yellow-500" />,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Sorting Algorithm</h3>
      
      <div className="space-y-2">
        {sortingAlgorithms.map((algo) => (
          <div 
            key={algo.value}
            onClick={() => onSortingAlgorithmChange(algo.value)}
            className={`cursor-pointer p-3 rounded-md border ${
              sortingAlgorithm === algo.value 
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

export default SortingAlgoSelector;