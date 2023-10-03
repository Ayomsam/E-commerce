import "./Assets/Login.css"
import { useState } from "react"
import mail_icon from "./Assets/email.png"
import password_icon from "./Assets/password.png"
import person_icon from "./Assets/person.png"
import call from "./Assets/call.png"
import fail from "./Assets/fail.png"
import pass from "./Assets/pass.png"
import loading from "./Assets/loading.png"
import { Link } from 'react-router-dom';

import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


const Login = () => {
    const history = useHistory()

    const [action, setAction] = useState("Sign Up")
    const [submitparam, setsubmitparam] = useState("")


    const [usernamelabel, setusernamelabel] = useState("")
    const [phonenumberlabel, setphonenumberlabel] = useState("")
    const [maillabel, setmaillabel] = useState("")
    const [passwordlabel, setpasswordlabel] = useState("")
    const [passwordlabel2, setpasswordlabel2] = useState("")


    const [usernamefield, setusernamefield] = useState(false)
    const [phonenumberfield, setphonenumberfield] = useState(false)
    const [mailfield, setmailfield] = useState(false)
    const [passwordfield, setpasswordfield] = useState(false)
    const [password2field, setpassword2field] = useState(false)


    const [usernameinput, setusernameinput] = useState("")
    const handleUsername = (e) => {
        const usernameinput = e.target.value;
        setusernameinput(usernameinput)
        if (usernameinput.length < 4) {
            setusernamelabel("*Minimum of four characters")
            setusernamefield(false)
        } else {
            setusernamelabel("")
            setusernamefield(true)
        }
    }

    const [phonenumber, setphonenumber] = useState("")
    const handlenumber = (e) => {
        const input = e.target.value;
        const validnumber = input.replace(/[^\d]/g, '').slice(0, 11);
        setphonenumber(validnumber)
        if (validnumber.length <= 10) {
            setphonenumberlabel("*Please input a valid phone number")
            setphonenumberfield(false)
        } else {
            setphonenumberlabel("")
            setphonenumberfield(true)
        }
    }

    const [email, setemail] = useState()
    const [isemailvalid, setisemailvalid] = useState(false)
    const handleemail = (e) => {
        const input = e.target.value;
        const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setemail(input)
        setisemailvalid(emailpattern.test(input))
        if (!emailpattern.test(input)) {
            setmaillabel("*Please input a valid e-mail address")
            setmailfield(false)
        } else {
            setmaillabel("")
            setmailfield(true)
        }
    }

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const handlePassword = (e) => {
        const input = e.target.value;
        setPassword(input);
        setIsPasswordValid(input.length >= 8);
        setConfirmPassword("")
        if (input.length < 8) {
            setpasswordlabel("*Minimum of eight characters");
            setpasswordfield(false)
        } else {
            setpasswordlabel("");
            setpasswordfield(true)
        }
        setConfirmPassword("");
        setpasswordlabel2("");
    };

    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const handleConfirmPassword = (e) => {
        const input = e.target.value;
        setConfirmPassword(input);
        setIsPasswordMatch(input === password);
        if (input !== password) {
            setpasswordlabel2("*Password do not correspond");
            setpassword2field(false)
        } else {
            setpasswordlabel2("");
            setpassword2field(true)
        }

    };



    const handlesubmit = (e) => {
        e.preventDefault();

        if (action === "Sign Up") {
            if (usernamefield && phonenumberfield && mailfield && passwordfield && password2field) {
                history.push('/mainpage?username=' + usernameinput);
            }
        } else if (action === "Login") {
            if (usernamefield && passwordfield) {
                history.push('/mainpage?username=' + usernameinput);
            }
        }
    }



    return (
        <div className="container">
            <div className="submit-container">
                <div className={action === "Login" ? "toggle gray" : "toggle"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                <div className={action === "Sign Up" ? "toggle gray" : "toggle"} onClick={() => { setAction("Login") }}>Log In</div>
            </div>
            <div className="header">
                <div className="text">
                    {action}
                </div>
                <div className="underline">

                </div>
            </div>
            <div className="inputs">

                <div>

                    <label htmlFor="">{usernamelabel}</label>
                    <div className="input">
                        <img src={person_icon} alt="" />
                        <input type="text" placeholder={action === "Login" ? "Username / ID" : "Choose Prefered Username / ID"} value={usernameinput} onChange={handleUsername} />
                        <img src={usernameinput.trim() !== "" && usernameinput.length > 3 ? pass : loading} alt="" />
                    </div>
                </div>

                {action === "Login" ? <div></div> :
                    <div>
                        <label htmlFor="">{phonenumberlabel}</label>
                        <div className="input">
                            <img src={call} alt="" />
                            <input type="tel" placeholder="Phone Number" value={phonenumber} onChange={handlenumber} max="11" />
                            <img src={phonenumber.length === 11 ? pass : loading} alt="" />
                        </div>
                    </div>}

                {action === "Login" ? <div></div> : <div>
                    <label htmlFor="">{maillabel}</label>
                    <div className="input">
                        <img src={mail_icon} alt="" />
                        <input
                            type="email"
                            placeholder="E-mail address"
                            value={email}
                            onChange={handleemail}
                            pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" />
                        <img src={isemailvalid ? pass : loading} alt="" />
                    </div>
                </div>}

                <div>
                    <label htmlFor="">{passwordlabel}</label>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
                        <img src={isPasswordValid ? pass : loading} alt="" />
                    </div>
                </div>

                {action === "Login" ? <div></div> :
                    <div>
                        <label htmlFor="">{passwordlabel2}</label>
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPassword} />
                            <img src={isPasswordMatch && confirmPassword.length >= 8 ? pass : fail} alt="" />
                        </div>
                    </div>}

            </div>
            {action === "Sign Up" ? <div></div> : <div className="forgot-password">Forgot password? <span className="forgot-span">Click here</span></div>}
            <Link to={submitparam} onClick={handlesubmit}><div className="submit">Submit</div></Link>
            <Link to={"/visitor"} style={{ textDecoration: "underline", margin: "1rem 0" }}>View as guest instead</Link>
        </div>
    );
}

export default Login;