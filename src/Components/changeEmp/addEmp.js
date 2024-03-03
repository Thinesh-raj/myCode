import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./change.scss"
function AddEmployee() {
    const obj = useParams();
    const Navigate = useNavigate();
    const date = new Date().toLocaleDateString()
    const [empData, setEmpData] = useState({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: "",
        image: "",
        createdate: date
    });
    const [alert1, setAlert1] = useState(false);
    const [alert2, setAlert2] = useState(false);
    const [alert3, setAlert3] = useState(false);
    const [alert4, setAlert4] = useState(false);
    const [alert5, setAlert5] = useState(false);
    function change(e) {
        const { name, value } = e.target;
        if (name == "email") {
            axios.get("http://localhost:3000/employee", { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
                .then((res) => {
                    res.data.filter(e => e.id != obj.id).map((e => {
                        e.email == value ? setAlert3(true) : setAlert3(false);
                    }))
                })
        }
        setEmpData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    function submit() {
        let check = empData.name == "" || empData.email == "" || empData.mobile == "" || empData.designation == "" ||
            empData.couse == "" || empData.gender == ""
        setAlert1(check)
        setAlert2(empData.mobile.length < 10);
        let mailCheck = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        (mailCheck.test(empData.email)) ? setAlert4(false) : setAlert4(true);
        setAlert5(empData.image.indexOf("jpg") == -1 && empData.image.indexOf("png") == -1)
        if (!check && empData.mobile.length >= 10 && mailCheck.test(empData.email) && !alert3) {
            axios.post("http://localhost:3000/employee", empData, { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
                .then(res => console.log(res.data))
                .catch(err => console.log(err.message))
            setEmpData({
                name: "",
                email: "",
                mobile: "",
                designation: "",
                gender: "",
                course: "",
                image: "",
                createdate: date
            })
        }
    }
    return <div className="content">
        <div>
            <h1>Create Employee</h1>
            <Link to={"/dashboard"}>Back to Home</Link>
            {alert1 && <h3>All input fields are Required</h3>}
            <p>Name</p>
            <input value={empData.name} name="name" onChange={change} />
            <p>Email</p>
            <input value={empData.email} name="email" onChange={change} />
            {alert3 && <small className="s1">Email already exists</small>}
            {alert4 && <small className="s1">Invalid Email</small>}
            <p>Mobile.No</p>
            <input value={empData.mobile} name="mobile" onChange={change} type="number" />
            {alert2 && <small className="s2">10 digits required</small>}
            <p>Designation</p>
            <select value={empData.designation} name="designation" onChange={change}>
                <option>Select</option>
                <option>HR</option>
                <option>Manager</option>
                <option>Sales</option>
            </select>
            <p>Gender</p>
            <input type="radio" readOnly checked={empData.gender == "M"} onChange={e => setEmpData({ ...empData, gender: "M" })} /><span>M</span>
            <input type="radio" readOnly checked={empData.gender == "F"} onChange={e => setEmpData({ ...empData, gender: "F" })} /><span>F</span>
            <p>Course</p>
            <input type="checkbox" readOnly checked={empData.course == "MBA"} onChange={e => setEmpData({ ...empData, course: "MBA" })} /><span>MBA</span>
            <input type="checkbox" readOnly checked={empData.course == "BSC"} onChange={e => setEmpData({ ...empData, course: "BSC" })} /><span>BSC</span>
            <input type="checkbox" readOnly checked={empData.course == "BCA"} onChange={e => setEmpData({ ...empData, course: "BCA" })} /><span>BCA</span>
            <p>Image</p>
            <input type="file" name="image" onChange={change} />
            {alert5 && <small className="s3">File should be in png/jpg</small>}
            <p></p>
            <button onClick={submit}>Add</button>
        </div>
    </div>
}
export default AddEmployee;