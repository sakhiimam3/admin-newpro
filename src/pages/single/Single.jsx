import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";



const Single = () => {

const {userId}=useParams()

  const [singleUser,setSingleUser]=useState({})


  const getSingleUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/data/${userId}`);
      setSingleUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getSingleUser()
  }, [])




  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://source.unsplash.com/1600x900/?beach"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{singleUser.Name}</h1>
                <div className="detailItem">
                  <span className="itemKey">{singleUser.title}</span>
                  <span className="itemValue">{singleUser.Gender}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">  Sallary : {singleUser.Sallary}</span>
               
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address : {singleUser.Location}</span>
                 
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country  :</span>
                  <span className="itemValue">{singleUser.Country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List singleUser={singleUser}/>
        </div>
      </div>
    </div>
  );
};

export default Single;
