const express = require('express')
const movieRouter = express.Router()
import { Movie } from "./models/MovieModel.js";
import { Director } from "./models/DirectorModel.js";
import { Actor } from "./models/ActorModel.js";
import { Borrow } from "./models/BorrowModel.js";
import { ActorMovie } from "./models/ActorMovieModel.js";

movieRouter.get('/movies'/*, verifyJwt, cors()*/, (req, res)=>{
    console.log("HEEY");
    Movie.find((err, movies)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "movies" : movies})
        }
    })
})

movieRouter.get('/movie/:id'/*, verifyJwt*/, cors(), (req, res)=>{
    Movie.findById(req.params.id, (err, movies)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(movies)
        }
    })
})


movieRouter.get('/moviesByName/:movieName'/*, verifyJwt*/, (req, res)=>{
    Movie.find({name:req.params.movieName}, (err, movies)=>{
        console.log(req.params.movieName)
        if(err){
            res.send(err)
        }
        else{
            res.json(movies)
        }
    })

})

movieRouter.get('/moviesByGenre/:movieGenre'/*, verifyJwt*/, (req, res)=>{
    Movie.find({genre:req.params.movieGenre}, (err, movies)=>{
        console.log(req.params.movieGenre)
        if(err){
            res.send(err) 
        }
        else{
            res.json(movies)
        }
    })
})

movieRouter.post('/addMovie', cors(), (req, res)=>{
    console.log("req", req.body)
        const newmovie = new Movie(req.body);
        try {
            base.collection('movies').insertOne(newmovie);
            return res.json({success: "added"})
         } catch (e) {
            return res.json({error: "can't add"})
         };
})

movieRouter.put('/updateMovie/:id', cors(), (req, res)=>{
    console.log("JSON", req.body)
        Movie.findOneAndUpdate({_id:req.params.id}, req.body, (err, docs)=>{
            if(err){
                return res.json({error: "can't add"})
            }
            else{
                return res.json({success: "added"})
            }
        })
})

movieRouter.delete('/deleteMovie/:id', cors(), (req, res)=>{
    Movie.remove({_id:req.params.id}, (err, movie)=>{
        if(err){
             return res.json({error: "can't add"})
        }
        else{
           return res.json({success: "added"})
        }
    })
})

movieRouter.get('/directors'/*, verifyJwt*/, cors(), (req, res)=>{
    //console.log(crypto.randomBytes(64).toString('hex'));
    console.log("SEC", process.env.SECRET); 
    Director.find((err, directors)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "directors" : directors})
        }
    })
})
    
movieRouter.get('/director/:id'/*, verifyJwt*/, cors(), (req, res)=>{
    Director.findById(req.params.id, (err, director)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(director)
        }
    })
})
    
movieRouter.post('/addDirector', cors(), (req, res)=>{
    console.log("req", req.body)
        const newdirector = new Director(req.body);
        try {
            base.collection('directors').insertOne(newdirector);
            return res.json({success: "added"})
         } catch (e) {
            return res.json({error: "can't add"})
         };
})

movieRouter.delete('/deleteDirector/:id', cors(), (req, res)=>{
    Director.remove({_id:req.params.id}, (err, director)=>{
        if(err){
             return res.json({error: "can't add"})
        }
        else{
           return res.json({success: "added"})
        }
    })
})

movieRouter.put('/updateDirector/:id', cors(), (req, res)=>{
    console.log("JSON", req.body)
        Director.findOneAndUpdate({_id:req.params.id}, req.body, (err, director)=>{
            if(err){
                return res.json({error: "can't add"})
            }
            else{
                return res.json({success: "added"})
            }
        })
})

movieRouter.get('/directorByName/:directorName'/*, verifyJwt*/, (req, res)=>{
    Director.find({name:req.params.directorName}, (err, director)=>{
        console.log(req.params.directorName)
        if(err){
            res.send(err)
        }
        else{
            res.json(director)
        }
    })
})

movieRouter.get('/actors'/*, verifyJwt*/, cors(), (req, res)=>{
    //console.log(crypto.randomBytes(64).toString('hex'));
    console.log("SEC", process.env.SECRET); 
    Actor.find((err, actors)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "actors" : actors})
        }
    })
})
    
movieRouter.get('/actor/:id'/*, verifyJwt*/, cors(), (req, res)=>{
    Actor.findById(req.params.id, (err, actor)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(actor)
        }
    })
})

movieRouter.delete('/deleteActor/:id', cors(), (req, res)=>{
    Actor.remove({_id:req.params.id}, (err, actor)=>{
        if(err){
             return res.json({error: "can't add"})
        }
        else{
           return res.json({success: "added"})
        }
    })
})

movieRouter.put('/updateActor/:id', cors(), (req, res)=>{
    console.log("JSON", req.body)
        Actor.findOneAndUpdate({_id:req.params.id}, req.body, (err, actor)=>{
            if(err){
                return res.json({error: "can't add"})
            }
            else{
                return res.json({success: "added"})
            }
        })
})

movieRouter.get('/actorByName/:actorName'/*, verifyJwt*/, (req, res)=>{
    Actor.find({name:req.params.actorName}, (err, actor)=>{
        console.log(req.params.actorName)
        if(err){
            res.send(err)
        }
        else{
            res.json(actor)
        }
    })
})

