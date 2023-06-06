import "./product.css";
import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart,FaHeart } from 'react-icons/fa';
import { toastError, toastSuccess } from '../../services/ToastService';
import { getAllProduct,getProductByCategory } from "../../api/general-api";
import { Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { API_ENDPOINT } from "../../constants";
import axios from "axios";
export default function ProductPage() {
    const { idCate } = useParams();
    const [listProduct, setListProduct] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    var accesstoken = localStorage.getItem('accesstoken')
    useEffect(() => {
        const refetch = (async () => {
            const api = `${API_ENDPOINT}/api/product/category/{idCate}`
            await axios.get(api, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then(res => {       
                const { data } = res;
                console.log(data);
                setListProduct(data);
            });
            const api2 = `${API_ENDPOINT}/api/category/getAll`;
            await axios.get(api2, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then(res => {       
                const { data } = res;
                console.log(data);
                setListCategory(data);
            });
            return;
        });
        //cleanup function
        return () => {
            refetch();
        };
    }, []);

    function getProductByCategory(id){
        const api = `${API_ENDPOINT}/api/product/category/${id}`
            axios.get(api, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then(res => {       
                const { data } = res;
                console.log(data);
                setListProduct(data);
        });
    }
    return (
        <>
        <Header />
        <div class="container">
        <div class="sub_category">
            <ul>
            {listCategory.map((cate) => (
                <li>
                    <img src={cate.getImg} />
                    <Link to="/">{cate.name}</Link>
                </li>
            ))}   
            </ul>
        </div>
       
        <div class="clear"></div>
        <div class="padmb">
            <ul class="listsp">
            {listProduct.map((pro) => (
                            <li>
                                <div className="images">
                                    <a href="">
                                        <div className="product-favorite onwishlist_btn_add">
                                            <FaHeart />
                                        </div>
                                    </a>
                                    <div className="ribbon"><span>Hàng mới</span></div>
                                    <a href="">
                                        <img width="234" height="234" className=" lazyloaded" src={pro.images}/>
                                    </a>
                                </div>
                                <div className="info">
                                    <h3>
                                        <a href="">{pro.name}</a>
                                    </h3>
                                    <p>{pro.price}<sup>đ</sup><span>{pro.price * pro.discountRate}</span></p>
                                </div>
                            </li>
                    ))}        
            </ul>
            <ul class="listPage">
                <li class="active">1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </div>
        <div class="clear"></div>
    </div>
    <Footer/>
        </>
    )
}