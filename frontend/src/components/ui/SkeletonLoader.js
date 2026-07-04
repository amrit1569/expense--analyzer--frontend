import React from 'react';

export function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-3 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="skeleton w-10 h-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-24 rounded" />
          <div className="skeleton h-2 w-16 rounded" />
        </div>
        <div className="skeleton h-4 w-16 rounded" />
      </div>
      <div className="skeleton h-2 w-full rounded" />
      <div className="skeleton h-2 w-3/4 rounded" />
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="skeleton w-10 h-10 rounded-xl" />
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="skeleton h-7 w-28 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-4 animate-fade-in">
      <div className="skeleton h-4 w-32 rounded" />
      <div className="skeleton h-56 w-full rounded-xl" />
    </div>
  );
}

export function SkeletonList({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
