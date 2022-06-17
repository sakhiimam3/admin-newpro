import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { Badge } from "@mui/material";
import axios from "axios";

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [Noti, setNoti] = useState([]);
  const [totalNotification, setTotalNotification] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getNotificationData();
  }, []);

  // get  totol length of table data
  const getNotificationData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/userStatus`);
      setNoti(response.data);
      setTotalNotification(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  //   open notification poper  function
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setTotalNotification(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge badgeContent={totalNotification} color="primary">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {Noti.map((option, index) => (
          <MenuItem key={index}>{option.text}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}
