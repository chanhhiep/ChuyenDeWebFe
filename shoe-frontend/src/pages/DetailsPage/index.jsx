
import "./details.css"
import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
import React, { useEffect, useState } from "react";
//import { FaShoppingCart,FaHeart } from 'react-icons/fa';
import { Navigate} from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { toastError, toastSuccess } from '../../services/ToastService';
import { API_ENDPOINT } from "../../constants";
import { ButtonGroup,ToggleButton } from "react-bootstrap";
import axios from "axios";
export default function DetailsPage(props) {
    const { id } = useParams();
   // const [product,setProduct] = useState([]);
    
    const [productId,setProductId] = useState("");
    const [listSizes,setListSizes] = useState([]);
     const [ProductName,setProductName] = useState("");
     const [ProductCategoryId,setProductCategoryId] = useState("");
     const [ProductPrice,setProductPrice] = useState("");
    // const [ProductImage, setProductImage] = useState(null);
     const [ProductRate, setProductRate] = useState("");
     const [ProductDescription, setProductDescription] = useState("");
     const [ProductBrand, setProductBrand] = useState("");
    // const [ProductSize, setProductSize] = useState([]);
     const [ProductQuantity, setProductQuantity] = useState("");
     const [ProductReview, setProductReview] = useState([]);
     //
    const [userId,setUserId] = useState("");
    const [quantity,setQuantity] = useState(1);
    //user
    //list cart
    const [listCart,setListCart] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem('token');
    //size
   
    //console.log(user);
    useEffect(() => {
        //window.scrollTo(0, 0);
        const fetchData = (async () => {
            await axios.get(`${API_ENDPOINT}/admin/product/showProduct/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
                .then((res)=>{
            const {data} = res;
            setProductQuantity(data.quantity);
            setProductId(data.id);
            setProductName(data.name);
            setProductCategoryId(data.category.id_category);
            setProductPrice(data.price);
            setProductRate(data.discountRate);
            setProductDescription(data.description);
            setProductBrand(data.brand.id);
            setProductQuantity(data.quantity);
            setProductReview(data.listReview)
            });
            await axios.get(`${API_ENDPOINT}/api/size/getAll`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {       
                const { data } = res;
                console.log(data);
                setListSizes(data);
            });
            await axios.get(`${API_ENDPOINT}/api/cart/${user.id}`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                const { data } = res;
                let deserializedArray = [];
                Object.values(data).map((item) => deserializedArray.push(item))
                setListCart(deserializedArray);
            });
            return;
        });
        
        return () => {
            fetchData();
        };
    }, []);



    const [itemExist,setItemExist] = useState("");
    const [isExit,setIsExit] = useState(false);
    function checkCart(){
        listCart.map((item)=>{
            console.log(item.size);
            console.log(item.product.id);
            if(item.product.id == id && item.size == size){
                console.log()
                setItemExist(item.id);
                setIsExit(true);
            }
            else{
                setIsExit(false);
            }
            
        })
    }
    // add to wish list
    function addWishList(){
        const data = "";
        axios.post(`${API_ENDPOINT}/api/wishlist/add?productId=${id}&email=${user.email}`,data, { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res)=>{  
                toastSuccess("add to wishlist successfully");
                console.log("success");             
        });
    }
     //details page
    function addToCart(){
        const cartExits = listCart.filter((item)=>{       
            if(item.product.id == id && item.size == size){              
                return true;   
            }
            else{
                
                return false;  
            }        
        });
        console.log(cartExits)
        console.log(cartExits[0].id)
        if(cartExits.length === 0){
            const data = {quantity:quantity,size:size}
            axios.post(`${API_ENDPOINT}/api/add/product?id=${id}&email=${user.email}`, data, { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res)=>{  
                toastSuccess("add to cart successfully");
                console.log("success");
            });
        }
        else{
        const data = {id:cartExits[0].id,quantity:quantity}
        axios.put(`${API_ENDPOINT}/api/cart/update`, data, { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res)=>{  
                toastSuccess("add update to cart successfully");
                console.log("success");             
        });
        }

    }
    const [comment,setComment] = useState("");
    const [star,setStar] = useState("");
    function handleComment(){
        if(comment===""){
            toastError("vui lòng không để trống phần bình luận");
        }
        const data = {
            cmt:comment,
            idPro:id,
            idUser:user.id,
            star:"1"
        }
        axios.post(`${API_ENDPOINT}/api/comment/create`,data, { headers: {"Authorization" : `Bearer ${token}`} })
                .then((res)=>{
                const {data} = res;
                window.location.reload();
                toastSuccess("Bình Luận Thành Công");
        })
    }
    const [size,setSize] = useState("");
   
    //change quantity

    function handelChangeQuantityUp(){
        if(quantity >= ProductQuantity){
            return;
        }
        setQuantity(quantity+1);
    }
    function handelChangeQuantityDown(){
        if(quantity<=1){
            return;
        }
        setQuantity(quantity-1);
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
                <img className=" lazyloaded" width="500" height="500" src=""/>
            </div>

            <div className="infosp">
                <div className="ten">{ProductName}</div>
                <div className="clear"></div>
                <div id="setPrice" style={{color:"#2B2A2A",display:"flex",flexDirection:"row",alignItems:"center",margin:"10px 0px"}}>
                    <p style={{color:"#2B2A2A",fontSize:"24px"}}>Giá: </p>
                    <p style={{marginLeft:"2%",color:"#2B2A2A",fontSize:"24px"}} >{ProductPrice}<sup style={{fontSize:"medium"}}>đ</sup></p>
                    <p style={{marginLeft:"2%",fontSize:"24px",textDecoration: "line-through",color:"#920907"}}>{ProductPrice * ProductRate}<sup style={{fontSize:"medium"}}>đ</sup></p>
                </div>
                <div className="clear"></div>
                <div className="khuyenmai">
                    <ul>
                        <li style={{listStyle:"none"}}><strong>Trạng thái :</strong> Còn hàng</li>
                        <li style={{listStyle:"none"}}><strong>Tình trạng :</strong> Hàng mới 100%</li>
                    </ul>
                </div>

                <div className="choosesize ">
                    <p>Chọn size: </p>
                    {/* <ul className="ulsize">     
                    {listSizes.map((s,index)=>(
                        <li key={index}>
                        <input value={s.size_Id} name="sizes" checked = {size == s.size_Id} onChange={(e)=>setSize(e.target.value)} type="radio" style={{fontSize: "12px"}} />{s.size_num}
                        </li>    
                    ))}
                    </ul>  */}
                    <ButtonGroup className="mb-2">
        {listSizes.map((s,index) => (
          <ToggleButton
            key={index}
            id={`radio-${index}`}
            type="radio"
            variant="outline-secondary"
            name="radio"
            value={s.size_Id}
            name="sizes"
            checked = {size == s.size_Id}
            onChange={(e)=>setSize(e.target.value)}
            style={{marginLeft:"10px",borderRadius:"5px"}}
            
          >
            {s.size_num}
          </ToggleButton>
        ))}
      </ButtonGroup>
                </div>
                
                    <div className="soluongsp">
                        
                        <div className="upqty"  onClick={()=>handelChangeQuantityUp()}>+</div>
                            <input id="qty" name="quantity" onChange={(e)=>{setQuantity(e.target.value)}} type="number" className="soluong" value={quantity} min={1}
                               max={100} style={{marginRight:"10px",marginLeft:"10px"}}/>
                        <div className="downqty" min="1" onClick={()=>handelChangeQuantityDown()}>–</div>
                    </div>

                    <div className="clear"></div>
                    <div className="group-btn">
                    <input className="buynow" value="Mua ngay"/>
                    <button onClick={()=>addToCart()} className="intocart">Thêm vào giỏ</button>
                    <button onClick={()=>addWishList()} className="wishlist">Danh sách yêu thích</button>
                    </div>
            </div>          
        </div>
        <div className="clear"></div>
        <div className="expan">
        <div style={{width:"100%",height:"1px",background:"rgb(197 197 197)"}}></div>

        <h2  style={{fontSize:"24px", marginTop:"40px"}}>Description</h2>

        <div className="card" >
                      
                      <div id="accordionIcon-2" >
                        <div class="accordion-body">
                          {ProductDescription}
                        </div>
                      </div>
       </div>


        <div className="clear" style={{width:"100%",height:"1px",background:"rgb(197 197 197)",marginTop:"30px"}}></div>
                    <h2 style={{fontSize:"24px", marginTop:"20px"}}>Review</h2>
                    <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Bình Luận Tại Đây"
                          onChange={(e)=>setComment(e.target.value)}
                        />
                        <button className="btn btn-outline-primary" type="button" onClick={()=>handleComment()} id="button-addon2">Comment</button>
                      </div>

                    <div >
                     
                      <div className="demo-inline-spacing mt-3">
                        <div className="list-group">
                        {ProductReview.map((comment)=>(
 
                          <div
                            className="list-group-item list-group-item-action flex-column align-items-start"
                          >
                            <div className="d-flex justify-content-between w-100">
                              <h6>{comment.account.email}</h6>
                              {/* <small>3 days ago</small> */}
                            </div>
                            <small>{comment.cmt}</small>
                          </div>
                       ))}
                        </div>
                      </div>
                    </div>
                 </div>
         <div className="clear"></div>
         <div className="clear"></div>
          </div>
        </>
    )
}