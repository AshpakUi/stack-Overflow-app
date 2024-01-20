import React from 'react'
import {useLocation,useNavigate} from "react-router-dom"
import QuestionList from './QuestionList'
import {useSelector} from "react-redux"
import Loder from "../Loder/Loder"
import "./HomeMainbar.css"

function HomeMainbar() {
  const user = 1
  const navigate=useNavigate()
  const location =useLocation()
  const questionList = useSelector(state=>state.questionsReducer)



  const checkAuth=()=>{
    if(user === null){
      alert("login or sing up to ask a question")
      navigate("/Auth")
    }else{
      navigate("/AskQuestion")
    }
  }
  
  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
         {
          location.pathname==="/"?<h1>Top Question</h1>:<h1>All Question</h1>
         }
         <button onClick={()=>checkAuth()}  className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {
          questionList.data===null?<Loder/>:<><p>{questionList.data.length} questions</p>
          <QuestionList questionList={questionList.data}/>
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar
