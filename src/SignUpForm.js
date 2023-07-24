import React, { useState } from 'react';
import './SignUpForm.css';
const SignUpForm = () => {

  const [CG_ID, setCGID] = useState('');
  const [CG_Email_Address, setEmail] = useState('');
  const [Full_Name, setName] = useState('');
  const [Phone_Number, setPhoneNumber] = useState('');
  const [Password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);


  const handleCGIDChange = (event) => {
    setCGID(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  //const handleSubmit = (event) => {
   const handleSubmit = async (event) => {
   event.preventDefault();
  
   ////////////////////////////////////////////////////////
   const res = fetch("https://inventory-management-t-default-rtdb.firebaseio.com/database.json",
   {
    method:"POST",
    headers:{
    "Content-Type":"application/json",
    },
    body: JSON.stringify({
        CG_ID,CG_Email_Address,Phone_Number,Full_Name,Password,
    }),
    }
    );
    if(res){
      alert("data stored");
    } else {
      alert("fill the data");
    }
   ///////////////////////////////////////////////////
   //validation

    const idPattern = /^\d{8}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phonePattern = /^\d{10}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

    if (!idPattern.test( CG_ID)) {
      alert('Invalid ID (8 digits required)');
      return;
    }

    
    if (!emailPattern.test( CG_Email_Address)) {
      alert('Invalid email');
      return;
    }

    if (!Full_Name) {
        alert('Name is required');
        return;
      }

    if (Phone_Number && !phonePattern.test(Phone_Number)) {
      alert('Invalid phone number (10 digits required)');
      return;
      //return false;
    }


    if (!passwordPattern.test(Password)) {
      alert(
        'Invalid password (minimum 8 characters, at least one digit and one special character)'
      );
      return;
    }

   //signup logic

    console.log('CGID:',  CG_ID);
    console.log('Email:',  CG_Email_Address);
    console.log('Name:', Full_Name);
    console.log('PhoneNumber:', Phone_Number);
    console.log('Password:', Password);

    // Reset form
    setCGID('');
    setEmail('');
    setName('');
    setPhoneNumber('');
    setPassword('');
    setShowPopup(true);
  };

  return (

    <div className ="container">
    <form onSubmit={handleSubmit}>
      
     
      <h2>Sign Up</h2>
      <h4>Create an Account</h4>
      

      <div className="form">
        <label htmlFor="CGID">CG ID(8 digits):<span className="required">*</span></label>
        <input
          type="text"placeholder="Enter your CG ID"
          id="CGID"
          value={CG_ID}
          onChange={handleCGIDChange}
          //length={8}
          required
        />
      </div>

      <div className="form">
        <label htmlFor="email">CG Email Address:<span className="required">*</span></label>
        <input
          type="email"placeholder="Enter your email address"
          id="email"
          value={ CG_Email_Address}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="form">
        <label htmlFor="name">Full Name:<span className="required">*</span></label>
        <input
          type="text"placeholder="Enter your name"
          id="name"
          value={Full_Name}
          onChange={handleNameChange}
          required
        />
      </div>

      <div className="form">
        <label htmlFor="phonenumber">Phone Number(10 digits):</label>
         <input
          type="text"placeholder="Enter your phone number(Optional)"
          id="phonenumber"
          value={Phone_Number}
          onChange={handlePhoneNumberChange}
         // length={10}
          //required
          />
      </div>

      
      <div className="form">
        <label htmlFor="password">Password:<br></br><div className="new">(minimum 8 characters, at least one digit and one special character)</div></label>
        <input
          type="password"placeholder="Enter Password"
          id="password"
          value={Password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
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