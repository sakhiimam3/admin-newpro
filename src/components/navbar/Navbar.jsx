import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import React, { useContext ,useState} from "react";



const Data=[
  {id:1,detail:"lorem ipsum 1"},
  {id:2,detail:"lorem ipsum 2"},
  {id:3,detail:"lorem ipsum 3"},
  {id:4,detail:"lorem ipsum 4"},
  {id:5,detail:"lorem ipsum 5"},
]


const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [notiData,setnotiData]=useState(Data)
  const [show,setShow]=useState(false)

  // toggle menu Notifications 
    const Notification =()=>{
      setShow(true)
      if(show){
          setShow(false)
      }else{
          setShow(true)
      }
    }


const handleNotification=(index)=>{
      const newArry=notiData.filter((item,i)=> i !== index)
      setnotiData(newArry)
}

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon  onClick={Notification} className="icon" />
            {show ?  
             <div className="list_Notification">
                 <ul>
                    {!notiData ? <li>{}</li>:""}
                  {notiData.map((item,index)=>{
                       return <React.Fragment key={item.id}>
                          <li onClick={()=>handleNotification(index)}  >{item.detail}</li>
                       </React.Fragment>
                  })}
                 </ul>
      </div>
            :null}
           
            <div className="counter">{notiData.length}</div>
             
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
