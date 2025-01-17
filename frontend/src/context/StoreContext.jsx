import { createContext } from "react";
import { food_list } from "../assets/assets";


export const StoreContext = createContext(null);

const StoreContextProvider = (Props) => {


    const contextValue = {
        food_list
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {Props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
