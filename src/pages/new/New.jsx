import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [input,setInput]=useState({

    Name:"",
    Title:"",
    Location :"",
    Birth:"",
    Sallary:"",
    Country:"",
    Gender:""

  })

// input change handler function 
const handleInputChange =(event)=>{
  const { name, value } = event.target;

  setInput((prevState) => {
    return {
      ...prevState,
      [name]: value,
    };
  });
}


// add data to json server 

const addNew = async (e) => {
  e.preventDefault()
  try {
  await axios.post(`http://localhost:3000/data`,input);
   
  } catch (error) {
    console.log(error);
  }
  setInput([...input,{
  Name:"",
  Title:"",
  Location :"",
  Birth:"",
  Sallary:"", 
  Country:"",
  Gender:""}])
};






  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input,index) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
              
                  <input type={input.type} placeholder={input.placeholder}  value={input[index]}  name={input.name} onChange={handleInputChange} />
                </div>
              ))}
              <button onClick={addNew}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
