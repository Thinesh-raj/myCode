import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.scss"

function Dashboard() {
    const [empData, setEmpData] = useState([]);
    const [part, setPart] = useState([]);
    const [btn, setBtn] = useState(0);
    let item = localStorage.getItem("name")
    let Admin = item.substring(1, item.length - 1);
    let arrlen1 = empData.length / 5;
    let arrlen2 = Math.floor(empData.length / 5);
    empData.length <= 5 ? arrlen2 = 0 : ((arrlen1 % arrlen2) === 0 ? arrlen2 = arrlen2 + 0 : arrlen2 = arrlen2 + 1);
    useEffect(() => {
        axios.get("http://localhost:3000/employee", { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then((res) => {
                setEmpData(res.data)
                setPart(res.data.slice(0, 5))
            })
    }, [])
    function buttonhandler(order) {
        let endindex = order * 10 / 2;
        let startindex = endindex - 5;
        setPart(empData.slice(startindex, endindex))
    }
    function search(e) {
        const filtered = empData.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(e.target.value)));
        setPart(filtered)
    }
    function deleteEmp(id) {
        axios.delete("http://localhost:3000/employee/" + id, { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then((res) => {
                setPart(part.filter(e => e.id != id));
                let copy = empData.filter(e => e.id != id);
                setEmpData(copy);
                let diff1 = Math.floor(copy.length / 5);
                let diff2 = copy.length / 5;
                if (diff2 % diff1 == 0) {
                    let startindex = copy.length - 5;
                    let endindex = copy.length;
                    setPart(empData.slice(startindex, endindex))
                    setBtn(diff1 - 1)
                }
            })
    }
    return <div className="container">
        <div className="navbar"><h2>Home</h2><Link className="create" to={"/add"}>Create Employee</Link><p>{Admin}</p><Link to={"/"}>Logout</Link></div>
        <div><h1>Welcome to Admin Panel</h1></div>
        <div className="deatails">
            <p><b>Total Count</b>:{empData.length}</p>
            <div>  <span>Search</span><input onChange={search} /></div>
        </div>
        {part.length == 0 && <p className="nodata">No data found..</p>}
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile.No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Createdate</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {part.map(e => {
                    return <tbody key={e.id}>
                        <tr >
                            <td>{e.id}</td>
                            <td><img src={"./Images/img1"} /></td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.mobile}</td>
                            <td>{e.designation}</td>
                            <td>{e.gender}</td>
                            <td>{e.course}</td>
                            <td>{e.createdate}</td>
                            <td><Link to={`/update/${e.id}`}>Update</Link><button onClick={() => deleteEmp(e.id)}>Delete</button></td>
                        </tr>
                    </tbody>
                })}
            </table>
        </div>
        <div className="btnorder">{
            Array(arrlen2).fill("").map((ele, ind) => {
                return <button onClick={() => { buttonhandler(ind + 1); setBtn(ind) }} className={btn == ind ? "btncolor" : "pagebtn"} id="btn">{ind + 1}</button>
            })
        }
        </div>
    </div>
}
export default Dashboard;