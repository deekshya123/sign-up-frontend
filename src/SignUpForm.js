import React, { useState } from "react";
import "./SignUpForm.css";
import axios from "axios";

const SignUpForm = () => {
  const [CG_ID, setCGID] = useState("");
  const [CG_Email_Address, setEmail] = useState("");
  const [Full_Name, setName] = useState("");
  const [Phone_Number, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleCGIDChange = (event) => {
    const idPattern = /^\d{8}$/;

    if (!idPattern.test(CG_ID)) {
      setCGID(event.target.value);
      console.log("Invalid ID (8 digits required)");
      return;
    } else {
      setCGID(event.target.value);
    }
  };

  const handleEmailChange = (event) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(CG_Email_Address)) {
      setEmail(event.target.value);

      console.log("Invalid email");

      return;
    } else {
      setEmail(event.target.value);
    }
  };

  const handleNameChange = (event) => {
    if (!Full_Name) {
      setName(event.target.value);

      console.log("Name is required");

      return;
    } else {
      setName(event.target.value);
    }
  };

  const handlePhoneNumberChange = (event) => {
    const phonePattern = /^\d{10}$/;

    if (Phone_Number && !phonePattern.test(Phone_Number)) {
      setPhoneNumber(event.target.value);
      console.log("Invalid phone number (10 digits required)");
      return;
      //return false;
    } else {
      setPhoneNumber(event.target.value);
    }
  };

  const handlePasswordChange = (event) => {
    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordPattern.test(Password)) {
      setPassword(event.target.value);

      console.log(
        "Invalid password (minimum 8 characters, at least one digit and one special character)"
      );

      return;
    } else {
      setPassword(event.target.value);
    }
  };

  //const handleSubmit = (event) => {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      CG_ID: CG_ID,

      CG_Email_Address: CG_Email_Address,

      Full_Name: Full_Name,

      Phone_Number: Phone_Number,

      Password: Password,
    };

    axios

      .post("http://localhost:5000/signup", data)

      .then((res) => {
        alert(res?.data?.message);

        console.log(JSON.stringify(res));
      })

      .catch((e) => {
        alert(e);

        console.log("e", JSON.stringify(e));
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <h4>Create an Account</h4>

        <div className="form">
          <label htmlFor="CGID">
            CG ID(8 digits):<span className="required">*</span>
          </label>

          <input
            type="text"
            placeholder="Enter your CG ID"
            id="CGID"
            value={CG_ID}
            onChange={(event) => handleCGIDChange(event)}
            //length={8}

            required
          />
        </div>

        <div className="form">
          <label htmlFor="email">
            CG Email Address:<span className="required">*</span>
          </label>

          <input
            type="email"
            placeholder="Enter your email address"
            id="email"
            value={CG_Email_Address}
            onChange={(event) => handleEmailChange(event)}
            required
          />
        </div>

        <div className="form">
          <label htmlFor="name">
            Full Name:<span className="required">*</span>
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            value={Full_Name}
            onChange={(event) => handleNameChange(event)}
            required
          />
        </div>

        <div className="form">
          <label htmlFor="phonenumber">Phone Number(10 digits):</label>

          <input
            type="text"
            placeholder="Enter your phone number(Optional)"
            id="phonenumber"
            value={Phone_Number}
            onChange={(event) => handlePhoneNumberChange(event)}

          // length={10}

          //required
          />
        </div>

        <div className="form">
          <label htmlFor="password">
            Password:<br></br>
            <div className="new">
              (minimum 8 characters, at least one digit and one special
              character)
            </div>
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            value={Password}
            onChange={(event) => handlePasswordChange(event)}
            required
          />
        </div>

        <button onSubmit={() => handleSubmit()} type="submit">
          Sign Up
        </button>
      </form>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Sign Up Successful!</h2>

            <p>Thank you for signing up.</p>

            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
