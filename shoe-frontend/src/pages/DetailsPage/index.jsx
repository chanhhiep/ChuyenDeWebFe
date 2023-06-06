
import "./details.css"
import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
import React, { useEffect, useRef, useState} from "react";
import { FaShoppingCart,FaHeart } from 'react-icons/fa';
import { Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toastError, toastSuccess } from '../../services/ToastService';
import { getAllProduct,getProductByCategory,getProductById } from "../../api/general-api";
import { API_ENDPOINT } from "../../constants";
import axios from "axios";
export default function DetailsPage(props) {
    const { id } = useParams();
    const [product,setProduct] = useState([]);
    const accesstoken = localStorage.getItem('accesstoken');
   // const [user,setUser] = useState([]);
    const [userId,setUserId] = useState("");
    const [quantity,setQuantity] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        window.scrollTo(0, 0);
       
        const fetchData = (async () => {
            await axios.get(`${API_ENDPOINT}/api/products/{id}`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then(res => {       
                const { data } = res;
                console.log(data);
                setProduct(data);
            });
        });
        
        return () => {
            fetchData();
        };
    }, []);
     //details page
    function addToCart(){   
        if(userId === ""){
        ///return login page
        return;
        }
        else{
            const data = { 
                product:id,
                user:user.id,
                quantity:quantity
            }
            axios.post(`${API_ENDPOINT}/api/add/prodcut`, data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then((res)=>{  
                toastSuccess("Save successfully");
                //removeItem();
                console.log("success");
        })
        }
    }
    function addWishList(){
        return;
    }
    const [comment,setComment] = useState("");
    const [star,setStar] = useState("");
    function addComment(){
        if(comment===""){
            toastError("hãy điền vào ô comment");
        }
        const data = {
            cmt:comment,
            idPro:id,
            idUser:user.id,
            start:"1"
        }
        axios.post(`${API_ENDPOINT}/api/comment/create`,data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
                .then((res)=>{
                const {data} = res;
                window.location.reload();
                toastError("Bình Luận Thành Công");
        })
    }
  
    return(
        <>
        < Header />
        <div className="container">
        <div className="clear10"></div>
        <div className="clear10"></div>
        <div className="clear10"></div>
     
        <div className="padmb">
            <div className="hinhsp">
                <img className=" lazyloaded" width="500" height="500" src={product.images}/>
            </div>

            <div className="infosp">
                <div className="ten">{product.name}</div>
                <a className="rew">
                    <span>
                        <i className="iconcom-star"></i>
                        <i className="iconcom-star"></i>
                        <i className="iconcom-star"></i>
                        <i className="iconcom-star"></i>
                        <i className="iconcom-star"></i>
                    </span>
                    <span> (đánh giá)</span>
                </a>
                <div className="clear"></div>
                <div id="setPrice"><p className="price">{product.price}<sup>đ</sup></p>
                    <p className="company"><span>{product.price * product.discountRate}</span></p>
                </div>
                <div className="clear"></div>
                <div className="khuyenmai">
                    <ul>
                        <li><strong>Trạng thái :</strong> Còn hàng</li>
                        <li><strong>Tình trạng :</strong> Hàng mới 100%</li>
                    </ul>
                </div>

                <div className="choosesize ">
                    <p>Chọn size: </p>
                    <ul className="ulsize">
                        {/*
                    {product.sizes.map((s)=>(
                        <input type="checkbox"  style={{fontSize: "12px"}}>{s.size_num}</input>
                    ))}*/}
                    </ul>
                </div>
                
                <form className="product" method="get" name="Order">
                    <div className="soluongsp">
                        
                        <div className="upqty" onclick="updownqty('up');">+</div>
                            <input id="qty" name="quantity" onChange={(e)=>{setQuantity(e.target.value)}} type="number" className="soluong" value="1" min="1"
                               max={product.quantity} style={{marginRight:"10px",marginLeft:"10px"}}/>
                        <div className="downqty" onclick="updownqty('down');">–</div>
                    </div>

                    <input className="sizesp" name="sizesp" type="hidden" value="${size.getSize_num()}" id="size"/>
                    <input type="hidden" name="giaban" className="giabansp" value="${products.getPrice()}"/>
                    <input type="hidden" name="product_id" value="${products.getId()}"/>
                    <div className="clear"></div>
                    <input type="submit" className="buynow" value="Mua ngay"/>
                    <button onClick={()=>addToCart()} className="intocart">Thêm vào giỏ</button>
                    <button onclick={()=>addWishList()}>Danh sách yêu thích</button>
                </form>
                <div className="clear10"></div>
                    
            </div>
            <div className="clear10"></div>
            <span id="element_sale"></span>
        </div>
        <div className="clear"></div>
        <div className="clear"></div>
        <div className="clear"></div>
        <div className="clear"></div>

        <div className="stars">
            <h1>Xếp hạng và đánh giá</h1>
            <div className="Star-Ratings">
                <div className="inner">
                    <div className="rating">
                        <span className="rating-num">4.0</span>
                        <div className="rating-star">
                            <span><i className="active icon-star"></i></span>
                            <span><i className="active icon-star"></i></span>
                            <span><i className="active icon-star"></i></span>
                            <span><i className="active icon-star"></i></span>
                            <span><i className="icon-star"></i></span>
                        </div>
                        <div className="rating-users">
                            <i className="icon-user"></i> 1000 total
                        </div>
                    </div>
                    <div className="histo">
                        <div className="five histo-rate">
                            <span className="histo-star">
                                <i className="active icon-star"></i> 5
                            </span>
                            <span className="bar-block">
                                <span id="bar-five" className="bar">
                                    <span>554</span>&nbsp;</span>
                            </span>
                        </div>

                        <div className="four histo-rate">
                            <span className="histo-star">
                                <i className="active icon-star"></i> 4
                            </span>
                            <span className="bar-block">
                                <span id="bar-four" className="bar">
                                    <span>171</span>&nbsp;</span>
                            </span>
                        </div>

                        <div className="three histo-rate">
                            <span className="histo-star">
                                <i className="active icon-star"></i> 3
                            </span>
                            <span className="bar-block">
                                <span id="bar-three" className="bar">
                                    <span>94</span>&nbsp;</span>
                            </span>
                        </div>

                        <div className="two histo-rate">
                            <span className="histo-star">
                                <i className="active icon-star"></i> 2
                            </span>
                            <span className="bar-block">
                                <span id="bar-two" className="bar">
                                    <span>44</span>&nbsp;</span>
                            </span>
                        </div>

                        <div className="one histo-rate">
                            <span className="histo-star">
                                <i className="active icon-star"></i> 1
                            </span>
                            <span className="bar-block">
                                <span id="bar-one" className="bar">
                                    <span>136</span>&nbsp;
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviews">
                <form action="" className="rating-wrapper">
                    <label className="rating-label">Đánh giá sản phẩm
                        <div className="ratingItemList">
                            <input className="star star-5" id="star-5" type="radio" name="star" value="5"/>
                            <label className="star star-5" for="star-5"></label>
                            <input className="star star-4" id="star-4" type="radio" name="star" value="5"/>
                            <label className="star star-4" for="star-4"></label>
                            <input className="star star-3" id="star-3" type="radio" name="star" value="5"/>
                            <label className="star star-3" for="star-3"></label>
                            <input className="star star-2" id="star-2" type="radio" name="star" value="5"/>
                            <label className="star star-2" for="star-2"></label>
                            <input className="star star-1" id="star-1" type="radio" name="star" value="5"/>
                            <label className="star star-1" for="star-1"></label>
                        </div>
                    </label>
                    <div className="feedback">
                        <textarea placeholder="Đánh giá...."></textarea>
                        <button className="submit">Đăng</button>
                    </div>
                </form>
            </div>
            <div className="cmt">
                <ul className="ratingLst">
                    {product.listComment.map((comment)=>(

                    <li>
                        <div className="rh">
                            <span>NVA</span>
                            <label>
                                <i></i>
                            </label>
                        </div>
                        <div className="rc">
                            <p>
                                <span>
                                    <i className="iconcom-star"></i>
                                     <i className="iconcom-star"></i>
                                     <i className="iconcom-star"></i>
                                     <i className="iconcom-star"></i>
                                     <i className="iconcom-star"></i>
                                </span>
                                <i>Good</i>
                            </p>
                        </div>
                        <div className="ra">
                            <a title="like">
                                <i></i>like
                                <span> - </span>
                                <span>3h trước</span>
                            </a>
                        </div>
                        <div className="clear"></div>
                        <div className="ro">
                            <p>
                                <img className="ls-is-cached lazyloaded" src="/images/logomb.png" width="24" height="24"
                                     alt=""/>
                               { comment.cmt}
                            </p>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
        </>
    )
}