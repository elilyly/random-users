import React, {useEffect, useState} from 'react';
import './App.css';
import LikeButton from './LikeButton';

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

  const incrementLikes = (email) => {
    let likedUser = users.find( (user) => {
      return user.email === email
    });
     if( !likedUser.userLikes ) likedUser.userLikes = 0;
      likedUser.userLikes += 1;
      setUsers([...users])
    }
    //or solve with for loop
    // for(let i = 0; i < users.length; i++){
    //   if(users[i].email === likedUser) {
    //     if( !users[i].userLikes ) {
    //         users[i].userLikes = 0;
    //     }
    //       users[i].userLikes = users[i].userLikes + 1;
    //       setUsers([...users])
    //   }
    // }



  const displayUsers = () => {
    console.log("USERS", users)
    let filteredUsers = filterUsers();
    return filteredUsers.map((user, i) => {
      return (
        <div key={user.id.value} className="user-container">
          {user.name.first}
          <img src={user.picture.large}/>
          <LikeButton userId={user.id.value} onClick={()=> incrementLikes(user.email)} likes={user.userLikes}/>
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
      <input place-holder="search name" onChange={handleChange} value={input}></input>
      <div className="App">
        {displayUsers()}
      </div>
      <button onClick={addMore}>Add More Users</button>
    </>
  );
}

export default App;
