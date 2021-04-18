const mongoose=require('mongoose')


const gameSchema=new mongoose.Schema({
    gamename:{
        type: 'string',
        required: true
    },
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