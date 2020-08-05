import React, {useEffect, useState} from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState(undefined);
  const [addMoreUsers, setAddMoreUsers] = useState(3);

  useEffect( () => {
    fetchData(12)
  }, []);

  const fetchData = (numberOfUsers) => {
    let url = `https://randomuser.me/api/?results=${numberOfUsers}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
          setUsers([...users, ...data.results])
  //^using spread operator to upack all of the elements of users array
  //and data.results array into this new array, which happens to be the users state array
      })
      .catch(error => console.log('error'))
  }

  const displayUsers = () => {
    console.log("USERS", users)
    let filteredUsers = filterUsers();
    return filteredUsers.map((user, i) => {
      return (
        <div key={i} className="user-container">
          {user.name.first}
          <img src={user.picture.large}/>
        </div>
      )
    });
  }

  const filterUsers = () => {
    return users.filter((user) => {
      if(!input) {
        return user.name.first
      } else if(input){
        return user.name.first.includes(input)
      }
    })
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const addMore = () => {
    fetchData(3);
    setAddMoreUsers(addMoreUsers + 3);
  }

  return (
    <>
      <input placeHolder="search name" onChange={handleChange} value={input}></input>
      <div className="App">
        {displayUsers()}
      </div>
      <button onClick={addMore}>Add More Users</button>
    </>
  );
}

export default App;
