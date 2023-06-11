export default function Payment (){
    // const [listPayment, setListPayment] = useState([]);
    // const [payment, setPayment] = useState([]);
    //  //save state
    //  const [saveName,setSaveName] = useState("");
    //  const [saveDescription, setSaveDescription] = useState("");
    //   //update state
    //   const [updateId,setUpdateId] = useState("");
    //   const [updateName,setUpdateName] = useState("");
    //   const [updateDescription,setUpdateDescription] = useState("");
    //   const accesstoken = localStorage.getItem('accesstoken')
    // useEffect(() => {
    //     const refetch = (async () => {
    //         await axios.get(`${API_ENDPOINT}/admin/payment`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
    //             .then((res) => {
    //             const { data } = res;
    //             setListPayment(data);
    //             console.log(listPayment);
    //         });
    //         return;
    //     });
    //     //cleanup function
    //     return () => {
    //         refetch();
    //     };
    // }, []);
 

    // //show data
    // function handleShowPayment(id){
    //     //toastSuccess("Show successfully");
    //     const api = `${API_ENDPOINT}/api/product/payment/${id}`
    //     axios.get(api, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
    //         .then((res)=>{
    //         const {data} = res;
    //         //setPayment(data);
    //         setUpdatetName(data.name);
    //         setUpdateDescription(data.description);
    //         clickEditToggle();
    //     })

    // function handleDeletePayment(id) {
    //     axios.delete(`${API_ENDPOINT}/admin/product/deletePayment/${id}`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
    //             .then((res) => {
    //         if (res.data === true) {
    //             toastSuccess("Delete successfully");
    //             console.log("success");
    //         } else {
    //             console.log("fails")
    //             toastError("Delete item failed");
    //         }
    //     })
    // }
    // function handleUpdatePayment() {   
    //     if (updateName === "") {
    //         toastError("Tên Payment Không Được Để Trống");
    //         return;
    //     }
    //     if (updateId === "") {
    //         toastError("ID Payment Không Được Để Trống");
    //         return;
    //     }
    //     if (updateDescription === "") {
    //         toastError("ID Payment Không Được Để Trống");
    //         return;
    //     }
    //     const data ={
    //         id: updateId,
    //         name: updateName,
    //         description: updateDescription,
    //     }
    //     axios.put(`${API_ENDPOINT}/admin/payment/updatePayment`, data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
    //     .then((res)=>{
    //             toastSuccess("Update successfully");
    //             //removeItem();
    //             console.log("success");
    //     })
    // }
    // function handleSavePayment () {
    //     if (savePaymentName === "") {
    //         toastError("Tên Phương Thức Thanh Toán Không được để trống Không Được Để Trống");
    //         return;
    //     }
    //     if (saveImage === null) {
    //         toastError("saveDescription Không được để trống Không Được Để Trống");
    //         return;
    //     }
        
    //     const data ={
    //         name: savePaymentName,
    //         brand: saveBrand,
    //     }
        
    //     axios.post(`${API_ENDPOINT}/admin/payment/savePayment`, data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
    //     .then((res)=>{  
    //             toastSuccess("Save successfully");
    //             //removeItem();
    //             console.log("success");
    //     })
    // }
    // const[keyword,setKeyWord] = useState("");
    // function handleSearch() {
    //     if(keyword === ""){
    //         axios.get(`${API_ENDPOINT}/admin/payment`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
    //         .then((res) => {
    //             const { data } = res;
    //             setListPayment(data);
    //             console.log(listPayment);
    //         });
    //     }
    //     else{
    //         const data ={
    //             keywords : keyword
    //         }
    //         axios.post(`${API_ENDPOINT}/admin/payment/searchPayment`,data, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
    //             .then((res)=>{
    //             const {data} = res;
    //             setListPayment(data);
    //         })
    //     }
    // }
    // const [popupUpdateActive, setPopupUpdateActive] = useState(false);
    // const [blurActive, setBlurActive] = useState(false);
    // const [popupCreateActive, setPopupCreateActive] = useState(false);
    // const clickEditToggle = () => {
    //     setPopupUpdateActive(!popupUpdateActive);
    //     setBlurActive(!blurActive);
    // };
    // const clickCreateToggle = () => {
    //     setPopupCreateActive(!popupCreateActive);
    //     setBlurActive(!blurActive);
    // };
    // return(
    //     <>
    //         <div className="layout-wrapper layout-content-navbar">
    //             <div className="layout-container">
    //                 <AdminLeftMenu />
    //                 <div className="layout-page">
    //                     <AdminHeader />
    //                     <div className="content-wrapper" >

    //                         <div className="container-xxl flex-grow-1 container-p-y" style={{filter: blurActive ? "blur(4px)":"none" ,pointerEvents: blurActive ? "none":"auto"}} /*className={blurActive ? "active" : ""}*/ id="blur-action">
    //                             <div className="card">
    //                                 <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems:"center" , padding: "10px"}} >
    //                                     <div className="col-md-3">
    //                                             <input className="form-control" type="text" placeholder="search here" name="keyword" id="searchTerm" onChange={(e)=>setKeyWord(e.target.value)} onKeyUp={(e)=>handleSearch()} />
    //                                     </div>
    //                                     <button id="addBtn" type="button" className="btn btn-primary" /*style={{marginRight: "20px"}}*/ onClick={(e)=>clickCreateToggle()}>
    //                                         Create
    //                                     </button>
    //                                 </div>
    //                                 <div className="table-responsive text-nowrap">
    //                                     <table className="table">
    //                                         <thead>
    //                                             <tr>
    //                                             <th>Payment Method ID</th>
    //                                             <th>Payment Method Name</th>
    //                                            <th>Description</th>
    //                                             <th>Actions</th>
    //                                             </tr>
    //                                         </thead>
    //                                         <tbody className="table-border-bottom-0" >
    //                                         {listPayment.map((payment) => (
    //       <tr>
    //       <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{payment.id}</strong></td>
    //       <td>{payment.name}</td>
         
    //       <td>
    //       {payment.description}
    //       </td>
    //       <td>
    //             <a style={{marginLeft:"5px"}} onClick={()=>handleShowPayment(pro.id)}>
    //                 <FaEdit color="green" size="20px"/>  
    //             </a>
    //             <a style={{marginLeft:"15px"}} onClick={()=>handleDeletePayment(pro.id)}>
    //                 <FaTrashAlt color="red" size="20px"/>
    //             </a>
              
    //       </td>
    //   </tr>
    //     ))}                                                                                                            
    //                                         </tbody>
    //                                     </table>
    //                                 </div>
    //                             </div>

    //                         </div>   

    //                          {/*update form*/}
   
    //                             <div className="d-flex aligns-items-center justify-content-center card text-left w-50 position-absolute top-50 start-50 translate-middle-x" id="Payment_edit"  style={{marginLeft: "100px",marginTop: "-15%",visibility: popupUpdateActive ? "visible" : "hidden"}}>
    //                                 <div className="card mb-4">
    //                                     <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems:"center"}} >
    //                                         <h5 className="card-header">Edit Payment</h5>
    //                                         <button id="EditBtn" type="button" className="btn btn-danger" style={{marginRight: "20px"}} onClick={(e)=>clickEditToggle()}>Cancel</button>
    //                                     </div>
    //                                     <div className="card-body" style={{marginTop: "-3%"}}>
    //                                         <div className="mb-3">
    //                                             <label className="form-label">Payment Id</label>
    //                                             <input
    //                                                 className="form-control"
    //                                                 type="text"
    //                                                 value = {updateId}
    //                                                 onChange={(e)=>setUpdateId(e.target.value)}
    //                                                 disabled
    //                                             />
    //                                         </div>
    //                                         <div className="mb-3">
    //                                             <label className="form-label">Name Payment</label>
    //                                             <input
    //                                                 type="text"
    //                                                 className="form-control"
    //                                                 placeholder="Payment name"
    //                                                 id="edit_name"
    //                                                 name="name"
    //                                                 value = {updateName}
    //                                                 required="required"
    //                                                 onChange={(e)=>setUpdatePaymentName(e.target.value)}
    //                                             />
    //                                         </div>  
                                           
                                         

    //                                         <div className="row mt-3">
    //                                             <div className="d-grid gap-2 col-lg-6 mx-auto">
    //                                                 <button className="btn btn-primary btn-lg"onClick={()=>handleUpdatePayment()}>Save</button>
    //                                             </div>
    //                                             <div className="d-grid gap-2 col-lg-6 mx-auto">
    //                                                 <button className="btn btn-danger btn-lg" type="button" onClick={()=>clickEditToggle()}>Cancel</button>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
                            

                           
    //                             <div className="d-flex aligns-items-center justify-content-center card text-left w-50 position-absolute top-50 start-50 translate-middle-x" id="create-Payment" style={{marginLeft: "100px", marginTop: "-15%",visibility: popupCreateActive ? "visible" : "hidden"}} aria-hidden="true">
    //                                 <div className="card mb-4">
    //                                     <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems:"center"}}>
    //                                         <h5 className="card-header">Create Payment</h5>
    //                                         <button id="CreateBtn" type="button" className="btn btn-danger" style={{marginRight: "20px"}} onClick={()=>clickCreateToggle()}>Cancel</button>
    //                                     </div>
    //                                     <div className="card-body" style={{marginTop: "-3%"}}>
    //                                         <div className="mb-3">
    //                                             <label className="form-label">Name Payment</label>
    //                                             <input
    //                                                 type="text"
    //                                                 className="form-control"
    //                                                 placeholder="Payment name"
    //                                                 required="required"
    //                                                 name="name"
    //                                                 onChange={(e)=>setSaveName(e.target.value)}
    //                                             />
    //                                         </div>
    //                                         <div className="mb-3">
    //                                             <label className="form-label">Description Payment</label>
    //                                             <input
    //                                                 type="text"
    //                                                 className="form-control"
    //                                                 placeholder="Payment name"
    //                                                 required="required"
    //                                                 name="name"
    //                                                 onChange={(e)=>setSaveDescription(e.target.value)}
    //                                             />
    //                                         </div>
    //                                         <div className="row mt-3">
    //                                             <div className="d-grid gap-2 col-lg-6 mx-auto">
    //                                                 <button className="btn btn-primary btn-lg" type="button" onClick={()=>handleSavePayment()} >Save</button>
    //                                             </div>
    //                                             <div className="d-grid gap-2 col-lg-6 mx-auto">
    //                                                 <button className="btn btn-danger btn-lg" type="button" onClick={()=>clickCreateToggle()}>Cancel</button>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>                  
    //                     </div>
    //                 </div>
    //             </div>           
    //         </div>
    //     </>
    // )
//}