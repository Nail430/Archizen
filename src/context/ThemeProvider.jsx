import { useState } from "react";
import { ThemeContext } from "./ThemeContext";


export const ThemeProvider = ({children}) => { // Creation du const provider avec une fonction flechee 

    const [theme,setTheme] = useState("claire");

    function toogletheme (){
        setTheme((prevTheme) => prevTheme === "claire" ? "sombre" : "claire"); 
    }
    return (
       < ThemeContext.Provider value ={{theme, toogletheme}}>

            {children}

       </ThemeContext.Provider>    
        
    )
}