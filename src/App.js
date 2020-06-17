import React, { useState, useEffect } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import storage from 'local-storage-fallback'
import "./styles.css";

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${propos =>
    propos.theme.mode === "dark" ? "#111" : "#EEE"};
  color: ${propos => (propos.theme.mode === "dark" ? "#EEE" : "#111")};
}
`;

function getInitialTheme () {
  const savedTheme = storage.getItem('theme')
  return savedTheme ? JSON.parse(savedTheme) : { mode: "light" }
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(()=>{
    storage.setItem('theme', JSON.stringify(theme))}, [theme]);
  
    return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
          <button
            onClick={e =>
              setTheme(
                theme.mode === "dark" ? { mode: "light" } : { mode: "dark" }
              )
            }
          >
            ToggleTheme
          </button>
        </div>
      </>
    </ThemeProvider>
  );
}

