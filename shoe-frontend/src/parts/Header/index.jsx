import "./header.css";
import { FaShoppingCart,FaHeart,FaList } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from "react";
import { toastError, toastSuccess } from '../../services/ToastService';
import { API_ENDPOINT } from "../../constants";
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
export default function Header(props) {
    const [listProduct, setListProduct] = useState([]);
    const [listCategory,setListCategory] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const accesstoken = localStorage.getItem('accesstoken');
    function handleLogout() {
        localStorage.clear();
        window.location = '/login';
    }
    useEffect(() => {
        const refetch = (async () => {
            axios.get(`${API_ENDPOINT}/api/category/getAll`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then(res => {       
                const { data } = res;
                console.log(data);
                setListCategory(data);
            });
        });
        //cleanup function
        return () => {
            refetch();
        };
    }, []);
    const[keyword,setKeyWord] = useState("");
    const[listResult,setListResult] = useState([]);
    function handleSearch() {
        if(keyword === ""){
            return;
        }
        else{
            const data = {
                keyword : keyword
            }
            axios.post(`${API_ENDPOINT}/admin/product/search`,data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
                .then((res)=>{
                const {data} = res;
                setListProduct(data);
            })
        }
    }
    return (
        <>
        
        <header>
    <div className="head">
        <div className="container">
            <h1>Shop Giày Thể Thao - Sneaker Nam, Nữ Replica Đẹp Giá Rẻ</h1>
            <div className="texttop">
                <ul className="text">
                    <li><p>Free ship</p> <span>Toàn quốc</span></li>
                    <li><Link to={`/OrderHistory`}><p>Lich Su Don Hang</p> <span>Mới thanh toán</span></Link></li>
                    <li><p>Bảo hành</p> <span>Trong 6 tháng</span></li>
                </ul>
                <ul className="top">
                    <li>
                        <Link to={`/WishList`} title="Danh sách yêu thích">
                            <div className="img">
                                <img src="https://cdn3.iconfinder.com/data/icons/e-commerce-3-2/380/8-1024.png" alt="Cập nhật danh sách yêu thích" width="24"
                                     height="24"/></div>
                            <p>Wish List</p>
                        </Link>
                    </li>

                </ul>
                <Link to={`/Cart`} id="cart" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItem:"center"}}>
                    <FaShoppingCart width="30px" height="30px"/>
                    <span>( 0 sản phẩm )</span>
                </Link>
            </div>
            <div classNameName="clear"></div>
            <div className="header">
                <div className="logo">
                    <a href="index.html" title="Trang chủ | Shop Giày Thể Thao - Sneaker Nam, Nữ Replica Đẹp Giá Rẻ">
                        <img src="http://www.bestfreewebresources.com/wp-content/uploads/2013/03/logo-shoes-3.jpg" alt="Shop Giày Thể Thao - Sneaker Nam, Nữ Replica Đẹp Giá Rẻ"
                             width="261"
                             height="50"/></a></div>              
            
            
                <div className="search">
                    <form action="tim-kiem" method="get" target="_top">
                        <input type="text" name="key" onChange={(e)=>setKeyWord(e.target.value)} placeholder="Nhập gợi ý từ khóa..."/>
                        {/*<input type="submit" value="Tìm kiếm"/>*/}
                        <ul className="search_result">
                            {listResult.map((result) => (
                                <li>
                                    <Link to={`/DetailsPage/${result.id}`}>{result.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>
                {user ?
                             <>
                             <div class="account" style={{marginRight:"40px"}}>
                             <Link to="/Login"><p>Xin chào, user.email!</p></Link>
                                <button onClick={(e)=>handleLogout()}>Đăng xuất</button>
                             </div>
                                </>
                                :
                                <>
                                <div class="account" style={{marginRight:"40px"}}>                
                        <a href="/login" title="Đăng ký &amp; tạo tài khoản">
                            <img src="https://tse2.mm.bing.net/th?id=OIP.rVggrpUvs-YAUExsD7c-EAHaHa&pid=Api&P=0&h=180" alt="Tài khoản thành viên" height="36" width="36"
                                 class="default"/><span><Link to="/Login" role="button">Đăng ký</Link>/ <Link to="/Register" role="button" >đăng nhập</Link></span>
                            <p class="capdo"><i>Nhận ngay ưu đãi</i></p>
                        </a>   
                </div>
                                </>
                            }
                
                
                <a className="togglemenu">Menu</a>
                <nav className="subnav">
                    <ul className="navigation">
                    {listCategory.map((category) => (
                        <>
                        <li className="category" href="/"
                        title=""><a>Trang Chủ</a></li>
                         <li className="category" href="product.html"
                         title={category.name}><a>Adidas</a></li>
                         </>
                    ))}

                        <ul className="linknews">
                            <li><a href="#" title="Thông tin giới thiệu">Giới thiệu</a></li>
                            <li><a href="#" title="Chia sẻ kinh nghiệm hay về giày thể thao">
                                Chia sẻ kinh nghiệm hay <label>Mới</label></a></li>
                            <li><a href="#" title="Tin tức - tư vấn giày thể thao">Tin tức - tư
                                vấn </a></li>
                            <li><a href="#" title="Thông tin liên hệ">Liên hệ</a></li>
                        </ul>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    <div className="menufix no-scroll">
        <nav id="menu" className="menu">
            <div className="container">
                <ul>
                    <li><Link to="/" title="Giới thiệu"><span className="brand"><img
                            src="images/gioi-thieu.png" alt="Giới thiệu" width="33" height="24"/></span>Trang chủ</Link>
                    </li>
                    {listCategory.map((category) => (
                        <li><Link to={`/ProductPage/${category.category_id}`} ><span className="brand"><img
                        src={category.images} alt="Adidas" width="40" height="24"/></span>{category.name}</Link>         
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    </div>
</header>
        </>
    )
}