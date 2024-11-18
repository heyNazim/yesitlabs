import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addToCart } from '../../redux/features/cartSlice.js';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout.js';
import Allproductdata from '../../Allproducts.js';


const Categoryproduct = () => {
    const [filteredData, setFilteredData] = useState([]);    
    const [sessioncategory, setSessioncategory] = useState();    
    const dispatch = useDispatch();

    useEffect(() => {
        // procat();
    }, []);

    // Live API
    const procat = async () => {
        try {
            const nazim =   sessionStorage.getItem("sessioncategory")
            const result = await axios.get(`${process.env.REACT_APP_API}/api/allproducts`);
            const filtered = result.data.products.filter(item => item.category === nazim);
            setFilteredData(filtered);
            setSessioncategory(nazim)
            
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
    
    // LOCAL API 
    useEffect(() => {
        const nazim =   sessionStorage.getItem("sessioncategory")
        const filtered = Allproductdata[0].products.filter(item => item.category === nazim);
        setFilteredData(filtered);
    }, [Allproductdata]);


      // add to cart 
      const send = (e)=>{
        dispatch(addToCart(e))
        toast.success("Item added In Your Cart")
    }

    return (
        <>
        <Layout>

        <section className='mt-5'> 
            <div className="container">

         <div className="row">

<h1>{sessioncategory}</h1>

                {filteredData.map(product => (
                    <div className='col-md-3 mb-3' key={product._id}>
                        <div className="commonshadow p-2">

                       <Link to={`/productdetail/${product._id}`}>       
                         <img src={`${process.env.REACT_APP_API}/${product.images[1]}`} alt={product.name} />
                       </Link> 
                       <div className='p-2' style={{height:"130px"}}>
                       <h6>{product.name}</h6>
                        {/* <p>{product.description}</p> */}
                        <p>Price: {product.price}</p>
                       </div>
                     
                        <button  onClick={()=>send(product)} className='ADD-TO-CART'>Add to Cart</button>
                        </div>

                    </div>
                ))}
            </div>

            </div>
            </section>
        </Layout>
        </>
    );
}

export default Categoryproduct;
