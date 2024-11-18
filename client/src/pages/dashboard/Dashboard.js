import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css'
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MdDeleteOutline } from "react-icons/md";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';



function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [allproductrecord, setAllproductrecord] = useState();
  const [allUsers, setAllUsers] = useState();
  const [allUserCount, setAllUserCount] = useState();
  // const [totalCount, setTotalCount] = useState();
  const [totalProductCount, setTotalProductCount] = useState();

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

  const navigate = useNavigate()



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
      toast.success(response?.data?.message)


    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  useEffect(() => {
  const access =   localStorage.getItem('Role')
  if(!access){
    navigate('../')
  }
       fetchAllUsers()
    fetchAllProductRecords()
  }, [navigate])



  // Get All Product records
  const fetchAllProductRecords = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/allproducts`)
      if (response) {
        setAllproductrecord(response?.data?.products)
        setTotalProductCount(response?.data?.products?.length)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Users records
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/allusers`,{
        headers:{Authorization:localStorage.getItem('Token'),
                role:localStorage.getItem('Role')}}
        )
      if (response) {
        setAllUsers(response?.data?.allusers)
        setAllUserCount(response?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Delete Product Item
  const deleteProductItem = async (productId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/api/deleteproduct/${productId}`)
      if (response) {
        toast.success(response?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Delete Product Item
  const deleteUserItem = async (productId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/api/deleteuser/${productId}`)
      if (response) {
        toast.success(response?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const renderContent = () => {

    switch (activeTab) {
      case 'home':
        return <div>Home Content</div>;
      case 'All Users':
        return <>
          <h1>{allUserCount}</h1>
          <table className='table table-striped table-bordered table-responsive'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Phone</th>
                <th>User Role</th>
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {
                allUsers?.map((item, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.role}</td>
                    <button className='btn btn-danger' onClick={() => deleteUserItem(item._id)}><MdDeleteOutline /></button>
    

                  </tr>
                ))
              }
            </tbody>
          </table>
        </>;
      case 'Create Product':
        return <>
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
              <button className='btn btn-primary mt-2' type="submit">Create Product</button>
            </form>
          </div>
        </>;
      case 'All Products':
        return <>

          {/*Edit Product  Modal */}
          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Product</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">

                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nihil sequi ab rerum quis quos commodi nostrum fugit asperiores ex! Sit illum rem placeat deserunt et cupiditate beatae, voluptates recusandae sed quibusdam? Iure eius quaerat nulla? Error accusantium possimus iste praesentium. Sequi pariatur libero at perferendis nulla, illum cumque praesentium totam corrupti aut, doloribus veritatis. Quidem, quod inventore commodi sapiente exercitationem culpa. Tempore aliquid dolorum nulla, magnam praesentium repudiandae impedit! Nisi laboriosam pariatur amet similique beatae, aspernatur dolor quod tempore assumenda aliquam consectetur velit cum. Adipisci dolor omnis et sit dignissimos earum temporibus nobis impedit officia libero ab officiis vero quaerat debitis, iusto sunt? Enim quas aspernatur magnam perspiciatis temporibus. Ut esse ducimus, magnam deleniti, reprehenderit quos consequatur fuga accusamus voluptas suscipit incidunt similique modi recusandae eaque odio ipsa officiis excepturi dolore! Omnis commodi dicta iusto ab perspiciatis beatae quisquam ratione nulla expedita tempore ducimus ipsa architecto, labore incidunt possimus rerum repudiandae quidem sed odit sit neque eum! Harum, laudantium. Dolor commodi accusamus odio quos consequuntur neque quo necessitatibus nesciunt, dicta labore quibusdam velit fuga aperiam, delectus adipisci dolorum atque recusandae laboriosam? Illum quis doloribus porro omnis excepturi commodi! Earum sapiente accusamus voluptate eveniet deleniti perferendis mollitia enim laborum doloremque, quos commodi quibusdam molestiae beatae dignissimos iure impedit! Nisi cupiditate ipsam sequi unde, dolorum laudantium tempore vel optio tempora, dignissimos veritatis obcaecati quos nobis nesciunt saepe deleniti suscipit at recusandae laboriosam! Maxime debitis officia molestias velit, magni numquam fugit doloribus, omnis doloremque quibusdam exercitationem ex temporibus iusto architecto ad repudiandae perspiciatis? Sed expedita consequatur dolore atque, neque unde? Magni voluptatum atque a sapiente debitis. Sit culpa expedita autem necessitatibus, optio nesciunt nobis ipsa praesentium atque doloremque, animi ipsam repudiandae voluptatibus, similique eveniet recusandae. Voluptatum sequi similique illo maiores culpa corrupti recusandae possimus? Debitis eveniet iste placeat fugiat minima repellendus laudantium quam! Iure blanditiis aperiam mollitia eos facilis itaque cumque, ea aspernatur, et hic minus molestias optio. Asperiores, distinctio, quas modi repellat odio nostrum similique voluptatum libero nesciunt est, amet aliquam numquam ducimus rerum corrupti ut blanditiis earum. Reiciendis, tenetur earum quis nostrum laboriosam libero quidem dolore voluptatum, ratione necessitatibus aperiam numquam rem officiis nisi! Amet consectetur cumque quidem vero et, quod accusamus laboriosam, corrupti incidunt aut odit? Labore excepturi placeat obcaecati temporibus! Eius quis laudantium saepe sint iure id a sit consequatur consectetur fugiat asperiores adipisci, inventore voluptate deleniti velit pariatur ipsa facere corrupti aperiam suscipit harum ex repellat sequi? Magnam, architecto quam. Eos facere laudantium neque, repudiandae veniam magnam. Deserunt consequuntur perferendis nulla repellendus laudantium iure, omnis, aut libero sed exercitationem provident aperiam cupiditate commodi neque! Molestiae culpa iste laboriosam placeat doloremque. Sint deserunt tempora eveniet eos, rem adipisci doloribus accusantium iste sit, voluptates dolore omnis quidem facere blanditiis cumque suscipit natus perferendis tenetur voluptatibus! Odit est consequatur fugit rem quasi ducimus recusandae, nemo excepturi illo quaerat consequuntur ab architecto sapiente sed aut provident! Quasi tempore illum at odit error dolore ipsam autem distinctio rerum blanditiis fugiat dolores assumenda, reiciendis unde adipisci repellat fuga. Pariatur, corporis reprehenderit? Repellendus, tempora nisi magni reprehenderit corrupti vero ad. Molestiae impedit reiciendis eius culpa corrupti natus quod repellat, sint illum accusamus animi maiores amet, sed praesentium. Quam possimus, molestias aperiam facilis incidunt illum neque hic error? Accusantium unde totam rerum odit mollitia labore saepe eius reprehenderit impedit cumque ducimus laborum quam, quibusdam dolores provident ipsum pariatur omnis blanditiis obcaecati delectus officia dicta quos, accusamus excepturi? Odio, fugit praesentium consequuntur facere ullam id amet molestiae ipsam necessitatibus delectus exercitationem? Odit minima eaque illum quidem officiis ea doloremque accusantium qui dicta, vel minus dolor aperiam recusandae doloribus quibusdam harum aliquid rem suscipit molestias? Numquam delectus unde quam dolores iure explicabo facilis et! Blanditiis exercitationem voluptas, rem ratione, mollitia odio necessitatibus perspiciatis nemo suscipit officiis provident. Sint perspiciatis corporis autem numquam reprehenderit eum inventore eveniet rem, facilis fugit. Sit culpa ex unde minima aspernatur quaerat, similique modi facilis dignissimos, nemo incidunt. Iusto eligendi accusamus ut commodi exercitationem maiores ipsa corporis est delectus id voluptas provident excepturi dolorum quisquam expedita necessitatibus, aliquid eum. Perferendis, omnis inventore velit consequuntur tempora itaque vel, eaque, quasi nulla iste enim! Aliquid magni consectetur expedita corrupti. Iusto perferendis quidem voluptates sed recusandae nihil ipsa similique aspernatur mollitia repellat quaerat delectus esse corporis neque, quia, enim a sunt quae quasi. Ullam nam iure blanditiis laudantium rerum explicabo tempore labore quidem assumenda odit placeat asperiores sed, nesciunt unde sequi possimus? Magnam saepe sit sunt atque doloremque hic ut optio incidunt corporis, aut in dicta tenetur. Beatae vitae a aspernatur explicabo, similique numquam, aliquid, eveniet praesentium et consectetur incidunt quibusdam corrupti voluptatibus. Pariatur unde officia magnam aliquid expedita minima quaerat eligendi vel quam saepe tempore voluptatibus beatae dolorem ullam, sunt eum eos repellat soluta nam harum at quia! Porro provident ad at, nostrum natus non sapiente architecto eum saepe inventore veniam in pariatur eligendi nobis deleniti expedita culpa aperiam laboriosam tempore consequuntur tempora repudiandae? Aperiam non pariatur quibusdam maxime debitis ratione temporibus, deserunt assumenda ducimus aliquam facilis expedita. Sed, perspiciatis recusandae. Maxime ad et itaque nemo earum sunt necessitatibus iure unde qui quis excepturi sed nostrum adipisci asperiores inventore aliquid, officia dolor odio? Voluptates culpa nobis impedit animi eveniet ipsam architecto ex facere quas, numquam excepturi nemo! Debitis nobis odit placeat optio quod totam at autem vel ratione quos. Unde beatae explicabo nam necessitatibus eaque provident nulla alias suscipit itaque iste, tenetur, harum rem quod deserunt minima nihil odit atque repellendus aut, iusto in dignissimos facere voluptate eius. Aliquam perferendis veritatis molestiae in excepturi illum! Tempora laborum maxime fuga quos odit, numquam iure incidunt exercitationem consequatur soluta temporibus ipsa accusamus, hic voluptates qui, corporis quas omnis sit voluptate libero facere id a. Modi, excepturi! Neque, voluptatem quasi quae obcaecati a quod nihil tempora, asperiores distinctio at, iste exercitationem assumenda dolorum excepturi amet harum. Iure, enim commodi. Repudiandae at quae aperiam ad esse totam necessitatibus cupiditate. Ducimus qui ipsum quas mollitia ad. Molestiae sequi explicabo vel impedit officia corrupti debitis ullam nesciunt, non eum modi similique eveniet. Optio repudiandae numquam culpa accusantium, unde doloremque temporibus laborum.
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Update Product</button>
                </div>
              </div>
            </div>
          </div>


          <h1>All Product List: {totalProductCount}</h1>
          <table className='table table-striped table-bordered table-responsive'>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Brand</th>
                <th scope="col">Count In Stock</th>
                <th scope="col">Rating</th>
                <th scope="col">Number of Reviews</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              {allproductrecord.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>
                  <td>{item.countInStock}</td>
                  <td>{item.rating}</td>
                  <td>{item.numReviews}</td>
                  <td className='d-flex'>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-success me-1'><Link to={`/updateproduct/${item._id}`}>Edit</Link> </button>
                    <button className='btn btn-danger' onClick={() => deleteProductItem(item._id)}><MdDeleteOutline /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>;
   
      default:
        return <div>Home Content</div>;
    }
  };

  return (
    <>
      <section>
        <div className="d-flex">
          {/* Sidebar */}
          <div className={`bg-dark text-white p-3 ${sidebarOpen ? 'd-block' : 'd-none d-md-block'}`} style={{ minWidth: '200px', maxWidth: "260px" }}>
            <div className="hjhj" style={{position:"sticky", top:"20px"}}>

            <h4>Dashboard</h4>
            <button className="btn btn-outline-light w-100 my-2" onClick={() => setActiveTab('home')}>
              Home
            </button>
            <button className="btn btn-outline-light w-100 my-2" onClick={() => setActiveTab('Create Product')}>
              Create Product
            </button>
            <button className="btn btn-outline-light w-100 my-2" onClick={() => setActiveTab('All Products')}>
              All Products
            </button>
            <button className="btn btn-outline-light w-100 my-2" onClick={() => setActiveTab('All Users')}>
              All Users
            </button>
        
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow-1 p-3 maindashcontent">
            <button className="btn btn-primary mb-3" onClick={toggleSidebar}>
              x
            </button>
            {renderContent()}
          </div>
        </div>
      </section>
    </>

  );
}

export default Dashboard;
