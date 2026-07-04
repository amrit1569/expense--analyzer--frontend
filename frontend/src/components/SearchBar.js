import React from 'react';
import { RiSearchLine, RiCloseLine } from 'react-icons/ri';

export default function SearchBar({ value, onChange, placeholder = 'Search expenses…' }) {
  return (
    <div className="relative group">
      <RiSearchLine
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-fast"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-glass w-full pl-10 pr-9 py-2.5 rounded-xl text-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-fast"
        >
          <RiCloseLine size={16} />
        </button>
      )}
    </div>
  );
}
