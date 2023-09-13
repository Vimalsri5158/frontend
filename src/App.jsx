/* eslint-disable no-dupe-keys */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import { backendUrl } from "./config";

const UserDialog = ({ handleDialog, fetchStudents }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    gender: "male",
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    await fetch(`${backendUrl}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    await fetchStudents();
    handleDialog();
  };



  return (
    <div className="dialog">
      <div className="dialog-root">
        <form
          onSubmit={handleSubmit}
          style={{
            marginLeft: "20px",
            marginTop: "30px",
            color: "white",
            fontSize: "14px",
          }}
        >
          <label htmlFor="name">Name:</label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <br />

          <label htmlFor="age">Age:</label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          <br />

          <label htmlFor="dob">Date of Birth:</label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
          <br />

          <label>Gender:</label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <br />

      
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            required
          />
          <br />

          <button
            type="submit"
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "100px",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}


function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [students, setStudents] = useState([]);

  const handleDialog = () => {
    setShowDialog(!showDialog);
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${backendUrl}/students`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error("Failed to fetch student data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveStudent = (studentId) => {
    const updatedStudents = students.filter((student) => student.id !== studentId);
    setStudents(updatedStudents);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
<>

    <div className="container">
      <div className="row" style={{display:'flex'}}>
        <div className="col-md-8">
          <h2 className="font-weight-bold text-maroon" style={{ color: 'green', fontSize: '20px', marginLeft: '10rem' }}>LIST OF STUDENTS</h2>
        </div>
        <div className="col-md-4">
          <button onClick={handleDialog} className="btn btn-primary" style={{ color: 'green', fontSize: '20px', marginLeft: '50rem' }}>ADD</button>
        </div>
      </div>
      <div className="row-m4">
        {students.map(student => (
          <div className="col-md-4 mb-4" key={student.id}>
            <div className="card">
              <img src={student.imageUrl} className="card-img-top" alt={student.name} width="200px" height="150px" />
              <div className="card-body">
                <p className="card-title font-weight-bold"><span style={{ fontWeight: 'bold' }}>NAME:</span> {student.name}</p>
                <p className="card-text"><span style={{ fontWeight: 'bold' }}>AGE:</span> {student.age}</p>
                <p className="card-text"><span style={{ fontWeight: 'bold' }}>DOB:</span> {student.dob}</p>
                <p className="card-text"><span style={{ fontWeight: 'bold' }}>GENDER:</span> {student.gender}</p>
                <button
                  onClick={() => handleRemoveStudent(student.id)}
                  style={{
                    backgroundColor: 'maroon',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {showDialog && <UserDialog handleDialog={handleDialog} fetchStudents={fetchStudents} handleRemoveStudent={handleRemoveStudent}/>}
                  </>
    );
}

export default App;