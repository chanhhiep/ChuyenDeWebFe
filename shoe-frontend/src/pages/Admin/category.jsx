import { Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from "react";
//import { FaEllipsisVertical } from "@react-icons/all-files/fa/FaEllipsisVertical";
import { FaEdit,FaTrashAlt } from 'react-icons/fa';
//import { useDispatch } from 'react-redux';
import "./page.css";
import "./core.css"
import "./theme-default.css"
//import "./hidden.css"
//import { ToastContainer, toast } from 'react-toastify';
import AdminHeader from "../../parts/AdminHeader";
import AdminLeftMenu from "../../parts/AdminLeftMenu";
import { AdminApi,getCategoryList,deleteCategory,updateCategory,showCategory,saveCategory,getCategoryList,getBrandList,getSizeList,searchCategory } from '../../api/admin-api';
import { API_ENDPOINT } from '../../constants';
import { toastError, toastSuccess } from '../../services/ToastService';
export default function Category() {
    const [loading, setLoading] = useState(false);

    const [listCategory,setListCategory] = useState([]);
    const [listBrand ,setListBrand] = useState([]);
    //save state
    const [saveCategoryName,setsaveCategoryName] = useState("");
    const [saveImage, setSaveImage] = useState(null);
    const [saveBrand,setSaveCBrand] = useState("");
     //update state
     const [updateCategoryId,setUpdateCategoryId] = useState("");
     const [updateCategoryName,setUpdateCategoryName] = useState("");
     const [updateBrand, setUpdateBrand] = useState("");

    //
  
    const handleChangeImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSaveImage(event.target.files[0]);
        }
    }
   
    useEffect(() => {
        const refetch = (async () => {
            await getCategoryList().then((res) => {
                const { data } = res;
                setListCategory(data);
                console.log(listCategory);
            });
            await getBrandList().then((res) => {
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
    function handleShowCategory(id){
        //toastSuccess("Show successfully");
        
        showCategory(id).then((res)=>{
            const {data} = res;
            //setCategory(data);
            setUpdateCategoryId(data.id_category);
            setUpdateCategoryName(data.name);
            setUpdateBrand(data.parent_id);
            clickEditToggle();
        })

    function handleDeleteCategory(id) {
        deleteCategory(id).then((res) => {
            if (res.data === true) {
                toastSuccess("Delete successfully");
                console.log("success");
            } else {
                console.log("fails")
                toastError("Delete item failed");
            }
        })
    }
    function handleUpdateCategory() {   
        if (updateCategoryName === "") {
            toastError("Tên Category Không Được Để Trống");
            return;
        }
        if (updateCategoryId === "") {
            toastError("ID Category Không Được Để Trống");
            return;
        }
        if (updateBrand === "") {
            toastError("Thương Hiệu Không Được Để Trống");
            return;
        }

        const data ={
            id: updateCategoryId,
            name: updateCategoryName,
            brand: updateBrand,
        }
        updateCategory(data).then((res)=>{
                toastSuccess("Update successfully");
                //removeItem();
                console.log("success");
        })
    }
    function handleSaveCategory () {
        if (saveCategoryName === "") {
            toastError("Tên Category Không Được Để Trống");
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
            name: saveCategoryName,
            brand: saveBrand,
        }
        formData.append("category", JSON.stringify(data));
        formData.append("images",saveImage)
        saveCategory(formData).then((res)=>{  
                toastSuccess("Save successfully");
                //removeItem();
                console.log("success");
        })
    }
    const[keyword,setKeyWord] = useState("");
    function handleSearch() {
        if(keyword === ""){
            getCategoryList().then((res) => {
                const { data } = res;
                setListCategory(data);
                console.log(listCategory);
            });
        }
        else{
            const data ={
                keywords : keyword
            }
            searchCategory(data).then((res)=>{
                const {data} = res;
                setListCategory(data);
            })
        }
    }
    const [popupUpdateActive, setPopupUpdateActive] = useState(false);
    const [blurActive, setBlurActive] = useState(false);
    const [popupCreateActive, setPopupCreateActive] = useState(false);
    const clickEditToggle = () => {
        setPopupUpdateActive(!popupUpdateActive);
        setBlurActive(!blurActive);
    };
    const clickCreateToggle = () => {
        setPopupCreateActive(!popupCreateActive);
        setBlurActive(!blurActive);
    };
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <AdminLeftMenu />
                    <div className="layout-page">
                        <AdminHeader />
                        <div className="content-wrapper" >

                            <div className="container-xxl flex-grow-1 container-p-y" style={{filter: blurActive ? "blur(4px)":"none" ,pointerEvents: blurActive ? "none":"auto"}} /*className={blurActive ? "active" : ""}*/ id="blur-action">
                                <div className="card">
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems:"center" , padding: "10px"}} >
                                        <div className="col-md-3">
                                                <input className="form-control" type="text" placeholder="search here" name="keyword" id="searchTerm" onChange={(e)=>setKeyWord(e.target.value)} onKeyUp={(e)=>handleSearch()} />
                                        </div>
                                        <button id="addBtn" type="button" className="btn btn-primary" /*style={{marginRight: "20px"}}*/ onClick={(e)=>clickCreateToggle()}>
                                            Create
                                        </button>
                                    </div>
                                    <div className="table-responsive text-nowrap">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                <th>Category ID</th>
                                                <th>Category Name</th>
                                                 <th>Images</th>
                                                 <th>Brand Id</th>
                                                 <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0" >
                                            {listCategory.map((category) => (
          <tr>
          <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{category.id_category}</strong></td>
          <td>{pro.name}</td>
          <td>
              <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                  <li
                      data-bs-toggle="tooltip"
                      data-popup="tooltip-custom"
                      data-bs-placement="top"
                      className="avatar avatar-xs pull-up"
                      title="{Category.name}"
                  >
                      <img src={API_ENDPOINT+ category.img}  className="rounded-square" />
                  </li>
              </ul>
          </td>
          <td>
              {pro.parent_id}
          </td>
          <td>
                <a style={{marginLeft:"5px"}} onClick={()=>handleShowCategory(pro.id)}>
                    <FaEdit color="green" size="20px"/>  
                </a>
                <a style={{marginLeft:"15px"}} onClick={()=>handleDeleteCategory(pro.id)}>
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

                             {/*update form*/}
   
                            
                                <div className="d-flex aligns-items-center justify-content-center card text-left w-50 position-absolute top-50 start-50 translate-middle-x" id="Category_edit"  style={{marginLeft: "100px",marginTop: "-15%",visibility: popupUpdateActive ? "visible" : "hidden"}}>
                                    <div className="card mb-4">
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems:"center"}} >
                                            <h5 className="card-header">Edit Category</h5>
                                            <button id="EditBtn" type="button" className="btn btn-danger" style={{marginRight: "20px"}} onClick={(e)=>clickEditToggle()}>Cancel</button>
                                        </div>
                                        <div className="card-body" style={{marginTop: "-3%"}}>
                                            <div className="mb-3">
                                                <label className="form-label">Category Id</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value = {updateCategoryId}
                                                    onChange={(e)=>setUpdateCategoryId(e.target.value)}
                                                    disabled
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Name Category</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Category name"
                                                    id="edit_name"
                                                    name="name"
                                                    value = {updateCategoryName}
                                                    required="required"
                                                    onChange={(e)=>setUpdateCategoryName(e.target.value)}
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

                                            <div className="row mt-3">
                                                <div className="d-grid gap-2 col-lg-6 mx-auto">
                                                    <button className="btn btn-primary btn-lg"onClick={()=>handleUpdateCategory()}>Save</button>
                                                </div>
                                                <div className="d-grid gap-2 col-lg-6 mx-auto">
                                                    <button className="btn btn-danger btn-lg" type="button" onClick={()=>clickEditToggle()}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            

                           
                                <div className="d-flex aligns-items-center justify-content-center card text-left w-50 position-absolute top-50 start-50 translate-middle-x" id="create-Category" style={{marginLeft: "100px", marginTop: "-15%",visibility: popupCreateActive ? "visible" : "hidden"}} aria-hidden="true">
                                    <div className="card mb-4">
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems:"center"}}>
                                            <h5 className="card-header">Create Category</h5>
                                            <button id="CreateBtn" type="button" className="btn btn-danger" style={{marginRight: "20px"}} onClick={()=>clickCreateToggle()}>Cancel</button>
                                        </div>
                                        <div className="card-body" style={{marginTop: "-3%"}}>
                                            <div className="mb-3">
                                                <label className="form-label">Name Category</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Category name"
                                                    required="required"
                                                    name="name"
                                                    onChange={(e)=>setSaveCategoryName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Upload Image</label>
                                                <input name="images" className="form-control" onChange={(e)=>handleChangeImage(e)} type="file" id="formFileMultiple" multiple />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">brand</label>
                                                <select onChange={(e)=>setSaveBrand(e.target.value)} name="brand" className="form-select" required="required">
                                                    {listBrand.map((b)=>(
                                                        <option value={b.id} >{b.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="d-grid gap-2 col-lg-6 mx-auto">
                                                    <button className="btn btn-primary btn-lg" type="button" onClick={()=>handleSaveCategory()} >Save</button>
                                                </div>
                                                <div className="d-grid gap-2 col-lg-6 mx-auto">
                                                    <button className="btn btn-danger btn-lg" type="button" onClick={()=>clickCreateToggle()}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                  
                        </div>
                    </div>
                </div>           
            </div>
        </>
    );
}
