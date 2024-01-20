import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const AskQuestions=async(req,res)=>{
const postQuestionData=req.body;
const postQuestion=new Questions(postQuestionData)
try {
    await postQuestion.save();
    res.status(200).json("Posted a question successfully ");
} catch (error) {
    res.status(409).json("Could not post a new question");
}
}

export const getAllQuestions=async(req,res)=>{
    console.log(req,"req");
try {
    const questionList = await Questions.find()
    res.status(200).json(questionList)
} catch (error) {
    res.status(404).json({message:error.message});
}
}

export const deleteQuestion= async(req,res)=>{
    const {id:_id} =req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unavailable...")
    }
    try{
     await Questions.findByIdAndRemove(_id)
     res.status(200).json({message:"Successfully deleted..."})
    }catch(error){
        console.log(error);
        res.status(404).json({message:error.message})
    }
}

export const voteQuestion= async(req,res)=>{
    console.log("hit url");
const {id:_id}=req.params
const {value,userId}=req.body
console.log(_id,"backend hit url");

if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send("question unavailable...")
    console.log("question unavailable");
}
try {
    const question=await Questions.findById(_id)
    const upIndex=question.upVotes.findIndex((id)=>id===String(userId))
    console.log(upIndex)
    const downIndex=question.downVotes.findIndex((id)=>id===String(userId))

    if(value==="upVote"){
        if(downIndex !== -1){
            question.downVotes=question.downVotes.filter((id)=>id!==String(userId))
        }
        if(upIndex === -1){
           question.upVotes.push(userId)
        }else{
            question.upVotes=question.upVotes.filter((id)=>id!==String(userId))
        }
    }else if(value==="downVote"){
        if(upIndex !== -1){
            question.upVotes=question.upVotes.filter((id)=>id!==String(userId))
        }
        if(downIndex === -1){
           question.downVotes.push(userId)
        }else{
            question.downVotes=question.downVotes.filter((id)=>id!==String(userId))
        }
    }
     await Questions.findByIdAndUpdate(_id,question)
     res.status(200).json({message:"voted successfully..."})
} catch (error) {
    res.status(404).json({message:"id not found"})
    console.log("thiis error id not found");
}
}