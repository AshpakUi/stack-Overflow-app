import React from 'react'
import Loader from "../../components/Loder/Loder.jsx"
import {useSelector} from "react-redux"
import User from './User'
import "./Users.css"

const UserList = () => {
   const users=useSelector((state)=>state.usersReducer)
  return (
   <div className="userList-container">
    {users===null?<Loader/>:
      users.map((user)=>
      <User user={user} key={user._id}/>
      )
    }
   </div>
  )
}

export default UserList
