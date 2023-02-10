import { publicRequest, userRequest} from "../requestMethods";
import {
    addProductFailure,
    addProductStart,
    addProductSuccess,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    getProductFailure,
    getProductStart,
    getProductSuccess,
    updateProductFailure,
    updateProductStart
} from "./productRedux";
import {loginFailure, loginStart, loginSuccess} from "./userRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
}

export const getProduct = async (dispatch) =>{
    dispatch(getProductStart());
    try{
        const res = await publicRequest.get("/products")
        dispatch(getProductSuccess(res.data))
    }catch(err){
        dispatch(getProductFailure())
    }
}
// DELETE
export const deleteProduct = async (id, dispatch) =>{
    dispatch(deleteProductStart());
    try{
        //const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id))
    }catch(err){
        dispatch(deleteProductFailure())
    }
}
// UPDATE
export const upateProduct = async (id, product, dispatch) =>{
    dispatch(updateProductStart());
    try{
        //const res = await userRequest.delete(`/products/${id}`)
        dispatch(updateProductStart({id, product}))
    }catch(err){
        dispatch(updateProductFailure())
    }
}
// CREATE
export const addProduct = async (product,  dispatch) =>{
    dispatch(addProductStart());
    try{
        const res = await userRequest.post(`/products`, product)
        dispatch(addProductSuccess(res.data))
    }catch(err){
        dispatch(addProductFailure())
    }
}