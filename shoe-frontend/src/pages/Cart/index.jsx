import "./cart.css"
import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
import { FaEdit,FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import { toastError, toastSuccess } from '../../services/ToastService';
import { API_ENDPOINT } from "../../constants";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
export default function HomePage(){
    const user = JSON.parse(localStorage.getItem("user"));
    const accesstoken = localStorage.getItem('accesstoken');
    const [listCart,setListCart] = useState([]);
    const [listPayment,setListPayment] =useState([]);
    const [listShipping,setListShipping] =useState([]);
    const [paymentId,setPaymentId] = useState("");
    const [shippingId,setShippingId] = useState("");
    const [shippingName,setShippingName] = useState("");
    const [shippingEmail,setShippingEmail] = useState("");
    const [shippingPhone,setShippingPhone] = useState("");
    const [shippingAddress,setShippingAddress] = useState("");
    const [shippingWard,setShippingWard] = useState("");
    const [shippingDistrict,setShippingDistrict] = useState("");
    const [shippingProvince,setShippingProvince] = useState("");
    const [order,setOrder] = useState([]);
   
    useEffect(() => {
        const refetch = (async () => {
            await axios.get(`${API_ENDPOINT}/api/cart/${user.id}`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then(res => {       
                const { data } = res;
                console.log(data);
                setListCart(data);
            });
            await axios.get(`${API_ENDPOINT}/admin/payment`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then((res) => {
            const { data } = res;
            setListPayment(data);
            console.log(listPayment);
            });
            await axios.get(`${API_ENDPOINT}/admin/shipping`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then((res) => {
            const { data } = res;
            setListShipping(data);
            console.log(listShipping);
            });
        });
        //cleanup function
        return () => {
            refetch();
        };
    }, []);
    function deleteCart(id){
        axios.delete(`${API_ENDPOINT}/api/cart/remove/${id}`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
                .then((res) => {
            if (res.data === true) {
                toastSuccess("Delete successfully");
                console.log("success");
                window.location.reload();
            } else {
                console.log("fails")
                toastError("Delete item failed");
            }
        })
    }
    const [total,setTotal] = useState("");
    function getTotalCart() {
        let sum = 0;
        listCart.map((i) => sum += i.price);
        return sum ;
    }
    function checkout(){
        const data = {
            shipingDto:{sEmail:shippingEmail,sName:shippingName,sPhone:shippingPhone,sAddress:shippingAddress,xa:shippingWard,huyen:shippingDistrict,tinh:shippingProvince},
            idPayment:paymentId,
            idUser:user,
            note:""
        }

        axios.post(`${API_ENDPOINT}/api/order/create`,data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
                .then((res) => {
            if (res.data === true) {
                setOrder(res);
                toastSuccess("add");
                console.log("success");
            } else {
                console.log("fails")
                toastError("add failed");
            }
        })
        listCart.map((c)=>{
            const dataDetails = {
                order:order.id,
                product:c.product.id,
                quantity:c.quantity,
                price:c.product.price,
                total:getTotalCart(),
                note :""
            }
            axios.post(`${API_ENDPOINT}/api/checkout`,data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then((res) => {
        if (res.data === true) {
            setOrder(res.id);
            console.log("success");
        } else {
            console.log("fails")
        }
        })
        /*
        const dataDetails = {
            order:order.id,
            product:order.cart
            quantity:
            price;
            total;
            note;
        }
        axios.post(`${API_ENDPOINT}/api/checkout`,data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
        .then((res) => {
    if (res.data === true) {
        setOrder(res.id);
        toastSuccess("add");
        console.log("success");
    } else {
        console.log("fails")
        toastError("add failed");
    }*/
})

    }
    return(
        <>
        <Header />
     <div className="container">
        <form action="/checkout" method="get" name="Dtaform" id="form_load" className="">
            <div className="sidebar">
                <div className="order-toggle order-toggle-hide">
                    <div className="fl">
                        <span className="togglecart" id="hide-order">
                            <img src="/images/online-cart.svg"/> Hiển thị đơn hàng
                        </span>
                        <span className="togglecart" id="show-order">
                            <img src="/images/online-cart.svg"/> Ẩn đơn hàng
                        </span>
                    </div>
                    <div className="fr"><span id="totalmb">total value</span></div>
                </div>
                <h2 className="visually-hidden">Thông tin đơn hàng</h2>
                <div className="order">
                    <div className="divproduct">
                        <table>
                            <tbody>
                            {listCart.map((cart) => (
                                <tr className="product" id="product-0" style={{ display: "flex",flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                    <td className="image">
                                        <img src={cart.product.images}/>           
                                    </td>
                                    <td>{cart.quantity}</td>
                                    <td className="description">
                                        <h3>name</h3>
                                    </td>
                                    
                                    <td className="price">
                                       {cart.product.price}
                                    </td>
                                    <td>
                                    <button onclick={()=>deleteCart(cart.id)} ><FaTrashAlt color="red"/></button>
                                    </td>
                                </tr>
                             ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="cart-voucher">
                    <input type="text" name="sVoucher" placeholder="Nhập mã voucher (nếu có)" id="intVoucher"
                           rel="0"/>
                    <a onclick="ActiveVoucher();" className="on">Áp dụng</a>
                    <a onclick="DeActiveVoucher();" className="off">Hủy bỏ</a>
                </div>
                <div className="total promotion" id="promotion">
                    <div className="fl">Giảm giá</div>
                    <div className="fr">
                        <span id="textpromotion"></span>
                        <input type="hidden" id="numpromotion" value="0"/>
                    </div>
                </div>
                <div className="total">
                    <div className="fl">Tổng cộng</div>
                    <div className="fr"><span id="texttotal">{getTotalCart()}</span>
                        <input type="hidden" id="numtotal" value="total"/>đ
                    </div>
                </div>

            </div>
            <div className="content">

                <h4>Thông tin giao hàng</h4>
                <div className="fieldset">
                        <div className="field one">
                            <input type="tel" placeholder="Số điện thoại" onChange={(e)=>setShippingPhone(e.target.value)} autocapitalize="off" spellcheck="false"
                                   maxlength="10" minlength="10" name="sDienthoai" value="" required=""/>
                        </div>
                        <div className="field three">
                            <input type="email" placeholder="Email" autocapitalize="off" spellcheck="false"  onChange={(e)=>setShippingEmail(e.target.value)}
                                   name="sEmail" value=""/>
                        </div>
                        <div className="field">
                            <input placeholder="Họ và tên" autocapitalize="off" spellcheck="false" size="30" type="text"  onChange={(e)=>setShippingName(e.target.value)}
                                   name="sTen" value=""/>
                        </div>
                        <div className="field">
                            <input type="text" placeholder="Địa chỉ" autocapitalize="off" spellcheck="false"  onChange={(e)=>setShippingAddress(e.target.value)}
                                   name="sDiachi"
                                   value=""/>
                        </div>
                        <div className="field divarea ">
                            <select  onChange={(e)=>setShippingProvince(e.target.value)} className="form-select form-select-sm mb-3" id="city" aria-label=".form-select-sm"> 
                                <option value="" selected>Chọn tỉnh thành</option>
                            </select>
                        </div>
                        <div className="field divarea ">
                            <select onChange={(e)=>setShippingDistrict(e.target.value)} className="form-select form-select-sm mb-3" id="district" aria-label=".form-select-sm">  
                                <option value="" selected>Chọn quận huyện</option>
                            </select>
                        </div>
                        <div className="field divarea ">
                            <select onChange={(e)=>setShippingDistrict(e.target.value)} className="form-select form-select-sm" id="ward" aria-label=".form-select-sm">  onChange={(e)=>setShippingWard(e.target.value)}
                                <option value="" selected>Chọn phường xã</option>
                            </select>
                        </div>
                        <div className="field">
                            <textarea name="sNoidung" rows="5" placeholder="Nhập ghi chú (nếu có)"></textarea>
                        </div>
                        <div className="field">
                            <div className="chonphuongthuc">
                               <div className="mb-3">
                                                <label className="form-label">phuong thuc thanh toan</label>
                                                <select value ={paymentId} onChange={(e)=>setPaymentId(e.target.value)} className="form-select" name="category_id" id="edit_category" required="required">                                                    
                                                {listPayment.map((payment)=>(
                                                    
                                                        <option value={payment.id}>{payment.name}</option>
                                                       
                                                    ))}
                                                </select>
                                </div>
                                <label className="form-label">phuong thuc van chuyen</label>
                                            
                                <select value ={shippingId} onChange={(e)=>setShippingId(e.target.value)} className="form-select" name="category_id" id="edit_category" required="required">                                                    
                                                {listShipping.map((ship)=>(
                                                   
                                                        <option value={ship.id}>{ship.name}</option>
                                                       
                                ))}
                                </select>
                            </div>
                            <div id="divmethod" className="divmethod" style={{overflow: "hidden", display: "none"}}>
                                <strong>Ngân hàng Vietcombank (Ngân hàng ngoại thương Việt Nam)</strong>
                                <br/>
                                - Số tài khoản: 164654111300
                                <br/>
                                - Chủ tài khoản: Nguyễn Chánh Hiệp
                                <br/>
                                - Chi nhánh: Linh Trung - Thủ Đức
                            </div>
                        </div>
                        <div className="field">
                                <input type="submit" name="BtnSubmit" value="Hoàn thành đặt hàng"/>
                        </div>
                    <div className="clear"></div>
                    <div className="foot">
                        <a href="javascript:history.go(-1)"> Quay lại trang trước</a>
                    </div>
                    <input type="hidden" id="sThanhvien" value="0"/>
                </div>
            </div>
        </form>
    </div>
    <div id="loading-ico"></div>
    <Footer />
    </>
    )
    
}