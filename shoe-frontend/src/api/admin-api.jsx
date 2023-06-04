import { API_ENDPOINT } from "../constants";
import * as ADMIN from "../constants/admin";
//import axios from 'axios';
import axiosService from "../services/axiosService";

const RESOURCE = "admin";
const BASE_URL = `${API_ENDPOINT}/${RESOURCE}`;

//product
export const getProductList = () => {
    console.log(`${BASE_URL}/${ADMIN.FETCH_PRODUCT_LIST}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.FETCH_PRODUCT_LIST}`);
};
export const deleteProduct = (id) => {
    console.log(`${BASE_URL}/${ADMIN.DELETE_PRODUCT}/${id}`);
    return axiosService.delete(`${BASE_URL}/${ADMIN.DELETE_PRODUCT}/${id}`);
};
export const updateProduct = (data) => {
    return axiosService.put(`${BASE_URL}/${ADMIN.UPDATE_PRODUCT}`,data);
};
export const showProduct = (id) => {
    console.log(`${BASE_URL}/${ADMIN.SHOW_PRODUCT}/${id}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.SHOW_PRODUCT}/${id}`);
};
export const saveProduct = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SAVE_PRODUCT}`,data);
};
export const searchProduct = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SEARCH_PRODUCT}`,data);
};


//Category

export const getCategoryList = () => {
    console.log(`${BASE_URL}/${ADMIN.FETCH_CATEGORY_LIST}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.FETCH_CATEGORY_LIST}`);
};
export const deleteCategory = (id) => {
    console.log(`${BASE_URL}/${ADMIN.DELETE_CATEGORY}/${id}`);
    return axiosService.delete(`${BASE_URL}/${ADMIN.DELETE_CATEGORY}/${id}`);
};
export const updateCategory = (data) => {
    return axiosService.put(`${BASE_URL}/${ADMIN.UPDATE_CATEGORY}`,data);
};
export const showCategory = (id) => {
    console.log(`${BASE_URL}/${ADMIN.SHOW_CATEGORY}/${id}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.SHOW_CATEGORY}/${id}`);
};
export const saveCategory = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SAVE_CATEGORY}`,data);
};
export const searchCategory = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SEARCH_CATEGORY}`,data);
};
//brand

export const getBrandList = () => {
    console.log(`${BASE_URL}/${ADMIN.FETCH_BRAND_LIST}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.FETCH_BRAND_LIST}`);
};
export const deleteBrand = (id) => {
    console.log(`${BASE_URL}/${ADMIN.DELETE_BRAND}/${id}`);
    return axiosService.delete(`${BASE_URL}/${ADMIN.DELETE_BRAND}/${id}`);
};
export const updateBrand = (data) => {
    return axiosService.put(`${BASE_URL}/${ADMIN.UPDATE_BRAND}`,data);
};
export const showBrand = (id) => {
    console.log(`${BASE_URL}/${ADMIN.SHOW_BRAND}/${id}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.SHOW_BRAND}/${id}`);
};
export const saveBrand = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SAVE_BRAND}`,data);
};
export const searchBrand = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SEARCH_BRAND}`,data);
};
//SIZE

export const getSizeList = () => {
    console.log(`${BASE_URL}/${ADMIN.FETCH_SIZE_LIST}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.FETCH_SIZE_LIST}`);
};
export const deleteSize = (id) => {
    console.log(`${BASE_URL}/${ADMIN.DELETE_SIZE}/${id}`);
    return axiosService.delete(`${BASE_URL}/${ADMIN.DELETE_SIZE}/${id}`);
};
export const updateSize = (data) => {
    return axiosService.put(`${BASE_URL}/${ADMIN.UPDATE_SIZE}`,data);
};
export const showSize = (id) => {
    console.log(`${BASE_URL}/${ADMIN.SHOW_SIZE}/${id}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.SHOW_SIZE}/${id}`);
};
export const saveSize = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SAVE_SIZE}`,data);
};
export const searchSize = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SEARCH_SIZE}`,data);
};

//PAYMENT

export const getPaymentList = () => {
    console.log(`${BASE_URL}/${ADMIN.FETCH_PAYMENT_LIST}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.FETCH_PAYMENT_LIST}`);
};
export const deletePayment = (id) => {
    console.log(`${BASE_URL}/${ADMIN.DELETE_PAYMENT}/${id}`);
    return axiosService.delete(`${BASE_URL}/${ADMIN.DELETE_PAYMENT}/${id}`);
};
export const updatePayment = (data) => {
    return axiosService.put(`${BASE_URL}/${ADMIN.UPDATE_PAYMENT}`,data);
};
export const showPayment = (id) => {
    console.log(`${BASE_URL}/${ADMIN.SHOW_PAYMENT}/${id}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.SHOW_PAYMENT}/${id}`);
};
export const savePayment = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SAVE_PAYMENT}`,data);
};
export const searchPayment = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SEARCH_PAYMENT}`,data);
};

