import React, { useState, useReducer } from 'react';
import "../style/Studentdata.css"

const initialdata = [
  { id: 1, Name: "Raj", class: "XI", BloodGroup: "B+ve" },
  { id: 2, Name: "Naren", class: "XII", BloodGroup: "O+ve" },
  { id: 3, Name: "Pranav", class: "X", BloodGroup: "A+ve" },
  { id: 4, Name: "Balu", class: "IX", BloodGroup: "B-ve" },
  { id: 5, Name: "Naruto", class: "XII", BloodGroup: "AB-ve" },
  { id: 6, Name: "Sasuke", class: "VII", BloodGroup: "B+ve" },
  { id: 7, Name: "Kakshi", class: "VI", BloodGroup: "B-ve" },
  { id: 8, Name: "Minato", class: "VIII", BloodGroup: "AB+ve" },
  { id: 9, Name: "Jiraya", class: "IX", BloodGroup: "A+ve" },
  { id: 10, Name: "Itachi", class: "XII", BloodGroup: "B-ve" }
];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA":
      if (state.length === 0)
        return [{ id: 1, Name: action.Name, class: action.class, BloodGroup: action.BloodGroup }];
      else
        return [...state, { id: state[state.length - 1].id + 1, Name: action.Name, class: action.class, BloodGroup: action.BloodGroup }];
    case "DELETE_DATA":
      return state.filter((todo) => todo.id !== action.id);
    case "UPDATE_DATA":
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            Name: action.Name || item.Name,
            class: action.class || item.class,
            BloodGroup: action.BloodGroup || item.BloodGroup
          };
        }
        return item;
      });
    default:
      return state;
  }
}

function Studentdata() {
  const [studentdata, dispatch] = useReducer(reducer, initialdata);
  const [stdname, setName] = useState("");
  const [stdclasss, setStdclass] = useState("");
  const [blood, setBlood] = useState("");
  const [updateId, setUpdateId] = useState(null); 

  const handleAddClick = () => {
    if (updateId !== null) {
    
      dispatch({ type: "UPDATE_DATA", id: updateId, Name: stdname, class: stdclasss, BloodGroup: blood });
      setUpdateId(null);
    } else {
      dispatch({ type: "ADD_DATA", Name: stdname, class: stdclasss, BloodGroup: blood });
    }
    
    setName("");
    setStdclass("");
    setBlood("");
  }

  const handleUpdateClick = (id) => {
    const itemToUpdate = studentdata.find((item) => item.id === id);
    if (itemToUpdate) {
      setName(itemToUpdate.Name);
      setStdclass(itemToUpdate.class);
      setBlood(itemToUpdate.BloodGroup);
      setUpdateId(id); 
    }
  }

  function RecordCountCard({ count }) {
    return (
      <div className="record-count-card">
        <h2>Total Student Count</h2>
        <p>{count} records</p>
      </div>
    );
  }

  return (
    <div className='student-data'>
      <RecordCountCard count={studentdata.length} />
      <h1>Student Data</h1>
      <input type='text' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} value={stdname} />
      <input type='text' placeholder='Enter Class' onChange={(e) => setStdclass(e.target.value)} value={stdclasss} />
      <input type='text' placeholder='Enter BloodGroup' onChange={(e) => setBlood(e.target.value)} value={blood} />
      <button onClick={handleAddClick}>Add/Update</button>

     

      <table className="student-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Class</th>
            <th>Blood Group</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {studentdata.map((item) => (
            <tr key={item.id} className='"student-row"'>
              <td>{item.id}</td>
              <td>{item.Name}</td>
              <td>{item.class}</td>
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

export default Studentdata;
