const express=require("express")
const router=express.Router()
const { getUserById } = require("../controllers/user")
const { check} = require("express-validator");
const {getGames,createGames,addplayedGames,getGamesById,getLeaderBoard} =require("../controllers/games")

const {isAdmin,isAuthenticated,isSignedIn}=require("../controllers/auth")   

router.param('userId',getUserById)   
router.param('gameId',getGamesById)

router.get('/game/:userId/games',isSignedIn,getGames)



router.post('/game/creategame/:userId', isSignedIn,isAuthenticated,isAdmin,createGames)
router.post(
  '/game/addresult/:gameId/:userId',
  [
    check("player1", "player1 is required").isLength({ min: 3 }),
    check("player2", "player2 is required").isLength({ min: 3 }),
    check("score1", "score1 is required"),
    check("score2", "score2 is required"),
    check("result", "result is required").isBoolean(),
  ],
  isSignedIn,
  isAuthenticated,
  isAdmin,
  addplayedGames
);
router.get('/game/leaderboard/:gameId',getLeaderBoard)


module.exports=router;