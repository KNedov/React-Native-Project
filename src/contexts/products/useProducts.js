import { useContext } from "react";
import { ProductContext} from "./productProvider.jsx";

export function useProducts() {
    const context = useContext(ProductContext);
    
    return context;
}