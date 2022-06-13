import React,{useState} from 'react';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Box, List, ListItem, makeStyles, Popover, Typography } from '@material-ui/core';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';



const Notification = ({ count }) => {
    //    popover states
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const [Noti, setNoti] = useState([
        {
            name: 'Profile',
            messeage: 'inbox',
     
        },
        {
            name: 'profiel2',
            messeage: 'inbox2',
            
     
        },
        {
            name: 'profiel3',
            messeage: 'inbox3',
          
        },
      
    ])
    const [totalNotification,setTotalNotification]=useState(Noti.length)

    // popover functions
    const handleClick = (event) => {
          
        setTotalNotification(null)
        setAnchorEl(event.currentTarget);
       
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const useNotification = makeStyles({
        circle: {
            width: 36,
            height: 36,
            borderRadius: 18 //half radius will make it cirlce,
        }
    });

    const classes = useNotification();

    const handleRead = (index) => {
        const newarray = Noti.filter((item, i) =>i !== index );
        setNoti(newarray);
    };

    return (
        <>
            <Badge
                badgeContent={totalNotification}
                color='primary'
                onClick={handleClick}
                className={classes.cirlce}
            >
                <NotificationsNoneIcon />
            </Badge>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                style={{ width: '300px', height: '300px' }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <nav aria-label='main mailbox folders'>    
                        <List>
                        {Noti.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={'dropdown notification' + index}
                                style={{minWidth:'100px',minHeight:'80px'}}
                                    >
                                    <ListItem onClick={() => handleRead(index)}>
                                        <ListItemButton>
                                            <ListItemText>  {item.name}</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                </div>
                            );
                        })}
                    </List>
                            
                            
                            

                    </nav>
                </Box>
            </Popover>
        </>
    );
};

export default Notification;
