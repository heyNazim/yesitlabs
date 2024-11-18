import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';

import PageNotFound from './pages/PageNotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateProductForm from './dashboard/CreateProduct';
import Cart from './pages/Cart';
import  { Toaster } from 'react-hot-toast';
import Dashboard from './pages/dashboard/Dashboard.js';
import UpdateProduct from './dashboard/UpdateProduct.js';
import Protected from './components/Protected.js';


function App() {

  return (

    
    <BrowserRouter>

<Routes>
  <Route path="/" element={<Home  />} />
  <Route path="/createproduct" element={<CreateProductForm />} />
  <Route path="/cart" element={<Cart />} />

  {/* <Route path="/header" element={<Header />} /> */}
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />

  <Route path="*" element={<PageNotFound />} />

  <Route path="/dashboard" element={<Protected Component={Dashboard} />} />
  <Route path="/updateproduct/:id" element={<UpdateProduct />} />
</Routes>
<Toaster/>
</BrowserRouter>
  );
}

export default App;
