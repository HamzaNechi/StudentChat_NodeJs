import { isObjectIdOrHexString } from 'mongoose';
import user from '../models/user.js';
import User from '../models/user.js';

export function signin(req, res) {
    user.findOne({
        username:req.body.username,
        password:req.body.password
    },(err,doc)=>{
        if(err){
            res.status(405).json(err)
        }else{
            res.status(200).json(doc)
        }
    })
}

export function signup(req, res) {
    const user = new User({
        username: req.body.username,
        password:req.body.password,
        email: req.body.email,
        image:`${req.protocol}://${req.get('host')}/images/user/${req.file.filename}`,
    });
    user.save().then((doc)=>{
        res.status(201).json({
            username: req.body.username,
            password:req.body.password,
            email: req.body.email,
            image:req.body.image
        })
    })
    .catch(err=>{
        res.status(405).json(err);
    })
}

export async function getAllUser(req,res){
    const users= await user.find().populate('posts');
    if(users){
        res.status(201).json({users,message:"All user"})
    }else{
        res.status(404).json({err:"no data found"})
    }
}


export function getUserById(req,res){
    const u=user.findOne({_id:req.params.id}).populate('posts')
    .then(u=>{
        res.status(200).json(u)
    })
    .catch(err=>{
        res.status(404).json(err)
    })
}

//get all user's post
export async function getAllUsersPost(req,res){
    const users= await user.findOne({username : req.params.name}).populate('Post');
    if(users){
        res.status(201).json({users,message:"All user"})
    }else{
        res.status(404).json({err:"no data found"})
    }
}


export function deleteUser(req,res){
    user.deleteOne(req.body).then(doc=>{
        res.status(200).json(doc);
    })
    .catch(err=>{
        res.status(400).json(err)
    })
}