//DISCOUNT

export const getDiscountList = () => {
    console.log(`${BASE_URL}/${ADMIN.FETCH_DISCOUNT_LIST}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.FETCH_DISCOUNT_LIST}`);
};
export const deleteDiscount = (id) => {
    console.log(`${BASE_URL}/${ADMIN.DELETE_DISCOUNT}/${id}`);
    return axiosService.delete(`${BASE_URL}/${ADMIN.DELETE_DISCOUNT}/${id}`);
};
export const updateDiscount = (data) => {
    return axiosService.put(`${BASE_URL}/${ADMIN.UPDATE_DISCOUNT}`,data);
};
export const showDiscount = (id) => {
    console.log(`${BASE_URL}/${ADMIN.SHOW_DISCOUNT}/${id}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.SHOW_DISCOUNT}/${id}`);
};
export const saveDiscount = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SAVE_DISCOUNT}`,data);
};
export const searchDiscount = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SEARCH_DISCOUNT}`,data);
};

//Receipt

export const getReceiptList = () => {
    console.log(`${BASE_URL}/${ADMIN.FETCH_RECEIPT_LIST}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.FETCH_RECEIPT_LIST}`);
};
export const deleteReceipt = (id) => {
    console.log(`${BASE_URL}/${ADMIN.DELETE_RECEIPT}/${id}`);
    return axiosService.delete(`${BASE_URL}/${ADMIN.DELETE_RECEIPT}/${id}`);
};
export const updateReceipt = (data) => {
    return axiosService.put(`${BASE_URL}/${ADMIN.UPDATE_RECEIPT}`,data);
};
export const showReceipt = (id) => {
    console.log(`${BASE_URL}/${ADMIN.SHOW_RECEIPT}/${id}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.SHOW_RECEIPT}/${id}`);
};
export const saveReceipt = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SAVE_RECEIPT}`,data);
};
export const searchReceipt = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SEARCH_RECEIPT}`,data);
};

//aCCOUTN ADMIN

export const getAccountAdminList = () => {
    console.log(`${BASE_URL}/${ADMIN.FETCH_ADMIN_ACCOUNT_LIST}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.FETCH_ADMIN_ACCOUNT_LIST}`);
};
export const deleteAccountAdmin = (id) => {
    console.log(`${BASE_URL}/${ADMIN.DELETE_ADMIN_ACCOUNT}/${id}`);
    return axiosService.delete(`${BASE_URL}/${ADMIN.DELETE_ADMIN_ACCOUNT}/${id}`);
};
export const updateAccountAdmin = (data) => {
    return axiosService.put(`${BASE_URL}/${ADMIN.UPDATE_ADMIN_ACCOUNT}`,data);
};
export const showAccountAdmin = (id) => {
    console.log(`${BASE_URL}/${ADMIN.SHOW_ADMIN_ACCOUNT}/${id}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.SHOW_ADMIN_ACCOUNT}/${id}`);
};
export const saveAccountAdmin = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SAVE_ADMIN_ACCOUNT}`,data);
};
export const searchAccountAdmin = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SEARCH_ADMIN_ACCOUNT}`,data);
};
//User ADMIN

export const getAccountUserList = () => {
    console.log(`${BASE_URL}/${ADMIN.FETCH_USER_ACCOUNT_LIST}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.FETCH_USER_ACCOUNT_LIST}`);
};
export const deleteAccountUser = (id) => {
    console.log(`${BASE_URL}/${ADMIN.DELETE_USER_ACCOUNT}/${id}`);
    return axiosService.delete(`${BASE_URL}/${ADMIN.DELETE_USER_ACCOUNT}/${id}`);
};
export const updateAccountUser = (data) => {
    return axiosService.put(`${BASE_URL}/${ADMIN.UPDATE_USER_ACCOUNT}`,data);
};
export const showAccountUser = (id) => {
    console.log(`${BASE_URL}/${ADMIN.SHOW_USER_ACCOUNT}/${id}`);
    return axiosService.get(`${BASE_URL}/${ADMIN.SHOW_USER_ACCOUNT}/${id}`);
};
export const saveAccountUser = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SAVE_USER_ACCOUNT}`,data);
};
export const searchAccountUser = (data) => {
    return axiosService.post(`${BASE_URL}/${ADMIN.SEARCH_USER_ACCOUNT}`,data);
};
