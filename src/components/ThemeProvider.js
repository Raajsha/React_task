import React,{createContext, useState, useContext} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';

const lightTheme ={
    background: '#e5fcf4',
    color: '#000',
    buttonColor: '#fff'
  };

const darkTheme = {
    background: '#000',
    color: '#fff',
    buttonColor: '#fff',
};


const toggleThemeContext = createContext();

export const useTheme = () =>useContext(toggleThemeContext); 


const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const themeStyle = theme === 'light' ? lightTheme : darkTheme;
  return (
    <toggleThemeContext.Provider value={{toggleTheme}}>
        <StyledThemeProvider theme = {themeStyle}>
            {children}
        </StyledThemeProvider>
    </toggleThemeContext.Provider>
  );
};
export default ThemeProvider;
