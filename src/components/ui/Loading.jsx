import React from 'react';

const Loading = ({ type = 'dashboard' }) => {
  if (type === 'table') {
    return (
      <div className="bg-surface-500 rounded-lg p-6 border border-surface-600">
        <div className="space-y-4">
          {/* Table header skeleton */}
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-surface-600 rounded animate-shimmer" />
            ))}
          </div>
          
          {/* Table rows skeleton */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="grid grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="h-6 bg-surface-600 rounded animate-shimmer" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-surface-500 rounded-lg p-6 border border-surface-600">
            <div className="space-y-4">
              <div className="h-8 bg-surface-600 rounded animate-shimmer" />
              <div className="h-12 bg-surface-600 rounded animate-shimmer" />
              <div className="h-4 bg-surface-600 rounded animate-shimmer w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="bg-surface-500 rounded-lg p-6 border border-surface-600">
        <div className="flex items-center justify-between">
          <div className="h-8 w-64 bg-surface-600 rounded animate-shimmer" />
          <div className="h-10 w-32 bg-surface-600 rounded animate-shimmer" />
        </div>
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-surface-500 rounded-lg p-6 border border-surface-600">
            <div className="space-y-4">
              <div className="h-6 bg-surface-600 rounded animate-shimmer w-2/3" />
              <div className="h-10 bg-surface-600 rounded animate-shimmer" />
              <div className="h-4 bg-surface-600 rounded animate-shimmer w-1/2" />
            </div>
          </div>
        ))}
      </div>

      {/* Main content skeleton */}
      <div className="bg-surface-500 rounded-lg p-6 border border-surface-600">
        <div className="space-y-6">
          <div className="h-6 bg-surface-600 rounded animate-shimmer w-1/3" />
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-surface-600 rounded-full animate-shimmer" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-surface-600 rounded animate-shimmer" />
                  <div className="h-3 bg-surface-600 rounded animate-shimmer w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;