import React, { useState } from 'react';
import Navbar from './components/Navbar';
import GraphCard from './components/GraphCard';
import Footer from './components/Footer';
// --- Components ---






// --- Main Layout ---

function App() {
  // Simulating your future data list
  const graphPlaceholders = [
    { id: 1, title: 'Revenue Trends' },
    { id: 2, title: 'User Acquisition' },
    { id: 3, title: 'Server Load' },
    { id: 4, title: 'Conversion Rates' },
    { id: 5, title: 'Regional Traffic' },
    { id: 6, title: 'Customer Satisfaction' },
  ];

  return (
    // min-h-screen ensures footer hits bottom even if content is short
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Analytics Overview</h1>
            <p className="mt-2 text-slate-600">Monitor your key performance metrics in real-time.</p>
          </div>

          {/* Responsive Grid Layout:
             - grid-cols-1 (Mobile)
             - md:grid-cols-2 (Tablet)
             - lg:grid-cols-3 (Desktop)
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {graphPlaceholders.map((graph) => (
              <GraphCard key={graph.id} title={graph.title} id={graph.id} />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;