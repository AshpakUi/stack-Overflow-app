import React, { useState    } from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import Avatar from '../../components/Avatar/Avatar';
import {useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBirthdayCake, faPen} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import EditProfileForm from './EditProfileForm';
import ProfileBio from './ProfileBio';
import Loader from "../../components/Loder/Loder"
import "./UserProfile.css";

function UserProfile() {
    const {id} = useParams()
    const user=useSelector((store)=>(store.usersReducer))
    const currentProfile=user?.filter((user)=>user._id===id)[0]
    const currentUser=useSelector((store)=>store.currentUserReducer)
    const [Switch,setSwitch]=useState(false)

  return (
    <div className='home-container-1'>
        <LeftSidebar/>
     <div className="home-container-2">
      {  user===null?<Loader/>
      :<section>
            <div className="user-details-container">
                <div className="user-datails">
                    <Avatar  backgroundColor="purple" color="white" fontSize="50px" px="40px" py="30px">
                    {currentProfile?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="user-name">
                        <h1>{currentProfile.name}</h1>
                        <p><FontAwesomeIcon icon={faBirthdayCake}/> Member for {moment(currentProfile.joinedOn).fromNow()}</p>
                    </div>
                </div>
                {
                    currentUser?.result._id === id &&(
                        <button type='button' onClick={()=>setSwitch(true)} className='edit-profile-btn'>
                            <FontAwesomeIcon icon={faPen}/> Edit Profile
                        </button>
                    )
                }
            </div><>
            {
                Switch?(<EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
                ):(
                <ProfileBio currentProfile={currentProfile}/>)
            }
            </>
        </section>
      }
     </div>
    </div>
  )
}

export default UserProfile
