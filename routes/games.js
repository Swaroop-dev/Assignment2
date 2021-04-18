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
router.post('/game/addresult/:userid/:gameId', isSignedIn, isAuthenticated, isAdmin, addplayedGames)
router.get('/game/leaderboard/:gameId',getLeaderBoard)


module.exports=router;