import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/login";
import Dashboard from "./Dasboard/dashboard";
import ChangeEmp from "./changeEmp/updateEmp";
import AddEmployee from "./changeEmp/addEmp";

function Link() {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/update/:id" element={<ChangeEmp />} />
                <Route path="/add" element={<AddEmployee />} />
            </Routes>
        </BrowserRouter>
    </>
}
export default Link;