import { Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import "./page.css";
import "./core.css"
import "./theme-default.css"
import "./hidden.css"
//import { ToastContainer, toast } from 'react-toastify';
import AdminHeader from "../../parts/AdminHeader";
import AdminLeftMenu from "../../parts/AdminLeftMenu";
import { AdminApi,getProductList,deleteProduct,updateProduct,showProduct,saveProduct } from '../../api/admin-api';
import { API_ENDPOINT } from '../../constants';
export default function Product() {
    const [loading, setLoading] = useState(false);
    const [listProduct, setListProduct] = useState([{
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
    }]);
    const [listBrand ,setListBrand] = useState([]);
    const [listCategory,setListCategory] = useState([]);
    const [listSize,setListSize] = useState([]);
    const [product, setProduct] = useState(null);
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
    const handleChangeSize = (event) => {
        const value = event.target.value;
        // Add the new value to the state variable.
        setSaveSize([...saveSize, value]);
      };
    const handleChangeImage = (event) => {
        setSaveImage(event.target.files[0]);
    }
    //getData
    // const productData = async () => {
    //     try {
    //       dispatch(setLoading(true));
    //       const { data } = await AdminApi.getListProduct();
    //       const { dataBrand } = await AdminApi.getListBrand();
    //       const { dataCategory } = await AdminApi.getListCategory();
    //       const { dataSize } = await AdminApi.getListSize();
    //       //const { data: dataCategory } = await AdminApi.getListProduct();
    //       setDataListProduct(data);
    //       setListBrand(dataBrand);
    //       setListCategory(dataCategory);
    //       setListSize(dataSize);
    //       //setDataListBookCategory(dataCategory);
    //     } catch (error) {
    //     } finally {
    //       dispatch(setLoading(false));
    //     }
    //   };
    //   useEffect(() => {
    //     productData();
    //   }, []);
    useEffect(() => {
        const refetch = (async () => {
            await getProductList().then((res) => {
                const { data } = res;
                setListProduct(data);
            });
            return;
        });
        //cleanup function
        return () => {
            refetch();
        };
    }, []);
    //show data
    const handleShowProduct = () =>{
        showProduct().then((res)=>{
            const {data} = res;
            setProduct(data);
        })
    //     fetch(`http://localhost:8080/admin/showproduct/${encodeURIComponent(data)}`)
    //     .then(res=>res.json())
    //     .then((response)=>{
    //         setProduct(response);
    //         clickEditToggle();
    //         console.log(response);
    //         window.location.href = "/";
    //     }).catch(error => {
    //         console.log("error")
    //   })
    }
    const handleDeleteProduct = (id)=> {
        deleteProduct(id).then((res) => {
            if (res.data === true) {
                //toastSuccess("Delete successfully");
                //removeItem();
                console.log("success");
            } else {
                console.log("fails")
                //toastError("Delete item failed");
            }
        })
    }
    const handleUpdateProduct = () => {
        const data ={
            id: updateId,
            name: updateName,
            category: updateCategoryId,
            price: updatePrice,
            rate: updateRate,
            brand: updateBrand,
            description: updateDescription,
            quantity: updateQuantity
        }
        updateProduct(data).then((res)=>{
            if (res.data === true) {
                //toastSuccess("Delete successfully");
                //removeItem();
                console.log("success");
            } else {
                console.log("fails")
                //toastError("Delete item failed");
            }
        })
    }
    const handleSaveProduct = () =>{
        const data ={
            name: saveName,
            category: saveCategoryId,
            price: savePrice,
            rate: saveRate,
            images: saveImage,
            brand: saveBrand,
            size: saveSize,
            description: saveDescription,
            quantity: saveQuantity
        }
        saveProduct(data).then((res)=>{
            if (res.data === true) {
                //toastSuccess("Delete successfully");
                //removeItem();
                console.log("success");
            } else {
                console.log("fails")
                //toastError("Delete item failed");
            }
        })
    }
    // const handleDeleteProduct = (e) => {
    //     e.preventDefault()
    //     fetch(`http://localhost:8080/user/resetAccount/${encodeURIComponent(e)}`,{
    //   method:"POST",
    //   headers:{"Content-Type":"application/json"}}).then(()=>{
    //   console.log("email is sended");
    //   window.location.href = "/AdminProduct";
    // }).catch(error=>{
    //     console.log("error")
    //  })
    // }
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    //     const fetchData = (async () => {
    //         await getHotelDetails(id).then((res) => {
    //             const { data } = res;
    //             console.log(data);
    //             setHotel(data);
    //         }).catch((err) => {
    //             setIsError(true);
    //         });
    //         await getReservedDate(id).then((res) => {
    //             setReservedDate(res.data);
    //         });
    //         return;
    //     });
    //     return () => {
    //         fetchData();
    //     };
    // }, []);
    //togole
    function clickEditToggle(){
        var popup = document.getElementById("product_edit");
        popup.classList.toggle('active');
        var blur = document.getElementById("blur-action");
        blur.classList.toggle('active');
    }
    function clickCreateToggle(){
        var popup = document.getElementById("create-product");
            popup.classList.toggle('active');
        var blur = document.getElementById("blur-action");
            blur.classList.toggle('active');
    }
    
    return (
        <>
            <div class="layout-wrapper layout-content-navbar">
                <div class="layout-container">
                    <AdminLeftMenu />
                    <div class="layout-page">
                        <AdminHeader />
                        <div class="content-wrapper" >
{/*Content*/}
                            <div class="container-xxl flex-grow-1 container-p-y" id="blur-action">
                                <div class="card">
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems:"center" , padding: "10px"}} >
                                        <div class="col-md-3">
                                            <form id="searchForm" action="/product/search" style={{display: "flex",flexDirection: "row"}} method="post">
                                                <input class="form-control" type="text" name="keyword" id="searchTerm" />
                                                <button class="btn btn-primary btn" style={{marginLeft: "30px"}} onclick="search()">search</button>
                                            </form>
                                        </div>
                                        <button id="addBtn" type="button" class="btn btn-primary" style={{marginRight: "20px"}} onclick="clickCreateToggle()">
                                            Create
                                        </button>
                                    </div>
                                    <div class="table-responsive text-nowrap">
                                        <table class="table">
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
                                                    <th>Size</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-border-bottom-0" >
                                            {listProduct.map((product) => (
          <tr>
          <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>{product.id}</strong></td>
          <td>{product.name}</td>
          <td>
              <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                  <li
                      data-bs-toggle="tooltip"
                      data-popup="tooltip-custom"
                      data-bs-placement="top"
                      class="avatar avatar-xs pull-up"
                      title="{product.name}"
                  >
                      <img src={API_ENDPOINT+product.images} alt="product" class="rounded-square" />
                  </li>
              </ul>
          </td>
          <td>
              {product.brand}
          </td>
          <td>
              {product.price}
          </td>
          <td>{product.category.name}</td>
          <td>{product.quantity}</td>
          <td>
              {product.discountRate}
          </td>
          <td style={{display: "flex", flexDirection: "row"}}>
                  <p style={{fontSize: "12px"}}>num size</p>
          </td>

          <td><span class="badge bg-label-primary me-1">Stocking</span></td>
          <td>
              <div class="dropdown">
                  <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                      <i class="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div class="dropdown-menu">
                      <a class="dropdown-item" id="edit_btn" onClick={handleShowProduct(product.id)} href="javascript:void(0);">
                          <i class="bx bx-edit-alt me-1"></i>
                          Edit
                      </a>
                      <a class="dropdown-item" onclick="handleDelete" href="javascript:void(0);"
                      ><i class="bx bx-trash me-1"></i> Delete</a
                      >
                  </div>
              </div>
          </td>
      </tr>
        ))}                                                                                                            
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>   

                             {/*update form*/}
   
                            <form id="updateForm" action="/product/updateProduct" method="post">
                                <div class="d-flex aligns-items-center justify-content-center card text-left w-50 position-absolute top-50 start-50 translate-middle-x" id="product_edit" style={{marginLeft: "100px",marginTop: "-15%"}} aria-hidden="true">
                                    <div class="card mb-4">
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems:"center"}} >
                                            <h5 class="card-header">Edit Product</h5>
                                            <button id="EditBtn" type="button" class="btn btn-danger" style={{marginRight: "20px"}} onclick="clickEditToggle()">Cancel</button>
                                        </div>
                                        <div class="card-body" style={{marginTop: "-3%"}}>
                                            <div class="mb-3">
                                                <label class="form-label">Product Id</label>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    id="edit_id"
                                                    name="id"
                                                    readonly
                                                    value={product.id}
                                                    onChange={(e)=>setUpdateId(e.target.value)}
                                                />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Name Product</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="product name"
                                                    id="edit_name"
                                                    name="name"
                                                    value={product.name}
                                                    required="required"
                                                    onchange={(e)=>setUpdateName(e.target.value)}
                                                />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">category</label>
                                                <select onChange={(e)=>setUpdateCategoryId(e.target.value)} class="form-select" name="category_id" id="edit_category" required="required">                                                    
                                                {listCategory.map((category)=>{
                                                        <option value={category.id_category}>category.name</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Price</label>
                                                <input
                                                    type="number"
                                                    min="0" max="10000"
                                                    class="form-control"
                                                    placeholder="price"
                                                    id="edit_price"
                                                    name="price"
                                                    required="required"
                                                    value={product.price}
                                                    onchange={(e)=>setUpdatePrice(e.target.value)}
                                                />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Discount Rate</label>
                                                <input
                                                    type="number"
                                                    min="0" max="100"
                                                    class="form-control"
                                                    placeholder="Discount Rate"
                                                    required="required"
                                                    name="discountRate"
                                                    id="edit_rate"
                                                    value={product.discountRate}
                                                    onChange={(e)=>setUpdateRate(e.target.value)}
                                                />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Size:</label>
                                                {listSize.map((size)=>{
                                                    <input  name="sizes" type="checkbox" value={size.id}/>
                                                })}                                                   
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">brand</label>
                                                <select onChange={(e)=>setUpdateBrand(e.target.value)} class="form-select" name="brand" id="edit_brand" required="required">
                                                    {listBrand.map((brand)=>{
                                                        <option value={brand.id}>{brand.name}</option>
                                                    })}
                                                </select>
                                            </div>
                                            
                                            <div class="mb-3">
                                                <label class="form-label">quantity</label>
                                                <input
                                                    type="number" min="0" max="100000"
                                                    class="form-control"
                                                    placeholder="quantity"
                                                    id="edit_quantity"
                                                    name="quantity"
                                                    value={product.quantity}
                                                    required="required"
                                                    onChange={(e)=>setUpdateQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">description</label>
                                                <textarea value={product.description} onChange={(e)=>setUpdateDescription(e.target.value)} name="description" class="form-control" id="edit_description" rows="3" required="required"></textarea>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="d-grid gap-2 col-lg-6 mx-auto">
                                                    <button class="btn btn-primary btn-lg" type="button" onClick={handleUpdateProduct()}>Save</button>
                                                </div>
                                                <div class="d-grid gap-2 col-lg-6 mx-auto">
                                                    <button class="btn btn-danger btn-lg" type="button" onClick={clickEditToggle()}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <form id="saveForm" action="/product/saveProduct" method="post" enctype="multipart/form-data">
                                <div class="d-flex aligns-items-center justify-content-center card text-left w-50 position-absolute top-50 start-50 translate-middle-x" id="create-product" style={{marginLeft: "100px", marginTop: "-15%"}} aria-hidden="true">
                                    <div class="card mb-4">
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems:"center"}}>
                                            <h5 class="card-header">Create Product</h5>
                                            <button id="CreateBtn" type="button" class="btn btn-danger" style={{marginRight: "20px"}} onclick={clickCreateToggle()}>Cancel</button>
                                        </div>
                                        <div class="card-body" style={{marginTop: "-3%"}}>
                                            <div class="mb-3">
                                                <label class="form-label">Name Product</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="product name"
                                                    required="required"
                                                    name="name"
                                                    onChange={(e)=>setSaveName(e.target.value)}
                                                />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">category</label>
                                                <select onChange={(e)=>setSaveCategoryId(e.target.value)} name="category_id" class="form-select" required="required">
                                                    {listCategory.map((category)=>{
                                                        <option value={category.id_category}>category.name</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Upload Image</label>
                                                <input name="images" class="form-control" onChange={handleChangeImage()} type="file" id="formFileMultiple" multiple />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Price</label>
                                                <input
                                                    type="number"
                                                    min="0" max="10000000"
                                                    class="form-control"
                                                    placeholder="price"
                                                    required="required"
                                                    name="price"
                                                    onChange={(e)=>setSavePrice(e.target.value)}
                                                />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Size:</label>
                                                {listSize.map((size)=>{
                                                    <input name="sizes[]" type="checkbox" value={size.id} onChange={handleChangeSize() }/>
                                                })}                                                   
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">brand</label>
                                                <select onChange={(e)=>setSaveBrand(e.target.value)} name="brand" class="form-select" required="required">
                                                    {listBrand.map((brand)=>{
                                                        <option value={brand.id}>{brand.name}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">quantity</label>
                                                <input
                                                    type="number" min="0" max="100000"
                                                    class="form-control"
                                                    placeholder="quantity"
                                                    required="required"
                                                    name="quantity"
                                                    onChange={(e)=>setSaveDescription(e.target.value)}
                                                />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Discount Rate</label>
                                                <input
                                                    type="number" min="0" max="100"
                                                    class="form-control"
                                                    placeholder="Discount Rate"
                                                    required="required"
                                                    name="discountRate"
                                                    onChange={(e)=>setSaveRate(e.target.value)}
                                                />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">description</label>
                                                <textarea onChange={(e)=>setSaveDescription(e.target.value)} name="description" class="form-control" rows="3" required="required"></textarea>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="d-grid gap-2 col-lg-6 mx-auto">
                                                    <button class="btn btn-primary btn-lg" value="Submit" type="submit" onClick={handleSaveProduct()} >Save</button>
                                                </div>
                                                <div class="d-grid gap-2 col-lg-6 mx-auto">
                                                    <button class="btn btn-danger btn-lg" type="button" onclick={clickCreateToggle()}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div class="content-backdrop fade"></div>
                        </div>

                    </div>

                </div>


                <div class="layout-overlay layout-menu-toggle"></div>
            </div>
        </>
    );
}
