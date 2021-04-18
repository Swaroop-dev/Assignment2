const mongoose=require('mongoose')


const leaderBoardSchema = new mongoose.Schema({
    gamename: {
        type: 'string',
        required: true,
    },
    player1: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
        
    },
    wins: {
        type: Number,
        required: true
    }
})





module.exports = mongoose.model("leaderBoard", leaderBoardSchema);