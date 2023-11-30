import React,{useState,useEffect}from 'react'
import Layout from '../../Components/Layout/Layout'
import Adminmenu from '../../Components/Layout/Adminmenu'
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate,useParams } from "react-router-dom";
const { Option } = Select;


const Updateproduct = () => {
  const navigate = useNavigate();
  const params =useParams()
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  
//get single product
const getsingleproduct= async()=>{
try{
const {data}=await axios.get(`/api/v1/product/get-product/${params.slug}`)
setName(data.products.name)
setName(data.products.name);
 setId(data.products._id);
setDescription(data.products.description);
setPrice(data.products.price);
setPrice(data.products.price);
setQuantity(data.products.quantity);
setShipping(data.products.shipping);
setCategory(data.products.category._id);
}catch(error){
console.log(error)
}
}
useEffect(() => {
  getsingleproduct()
  //elsint-disable-next-line
}, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.categorry);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in pdateproduct");
    }
  };

useEffect(() => {
    getAllCategory();
  }, []);

 //create product function
 const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
   photo && productData.append("photo", photo);
    productData.append("category", category);
    const { data } = axios.put(
      `/api/v1/product/update-product/${id}`,
      productData
    );
    if (data?.success) {
      toast.error(data?.message);
    } else {
      toast.success("Product Updated Successfully");
      navigate("/dashboard/admin/products");
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong");
  }
};

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="create-product">
          <div className='className="container-fluid m-3 p-3"'>
          <div className='row'>
          <div className='col-md-3'><Adminmenu/></div>
          <div className='col-md-9'>
            <h1>Update PRODUCT</h1>
            <div className='m-1 w-75'> 
              <Select bordered={false} placeholder="select category" size='large' 
               showSearch
               className="form-select mb-3" 
               onChange={value => {setCategory(value)}}
               value={category}
               >

{categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}

              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name :"Upload Photo"}
                  <input  type="file" name="photo" accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ):
                (
                  <div className="text-center">
                    <img
                      
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )
                }
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? 'Yes' : 'No'}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary m-2" onClick={handleUpdate}>
                 Update Product
                </button>
                <button className="btn btn-danger  m-2" onClick={handleDelete}>
              Delete Product
                </button>
              </div>
              

            </div>
        </div>
        </div>
        </div>
        </Layout>
  )
}

export default Updateproduct