import React from 'react';
import { ResultData, TimeComplexity } from '../types';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface ResultBoxProps {
  results: ResultData | null;
  isLoading: boolean;
}

const ComplexityTable: React.FC<{ complexity: TimeComplexity; title: string }> = ({ complexity, title }) => (
  <div className="mt-2">
    <h5 className="text-sm font-medium text-gray-700 mb-1">{title}</h5>
    <div className="bg-gray-50 p-2 rounded-md border border-gray-200">
      <table className="w-full text-sm">
        <tbody>
          <tr>
            <td className="text-gray-600">Best:</td>
            <td className="text-right font-mono">{complexity.best}</td>
          </tr>
          <tr>
            <td className="text-gray-600">Average:</td>
            <td className="text-right font-mono">{complexity.average}</td>
          </tr>
          <tr>
            <td className="text-gray-600">Worst:</td>
            <td className="text-right font-mono">{complexity.worst}</td>
          </tr>
          <tr>
            <td className="text-gray-600">Space:</td>
            <td className="text-right font-mono">{complexity.space}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const ResultBox: React.FC<ResultBoxProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Running algorithm...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Clock className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium mb-1">No Results Yet</h3>
          <p className="text-sm">Configure your inputs and run the algorithm to see results</p>
        </div>
      </div>
    );
  }

  const { unsortedResult, sortedResult, algorithm, sortingAlgorithm, arraySize } = results;
  
  const formatTime = (time: number) => {
    if (time < 1) return '< 1 ms';
    return `${time.toFixed(2)} ms`;
  };

  const speedup = (unsortedResult.executionTime / sortedResult.executionTime).toFixed(2);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Results</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">Unsorted Input</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Execution Time:</span>
                <span className="font-mono font-medium">{formatTime(unsortedResult.executionTime)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Comparisons:</span>
                <span className="font-mono font-medium">{unsortedResult.comparisons}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Found:</span>
                {unsortedResult.found ? (
                  <span className="inline-flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" /> Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center text-red-600">
                    <XCircle className="w-4 h-4 mr-1" /> No
                  </span>
                )}
              </div>
              {unsortedResult.found && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Position:</span>
                  <span className="font-mono font-medium">{unsortedResult.position}</span>
                </div>
              )}
              <ComplexityTable 
                complexity={unsortedResult.timeComplexity} 
                title="Time Complexity (Unsorted)"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">Sorted Input</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Execution Time:</span>
                <span className="font-mono font-medium">{formatTime(sortedResult.executionTime)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Comparisons:</span>
                <span className="font-mono font-medium">{sortedResult.comparisons}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Found:</span>
                {sortedResult.found ? (
                  <span className="inline-flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" /> Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center text-red-600">
                    <XCircle className="w-4 h-4 mr-1" /> No
                  </span>
                )}
              </div>
              {sortedResult.found && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Position:</span>
                  <span className="font-mono font-medium">{sortedResult.position}</span>
                </div>
              )}
              <ComplexityTable 
                complexity={sortedResult.timeComplexity} 
                title="Time Complexity (Sorted)"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">Summary</h4>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Search Algorithm:</span>
                <span className="font-medium">{algorithm === 'binarySearch' ? 'Binary Search' : 'Linear Search'}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Sorting Algorithm:</span>
                <span className="font-medium">
                  {sortingAlgorithm === 'quickSort'
                    ? 'Quick Sort'
                    : sortingAlgorithm === 'mergeSort'
                    ? 'Merge Sort'
                    : 'Bubble Sort'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Array Size:</span>
                <span className="font-medium">{arraySize} elements</span>
              </div>
              
              <div className="flex justify-between items-center font-medium">
                <span className="text-sm text-blue-700">Speed Improvement:</span>
                <span className="text-blue-800">{speedup}x faster with presorting</span>
              </div>
            </div>
            
            <ComplexityTable 
              complexity={results.sortingComplexity} 
              title="Sorting Algorithm Complexity"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultBox;