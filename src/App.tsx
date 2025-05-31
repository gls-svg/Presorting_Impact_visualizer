import React from 'react';
import Visualizer from './components/Visualizer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Presorting Impact Visualizer</h1>
          <p className="text-blue-100">Compare algorithm performance with sorted vs. unsorted inputs</p>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <Visualizer />
      </main>
      <footer className="bg-gray-100 text-gray-600 py-4 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;