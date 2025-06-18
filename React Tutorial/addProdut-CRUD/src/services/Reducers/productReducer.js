const initalState = {
    products : [],
    product: null,
    isLoading: false
}


const productReducer = (state = initalState , action) =>{
 switch(action.type){

    case"ADD_PRODUCT":
    let newProducts = [...state.products , action.payload];
    localStorage.setItem("products" ,JSON.stringify(newProducts));
    return{
        ...state,
        products : [...state.products , action.payload]
    }

    default: 
    return state;
 }
}

export default productReducer;