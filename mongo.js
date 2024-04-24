const express = require('express');
const mongoose = require('mongoose');
const { password } = require('pg/lib/defaults');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/user_mangement_db')
.then(()=> console.log('connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:' , err));
 const userSchema = new mongoose.Schema({
    name: String,
    email : String,
    password: String
 });
 const user = mongoose.model('USer', userSchema);
 app.get('/users',(req,res)=>{
    user.find({})
.then(users => res.json(users))
.catch(err => res.status(500).json({
    message: err.message
})) ;
});
app.post('/users',(req,res)=>{
    const user = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then(newUser => res.status(201).json(newUser))
    .catch(err =>res.status(400).json({ message: err
    }));
});
app.put('/users/id:',(req,res)=>{
    const userId = req.params.id;
    const updateData = {
        name: req.body.name,
        email: req.body.email,
        password:req.body.password
    };
    user.findByIdAndUpdate(userId,updateData,{new: true})
    then(updatedUser =>{
        if (!updatedUser){
            return res.status(404).json({message : 'User not found'});
        }
        res.json(updatedUser);
    })
    .catch(err => res.status(400).json({message: err.message}));
});
app.delete('/users/id:',(req,res)=>{
    const userId = req.params.id;
    user.findByIdAndDelete(userId)
    then(deletedUser =>{
        if (!deletedUser){
            return res.status(404).json({message : 'User not found'});
        }
        res.json({message: 'User deleted successfully'});
    })
    .catch(err => res.status(400).json({message: err.message
    }));
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});