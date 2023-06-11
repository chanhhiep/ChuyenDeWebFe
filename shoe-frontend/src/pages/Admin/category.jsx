
import React, { useEffect,  useState } from "react";
import { Button,Modal } from "react-bootstrap";
import { FaEdit,FaTrashAlt } from 'react-icons/fa';
import "./page.css";
import "./core.css"
import "./theme-default.css"
import AdminHeader from "../../parts/AdminHeader";
import AdminLeftMenu from "../../parts/AdminLeftMenu";
import { API_ENDPOINT } from '../../constants';
import { toastError, toastSuccess } from '../../services/ToastService';
import axios from "axios";
export default function Category() {
    const [loading, setLoading] = useState(false);

    const [listCategory,setListCategory] = useState([]);
    const [listBrand ,setListBrand] = useState([]);
    //save state
    const [saveCategoryName,setSaveCategoryName] = useState("");
    const [saveImage, setSaveImage] = useState(null);
    const [saveBrand,setSaveBrand] = useState("");
    const [saveDescription, setSaveDescription] = useState("");
     //update state
     const [updateCategoryId,setUpdateCategoryId] = useState("");
     const [updateCategoryName,setUpdateCategoryName] = useState("");
     const [updateBrand, setUpdateBrand] = useState("");

    //
    const accesstoken = localStorage.getItem('token')
    const handleChangeImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSaveImage(event.target.files[0]);
        }
    }
   
    useEffect(() => {
        const refetch = (async () => {
            await axios.get(`${API_ENDPOINT}/admin/category`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then((res) => {
                const { data } = res;
                setListCategory(data);
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
    function handleShowCategory(id){
        axios.get(`${API_ENDPOINT}/admin/category/showCategory/${id}`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then((res)=>{
            const {data} = res;
            //setCategory(data);
            setUpdateCategoryId(data.id_category);
            setUpdateCategoryName(data.name);
            setUpdateBrand(data.parent_id);
            setLgUpdateShow(true);
        })
    }
    function handleDeleteCategory(id) {
        axios.delete(`${API_ENDPOINT}/admin/category/deleteCategory`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then((res) => {
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

            idParent: updateBrand,
            
        }
        axios.put(`${API_ENDPOINT}/admin/category/updateCategory`, data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
        .then((res)=>{
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
        axios.post(`${API_ENDPOINT}/admin/category/saveCategory`, formData, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
        .then((res)=>{  
                toastSuccess("Save successfully");
                console.log("success");
        })
    }
    const[keyword,setKeyWord] = useState("");
    function handleSearch() {
        if(keyword === ""){
            axios.get(`${API_ENDPOINT}/admin/category`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then((res) => {
                const { data } = res;
                setListCategory(data);
                console.log(listCategory);
            });
        }
        else{
            const data ={
                keywords : keyword
            }
            axios.post(`${API_ENDPOINT}/admin/category/search`, data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
           .then((res)=>{
                const {data} = res;
                setListCategory(data);
            })
        }
    }
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
                                        <Button onClick={() => setLgShow(true)}>Create</Button>
                                        <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
           Create Category
          </Modal.Title>
        </Modal.Header>
            <Modal.Body>
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
                                            <div className="row mt-3"style={{width:"100%"}}  >
                                                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}} >
                                                    <button className="btn btn-primary " style={{width:"60%",height:"100%"}} type="button" onClick={()=>handleSaveCategory()} >Save</button>
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
          <td>{category.name}</td>
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
              {category.parent_id}
          </td>
          <td>
                <a style={{marginLeft:"5px"}} onClick={()=>handleShowCategory(category.id_category)}>
                    <FaEdit color="green" size="20px"/>  
                </a>
                <a style={{marginLeft:"15px"}} onClick={()=>handleDeleteCategory(category.id_category)}>
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
   
                            
                           
                                <Modal
        size="lg"
        show={lgUpdateShow}
        onHide={() => setLgUpdateShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
           Update Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                                      
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

                                            <div className="row mt-3"style={{width:"100%"}}  >
                                                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}} >
                                                    <button className="btn btn-primary " style={{width:"60%",height:"100%"}} type="button" onClick={()=>handleUpdateCategory()} >Save</button>
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
