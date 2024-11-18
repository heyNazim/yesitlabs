import React, { useState } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        countInStock: '',
        rating: '',
        numReviews: ''
    });

    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setFormData({
            ...formData,
            description: data
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
        Array.from(images).forEach(image => {
            formDataToSend.append('images', image);
        });

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/createproduct`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className='container mx-auto px-5'>
            <h2>Create Product</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                /> <br />
                <CKEditor
                    editor={ClassicEditor}
                    data={formData.description}
                    onChange={handleDescriptionChange}
                    config={{
                        toolbar: ['undo', 'redo', '|', 'bold', 'italic']
                    }}
                />
                <br />
                <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    required
                /> <br />
                <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name="category"
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Face Care">Face Care</option>
                    <option value="Essential Oil Care">Essential Oil Care</option>
                    <option value="Body Care">Body Care</option>
                </select><br />

                <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    onChange={handleChange}
                    required
                /> <br />
                <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="number"
                    name="countInStock"
                    placeholder="Count In Stock"
                    onChange={handleChange}
                    required
                /> <br />
                <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    onChange={handleChange}
                /> <br />
                <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="number"
                    name="numReviews"
                    placeholder="Number of Reviews"
                    onChange={handleChange}
                /><br />
                <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="file"
                    multiple
                    onChange={handleImageChange}
                />
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProductForm;
