import React, { useState, useReducer } from 'react';
import "../style/Teacherdata.css"

const initialdata = [
  { id: 1, Name: "Robert", email: "robertrag@gamil.com", BloodGroup: "A+ve" },
  { id: 2, Name: "Maddy", email: "maddysteel@gmail,com", BloodGroup: "O+ve" },
  { id: 3, Name: "Hari", email: "haricar@gmail.com", BloodGroup: "B+ve" },
  { id: 4, Name: "Ranjen", email: "ranjenfox@gmail.com", BloodGroup: "AB-ve" },
  { id: 5, Name: "Gowtham", email: "gowtham009@gmail.com", BloodGroup: "AB-ve" },
  { id: 6, Name: "Dhana", email: "dhana007@gmail.com", BloodGroup: "AB-ve" },
  { id: 7, Name: "Krishna", email: "krish00122@gmail.com", BloodGroup: "AB-ve" },
  { id: 8, Name: "Muthu", email: "muthu4412@gmail.com", BloodGroup: "AB-ve" },
  { id: 9, Name: "Zoro", email: "zorosword11@gmail.com", BloodGroup: "AB-ve" },
  { id: 10, Name: "Steve", email: "steve112@gmail.com", BloodGroup: "AB-ve" }
];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA":
      if (state.length === 0)
        return [{ id: 1, Name: action.Name, class: action.email, BloodGroup: action.BloodGroup }];
      else
        return [...state, { id: state[state.length - 1].id + 1, Name: action.Name, email: action.email, BloodGroup: action.BloodGroup }];
    case "DELETE_DATA":
      return state.filter((todo) => todo.id !== action.id);
    case "UPDATE_DATA":
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            Name: action.Name || item.Name,
            class: action.email || item.email,
            BloodGroup: action.BloodGroup || item.BloodGroup
          };
        }
        return item;
      });
    default:
      return state;
  }
}

function Teacherinfo() {
  const [teacherdata, dispatch] = useReducer(reducer, initialdata);
  const [stdname, setName] = useState("");
  const [stdemail, setEmail] = useState("");
  const [blood, setBlood] = useState("");
  const [updateId, setUpdateId] = useState(null); 

  const handleAddClick = () => {
    if (updateId !== null) {
     
      dispatch({ type: "UPDATE_DATA", id: updateId, Name: stdname, class: stdemail, BloodGroup: blood });
      setUpdateId(null); 
    } else {
      dispatch({ type: "ADD_DATA", Name: stdname, class: stdemail, BloodGroup: blood });
    }
 
    setName("");
    setEmail("");
    setBlood("");
  }

  const handleUpdateClick = (id) => {
    const itemToUpdate = teacherdata.find((item) => item.id === id);
    if (itemToUpdate) {
      setName(itemToUpdate.Name);
      setEmail(itemToUpdate.email);
      setBlood(itemToUpdate.BloodGroup);
      setUpdateId(id); 
    }
  }

  function RecordCountCard({ count }) {
    return (
      <div className="record-count-card">
        <h2>Total Teacher Count</h2>
        <p>{count} records</p>
      </div>
    );
  }

  return (
    <div className='teacher-data'>
      <RecordCountCard count={teacherdata.length} />
      <h1>Teacher Data</h1>
      <input type='text' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} value={stdname} />
      <input type='text' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} value={stdemail} />
      <input type='text' placeholder='Enter BloodGroup' onChange={(e) => setBlood(e.target.value)} value={blood} />
      <button onClick={handleAddClick}>Add/Update</button>

     

      <table className="teacher-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Blood Group</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teacherdata.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.Name}</td>
              <td>{item.email}</td>
              <td>{item.BloodGroup}</td>
              <td>
                <button className= "Delete-Button" onClick={() => dispatch({ type: "DELETE_DATA", id: item.id })}>Delete</button>
                <button onClick={() => handleUpdateClick(item.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Teacherinfo;
