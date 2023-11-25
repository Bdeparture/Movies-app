import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import PageMenu from '../pageMenu';
import { useTheme } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import useMediaQuery from "@mui/material/useMediaQuery";
import MovieIcon from '@mui/icons-material/Movie';
import Box from '@mui/material/Box';

const pages = ['Movies', 'TV', 'People'];
const pageRoutes = ['/movie', '/tv', '/people'];

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography >
            <MovieIcon sx={{ display: { xs: 'none', md: 'flex' } }} />
          </Typography>
          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenMenu}
                  color="inherit">
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={open}
                  onClose={handleCloseMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}>
                  {pages.map((page, key) => {
                    let route = pageRoutes[key];
                    return (
                      <MenuItem key={page} onClick={handleCloseMenu}>
                        <Typography
                          textAlign="center"
                          component={Link}
                          to={route}
                          sx={{ textDecoration: 'none', color: 'black' }}>
                          {page}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Box>
              <MovieIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <PageMenu key={page} page={page}></PageMenu>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};
export default SiteHeader;