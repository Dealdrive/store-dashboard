import { publicRequest, userRequest, refreshToken } from "../requestMethods";
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
import {getDataFailure, getDataSuccess, loginFailure, loginStart, loginSuccess} from "./userRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post("/auth/login", {
            ...user,
            refreshToken: localStorage.getItem("refresh_token"),
        });
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
}

export const getData = async (dispatch) => {
    let access_token = localStorage.getItem("access_token");
    if(!access_token){
        access_token = await refreshToken(dispatch);
    }
    try {
        const res = await userRequest.get("/data", {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        dispatch(getDataSuccess(res.data));
    } catch (err) {
        dispatch(getDataFailure());
    }
};




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