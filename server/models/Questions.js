import mongoose from "mongoose"

const QuestionSchema=mongoose.Schema({
    questionTitle:{type:String,require:"Question must have a title"},
    questionBody:{type:String,require:"Question must have a body"},
    questionTags:{type:[String],require:"Question must have a tags"},
    noOfAnswers:{type:Number,default:0},
    upVotes:{type:[String],default:[]},
    downVotes:{type:[String],default:[]},
    userPosted:{type:String,require:"Question must have an author"},
    userId:{type:String},
    askedOn:{type:Date,default:Date.now},
    answer:[{answerBody:String,
      userAnswered:String,
      userId:String,
      answeredOn:{type:Date,default:Date.now},
}]
})

export default mongoose.model("Questions",QuestionSchema)