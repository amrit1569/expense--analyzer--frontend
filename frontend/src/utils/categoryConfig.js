export const CATEGORIES = [
  'Food',
  'Lunch',
  'Dinner',
  'Breakfast',
  'Transport',
  'Shopping',
  'Entertainment',
  'Health',
  'Education',
  'Utilities',
  'Travel',
  'Rent',
  'Groceries',
  'Subscriptions',
  'Other',
];

export const CATEGORY_COLORS = {
  Food:          { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', glow: 'rgba(167,139,250,0.3)' },
  Lunch:         { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  glow: 'rgba(52,211,153,0.3)'  },
  Dinner:        { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  glow: 'rgba(245,158,11,0.3)'  },
  Breakfast:     { color: '#fb923c', bg: 'rgba(251,146,60,0.12)',  glow: 'rgba(251,146,60,0.3)'  },
  Transport:     { color: '#22d3ee', bg: 'rgba(34,211,238,0.12)',  glow: 'rgba(34,211,238,0.3)'  },
  Shopping:      { color: '#f472b6', bg: 'rgba(244,114,182,0.12)', glow: 'rgba(244,114,182,0.3)' },
  Entertainment: { color: '#818cf8', bg: 'rgba(129,140,248,0.12)', glow: 'rgba(129,140,248,0.3)' },
  Health:        { color: '#4ade80', bg: 'rgba(74,222,128,0.12)',  glow: 'rgba(74,222,128,0.3)'  },
  Education:     { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)',  glow: 'rgba(96,165,250,0.3)'  },
  Utilities:     { color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', glow: 'rgba(148,163,184,0.3)' },
  Travel:        { color: '#fb7185', bg: 'rgba(251,113,133,0.12)', glow: 'rgba(251,113,133,0.3)' },
  Rent:          { color: '#c084fc', bg: 'rgba(192,132,252,0.12)', glow: 'rgba(192,132,252,0.3)' },
  Groceries:     { color: '#86efac', bg: 'rgba(134,239,172,0.12)', glow: 'rgba(134,239,172,0.3)' },
  Subscriptions: { color: '#67e8f9', bg: 'rgba(103,232,249,0.12)', glow: 'rgba(103,232,249,0.3)' },
  Other:         { color: '#cbd5e1', bg: 'rgba(203,213,225,0.12)', glow: 'rgba(203,213,225,0.3)' },
};

export const getCategoryConfig = (category) =>
  CATEGORY_COLORS[category] || CATEGORY_COLORS['Other'];

export const CHART_COLORS = Object.values(CATEGORY_COLORS).map((c) => c.color);
