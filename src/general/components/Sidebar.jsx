import React from 'react';
import { useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Sidebar.css';
import { TextField, Typography } from '@mui/material';

export default function Sidebar({ isSidebarExpanded, toggleSidebar }) {
  const theme = useTheme();

  return (
    <MuiDrawer
      variant="persistent"
      open={true}
      classes={{
        paper: isSidebarExpanded ? 'drawer-open' : 'drawer-close',
      }}
    >
      <div className="drawer-header">
        <IconButton onClick={toggleSidebar}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
        {isSidebarExpanded && (
          <Typography variant="h6" className="welcome-message">
           ¡Bienvenido!
          </Typography>
        )}
      </div>
      <Divider />
      <List>
        {SidebarData.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {isSidebarExpanded && <ListItemText primary={item.title} />}
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
}