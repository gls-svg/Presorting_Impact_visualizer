import React, { useState } from 'react';
import { RefreshCw, Edit3, Save, Trash } from 'lucide-react';

interface InputArrayBoxProps {
  array: number[];
  onArrayChange: (array: number[]) => void;
  usePredeterminedDataset: boolean;
  setUsePredeterminedDataset: (use: boolean) => void;
}

const InputArrayBox: React.FC<InputArrayBoxProps> = ({
  array,
  onArrayChange,
  usePredeterminedDataset,
  setUsePredeterminedDataset,
}) => {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const predeterminedDatasets = [
    { name: 'Small Dataset', array: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5] },
    { name: 'Medium Dataset', array: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)) },
    { name: 'Large Dataset', array: Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000)) },
  ];
  
  const [selectedDataset, setSelectedDataset] = useState(0);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setError('');
  };
  
  const parseArray = () => {
    try {
      const trimmed = inputText.trim();
      if (!trimmed) {
        setError('Please enter numbers separated by commas.');
        return;
      }
      
      const parsed = trimmed.split(',').map(item => {
        const num = Number(item.trim());
        if (isNaN(num)) throw new Error(`"${item}" is not a valid number.`);
        return num;
      });
      
      if (parsed.length === 0) {
        setError('Please enter at least one number.');
        return;
      }
      
      onArrayChange(parsed);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input format.');
    }
  };
  
  const generateRandomArray = (size: number) => {
    const randomArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    onArrayChange(randomArray);
  };
  
  const handlePredeterminedDataset = () => {
    onArrayChange(predeterminedDatasets[selectedDataset].array);
  };
  
  const startEditing = () => {
    setInputText(array.join(', '));
    setIsEditing(true);
  };
  
  const clearArray = () => {
    onArrayChange([]);
    setInputText('');
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Input Array</h3>
      
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={inputText}
            onChange={handleTextChange}
            placeholder="Enter numbers separated by commas (e.g., 5, 3, 8, 1, 9)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          
          <div className="flex space-x-2">
            <button
              onClick={parseArray}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 flex items-center"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 min-h-[70px] font-mono text-sm">
            {array.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {array.map((num, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {num}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No array data. Please enter values or generate a random array.</p>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={startEditing}
              className="w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Edit3 className="w-4 h-4" />
              
            </button>
            
            <button
              onClick={() => generateRandomArray(20)}
              className="w-10 h-10 bg-purple-600 text-white rounded-full hover:bg-purple-700 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <RefreshCw className="w-4 h-4" />
              
            </button>
            
            {array.length > 0 && (
              <button
                onClick={clearArray}
                className="w-10 h-10 bg-purple-600 text-white rounded-full hover:bg-purple-700 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <Trash className="w-4 h-4" />
      
              </button>
            )}
          </div>
          
          <div className="pt-2 border-t border-gray-200">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="usePredetermined"
                checked={usePredeterminedDataset}
                onChange={(e) => setUsePredeterminedDataset(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="usePredetermined" className="ml-2 block text-sm text-gray-700">
                Use predetermined dataset
              </label>
            </div>
            
            {usePredeterminedDataset && (
              <div className="flex flex-col space-y-2">
                <select
                  value={selectedDataset}
                  onChange={(e) => setSelectedDataset(Number(e.target.value))}
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  {predeterminedDatasets.map((dataset, index) => (
                    <option key={index} value={index}>
                      {dataset.name} ({dataset.array.length} items)
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={handlePredeterminedDataset}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                >
                  Load Dataset
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputArrayBox;
