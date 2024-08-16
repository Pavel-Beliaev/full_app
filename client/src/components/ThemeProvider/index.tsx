import React, { FC, ReactNode, useState } from 'react';
import { ThemeContext, ThemeContextType } from '@/context';

type PropsType = {
  children: ReactNode;
}

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