import { useState } from "react";
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
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Sidebar = () => {
  const userRole = useSelector(selectUserRole);
  const [open, setOpen] = useState({});

  const handleClick = (index) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [index]: !prevOpen[index],
    }));
  };

  const handleChildClick = (e) => {
    e.stopPropagation();
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
          <div key={link.id || index}>
            {link.childrens ? (
              <>
                <ListItem button onClick={() => handleClick(index)}>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.text} />
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                  {link.childrens.map((child, idx) => (
                    <ListItem
                      button
                      key={child.id || idx}
                      component={Link}
                      to={child.to}
                      onClick={handleChildClick}
                      style={{ paddingLeft: "40px" }}
                    >
                      <ListItemIcon>{child.icon}</ListItemIcon>
                      <ListItemText primary={child.text} />
                    </ListItem>
                  ))}
                </Collapse>
              </>
            ) : (
              <ListItem
                button
                component={Link}
                to={link.to}
                key={link.id || index}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.text} />
              </ListItem>
            )}
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
