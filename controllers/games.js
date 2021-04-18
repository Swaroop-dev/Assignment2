const Game=require("../models/games")


exports.getGamesById=(req,res,id,next)=>{
        Game.findById(id).exec((err,game)=>{
            if(err){
                return res.status(400),json({
                    error:"game with that id is not found"
                })
    
            }
            req.game=game
        })
    next()
}

exports.getGames=(req,res)=>{
    Game.find().exec((err,games)=>{
        if(err){
            return res.status(400),json({
                          error:"not able to find games"
                        })
            }
            res.json({games})
    })

}


exports.createGames=(req,res)=>{
    game=new Game(req.body)
    game.save((err,game1)=>{
        if(err){
            res.status(400),json({
                error:"not able to create new game"
              })
        }
        res.json({game1})
        }
    )

}

exports.addplayedGames=(req,res,id)=>{
        Game.findByIdAndUpdate({_id:req.game._id},
            { }
            )
}

exports.getLeaderBoard=(req,res)=>{
    
}