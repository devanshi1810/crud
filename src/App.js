import axios from 'axios';
import React,{useState,useEffect} from 'react'
import "./crudcss.css";

export default function App() {

const [api, setApi] = useState([]); //all data

const [id,setId] = useState();
const [name,setName] = useState();
const [email,setEmail] = useState();
const [address,setAddress] = useState();
const [image,setimage] = useState();

const [deleteId, setDeleteId] = useState(null);
const [isEditMode, setIsEditMode] = useState(false);

const show = async ()=>{
  await axios.get(`https://64a3c1a4c3b509573b567b44.mockapi.io/crud`)
  .then((respose)=>{
    setApi(respose.data);
    console.log(api);
  });
};

const additeam = async() => {

  const data1 ={
    name: name,
    email: email,
    address: address,
    image: image,
  }

  await axios.post(`https://64a3c1a4c3b509573b567b44.mockapi.io/crud`,data1)
  .then((respose) => {
    setId("");
    setName("");
    setEmail("");
    setAddress("");
    setimage("");
    show()
  })
};

const delet = async(id)=>{
  setDeleteId(id)

;

  await axios.delete(`https://64a3c1a4c3b509573b567b44.mockapi.io/crud/${id}`)
  .then((respose)=>{
  show()
  setDeleteId(null)
  });
};

const edit= async()=>{
  const data2={
    name: name,
    email: email,
    address: address,
    image: image,
  };

  await axios.put(`https://64a3c1a4c3b509573b567b44.mockapi.io/crud/${id}`,data2)
  .then((respose)=>{
    setId("");
    setName("");
    setEmail("");
    setAddress("");
    setimage("");
    show();
  });
};

const enableEditMode = ()=>{
  setIsEditMode(true);
};

  useEffect(() => {
    show();
  },[]);

  return (
    
    <div className="container">
      <div className="databox">
        <form className="form">

          <input type='text' className='input' 
          placeholder='Enter Name' value={name}
          onChange={(e)=> setName(e.target.value)} />

          <br/>

          <input type='text' className='input' 
          placeholder='Enter Email' value={email}
          onChange={(e)=> setEmail(e.target.value)} />

          <br/>

          <input type='text' className='input' 
          placeholder='Enter Address' value={address}
          onChange={(e)=> setAddress(e.target.value)} />

          <br/>

          <input type='text' className='input' 
          placeholder='Enter image' value={image}
          onChange={(e)=> setimage(e.target.value)} />

          </form>

          <br/>


          <button onClick={()=>{
            if(isEditMode){
              edit(); 
            } else {
              additeam();
            }
            setIsEditMode(false);
          }}>

            {isEditMode ? "Edit" : "Add"}
          </button> 
      </div>
          <br/>

          <div>
            <table className="table" border={2}>

              <thead>
                
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NAME</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">ADDRESS</th>
                  <th scope="col">IMAGE</th>
                  <th scope="col">ACTION</th>
                </tr>

              </thead> 

              {api.map((val,index) => {
                return (
                  <tbody key={index}>

                    <tr>
                      <td>{val.id}</td>
                      <td>{val.name}</td>
                      <td>{val.email}</td>
                      <td>{val.address}</td>
                      <td> <img src={val.image} ></img></td>

                      <td>
                        <button onClick={() =>{
                          enableEditMode();
                          setId(val?.id);
                        setName(val?.name);
                        setEmail(val?.email);
                        setAddress(val?.address);
                        setimage(val?.image);
                        }}>
                          Edit
                        </button>
                        &nbsp;&nbsp;


                        <button onClick={() =>{
                          delet(val.id);
                        }}>
                          {deleteId === val?.id}
                            Delete
                        </button>
                      </td>
                    </tr>

                  </tbody>
                );
              })}

            </table>
          </div>

    </div>

  );
}   
