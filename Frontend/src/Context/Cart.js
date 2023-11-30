import { useState,createContext,useContext, useEffect} from "react";

const CartContext=createContext()

const CartProvider=({children})=>{
const[cart,setCart]=useState([])
useEffect(()=>{
let existingCartitem=localStorage.getItem('cart')
if(existingCartitem) setCart(JSON.parse(existingCartitem))
},[])
return (
    <CartContext.Provider value={[cart,setCart]}>
        {children}
    </CartContext.Provider>
)
}

//costom Hook
const useCart=()=> useContext(CartContext)


export{useCart,CartProvider}