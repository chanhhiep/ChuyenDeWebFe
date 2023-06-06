import { API_ENDPOINT } from "../constants";
import * as GENERAL from "../constants/general";
import axiosService from "../services/axiosService";

const RESOURCE = "api";
const BASE_URL = `${API_ENDPOINT}/${RESOURCE}`;
//authentication
export const loginHandel = (data) => {
    console.log(`${BASE_URL}/login`);
    return axiosService.post(`${BASE_URL}/login`,data);
};
export const registerHandel = (data) => {
    return axiosService.post(`${BASE_URL}/signup`,data);
};
//cart
export const addToCart = (data) => {
    return axiosService.post(`${BASE_URL}/add/product`,data);
};
export const GetCartByUser = (id) => {
    return axiosService.get(`${BASE_URL}/cart/{id}`);
};
export const removeCart = (id) => {
    return axiosService.delete(`${BASE_URL}/cart/remove/{id}`);
};
//category
export const getCategoryById = (id) => {
    return axiosService.get(`${BASE_URL}/category/{id}`);
};
export const getCategoryByParentId = (id) => {
    return axiosService.get(`${BASE_URL}/category/{id}`);
};
export const deleteCategory = (id) => {
    return axiosService.delete(`${BASE_URL}/category/delete/{id}`);
};
export const CreateCategory = (data) => {
    return axiosService.post(`${BASE_URL}/category/create`,data);
};
export const getAllCategory = () => {
    return axiosService.get(`${BASE_URL}/category/getAll`);
};
export const updateCategory = (data) => {
    return axiosService.put(`${BASE_URL}/category/update`,data);
};
//order controller
export const CreateOrder = (data) => {
    return axiosService.post(`${BASE_URL}/order/create`,data);
};
//order detail
export const CreateOrderDetails = (data) => {
    return axiosService.post(`${BASE_URL}/checkout`,data);
};
export const GetOrderDetailsById = (id) => {
    return axiosService.get(`${BASE_URL}/checkout/{id}`);
};
//payment
export const CreatePayment = (data) => {
    return axiosService.post(`${BASE_URL}/payment/create`,data);
};
export const DeletePayment = (id) => {
    return axiosService.delete(`${BASE_URL}/payment/delete/{id}`);
};
//product
export const getAllProduct = () => {
    console.log(`${BASE_URL}/product`);
    return axiosService.get(`${BASE_URL}/product`);
};
export const getProductById = (id) => {
    //console.log(`${BASE_URL}/product`);
    return axiosService.get(`${BASE_URL}/products/{id}`);
};
export const getProductByCategory = (id) => {
    return axiosService.get(`${BASE_URL}/api/product/category/{id}`);
};
export const createProduct = (data) => {
    return axiosService.post(`${BASE_URL}/api/product/create`,data);
};
export const getProductPage = (id) => {
    return axiosService.get(`${BASE_URL}/api/product/page`);
};
export const searchProduct = (data) => {
    return axiosService.post(`${BASE_URL}/api/product/search`,data);
};
//review
export const createReview = (data) => {
    return axiosService.post(`${BASE_URL}/api/comment/create`,data);
};
//shipping
export const shippingCreate = (data) => {
    return axiosService.post(`${BASE_URL}/api/shipping/create`,data);
};
//size
export const sizeCreate = (data) => {
    return axiosService.post(`${BASE_URL}/api/size/create`,data);
};
export const getAllUser = () => {
    return axiosService.get(`${BASE_URL}/api/users/getAll`);
};
export const getProfile = () => {
    return axiosService.get(`${BASE_URL}/users/profile`);
};