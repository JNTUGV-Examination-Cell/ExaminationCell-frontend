import React ,{useState}from "react";
import { Link } from "react-router-dom";
import RollData from "./RoleData";
import jntugv from "../../assests/jntugv.png";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../features/roles/roleSlice";
import "./Sidebar.css";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Sidebar = () => {
  const userRole = useSelector(selectUserRole);
  const [open, setOpen] = useState(false); 

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
        <img
          style={{ height: "100px", width: "100px" }}
          src={jntugv}
          alt="jntugv-logo"
        />
      </Box>
      <List>
        {RollData[userRole].map((link, index) => (
          <div key={index}>
            {link.childrens ? (
              <>
                <ListItem button onClick={handleClick}>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.text} />
                  {open ? <ExpandLess /> : <ExpandMore />} 
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  {link.childrens.map((child, idx) => (
                    <ListItem
                      button
                      key={idx}
                      component={Link}
                      to={child.to}
                      onClick={() => setOpen(false)} 
                      style={{ paddingLeft: "40px" }}
                    >
                      <ListItemIcon>{child.icon}</ListItemIcon>
                      <ListItemText primary={child.text} />
                    </ListItem>
                  ))}
                </Collapse>
              </>
            ) : (
              <ListItem button component={Link} to={link.to}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.text} />
              </ListItem>
            )}
          </div>
        ))}
      </List>
      {/* <List>
        {RollData[userRole].map((link, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={link.to}
            onClick={link.onclick}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  );
};

export default Sidebar;
