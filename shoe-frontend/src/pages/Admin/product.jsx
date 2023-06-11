import React, { useEffect, useRef, useState } from "react";
//import { FaEllipsisVertical } from "@react-icons/all-files/fa/FaEllipsisVertical";
import { Table, Button, Form, Input,Modal } from "react-bootstrap";
import { FaEdit,FaTrashAlt } from 'react-icons/fa';
//import { useDispatch } from 'react-redux';
import "./page.css";
import "./core.css"
import "./theme-default.css"
//import "./hidden.css"
//import { ToastContainer, toast } from 'react-toastify';
import AdminHeader from "../../parts/AdminHeader";
import AdminLeftMenu from "../../parts/AdminLeftMenu";
import { AdminApi,getProductList,deleteProduct,updateProduct,showProduct,saveProduct,getCategoryList,getBrandList,getSizeList,searchProduct } from '../../api/admin-api';
import { API_ENDPOINT } from '../../constants';
import { toastError, toastSuccess } from '../../services/ToastService';
import axios from "axios";
export default function Product() {
    const [loading, setLoading] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [listBrand ,setListBrand] = useState([]);
    const [listCategory,setListCategory] = useState([]);
    const [listSize,setListSize] = useState([]);
    const [product, setProduct] = useState({
        id:""
        ,category:{}
        ,name:""
        ,price:""
        ,discountRate:""
        ,images:""
        ,description:""
        ,brand:{}
        ,size:[]
        ,quantity:""
        ,createDate:""
        ,updtaeDate:""
    });
    // const dispatch = useDispatch();

    //save state
    const [saveName,setSaveName] = useState("");
    const [saveCategoryId,setSaveCategoryId] = useState("");
    const [savePrice,setSavePrice] = useState("");
    const [saveImage, setSaveImage] = useState(null);
    const [saveRate, setSaveRate] = useState("");
    const [saveDescription, setSaveDescription] = useState("");
    const [saveBrand, setSaveBrand] = useState("");
    const [saveSize, setSaveSize] = useState([]);
    const [saveQuantity, setSaveQuantity] = useState("");

     //update state
     const [updateId,setUpdateId] = useState("");
     const [updateName,setUpdateName] = useState("");
     const [updateCategoryId,setUpdateCategoryId] = useState("");
     const [updatePrice,setUpdatePrice] = useState("");
    // const [updateImage, setUpdateImage] = useState(null);
     const [updateRate, setUpdateRate] = useState("");
     const [updateDescription, setUpdateDescription] = useState("");
     const [updateBrand, setUpdateBrand] = useState("");
    // const [updateSize, setUpdateSize] = useState([]);
     const [updateQuantity, setUpdateQuantity] = useState("");
    //
    const accesstoken = localStorage.getItem('token')
    const handleChangeSize = (event) => {
        const value = event.target.value;
        // Add the new value to the state variable.
        setSaveSize([...saveSize, value]);
      };
    const handleChangeImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSaveImage(event.target.files[0]);
        }
    }
  
    useEffect(() => {
        const refetch = (async () => {
            //const api = `${API_ENDPOINT}/api/product/category/{idCate}`
            await axios.get(`${API_ENDPOINT}/admin/product`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then((res) => {
                const { data } = res;
                console.log(data);
                let deserializedArray = [];
                Object.values(res.data).map((item) => deserializedArray.push(item))
                //setListProduct([...listProduct, res]);
                setListProduct(deserializedArray);
                console.log(listProduct);
            });
            await axios.get(`${API_ENDPOINT}/admin/category`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
                .then((res) => {
                const { data } = res;
                console.log(data);
                let deserializedArray = [];
                Object.values(res.data).map((item) => deserializedArray.push(item))
                //setListProduct([...listProduct, res]);*/
                setListCategory(deserializedArray);
                console.log(listCategory);
            });
            await axios.get(`${API_ENDPOINT}/admin/brand`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
                .then((res) => {
                const { data } = res;
                setListBrand(data);
                console.log(listBrand);
            });
            return;
        });
        //cleanup function
        return () => {
            refetch();
        };
    }, []);
 

    //show data
    function handleShowProduct(id){
        axios.get(`${API_ENDPOINT}/admin/product/showProduct/${id}`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
                .then((res)=>{
            const {data} = res;
            //setProduct(data);
            setUpdateQuantity(data.quantity);
            setUpdateId(data.id);
            setUpdateName(data.name);
            setUpdateCategoryId(data.category.id_category);
            setUpdatePrice(data.price);
            setUpdateRate(data.discountRate);
            setUpdateDescription(data.description);
            setUpdateBrand(data.brand.id);
            setUpdateQuantity(data.quantity);
            setLgUpdateShow(true);
        })
   
    }
    function handleDeleteProduct(id) {
        axios.delete(`${API_ENDPOINT}/admin/product/deleteProduct/${id}`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
                .then((res) => {
            if (res.data === true) {
                toastSuccess("Delete successfully");
                window.location = '/AdminProduct';
            } else {
                console.log("fails")
                toastError("Delete item failed");
            }
        })
    }
    function handleUpdateProduct() {   
        if (updateName === "") {
            toastError("Tên Product Không Được Để Trống");
            return;
        }
        if (updateCategoryId === "") {
            toastError("Tên Category Không Được Để Trống");
            return;
        }
        if (updatePrice === "") {
            toastError("Giá Không Được Để Trống");
            return;
        }
        if (updateRate === "") {
            toastError("Tỷ Lệ Giảm Giá Không Được Để Trống");
            return;
        }
        if (updateDescription === "") {
            toastError("Mô Tả Không Được Để Trống");
            return;
        }
        if (updateQuantity === "") {
            toastError("Số Lượng Không Được Để Trống");
            return;
        }
        if (updateBrand === "") {
            toastError("Thương Hiệu Không Được Để Trống");
            return;
        }

        const data ={
            id: updateId,
            name: updateName,
            category_id: updateCategoryId,
            price: updatePrice,
            discountRate: updateRate,
            brand: updateBrand,
            description: updateDescription,
            quantity: updateQuantity,
            sizes:[]
        }
        axios.put(`${API_ENDPOINT}/admin/product/updateProduct`, data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
        .then((res)=>{
                toastSuccess("Update successfully");
                //removeItem();
                console.log("success");
        })
    }
    function handleSaveProduct () {
        if (saveName === "") {
            toastError("Tên Product Không Được Để Trống");
            return;
        }
        if (saveCategoryId === "") {
            toastError("Tên Category Không Được Để Trống");
            return;
        }
        if (savePrice === "") {
            toastError("Giá Không Được Để Trống");
            return;
        }
        if (saveRate === "") {
            toastError("Tỷ Lệ Giảm Giá Không Được Để Trống");
            return;
        }
        if (saveDescription === "") {
            toastError("Mô Tả Không Được Để Trống");
            return;
        }
        if (saveQuantity === "") {
            toastError("Số Lượng Không Được Để Trống");
            return;
        }
        if (saveBrand === "") {
            toastError("Thương Hiệu Không Được Để Trống");
            return;
        }
        if (saveImage === null) {
            toastError("Hãy Thêm Ít Nhất Một Hình Ảnh");
            return;
        }
       
        const formData = new FormData();
        const data ={
            name: saveName,
            category_id: saveCategoryId,
            price: savePrice,
            discountRate: saveRate,
            description: saveDescription,
            quantity: saveQuantity,
            brand: saveBrand
        }
        formData.append("product", JSON.stringify(data));
        formData.append("images",saveImage)
        axios.post(`${API_ENDPOINT}/admin/product/saveProduct`, formData, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
        .then((res)=>{  
                toastSuccess("Save successfully");
                //removeItem();
                window.location.href = "/";
                console.log("success");
                window.location = '/AdminProduct';

        })
       
       /*
        const uploadImage = async e => {
            const files = e.target.files
            const data = new FormData()
            data.append('file', files[0])
            data.append('upload_preset', 'darwin')
            setLoading(true)
            const res = await fetch(
              '	https://api.cloudinary.com/v1_1/dihifeicm/image/upload',
              {
                method: 'POST',
                body: data
              }
            )
            const file = await res.json()
            setImage(file.secure_url)
            setLoading(false)
          }
          */
        
    }
    const[keyword,setKeyWord] = useState("");
    function handleSearch() {
        if(keyword === ""){
            axios.get(`${API_ENDPOINT}/admin/product`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
                .then((res) => {
                const { data } = res;
                setListProduct(data);
                console.log(listProduct);
            });
        }
        else{
            const data ={
                keywords : keyword
            }
            axios.post(`${API_ENDPOINT}/admin/product/search`,data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
                .then((res)=>{
                const {data} = res;
                setListProduct(data);
            })
        }
    }
    //togole
    const [lgShow, setLgShow] = useState(false);
    const [lgUpdateShow, setLgUpdateShow] = useState(false);
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <AdminLeftMenu />
                    <div className="layout-page">
                        <AdminHeader />
                        <div className="content-wrapper" >

                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="card">
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems:"center" , padding: "10px"}} >
                                        <div className="col-md-3">
                                                <input className="form-control" type="text" placeholder="search here" name="keyword" id="searchTerm" onChange={(e)=>setKeyWord(e.target.value)} onKeyUp={(e)=>handleSearch()} />
                                        </div>
                                        {/* <button id="addBtn" type="button" className="btn btn-primary" onClick={(e)=>clickCreateToggle()}>
                                            Create
                                        </button> */}
                                        <Button onClick={() => setLgShow(true)}>Create</Button>
                                        <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
           Create Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                                        <div className="card-body" style={{marginTop: "-3%"}}>
                                            <div className="mb-3">
                                                <label className="form-label">Name Product</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="product name"
                                                    required="required"
                                                    name="name"
                                                    onChange={(e)=>setSaveName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">category</label>
                                                <select onChange={(e)=>setSaveCategoryId(e.target.value)} name="category_id" className="form-select" required="required">
                                                    {listCategory.map((cate)=>(
                                                        <option value={cate.id_category}>{cate.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Upload Image</label>
                                                <input name="images" className="form-control" onChange={(e)=>handleChangeImage(e)} type="file" id="formFileMultiple" multiple />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Price</label>
                                                <input
                                                    type="number"
                                                    min="0" max="10000000"
                                                    className="form-control"
                                                    placeholder="price"
                                                    required="required"
                                                    name="price"
                                                    onChange={(e)=>setSavePrice(e.target.value)}
                                                />
                                            </div>
                                           
                                            <div className="mb-3">
                                                <label className="form-label">brand</label>
                                                <select onChange={(e)=>setSaveBrand(e.target.value)} name="brand" className="form-select" required="required">
                                                    {listBrand.map((b)=>(
                                                        <option value={b.id} >{b.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">quantity</label>
                                                <input
                                                    type="number" min="0" max="100000"
                                                    className="form-control"
                                                    placeholder="quantity"
                                                    required="required"
                                                    name="quantity"
                                                    onChange={(e)=>setSaveQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Discount Rate</label>
                                                <input
                                                    type="number" min="0" max="100"
                                                    className="form-control"
                                                    placeholder="Discount Rate"
                                                    required="required"
                                                    name="discountRate"
                                                    onChange={(e)=>setSaveRate(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">description</label>
                                                <textarea onChange={(e)=>setSaveDescription(e.target.value)} name="description" className="form-control" rows="3" required="required"></textarea>
                                            </div>
                                            <div className="row mt-3"style={{width:"100%"}}  >
                                                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}} >
                                                    <button className="btn btn-primary " style={{width:"60%",height:"100%"}} type="button" onClick={()=>handleSaveProduct()} >Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </Modal.Body>
      </Modal>
                                    </div>
                                    <div className="table-responsive text-nowrap">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Product Id</th>
                                                    <th>Product Name</th>
                                                    <th>Image</th>
                                                    <th>brand</th>
                                                    <th>price</th>
                                                    <th>category</th>
                                                    <th>quantity</th>
                                                    <th>Discount Rate</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0" >
                                            {listProduct.map((pro) => (
          <tr>
          <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{pro.id}</strong></td>
          <td>{pro.name}</td>
          <td>
              <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                  <li
                      data-bs-toggle="tooltip"
                      data-popup="tooltip-custom"
                      data-bs-placement="top"
                      className="avatar avatar-xs pull-up"
                      title="{product.name}"
                  >
                      <img src={API_ENDPOINT + product?.image}  className="rounded-square" />
                  </li>
              </ul>
          </td>
          <td>
              {pro.brand.name}
          </td>
          <td>
              {pro.price}
          </td>
          <td>{pro.category.name}</td>
          <td>{pro.quantity}</td>
          <td>
              {pro.discountRate}
          </td>
         {/* <td style={{display: "flex", flexDirection: "row"}}>
            {pro.sizes.map((s)=>(
                <p style={{fontSize: "12px"}}>{s.size_num}</p>
            ))}
          </td>

          <td><span className="badge bg-label-primary me-1">Stocking</span></td>
            */}
          <td>
                {/* <Button onClick={() => setLgShow(true)}>Large modal</Button> */}
                <a style={{marginLeft:"5px"}} onClick={()=>handleShowProduct(pro.id)}>
                    <FaEdit color="green" size="20px"/>  
                </a>
                <a style={{marginLeft:"15px"}} onClick={()=>handleDeleteProduct(pro.id)}>
                    <FaTrashAlt color="red" size="20px"/>
                </a>
          </td>
      </tr>
        ))}                                                                                                            
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>   

                            
                                <Modal
        size="lg"
        show={lgUpdateShow}
        onHide={() => setLgUpdateShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

                                        
                                        <div className="card-body" style={{marginTop: "-3%"}}>
                                            <div className="mb-3">
                                                <label className="form-label">Product Id</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value = {updateId}
                                                    onChange={(e)=>setUpdateId(e.target.value)}
                                                    disabled
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Name Product</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="product name"
                                                    id="edit_name"
                                                    name="name"
                                                    value = {updateName}
                                                    required="required"
                                                    onChange={(e)=>setUpdateName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">category</label>
                                                <select value ={updateCategoryId} onChange={(e)=>setUpdateCategoryId(e.target.value)} className="form-select" name="category_id" id="edit_category" required="required">                                                    
                                                {listCategory.map((category)=>(
                                                        <option value={category.id_category}>{category.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Price</label>
                                                <input
                                                    type="number"
                                                    min="0" max="10000"
                                                    className="form-control"
                                                    placeholder="price"
                                                    id="edit_price"
                                                    name="price"
                                                    required="required"
                                                    value={updatePrice}
                                                    onChange={(e)=>setUpdatePrice(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Discount Rate</label>
                                                <input
                                                    type="number"
                                                    min="0" max="100"
                                                    className="form-control"
                                                    placeholder="Discount Rate"
                                                    required="required"
                                                    name="discountRate"
                                                    id="edit_rate"
                                                    value={updateRate}
                                                    onChange={(e)=>setUpdateRate(e.target.value)}
                                                />
                                            </div>
                                            
                                            <div className="mb-3">
                                                <label className="form-label">brand</label>
                                                <select value={updateBrand} onChange={(e)=>setUpdateBrand(e.target.value)} className="form-select" name="brand" id="edit_brand" required="required">
                                                    {listBrand.map((brand)=>(
                                                        <option value={brand.id}>{brand.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <label className="form-label">quantity</label>
                                                <input
                                                    type="number" min="0" max="100000"
                                                    className="form-control"
                                                    placeholder="quantity"
                                                    id="edit_quantity"
                                                    name="quantity"
                                                    value={updateQuantity}
                                                    required="required"
                                                    onChange={(e)=>setUpdateQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">description</label>
                                                <textarea value={updateDescription} onChange={(e)=>setUpdateDescription(e.target.value)} name="description" className="form-control" id="edit_description" rows="3" required="required"></textarea>
                                            </div>
                                            <div className="row mt-3"style={{width:"100%"}}  >
                                                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}} >
                                                    <button className="btn btn-primary " style={{width:"60%",height:"100%"}} type="button" onClick={()=>handleUpdateProduct()} >Save</button>
                                                </div>
                                            </div>
                                        </div>
 
        </Modal.Body>
      </Modal>

                        </div>

                    </div>

                </div>
            

            </div>
        </>
    );
}
