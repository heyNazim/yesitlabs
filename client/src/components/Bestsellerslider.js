import React, { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/features/cartSlice.js';
import toast from 'react-hot-toast';
import Allproductdata from '../Allproducts.js';



const Bestsellerslider = () => {
  const [allproducts, setAllproducts] = useState([]);
  const dispatch = useDispatch();
  

  // console.log(props.data, "Bestslider")
  const newdata = useSelector((state) => state);
  console.log(newdata, "newdata")

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  // useEffect(() => {
  //   GetAllProducts();
  // }, []);

  // const GetAllProducts = async () => {
  //   const token = localStorage.getItem('Token');

  //   try {
  //     const result = await axios.get(`${process.env.REACT_APP_API}/api/allproducts`,
  //       { headers: {
  //       Authorization: token,
  //     },});
  //     setAllproducts(result.data.products);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // add to cart 
  const send = (e) => {
    dispatch(addToCart(e))
    toast.success("Item added In Your Cart")
  }

  // console.log(allproducts, "API Products")
  // console.log(Allproductdata[0].products, "Data for Product") On Local Api use  Allproductdata[0].products on map

  return (
    <>
      <section>
        <div className="container">


          <h2 className='text-center'>Product List</h2>
          <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={5000} infinite={true}>
            {Allproductdata[0].products && Allproductdata[0].products.length > 0 ? (
              Allproductdata[0].products.map((item, index) => (
                <div className='multicardslider' key={index}>
                  <Link to={`/productdetail/${item._id}`}>
                    <img src={`${process.env.REACT_APP_API}/${item.images[1]}`} alt={item.images[0]} />
                  </Link>
                  <div className='slidecont'>

                    <h6>{item.name}</h6>
                    <p>Quantity: ${item.countInStock}</p>
                    <p>Category: ${item.category}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                  <button onClick={() => send(item)} className='ADD-TO-CART'>Add to cart</button>
                </div>
              ))
            ) : (
              <div>No products available</div>
            )}
          </Carousel>

        </div>
      </section>
    </>
  );
};

export default Bestsellerslider;
