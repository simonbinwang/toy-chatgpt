// components/Layout.tsx
import React, { useState } from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";

const LeftPanel = styled(Box)(({ theme }) => ({
  width: "30%",
  height: "100vh",
  backgroundColor: theme.palette.grey[900],
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const RightPanel = styled(Box)(({ theme }) => ({
  width: "70%",
  height: "100vh",
  backgroundColor: theme.palette.grey[800],
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

type LayoutProps = {
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ leftChildren, rightChildren }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const left = <LeftPanel>{leftChildren}</LeftPanel>;

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      {left}
      <RightPanel sx={{ display: "flex", flexDirection: "column" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            // marginRight: 2,
            marginLeft: 1,
            display: { xs: "block", sm: "none" },
            // position: "absolute",
            top: 0,
          }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        {rightChildren}
      </RightPanel>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "80%",
          },
        }}
      >
        {left}
      </Drawer>
    </Box>
  );
};

export default Layout;
