import React from "react";
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
} from "@mui/material";

const Sidebar = () => {
  const userRole = useSelector(selectUserRole);
  
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
      </List>
    </Drawer>
  );
};

export default Sidebar;
