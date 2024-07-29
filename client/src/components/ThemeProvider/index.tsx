import React, { createContext, FC, ReactNode, useState } from 'react';

type PropsType = {
  children: ReactNode;
}

type ThemeContextType = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => null,
});

export const ThemeProvider: FC<PropsType> = ({ children }) => {
  const storedTheme = localStorage.getItem('theme');
  const currentTheme = storedTheme ? storedTheme as 'dark' | 'light' : 'dark';

  const [theme, setTheme] = useState<ThemeContextType['theme']>(currentTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });

  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme} text-foreground bg-background`}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
};