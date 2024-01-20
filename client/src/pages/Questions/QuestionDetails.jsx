import React,{useState} from 'react'
import Loader from "../../components/Loder/Loder.jsx"
import { useSelector ,useDispatch} from 'react-redux'
import moment from "moment"
import "./Question.css"
import {Link, useParams,useNavigate,useLocation} from "react-router-dom"
import upVotes from "../../assets/uparrow.png"
import downVotes from "../../assets/downarrow.png"
import Avatar from "../../components/Avatar/Avatar"
import DisplayAnswer from './DisplayAnswer'
import {postAnswer,deleteQuestions,voteQuestion} from "../../actions/question"
import copy from "copy-to-clipboard"


  
function QuestionDetails() {
  const {id} = useParams()
 const questionList = useSelector(state=>state.questionsReducer)

  const [Answer,setAnswer] =useState("")
  const Navigate=useNavigate()
  const dispatch=useDispatch()
 const User=useSelector((state)=>(state.currentUserReducer))
 const location=useLocation()
 const url="http://localhost:3000"

 const handlePosAns=(e,answerLength)=>{
   e.preventDefault()
if(User===null){
alert("Log-in or sign-up to answer a question")
Navigate("/Auth")
}else{
  if(Answer=== ""){
    alert("Enter an answer before submitting")
  }else{dispatch(postAnswer({id,noOfAnswers:answerLength+1,answerBody:Answer,userAnswered:User.result.name,userId:User.result._id}))}
}}

const handleShare=()=>{
  copy(url+location.pathname)
}

const handleDelete=()=>{
  dispatch(deleteQuestions(id,Navigate))
}

const handleUpVote=()=>{
  dispatch(voteQuestion(id,"upVote",User.result._id))
}
const handleDownVote=()=>{
  dispatch(voteQuestion(id,"downVote",User.result._id))
}

return (
    <div className="question-details-page">
{
  questionList.data===null?
  <Loader/>:
  <>
    {
      questionList.data.filter((questions)=>questions._id===id).map(question=>
        <div key={question._id}>
          <section className="question-details-container">
            <h1>{question.questionTitle}</h1>
            <div className="question-details-container-2">
              <div className="question-votes">
                <img src={upVotes} alt=""width="28"  onClick={handleUpVote}/>
                <p>{question.upVotes.length - question.downVotes.length}</p>
                <img src={downVotes} alt="" width="28"onClick={handleDownVote} />
              </div>
              <div style={{width:"100%"}}>
                  <p>{question.questionBody}</p>
                  <div className="question-details-tags">
                    {
                      question.questionTags.map((tag)=>
                      <p key={tag}>{tag}</p>
                      )
                    }
                  </div>

                  <div className="question-actions-user">
                         <div>
                          <button type='button' onClick={()=>handleShare()}>Share</button>
                          {
                            User?.result?._id === question?.userId &&
                            (
                              <button type='button' onClick={handleDelete}>Delete</button>
                            )
                          }
                         </div>

                         <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p> 
                          <Link to={`/Users/${question.userId}`} className="user-link" style={{color:"#0086d8"}}>
                            <Avatar backgroundColor="orange" px="8px" py="5px" >{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                            <div>
                              {question.userPosted}
                            </div>
                          </Link>
                         </div>

                  </div>

              </div>
            </div>
          </section>
             {
              question.noOfAnswers!==0 && (
                <section>
                  <h3>
                    {question.noOfAnswers} Answers
                  </h3>
                  <DisplayAnswer key={question.userId} question={question} handleShare={handleShare}/>
                </section>
              )
             }
                  <section className='post-ans-container'>
                            <h3>Your Answer</h3>
                            <form onSubmit={(e)=>{handlePosAns(e,question.answer.length)}}>
                              <textarea  cols="30" rows="10" onChange={(e)=>setAnswer(e.target.value)}></textarea>
                              <input type="submit"   className='post-ans-btn' value="post Your Answer"/>
                            </form>
                            <div className="ans-container-tags">
                            <p>
                              Browse other Question tagged
                              {
                                question.questionTags.map((tag)=>(
                                  <Link to="/Tags" key={tag} className='ans-tags'>{tag}</Link>
                                )
                                )
                              }or 
                              <Link to="/AskQuestion" style={{textDecoration:"none",color:"#009dff"}}> ask your own question</Link>
                            </p>
                            </div>
                  </section>
        </div>
        
        )
    }
  </>
}
    </div>
  )
}

export default QuestionDetails
