import { useContext } from "react";
import { ProductsDataContext } from "../Context";

const useProducts = () =>{
    const context = useContext(ProductsDataContext);
    if(context === undefined){
      throw Error("useProducts must be used within ProductsDataContext")
    }
    return context
  }
  export default useProducts 