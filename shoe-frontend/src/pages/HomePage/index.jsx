import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
import "./homepage.css"
import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart,FaHeart } from 'react-icons/fa';
import { toastError, toastSuccess } from '../../services/ToastService';
import { getAllProduct,getProductByCategory } from "../../api/general-api";
import { API_ENDPOINT } from "../../constants";
import axios from "axios";
export default function HomePage(){
    const [listProduct, setListProduct] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    var accesstoken = localStorage.getItem('accesstoken');
    useEffect(() => {
        const refetch = (async () => {
            const api = `${API_ENDPOINT}/api/product`
            await axios.get(api, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then(res => {       
                const { data } = res;
                console.log(data);
                setListProduct(data);
            });
            await axios.get(`${API_ENDPOINT}/api/category/getAll`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
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
        const api = `${API_ENDPOINT}/api/product/category/{id}`
            axios.get(api, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then(res => {       
                const { data } = res;
                console.log(data);
                setListProduct(data);
        });
    }
    
    //details page
    /*
    function addToCart(){
        const userId = sessionStorage.getItem("sessionId");
        if(userId === null){
        ///return login page
        return;
        }
        else{
            const data = {  
            }
        }
    }*/
    return(
        <>       
        <body id="content">
        <Header />
        <span id="element_slide"></span>
        <main>
            <div className="container">
                <div className="titlehome" style={{marginTop:"15px"}}>
                    <form action="/sort" method="post">
                        <label>Sắp xếp theo:</label>
                        <select name="sortType">
                            <option value="name_asc">Tên sản phẩm (tăng dần)</option>
                            <option value="name_desc">Tên sản phẩm (giảm dần)</option>
                            <option value="price_asc">Giá sản phẩm (tăng dần)</option>
                            <option value="price_desc">Giá sản phẩm (giảm dần)</option>
                        </select>
                        <input type="submit" value="Sắp xếp"/>
                    </form>
                </div>
                <div className="clear"></div>
                <div className="padmb" style={{display:"flex",flexDirection:"column"}}>
                    <ul className="listsp">
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
                    <ul className="listPage">
                        <li className="active">1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </div>
            </div>
            <div className="clear"></div>
        </main>
        
        <div className="clear"></div>
   </body>
        <Footer />
        </>
        
    )
}