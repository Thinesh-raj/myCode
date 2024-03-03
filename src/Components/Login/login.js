import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss"

function Login() {
    const Navigate = useNavigate();
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [alert1, setAlert1] = useState(false);
    const [alert2, setAlert2] = useState(false);
    const [alert3, setAlert3] = useState(false);
    function validate() {
        name.length === 0 ? setAlert1(true) : setAlert1(false);
        pass.length === 0 ? setAlert2(true) : setAlert2(false);
        (pass.length !== 0 && name.length !== 0) && (
            axios.get("http://localhost:3000/login", { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
                .then((res) => res.data.map(e => {
                    if (e.name == name && e.pass == pass) {
                        Navigate(`/dashboard`)
                        setAlert3(false)
                        localStorage.setItem("name", JSON.stringify(name)) // to store name in local storage
                    }
                    else setAlert3(true)
                    setName("");
                    setPass("");
                    return 0; // just for return only
                })))
    }
    return <div className="container">
        <div className="wrap">
            <h1>Login</h1>
            {alert3 && <p className="alert">###Invalid Entry###</p>}
            <p>Name</p>
            <input value={name} onChange={(e => setName(e.target.value))} />
            {alert1 && <small className="s1">Name is Invalid</small>}
            <p>Password</p>
            <input value={pass} onChange={(e => setPass(e.target.value))} />
            {alert2 && <small className="s2">password is Invalid</small>}
            <p></p>
            <button onClick={validate}>Login</button>
        </div>
    </div>
}
export default Login;