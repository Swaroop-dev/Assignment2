const Game = require("../models/games");
const leaderBoard = require("../models/leaderboard")
const { json } = require("body-parser");
const { check, validationResult } = require("express-validator");
const { toInteger } = require("lodash");

exports.getGamesById = (req, res,next,id) => {
    
  Game.findById(id).exec((err, game) => {
    if (err) {
      return res.status(400),json({
        error: "game with that id is not found",
      });
    }
    req.game1 = game;  
  });
    next();
};

exports.getGames = (req, res) => {
  Game.find().exec((err, games) => {
    if (err) {
      return (
        res.status(400),
        json({
          error: "not able to find games",
        })
      );
    }
    res.json(games);
  });
};

exports.createGames = (req, res) => {
  game = new Game(req.body);
  game.save((err, game1) => {
    if (err) {
      res.status(400),
        json({
          error: "not able to create new game",
        });
    }
    res.json({ game1 });
  });
};

exports.addplayedGames = (req, res) => {
    const errors = validationResult(req);
    const { player1, player2, score1, score2, result } = req.body
    let win1, win2;
    if (result) {
        win1 = 1
        win2 = 0
    }
    else {
        win2 = 1
        win1 = 0
    }
  
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors });
    }
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    Game.findByIdAndUpdate(
        { _id: req.game1._id },
      
        { $push: { gamesplayed: req.body } },
        

        (err, gameadded) => {
            if (err) {
                return res.status(400).json({
                    error: "could not add game played with given gameid",
                });
            }
            res.json(gameadded);
        }
    );
    leaderBoard.insertMany([{ gamename: req.game1.gamename, player1: player1, score: score1, wins: win1 },
        { gamename: req.game1.gamename, player1: player2, score: score2, wins: win2 }], (err) => {
        res.json(error)
    })
        
}


exports.getLeaderBoard = (req, res) => {

    leaderBoard.find(
      {},
      {
        $group: {
          _id: "$gamename",
          total: { $sum: "$wins" },
          totalpoints: { $sum: "$score" },
        },
      },
        { $sort: { wins: -1, totalpoints: -1 } }, (err, leaders) => {
            if (err) {
              res.json(err)
            }
         res.json(leaders)     
      }
    );

};
