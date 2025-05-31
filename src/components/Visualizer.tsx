import React, { useState, useEffect } from 'react';
import InputArrayBox from './InputArrayBox';
import AlgorithmSelector from './AlgorithmSelector';
import SortingAlgoSelector from './SortingAlgoSelector';
import ResultBox from './ResultBox';
import ComparisonChart from './ComparisonChart';
import BinarySearchVisualizer from './BinarySearchVisualizer';
import { Algorithm, SortingAlgorithm, VisualizerState, ResultData } from '../types';
import { runAlgorithm } from '../utils/algorithmRunner';
import { sortArray } from '../utils/sortingAlgorithms';

const Visualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<Algorithm>('binarySearch');
  const [sortingAlgorithm, setSortingAlgorithm] = useState<SortingAlgorithm>('quickSort');
  const [usePredeterminedDataset, setUsePredeterminedDataset] = useState(false);
  const [targetValue, setTargetValue] = useState<number>(0);
  const [visualizerState, setVisualizerState] = useState<VisualizerState>('idle');
  const [results, setResults] = useState<ResultData | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [steps, setSteps] = useState<any[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Reset results when inputs change
    setResults(null);
    setSteps([]);
    setCurrentStep(0);
  }, [array, algorithm, sortingAlgorithm]);

  const handleArrayChange = (newArray: number[]) => {
    setArray(newArray);
    if (newArray.length > 0) {
      setTargetValue(newArray[Math.floor(Math.random() * newArray.length)]);
    }
  };

  const handleRun = async () => {
    if (array.length === 0) return;
    
    setVisualizerState('running');
    setIsAnimating(false);
    setCurrentStep(0);
    
    // Create a copy of the array to avoid mutation
    const inputArray = [...array];
    
    // Run with unsorted array first
    const unsortedResult = await runAlgorithm(
      inputArray, 
      algorithm, 
      targetValue,
      false
    );
    
    // Sort the array and run again
    const sortedArray = sortArray([...inputArray], sortingAlgorithm);
    const sortedResult = await runAlgorithm(
      sortedArray,
      algorithm,
      targetValue,
      true
    );
    
    setResults({
      unsortedResult,
      sortedResult,
      algorithm,
      sortingAlgorithm,
      arraySize: array.length,
    });
    
    // Generate visualization steps
    const newSteps = generateSteps(inputArray, algorithm, targetValue, sortingAlgorithm);
    setSteps(newSteps);
    
    setVisualizerState('completed');
  };

  const generateSteps = (
    inputArray: number[], 
    algorithm: Algorithm, 
    target: number,
    sortingAlgorithm: SortingAlgorithm
  ) => {
    const steps = [];
    
    // Add unsorted search steps first
    if (algorithm === 'linearSearch') {
      for (let i = 0; i < inputArray.length; i++) {
        steps.push({
          type: 'search',
          algorithm,
          array: inputArray,
          current: i,
          target,
          sorted: false,
        });
        
        if (inputArray[i] === target) {
          steps.push({
            type: 'found',
            array: inputArray,
            index: i,
            target,
            sorted: false,
          });
          break;
        }
      }
    }
    
    // Add sorting steps
    steps.push({
      type: 'sort',
      algorithm: sortingAlgorithm,
      array: [...inputArray],
    });
    
    // Add sorted array
    const sortedArray = sortArray([...inputArray], sortingAlgorithm);
    steps.push({
      type: 'sorted',
      array: sortedArray,
    });
    
    // Add search steps on sorted array
    if (algorithm === 'binarySearch') {
      let left = 0;
      let right = sortedArray.length - 1;
      
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        steps.push({
          type: 'search',
          algorithm,
          array: sortedArray,
          left,
          right,
          mid,
          target,
          sorted: true,
        });
        
        if (sortedArray[mid] === target) {
          steps.push({
            type: 'found',
            array: sortedArray,
            index: mid,
            target,
            sorted: true,
          });
          break;
        }
        
        if (sortedArray[mid] < target) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      
      if (left > right) {
        steps.push({
          type: 'notFound',
          array: sortedArray,
          target,
          sorted: true,
        });
      }
    } else {
      // Linear search steps on sorted array
      for (let i = 0; i < sortedArray.length; i++) {
        steps.push({
          type: 'search',
          algorithm,
          array: sortedArray,
          current: i,
          target,
          sorted: true,
        });
        
        if (sortedArray[i] === target) {
          steps.push({
            type: 'found',
            array: sortedArray,
            index: i,
            target,
            sorted: true,
          });
          break;
        }
      }
    }
    
    return steps;
  };

  const handleRestart = () => {
    if (steps.length === 0) return;
    
    setIsAnimating(true);
    setCurrentStep(0);
    
    const animate = (step: number) => {
      if (step >= steps.length || !isAnimating) {
        setIsAnimating(false);
        return;
      }
      
      setCurrentStep(step);
      setTimeout(() => animate(step + 1), 800); // Animation speed
    };
    
    animate(0);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <InputArrayBox 
            array={array}
            onArrayChange={handleArrayChange}
            usePredeterminedDataset={usePredeterminedDataset}
            setUsePredeterminedDataset={setUsePredeterminedDataset}
          />
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Search Target</h3>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={targetValue}
                onChange={(e) => setTargetValue(Number(e.target.value))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter value to search"
              />
              {array.length > 0 && (
                <button
                  onClick={() => setTargetValue(array[Math.floor(Math.random() * array.length)])}
                  className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
                >
                  Random
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AlgorithmSelector 
              algorithm={algorithm}
              onAlgorithmChange={setAlgorithm}
            />
            
            <SortingAlgoSelector
              sortingAlgorithm={sortingAlgorithm}
              onSortingAlgorithmChange={setSortingAlgorithm}
            />
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleRun}
              disabled={visualizerState === 'running' || array.length === 0}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {visualizerState === 'running' ? 'Running...' : 'Run Algorithm'}
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          <ResultBox
            results={results}
            isLoading={visualizerState === 'running'}
          />
          
          {results && (
            <ComparisonChart
              unsortedResult={results.unsortedResult}
              sortedResult={results.sortedResult}
            />
          )}
        </div>
      </div>
      
      {steps.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Step-by-Step Visualization</h3>
            <div className="space-x-2">
              {!isAnimating ? (
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 bg-purple-600 text-white font-medium rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Restart
                </button>
              ) : (
                <button
                  onClick={stopAnimation}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Stop
                </button>
              )}
            </div>
          </div>
          
          <BinarySearchVisualizer
            step={steps[currentStep]}
            stepIndex={currentStep}
            totalSteps={steps.length}
          />
          
          {!isAnimating && (
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Visualizer;