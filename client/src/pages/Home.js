import React from 'react'
import Whyweareincridible from '../components/homecomponents/Whyweareincridible'
import midimage from '../assets/Mid Banner HS.webp'
import Bestsellerslider from '../components/Bestsellerslider'
import Layout from '../components/Layout'

const Home = () => {
  return (
    <>
    <Layout>
    <Bestsellerslider/>
    <img  className='img-fluid mt-5' src={midimage}  alt="" />
    {/* <Cleanbeauty/>   */}
    <Whyweareincridible/>
    </Layout>
    </>
  )
}

export default Home