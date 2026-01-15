const GraphCard = ({ title, id }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg border border-slate-200 flex flex-col">
    {/* Card Header */}
    <div className="px-4 py-5 sm:px-6 border-b border-slate-100">
      <h3 className="text-lg leading-6 font-medium text-slate-900">
        {title}
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-500">
        Real-time interaction enabled.
      </p>
    </div>
    
    {/* Graph Placeholder Area */}
    <div className="p-6 flex-grow">
      {/* 'aspect-video' forces a 16:9 ratio, perfect for charts. 
         'w-full' ensures it scales to the container width.
      */}
      <div className="w-full aspect-video bg-slate-50 border-2 border-dashed border-slate-300 rounded-md flex items-center justify-center text-slate-400">
        <span>Chart ID: {id} Area</span>
      </div>
    </div>
    
    {/* Card Footer (Optional Actions) */}
    <div className="bg-slate-50 px-4 py-4 sm:px-6">
      <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
        View Full Details &rarr;
      </button>
    </div>
  </div>
);

export default GraphCard