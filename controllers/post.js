import { response } from 'express'
import Post from '../models/post.js'
import user from '../models/user.js'


export async function getAll(req,res){
    const posts=await Post.find().populate('user')
    if(posts){
        res.status(201).json({posts,message:'all posts getted'})
    }else{
       res.status(404).json({err,message:'no data found'}) 
    }
}


export function add(req,res){
    var post;
    console.log(req.file)
    if(req.file !== null){
        const _post=new Post({
            description:req.body.description,
            image : `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`,
            user : req.body.user
        });
        post=_post;
    }else{
        const _post=new Post({
            description:req.body.description,
            user : req.body.user
        });
        post=_post;
    }
    post.save().then(doc=>{
        res.status(200).json(doc)
    })
    .catch(err=>{
        res.status(405).json(err)
    })
}

export async function getPostUser(req,res){
    const posts=await Post.find({user:req.params.id_user})
    if(posts){
        res.status(201).json({posts,message:'all user getted'})
    }else{
       res.status(404).json({message:'no data found'}) 
    }
}