const mongoose=require('mongoose')


const gameSchema=new mongoose.Schema({
    gamesplayed:{
        type:Array,
        default:[]
    },
    leaderboard:{
        type:Array,
        default:[]
    }

})

module.exports = mongoose.model("Game",gameSchema)