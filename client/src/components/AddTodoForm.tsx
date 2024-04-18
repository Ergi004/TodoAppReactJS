import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import "../components/styles.css";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { mainListItems, secondaryListItems } from "./listItems";
import Logout from "./Logout";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TodosForm from "./TodosForm";
// TODO remove, this demo shouldn't need to reset the theme.
const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: string) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
              bgcolor: "#B0926A",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Welcome to TodoApp
            </Typography>
            <Logout />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Grid
          item
          sx={{
            margin: "0 auto",
            maxWidth: "1200px",
            display: "flex",
            flexDirection: "column",
          }}
          xs={9}
          sm={8}
          md={8}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 18,
              mx: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
              }}
              component="h1"
              variant="h5"
            >
              Here you can asign your Todos
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 10, display: "flex", flexDirection: "column" }}
            >
              <TextField
                sx={{ margin: "5px auto", maxWidth: "800px" }}
                aria-required
                required
                fullWidth
                label="Task Name"
                type="text"
                autoComplete="current-password"
              />
              <TextField
                sx={{ margin: "5px auto", maxWidth: "800px" }}
                aria-required
                required
                fullWidth
                label="Task Description"
                type="text"
                autoComplete="current-password"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "10px auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 25px",
                  margin: "0 10px",
                  bgcolor: "#C3EDC0",
                  borderRadius: "7px",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<RadioButtonCheckedIcon />}
                      icon={<RadioButtonUncheckedIcon />}
                    />
                  }
                  label="Later"
                />{" "}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 25px",
                  margin: "0 10px",
                  bgcolor: "#64CCDA",
                  borderRadius: "7px",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<RadioButtonCheckedIcon />}
                      icon={<RadioButtonUncheckedIcon />}
                    />
                  }
                  label="Normal"
                />
              </Box>
              <Box
              
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 25px",
                  margin: "0 10px",
                  bgcolor: "#FFAF45",
                  borderRadius: "7px",
                }}
                
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<RadioButtonCheckedIcon />}
                      icon={<RadioButtonUncheckedIcon />}
                    />
                  }
                  label="Important"
                />{" "}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 25px",
                  margin: "0 10px",
                  bgcolor: "#E72929",
                  borderRadius: "7px",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<RadioButtonCheckedIcon />}
                      icon={<RadioButtonUncheckedIcon />}
                    />
                  }
                  label="Urgent"
                />{" "}
              </Box>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#B0926A",
                maxWidth: "650px",
                margin: "20px auto",
              }}
              className="sign-in-btn"
            >
              Add Todo
              <AddIcon sx={{ marginLeft: "15px" }} />
            </Button>
            <Box>
              <TodosForm />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
