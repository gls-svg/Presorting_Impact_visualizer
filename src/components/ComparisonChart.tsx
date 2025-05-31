import React, { useEffect, useRef } from 'react';
import { AlgorithmResult } from '../types';

interface ComparisonChartProps {
  unsortedResult: AlgorithmResult;
  sortedResult: AlgorithmResult | null;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ unsortedResult, sortedResult }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Chart config
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const barWidth = sortedResult ? chartWidth / 4 : chartWidth / 2;
    
    // Calculate max value for scaling
    const maxTime = Math.max(
      unsortedResult.executionTime,
      sortedResult ? sortedResult.executionTime : 0,
      0.1 // Minimum to avoid division by zero
    );
    
    const maxComparisons = Math.max(
      unsortedResult.comparisons,
      sortedResult ? sortedResult.comparisons : 0,
      1 // Minimum to avoid division by zero
    );
    
    // Colors
    const timeColor = '#3B82F6'; // Blue
    const comparisonColor = '#8B5CF6'; // Purple
    const textColor = '#4B5563'; // Gray
    
    // Draw axes
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw y-axis label
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = textColor;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Values', 0, 0);
    ctx.restore();
    
    // Draw x-axis label
    ctx.fillStyle = textColor;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Metrics', canvas.width / 2, canvas.height - 10);
    
    // Draw bars for unsorted execution time
    const drawBar = (
      x: number, 
      value: number, 
      maxValue: number, 
      color: string, 
      label: string,
      valueLabel: string
    ) => {
      const barHeight = (value / maxValue) * chartHeight;
      
      // Draw bar
      ctx.fillStyle = color;
      ctx.fillRect(
        x,
        canvas.height - padding - barHeight,
        barWidth - 10,
        barHeight
      );
      
      // Draw value on top of bar
      ctx.fillStyle = textColor;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        valueLabel,
        x + (barWidth - 10) / 2,
        canvas.height - padding - barHeight - 5
      );
      
      // Draw label below bar
      ctx.fillText(
        label,
        x + (barWidth - 10) / 2,
        canvas.height - padding + 15
      );
    };
    
    // Draw time comparison bars
    let xPos = padding + 10;
    
    // Unsorted time
    drawBar(
      xPos,
      unsortedResult.executionTime,
      maxTime,
      timeColor,
      'Unsorted Time',
      `${unsortedResult.executionTime.toFixed(2)} ms`
    );
    
    if (sortedResult) {
      // Sorted time
      xPos += barWidth;
      drawBar(
        xPos,
        sortedResult.executionTime,
        maxTime,
        timeColor,
        'Sorted Time',
        `${sortedResult.executionTime.toFixed(2)} ms`
      );
    }
    
    // Unsorted comparisons
    xPos += barWidth;
    drawBar(
      xPos,
      unsortedResult.comparisons,
      maxComparisons,
      comparisonColor,
      'Unsorted Comp.',
      unsortedResult.comparisons.toString()
    );
    
    if (sortedResult) {
      // Sorted comparisons
      xPos += barWidth;
      drawBar(
        xPos,
        sortedResult.comparisons,
        maxComparisons,
        comparisonColor,
        'Sorted Comp.',
        sortedResult.comparisons.toString()
      );
    }
    
    // Draw legend
    const legendX = canvas.width - padding - 120;
    const legendY = padding + 20;
    
    // Time legend
    ctx.fillStyle = timeColor;
    ctx.fillRect(legendX, legendY, 15, 15);
    ctx.fillStyle = textColor;
    ctx.textAlign = 'left';
    ctx.fillText('Execution Time', legendX + 20, legendY + 12);
    
    // Comparisons legend
    ctx.fillStyle = comparisonColor;
    ctx.fillRect(legendX, legendY + 25, 15, 15);
    ctx.fillStyle = textColor;
    ctx.fillText('Comparisons', legendX + 20, legendY + 37);
    
  }, [unsortedResult, sortedResult]);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Performance Comparison</h3>
      <div className="h-60">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
      <div className="mt-2 text-center text-sm text-gray-600">
        <p>Comparing execution time and number of comparisons</p>
      </div>
    </div>
  );
};

export default ComparisonChart;