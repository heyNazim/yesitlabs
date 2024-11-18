import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import toast from 'react-hot-toast';

const UpdateProduct = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    countInStock: '',
    rating: '',
    numReviews: '',
    images: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getsingleUser();
    // eslint-disable-next-line
  }, [id]);

  
  const getsingleUser = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API}/api/product/${id}`);
      setData(result.data.product[0] || {}); // Ensure that data is always defined
      
    } catch (error) {
      toast.error('Failed to fetch product details');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleDescriptionChange = (event, editor) => {
    const editorData = editor.getData();
    setData(prevState => ({
      ...prevState,
      description: editorData,
    }));
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('brand', data.brand);
    formData.append('countInStock', data.countInStock);
    formData.append('rating', data.rating);
    formData.append('numReviews', data.numReviews);
  
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
  
    try {
      const result = await axios.put(`${process.env.REACT_APP_API}/api/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (result.data.success) {
        toast.success(result.data.message);
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      toast.error("An error occurred while updating the product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container">
        <h1>Update Product</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            name="name"
            placeholder="Name"
            value={data.name || ''} // Ensure it's never undefined
            onChange={handleInputChange}
            required
          />
          <br />
          <CKEditor
            editor={ClassicEditor}
            data={data.description || ''}
            onChange={handleDescriptionChange}
            config={{
              toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
            }}
          />
          <br />
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="number"
            name="price"
            placeholder="Price"
            value={data.price || ''}
            onChange={handleInputChange}
            required
          />
          <br />
          <select
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            name="category"
            value={data.category || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Hair Care">Hair Care</option>
            <option value="Face Care">Face Care</option>
            <option value="Essential Oil Care">Essential Oil Care</option>
            <option value="Body Care">Body Care</option>
          </select>
          <br />
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            name="brand"
            placeholder="Brand"
            value={data.brand || ''}
            onChange={handleInputChange}
            required
          />
          <br />
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="number"
            name="countInStock"
            placeholder="Count In Stock"
            value={data.countInStock || ''}
            onChange={handleInputChange}
            required
          />
          <br />
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="number"
            name="rating"
            placeholder="Rating"
            value={data.rating || ''}
            onChange={handleInputChange}
          />
          <br />
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="number"
            name="numReviews"
            placeholder="Number of Reviews"
            value={data.numReviews || ''}
            onChange={handleInputChange}
          />
          <br />
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="file"
            multiple
            onChange={handleImageChange}
          />
          <button
            className="btn btn-primary mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateProduct;