movieRouter.post('/addActor', cors(), (req, res)=>{
    console.log("req", req.body)
        const newactor = new Actor(req.body);
        try {
            base.collection('actors').insertOne(newactor);
            return res.json({success: "added"})
         } catch (e) {
            return res.json({error: "can't add"})
         };
})

movieRouter.get('/moviesByDirector/:director_id'/*, verifyJwt*/, cors(), (req, res)=>{
    Movie.find({director_id:req.params.director_id}, (err, movies)=>{
        console.log(req.params.director_id)
        if(err){
            res.send(err)
        }
        else{
            console.log("movies", movies);
            res.json(movies)
        }
    })

})

movieRouter.get('/actorMovie/:actor_id'/*, verifyJwt*/, cors(), (req, res)=>{
    Movie.find({actor_id:req.params.actor_id}, (err, movies)=>{
        console.log(req.params.actor_id)
        if(err){
            res.send(err)
        }
        else{
            console.log("movies", movies);
            res.json(movies)
        }
    })

})


movieRouter.get("/borrowFilms"/*, verifyJwt*/, cors(), (req, res)=>{
    Borrow.find({actor_id:req.params.actor_id}, (err, movies)=>{
        console.log(req.params.actor_id)
        if(err){
            res.send(err)
        }
        else{
            console.log("movies", movies);
            res.json(movies)
        }
    })

})


movieRouter.get('/borrowMovies'/*, verifyJwt*/, cors(), (req, res)=>{
    //console.log(crypto.randomBytes(64).toString('hex'));
    //console.log("SEC", process.env.SECRET); 
    Borrow.find((err, borrowFilms)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "borrowFilms" : borrowFilms})
        }
    })
})

movieRouter.get('/borrowMoviesByUser/:user_id'/*, verifyJwt*/, cors(), (req, res)=>{
    Borrow.find({user_id:req.params.user_id}, (err, movies)=>{
        console.log(req.params.user_id)
        if(err){
            res.send(err)
        }
        else{
            console.log("movies", movies);
            res.json(movies)
        }
    })

})

movieRouter.get('/borrowMovie/:movie_id'/*, verifyJwt*/, cors(), (req, res)=>{
    Borrow.find({movie_id:req.params.movie_id}, (err, movies)=>{
        console.log(req.params.movie_id)
        if(err){
            res.send(err)
        }
        else{
            console.log("movies", movies);
            res.json(movies)
        }
    })

})

movieRouter.post('/addBorrowMovies/', cors(), (req, res)=>{
    console.log("req", req.body)
        const newborrow = new Borrow(req.body);
        try {
            base.collection('borrows').insertOne(newborrow);
            return res.json({success: "added"})
         } catch (e) {
            return res.json({error: "can't add"})
         };
})

movieRouter.delete('/deleteBorrow/:id', cors(), (req, res)=>{
    Borrow.remove({_id:req.params.id}, (err, borrow)=>{
        if(err){
             return res.json({error: "can't add"})
        }
        else{
           return res.json({success: "added"})
        }
    })
})

movieRouter.put('/updateBorrow/:id', cors(), (req, res)=>{
    console.log("JSON", req.body)
        Borrow.findOneAndUpdate({_id:req.params.id}, req.body, (err, borrow)=>{
            if(err){
                return res.json({error: "can't add"})
            }
            else{
                return res.json({success: "update"})
            }
        })
})


/********************************************************************* */

movieRouter.get('/actorMovies'/*, verifyJwt*/, cors(), (req, res)=>{
    //console.log(crypto.randomBytes(64).toString('hex'));
    //console.log("SEC", process.env.SECRET); 
    ActorMovie.find((err, actormovies)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "actormovies" : actormovies})
        }
    })
})

movieRouter.get('/actorMovies/:actor_id'/*, verifyJwt*/, cors(), (req, res)=>{
    ActorMovie.find({actor_id:req.params.actor_id}, (err, movies)=>{
        console.log(req.params.actor_id)
        if(err){
            res.send(err)
        }
        else{
            console.log("movies", movies);
            res.json(movies)
        }
    })

})

movieRouter.get('/actorMoviesByMovie/:movie_id'/*, verifyJwt*/, cors(), (req, res)=>{
    ActorMovie.find({movie_id:req.params.movie_id}, (err, movies)=>{
        console.log(req.params.movie_id)
        if(err){
            res.send(err)
        }
        else{
            console.log("movies", movies);
            res.json(movies)
        }
    })

})

movieRouter.post('/addActorMovie/', cors(), (req, res)=>{
    console.log("req", req.body)
        const newactormovie = new ActorMovie(req.body);
        try {
            base.collection('actormovies').insertOne(newactormovie);
            return res.json({success: "added"})
         } catch (e) {
            return res.json({error: "can't add"})
         };
})

movieRouter.delete('/deleteActorMovie/:id', cors(), (req, res)=>{
    ActorMovie.remove({_id:req.params.id}, (err, movies)=>{
        if(err){
             return res.json({error: "can't add"})
        }
        else{
           return res.json({success: "added"})
        }
    })
})

movieRouter.put('/updateActorMovies/:id', cors(), (req, res)=>{
    console.log("JSON", req.body)
        ActorMovie.findOneAndUpdate({_id:req.params.id}, req.body, (err, movies)=>{
            if(err){
                return res.json({error: "can't add"})
            }
            else{
                return res.json({success: "update"})
            }
        })
})