import * as React from "react";
import { useEffect, useState } from "react";
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
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { mainListItems, secondaryListItems } from "./listItems";
import Logout from "./Logout";
import AddIcon from "@mui/icons-material/Add";
import FormControlLabel from "@mui/material/FormControlLabel";
import TodoList from "./TodoList";
import { AppBarProps } from "../models/models";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import TodoApi from "../api/todosApi";
// TODO remove, this demo shouldn't need to reset the theme.
const drawerWidth: number = 240;

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

interface ITodo {
  todo_id?: number;
  task_name?: string;
  description?: string;
  timestamp?: any;
  priority?: string;
}

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [todoName, setTodoName] = useState<string | any>("");
  const [description, setDesctription] = useState<string | any>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectedPriority, setSelectedPriority] = useState("Later");

  const handlePriorityChange = (e: any) => {
    setSelectedPriority(e.target.value);
  };

  const createTodo = async () => {
    const user_id = localStorage.getItem("user_id");
    await TodoApi.createTodo(user_id, todoName, description, selectedPriority);
    getTodosByUsrId();
  };

  const getTodosByUsrId = async () => {
    const user_id = localStorage.getItem("user_id");
    const todos = await TodoApi.getTodoByUserId(user_id);
    setTodos(todos.data.todo);
  };
  const handleUpdate = async (
    todo_id: number,
    todoName: string,
    description: string
  ) => {
    await TodoApi.updateTodo(todo_id, todoName, description);
    getTodosByUsrId();
  };

  useEffect(() => {
    getTodosByUsrId();
  }, []);

  const handleDelete = (todo_id: number) => {
    TodoApi.deleteTodo(todo_id);
    const newTodos = todos.filter((todo) => todo.todo_id !== todo_id);
    setTodos(newTodos);
  };

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
              Welcome to
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
            component="form"
            noValidate
            onSubmit={createTodo}
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
            <TextField
              sx={{ margin: "5px auto", maxWidth: "800px" }}
              aria-required
              required
              fullWidth
              label="Todo Name"
              type="text"
              onChange={(e) => setTodoName(e.target.value)}
              value={todoName}
              autoFocus
            />
            <TextField
              sx={{ margin: "5px auto", maxWidth: "800px" }}
              aria-required
              required
              fullWidth
              label="Todo Description"
              type="text"
              onChange={(e) => setDesctription(e.target.value)}
              value={description}
              autoFocus
            />
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
                  borderRadius: "7px",
                }}
              >
                <FormControl>
                  <FormLabel>Priotity</FormLabel>
                  <RadioGroup
                    sx={{ justifyContent: "space-between" }}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue="Later"
                    value={selectedPriority}
                    onChange={handlePriorityChange}
                  >
                    <FormControlLabel
                      sx={{
                        padding: "10px 30px",
                        bgcolor: "#B4B4B8",
                        borderRadius: "7px",
                        margin: "5px",
                      }}
                      value="Later"
                      control={<Radio />}
                      label="Later"
                    />
                    <FormControlLabel
                      sx={{
                        padding: "10px 30px",
                        bgcolor: "#008DDA",
                        borderRadius: "7px",
                        margin: "5px",
                      }}
                      value="Normal"
                      control={<Radio />}
                      label="Normal"
                    />
                    <FormControlLabel
                      sx={{
                        padding: "10px 30px",
                        bgcolor: "#FDA403",
                        borderRadius: "7px",
                        margin: "5px",
                      }}
                      value="Important"
                      control={<Radio />}
                      label="Important"
                    />
                    <FormControlLabel
                      sx={{
                        padding: "10px 30px",
                        bgcolor: "#E72929",
                        borderRadius: "7px",
                        margin: "5px",
                      }}
                      value="Urgent"
                      control={<Radio />}
                      label="Urgent"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Box>
            <Button
              onClick={() => createTodo()}
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
              <TodoList
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                todos={todos}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
