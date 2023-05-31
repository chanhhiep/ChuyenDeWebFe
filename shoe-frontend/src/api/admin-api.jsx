import { API_ENDPOINT } from "../constants";
import * as ADMIN from "../constants/admin";
import axios from 'axios';
import axiosService from "../services/axiosService";

const RESOURCE = "admin";
const BASE_URL = `${API_ENDPOINT}/${RESOURCE}`;

export const getProductList = () => {
    return axiosService.get(`${BASE_URL}/${ADMIN.FETCH_PRODUCT_LIST}`);
};
export const deleteProduct = (id) => {
    return axiosService.delete(`${BASE_URL}/${ADMIN.DELETE_PRODUCT}/${id}`);
};
export const updateProduct = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.UPDATE_PRODUCT}`,data);
};
export const showProduct = () => {
    return axiosService.get(`${BASE_URL}/${ADMIN.SHOW_PRODUCT}`);
};
export const saveProduct = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SAVE_PRODUCT}`,data);
};
// export const AdminApi = {
//     getListProduct(){
//         return axiosService.get("/listProduct");
//     },
//     getListBrand(){
//         return axiosService.get("/listBrand");
//     },
//     getListCategory(){
//         return axiosService.get("/listCategory");
//     },
//     getListSize(){
//         return axiosService.get("/listSize");
//     }
// };