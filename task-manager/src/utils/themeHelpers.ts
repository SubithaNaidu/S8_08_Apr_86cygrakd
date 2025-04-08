export const loadThemeFromLocalStorage = (): 'light' | 'dark' => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

export const saveThemeToLocalStorage = (theme: 'light' | 'dark') => {
  localStorage.setItem('theme', theme);
};
