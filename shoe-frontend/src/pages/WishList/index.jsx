import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { toastError, toastSuccess } from '../../services/ToastService';
import { API_ENDPOINT } from "../../constants";
import { ButtonGroup,ToggleButton } from "react-bootstrap";
import axios from "axios";
export default function WishList () {
    const [wishList,setWishList] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const accesstoken = localStorage.getItem('token');
    useEffect(() => {
        const refetch = (async () => {
            await axios.get(`${API_ENDPOINT}/api/cart/${user.id}`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then(res => {
                const { data } = res;
                let deserializedArray = [];
                Object.values(data).map((item) => deserializedArray.push(item))
               // setListCart(deserializedArray);
            });  
        });
        return () => {
            refetch();
        };
    }, []);
    return (
        <>
        <Header />
        <div class="container">
        <div class="padmb">
            <h1 style={{marginTop:"20px",fontWeight:"600",fontSize:"28px",color:"#373737",marginBottom:"20px"}}>Danh Sach Yeu Thich</h1> 
            <ul class="listsp">
                    <li>
                        <div class="images">
                            <a href="/wishlist/${product.getId()}/remove">
                                <div class="product-favorite onwishlist_btn_add">
                                    <div class="icon-remove-wishtlist"></div>
                                </div>
                            </a>
                            <a href="/products/${product.getId()}/info-product">
                                <img width="234" height="234" class=" lazyloaded" src=""/>
                            </a>
                        </div>
                        <div class="info">
                            <h3>
                                <a href="/products/${product.getId()}/info-product">name</a>
                            </h3>
                            <p>price<sup>đ</sup><span>rate</span></p>
                        </div>
                    </li>
             
                <div class="clear10"></div>
            </ul>
            <ul class="listPage">
            <li class="active">1</li>
            <li>2</li>
            <li>3</li>
        </ul>
        </div>
    </div>
    <Footer/>
        </>
    )
}