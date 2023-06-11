import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
import "./homepage.css"
import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart,FaHeart } from 'react-icons/fa';
import { toastError, toastSuccess } from '../../services/ToastService';
import { getAllProduct,getProductByCategory } from "../../api/general-api";
import { Link } from 'react-router-dom';
import { API_ENDPOINT } from "../../constants";
import Pagination from "react-paginate";
import { DropdownButton,Dropdown,Card,Row,Col } from "react-bootstrap";
import axios from "axios";
export default function HomePage(){
    const [listProduct, setListProduct] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const refetch = (async () => {
            const api = `${API_ENDPOINT}/api/product`
            await axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {       
                const { data } = res;
                console.log(data);
                setListProduct(data);
            });
            await axios.get(`${API_ENDPOINT}/api/category/getAll`, { headers: {"Authorization" : `Bearer ${token}`} })
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

    const [currentPage, setCurrentPage] = useState(1);
    const getPriceItem=(price,quantity)=>{
        return price*quantity;
    }
    const handleChangePage = (page) => {
      setCurrentPage(page);
    };
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
    const [titleSort,setTitleSort] = useState("Tên sản phẩm (tăng dần)");
    function sortProduct(sortType){

        if (sortType === "by-name-asc") {
            setTitleSort("Tên sản phẩm (tăng dần)");
        } else if (sortType === "by-name-desc") {
            setTitleSort("Tên sản phẩm (giảm dần)");
        } else if (sortType === "by-price-asc") {
            setTitleSort("Giá sản phẩm (tăng dần)");
        } else if (sortType === "by-price-desc") {
            setTitleSort("Giá sản phẩm (giảm dần)");
        } else {
        }
    
        axios.get(`${API_ENDPOINT}/api/product/sort/${sortType}`, { headers: {"Authorization" : `Bearer ${token}`} })
                .then((res) => {
            if (res.status === 200) {
                const { data } = res;
                setListProduct(data);
                toastSuccess("Sắp Xếp Thành Công");
            } else {
                toastError("fails to load");
            }
        })
    
    }
 
    return(
        <>       
        <Header />
        <span id="element_slide"></span>
        <main>
            <div className="container">
                <div className="titlehome" style={{marginTop:"15px"}} style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center",marginTop:"20px",marginBottom:"20px"}}>
                <label>Sắp xếp theo:</label>
                <DropdownButton id="dropdown-item-button" variant="outline-secondary" className="sort-drop" title={titleSort}>
                <Dropdown.ItemText>Sắp Xếp Theo:</Dropdown.ItemText>
                <Dropdown.Item as="button" onClick={()=>{sortProduct("by-name-asc")}}>Tên sản phẩm (tăng dần)</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>{sortProduct("by-name-desc")}}>Tên sản phẩm (giảm dần)</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>{sortProduct("by-price-asc")}}>Giá sản phẩm (tăng dần)</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>{sortProduct("by-price-desc")}}>Giá sản phẩm (giảm dần)</Dropdown.Item>
                </DropdownButton>
                    {/* <form action="/sort" method="post">
                        <label>Sắp xếp theo:</label>
                        <select name="sortType">
                            <option value="name_asc">Tên sản phẩm (tăng dần)</option>
                            <option value="name_desc">Tên sản phẩm (giảm dần)</option>
                            <option value="price_asc">Giá sản phẩm (tăng dần)</option>
                            <option value="price_desc">Giá sản phẩm (giảm dần)</option>
                        </select>
                        <input type="submit" value="Sắp xếp"/>
                    </form> */}
                </div>
                <div className="clear"></div>
                <div className="padmb" style={{display:"flex",flexDirection:"column"}}>
                    <ul className="listsp">
                    {listProduct.map((pro,index) => (                   
                            <li key={index} style={{border:"1px solid #c3c3c3",marginRight:"20px",padding:"10px",borderRadius:"10px"}}>
                                <div className="images">                             
                                        <div className="product-favorite onwishlist_btn_add">
                                            <FaHeart />
                                        </div>
                                    {/* <div className="ribbon"><span>Hàng mới</span></div> */}
                                    <Link to={`/DetailsPage/${pro.id}`}>
                                        <img width="234" height="234" className="lazyloaded" style={{border:"none"}} src="https://tse4.mm.bing.net/th?id=OIP.K7EGy_Xg-XHnbSIym9sL4gHaHa&pid=Api&P=0&h=180"/>
                                    </Link>
                                </div>
                                <div className="info">
                                   <Link to={`/DetailsPage/${pro.id}`}>
                                    <h3 style={{margin:"10px 0px 0px 0px",fontSize:"18px",padding:"0px",height:"30px"}}>
                                        <Link to={`/DetailsPage/${pro.id}`}>{pro.name}</Link>
                                    </h3>
                                    </Link>
                                    <p style={{margin:"5px 0px 10px 0px",fontSize:"15px",color:"#2B2A2A",display:"flex",flexDirection:"row",alignItems:"center"}}>
                                        <p style={{color:"black"}}>Giá: {pro.price}<sup style={{color:"black"}}>đ</sup></p>
                                        <p style={{marginLeft:"6%",textDecoration: "line-through",color:"#920907"}}>{pro.price * pro.rate}</p>
                                    </p>    
                                </div>
                                {/* <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px"}}>
                                <button style={{width:"50%",marginRight:"2%",fontSize:"10px"}} class="btn btn-primary" type="button" >See Details</button>
                                <button  style={{width:"50%",marginLeft:"2%",fontSize:"10px"}} class="btn btn-outline-warning" type="button" >Add To Cart</button> 
                                </div> */}
                             
                            </li>
                           
                    ))}        
                    </ul>
                    <Pagination
  data={listProduct}
  perPage={5}
  currentPage={currentPage}
  totalPages={listProduct.length / 5}
  onPageChange={handleChangePage}
  breakLabel="..."
  nextLabel="next >"
  previousLabel="< previous"
  renderOnZeroPageCount={null}
/>
                </div>
            </div>
      
        </main>
        
        <div style={{marginTop:"40px"}}></div>
        <Footer />
        </>
        
    )
}