import { FETCH_PRODUCTS} from './types'

export const fetchProducts = () => (dispatch) => {

    fetch("http://localhost:8000/products")
    .then(res => res.json())
    .then(data => {
        return dispatch({
            type: FETCH_PRODUCTS, 
            payload: data
         } )
        })

    

}