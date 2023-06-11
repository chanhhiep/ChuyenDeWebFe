import "./cart.css"
import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
import { FaEdit,FaTrashAlt,FaArrowLeft } from 'react-icons/fa';
import { Link, history } from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import { toastError, toastSuccess } from '../../services/ToastService';
import { API_ENDPOINT } from "../../constants";
import {useNavigate} from 'react-router-dom';
import { Table, Button, Form, Input,Modal } from "react-bootstrap";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import axios from "axios";
export default function HomePage(){

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const accesstoken = localStorage.getItem('token');
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
    const [shippingNote,setShippingNote] =useState("");
    const [shippingPaymentName,setShippingPaymentName] = useState("");
    

    useEffect(() => {
        const refetch = (async () => {
            await axios.get(`${API_ENDPOINT}/api/cart/${user.id}`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then(res => {
                const { data } = res;
                let deserializedArray = [];
                Object.values(data).map((item) => deserializedArray.push(item))
                setListCart(deserializedArray);
            });
            await axios.get(`${API_ENDPOINT}/admin/payment`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then((res) => {
            const { data } = res;
            setListPayment(data);
            console.log(listPayment);
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
                toastSuccess("Delete successfully");
                console.log("success");
                window.location.reload();
        })
    }
    const [chosenItem, setChosenItem] = useState([]);

    function onChangeCartItems(e) {
        var checked = e.target.checked;
        var value = e.target.value;

        if (checked) {
            setChosenItem([
                ...chosenItem,
                listCart[value]
            ]);
        } else {
            setChosenItem(
                chosenItem.filter((item) => item !== listCart[value])
            );
        }
    }

    console.log("chosen ", chosenItem);

    var totalPrice = 0;
    if (chosenItem && chosenItem.length > 0) {
        chosenItem.map((item) => totalPrice += item.quantity*item.product.price);
    }

    var fee = totalPrice * 0.1;
    var total = totalPrice + fee;
    const getPriceItem=(price,quantity)=>{
        return price*quantity;
    }
    const navigate = useNavigate();
    function returnBack(){
        navigate(-1);
    }
    const [orderId,setOrderId] = useState("");
    function checkout(){
        const data = {idPayment:paymentId
            ,note:shippingNote
            ,state:"CONFIRM"
            ,email:shippingEmail
            ,name:shippingName
            ,phone:shippingPhone
            ,address:shippingAddress
            ,ward:shippingWard
            ,district:shippingDistrict
            ,province:shippingProvince
            ,totalOrder:total
        }
        axios.post(`${API_ENDPOINT}/api/order/create?email=${user.email}`,data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
                .then((res) => {
            // if (res.data === true) {
            //     setOrder(res);
            //     toastSuccess(res);
            //     console.log("success");
            // } else {
            //     console.log("fails")
            //     toastError("add failed");
            // }
            const { data } = res;
           // setOrderId(data.id)
            console.log(data.id);
            chosenItem.map((item)=>{
                const dataDetails = {
                    product:item.product.id,
                    quantity:item.quantity,
                    total:item.quantity*item.product.price,
                    note:shippingNote,
                    size:item.size
                }
                axios.post(`${API_ENDPOINT}/api/checkout/${data.id}`,dataDetails, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
                .then((res) => {
                    if(res.status===200){
                        toastSuccess("đặt hàng thành công");
                    }
                    else{
                        toastError("da hang that bai")
                    }
            })
            
    })



        })
        
}
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
        <Header />
        <div style={{margin:"20px 0px 0px 20px",cursor:"pointer"}}>
           <div onClick={()=>returnBack()}> <FaArrowLeft/> Quay lại trang trước</div>
        </div>
     <div className="container" style={{display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    margin: "0px"
}}>
     <div>
     <h4>Giỏ Hàng</h4>
      <Table bordered striped hover>
        <thead>
          <tr>
            <th></th>
            <th>Images</th>
            <th>Product</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {listCart.map((item,index) => (
            <tr key={index}>
              <td><input type="checkbox"  value={index} id={`${index}`} onChange={onChangeCartItems}/></td>
              <td>{item.product.name}</td>
              <td>{item.product.name}</td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>{getPriceItem(item.product.price,item.quantity)}</td>
              <td><FaTrashAlt color="red" onClick={()=>deleteCart(item.id)}/></td>
            </tr>
          ))}
          <tr>
          <td colSpan={6}>Fee</td>
          <td>{fee}</td>
          </tr>
          <tr>
          <td colSpan={6}>Total Value</td>
          <td>{total}</td>
          </tr>
        </tbody>
      </Table>
      
    </div>
     {/* <table className="table">
                                             <thead>
                                                 <tr>
                                                 <th>Payment Method ID</th>
                                                 <th>Payment Method Name</th>
                                                <th>Description</th>
                                                <th>Actions</th>
                                                 </tr>
                                             </thead>
                                             <tbody className="table-border-bottom-0" >

           <tr>
           <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>ss</strong></td>
           <td>name</td>

           <td>
           des
           </td>
           <td>
                 <a style={{marginLeft:"5px"}} >
                     <FaEdit color="green" size="20px"/>
                 </a>
                 <a style={{marginLeft:"15px"}} >
                     <FaTrashAlt color="red" size="20px"/>
                 </a>

           </td>
           </tr>

                                             </tbody>
                                         </table> */}
            {/* <div className="sidebar">
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

            </div> */}
            <div className="content">
                <h4>Thông tin giao hàng</h4>
                <div className="fieldset">
                        <div className="field one">
                            <input type="tel" placeholder="Số điện thoại" onChange={(e)=>setShippingPhone(e.target.value)} autocapitalize="off" spellcheck="false"
                                   maxlength="10" minlength="10" name="sDienthoai" required=""/>
                        </div>
                        <div className="field three">
                            <input type="email" placeholder="Email" autocapitalize="off" spellcheck="false"  onChange={(e)=>setShippingEmail(e.target.value)}
                                   name="sEmail"/>
                        </div>
                        <div className="field">
                            <input placeholder="Họ và tên" autocapitalize="off" spellcheck="false" size="30" type="text"  onChange={(e)=>setShippingName(e.target.value)}
                                   name="sTen" />
                        </div>
                        <div className="field">
                            <input type="text" placeholder="Địa chỉ" autocapitalize="off" spellcheck="false"  onChange={(e)=>setShippingAddress(e.target.value)}
                                   name="sDiachi"
                                   />
                        </div>
                        <div className="field divarea ">
                            {/* <select  onChange={(e)=>setShippingProvince(e.target.value)} className="form-select form-select-sm mb-3" id="city" aria-label=".form-select-sm">
                                <option value="" selected>Chọn tỉnh thành</option>
                            </select> */}
                            <input type="text" placeholder="Chọn Tỉnh Thành" autocapitalize="off" spellcheck="false"  onChange={(e)=>setShippingProvince(e.target.value)}
                                   name="sDiachi"
                                  />
                        </div>
                        <div className="field divarea ">
                            {/* <select onChange={(e)=>setShippingDistrict(e.target.value)} className="form-select form-select-sm mb-3" id="district" aria-label=".form-select-sm">
                                <option value="" selected>Chọn quận huyện</option>
                            </select> */}
                            <input type="text" placeholder="Chọn quận huyện" autocapitalize="off" spellcheck="false"  onChange={(e)=>setShippingDistrict(e.target.value)}
                                   name="sDiachi"
                                   />
                        </div>
                        <div className="field divarea ">
                            {/* <select onChange={(e)=>setShippingDistrict(e.target.value)} className="form-select form-select-sm" id="ward" aria-label=".form-select-sm">  onChange={(e)=>setShippingWard(e.target.value)}
                                <option value="" selected>Chọn phường xã</option>
                            </select> */}
                             <input type="text" placeholder="Chọn quận huyện" autocapitalize="off" spellcheck="false"  onChange={(e)=>setShippingWard(e.target.value)}
                                   name="sDiachi"
                                   />
                        </div>
                        <div className="field">
                            <textarea name="sNoidung" rows="5" onChange={(e)=>setShippingNote(e.target.value)}  placeholder="Nhập ghi chú (nếu có)"></textarea>
                        </div>
                        <div className="field">
                            <div className="chonphuongthuc">
                               <div className="mb-3">
                                                <label className="form-label">phuong thuc thanh toan</label>
                                                <select value ={paymentId} onChange={(e)=>setPaymentId(e.target.value)} className="form-select" name="category_id" id="edit_category" required="required">
                                                {listPayment.map((payment)=>(
                                                        <option value={payment.id} onChange={(e)=>setPaymentId(e.target.value)}>{payment.name}</option>
                                                 ))}
                                                </select>
                                </div>
                                {/* <label className="form-label">phuong thuc van chuyen</label>

                                <select value ={shippingId} onChange={(e)=>setShippingId(e.target.value)} className="form-select" name="category_id" id="edit_category" required="required">
                                                {listShipping.map((ship)=>(

                                                        <option value={ship.id}>{ship.name}</option>

                                ))}
                                </select> */}
                            </div>
                            {/* <div id="divmethod" className="divmethod" style={{overflow: "hidden", display: "none"}}>
                                <strong>Ngân hàng Vietcombank (Ngân hàng ngoại thương Việt Nam)</strong>
                                <br/>
                                - Số tài khoản: 164654111300
                                <br/>
                                - Chủ tài khoản: Nguyễn Chánh Hiệp
                                <br/>
                                - Chi nhánh: Linh Trung - Thủ Đức
                            </div> */}
                        </div>
                        <div className="field">
                            <Button variant="outline-primary" onClick={handleShow} style={{width:"100%"}}>Hoàn thành đặt hàng</Button>
                                {/* <input type="submit" name="BtnSubmit" value="Hoàn thành đặt hàng"/> */}
                        </div>
                    <div className="clear"></div>
                    <div className="foot">
                        {/* <Link> Quay lại trang trước</Link> */}
                    </div>
                    <input type="hidden" id="sThanhvien" value="0"/>
                </div>
            </div>

    </div>
    <div id="loading-ico"></div>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác Nhận Đơn Hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table bordered striped>
      <thead>
        <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
        </tr>
      </thead>
      <tbody>        
        {chosenItem.map((item,index)=>(
        <>
        <tr key={index}>
          <td>{item.product.name}</td>
          <td>{item.size}</td>
          <td>{item.quantity}</td>
          <td>{getPriceItem(item.product.price,item.quantity)}</td>
          <td></td>
        </tr>
        </>
        ))}
        <tr>
         <td colSpan={4}>Phí</td>
         <td colSpan={1}>{fee}</td>
         </tr>

         <tr>
         <td colSpan={4}>Tổng Tiền</td>
         <td colSpan={1}>{total}</td>
         </tr>
         
         <tr>
         <td colSpan={1}>Họ Và Tên</td>
         <td colSpan={4}>{shippingName}</td>
         </tr>

         <tr>
         <td colSpan={1}>Email</td>
         <td colSpan={4}>{shippingEmail}</td>
         </tr>

         <tr>
         <td colSpan={1}>Số Điện Thoại</td>
         <td colSpan={4}>{shippingPhone}</td>
         </tr>

         <tr>
         <td colSpan={1}>Địa Chỉ Giao Hàng</td>
         <td colSpan={4}>{shippingAddress},{shippingWard},{shippingDistrict},{shippingProvince}</td>
         </tr>

         <tr>
         <td colSpan={1}>Ghi Chú</td>
         <td colSpan={4}>{shippingNote}</td>
         </tr>

         <tr>
         <td colSpan={1}>Phương Thức Thanh Toán</td>
         <td colSpan={4}>{shippingPaymentName}</td>
         </tr>
      </tbody>
    </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={()=>checkout()}>Xác Nhận Đơn Hàng</Button>
        </Modal.Footer>
      </Modal>
    {/* <Footer /> */}
    </>
    )

}