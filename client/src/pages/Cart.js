import React, { useCallback, useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCart, removeSingleIteams, emptycartIteam } from '../redux/features/cartSlice';
import { MdDeleteOutline } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import {Link} from 'react-router-dom'
import Layout from '../components/Layout';





const Cart = () => {
  const { carts } = useSelector((state) => state.allCart);

  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);

  console.log(carts, "carts")
  const dispatch = useDispatch();

  // add to cart
  const handleIncrement = (e) => {
    dispatch(addToCart(e))
  }

  // remove to cart
  const handleDecrement = (e) => {
    dispatch(removeToCart(e));
    toast.success("Item Remove From Your Cart")
  }

  // remove single item 
  const handleSingleDecrement = (e) => {
    dispatch(removeSingleIteams(e))
  }

  // empty cart
  const emptycart = () => {
    dispatch(emptycartIteam())
    toast.success("Your Cart is Empty")

  }

  // Count total price
  const total = useCallback(() => {
    let totalprice = 0;
    carts.forEach((ele) => {
      totalprice += ele.price * ele.qnty;
    });
    setPrice(totalprice);
  }, [carts]);

  // Count total quantity
  const countquantity = useCallback(() => {
    let totalquantity = 0;
    carts.forEach((ele) => {
      totalquantity += ele.qnty;
    });
    setTotalQuantity(totalquantity);
  }, [carts]);

  useEffect(() => {
    total()
  }, [total])

  useEffect(() => {
    countquantity()
  }, [countquantity])


  return (
    <>
    <Layout>
      <section className='cart-sec-bg pt-5 pb-5'>
        <div className="container">
          <div className="row">
            <div className="col-md-7 cart-items">
              <div className='body-cart-list'>
                <div className="d-flex justify-between">

              <h5 className='text-black '>Cart Calculation {carts.length > 0 ? `(${carts.length})` : ""}</h5>
                                {   carts.length > 0 ? <button className='btn btn-danger'  onClick={emptycart} ><span className='d-flex'> Empty Cart <MdDeleteOutline /> </span></button>: ""  }
                </div>
                {carts.length > 0 ? (
                  carts.map((item, index) => (
                    <div key={index} className='cartlist'>
                      <div className='row'>
                        <div className="col-3">
                          <img className='img-fluid' src={`${process.env.REACT_APP_API}/${item.images[1]}`} alt={item.images[0]} />
                        </div>
                        <div className="col-9">
                          <div className="row">
                            <div className="col-8">
                              <h5>{item.name}</h5>
                              <small>Price: </small> ${item.price} <br />
                              <small>Quantity: </small> {item.qnty} <br />
                            </div>

                            <div className="col-4">
                              <div className="mb-3 d-flex justify-content-end">
                                <button className='prdct-delete btn btn-danger'
                                  onClick={() => handleDecrement(item._id)}
                                ><MdDeleteOutline /></button>
                              </div>

                              <div className="prdct-qty-container">
                                <button className='prdct-qty-btn' type='button' onClick={item.qnty <= 1 ? () => handleDecrement(item.id) : () => handleSingleDecrement(item)}> <FaMinus className='minusbtn' /> </button>
                                <input type="text" className='qty-input-box' value={item.qnty} disabled name="" id="" />
                                <button className='prdct-qty-btn' type='button' onClick={() => handleIncrement(item)}> <FaPlus className='plusbtn' /></button>
                              </div>
                            </div>

                          </div>

                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                  <div>No Item In Cart</div>
                  <BsCartX className='empyu-cartt-icon'/>
                  </div>

                )

                }
              </div>
            </div>

            <div className="col-md-5 cartpricedetail">
              <div className="cart-price-detail">
                <div className="row">
                  <h3>PRICE DETAILS</h3>
                  <div className="col-6">
                    <p>Total Item:</p> <hr />
                    <p>Total Quantity:</p> <hr />
                    <p>Total Price:</p> <hr />
                  </div>
                  <div className="col-6">
                    <div>
                      <p>{carts.length}</p> <hr />
                      <p>{totalquantity}</p> <hr />
                      <p>₹ {totalprice} </p> <hr />
                    </div>
                  </div>
                  <Link to={'/checkout'}>
                  <button className="mb-3 checkout-button">Proceed To Checkout</button>
                  </Link>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
    </>
  );
};

export default Cart;
