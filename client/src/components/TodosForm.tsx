import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const TodosForm: React.FC = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "todoName", headerName: "Todo name", width: 230 },
    { field: "todoDescription", headerName: "Todo description", width: 450 },
    {
      field: "age",
      headerName: "Time Stamp",
      type: "number",
      width: 150,
    },
  ];

  const rows = [
    { id: 1, todoDescription: "Snow", todoName: "Jon", age: 3 },
    { id: 2, todoDescription: "Lannister", todoName: "Cersei", age: 356 },
    { id: 3, todoDescription: "Lannister", todoName: "Jaime", age: 354 },
    { id: 4, todoDescription: "Stark", todoName: "Arya", age: 34 },
    { id: 5, todoDescription: "Targaryen", todoName: "Daenerys", age: 45 },
    { id: 6, todoDescription: "Melisandre", todoName: null, age: 55 },
    { id: 7, todoDescription: "Clifford", todoName: "Ferrara", age: 35 },
    { id: 8, todoDescription: "Frances", todoName: "Rossini", age: 35 },
    { id: 9, todoDescription: "Roxie", todoName: "Harvey", age: 37 },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: 550, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </div>
    </Box>
  );
};

export default TodosForm;
