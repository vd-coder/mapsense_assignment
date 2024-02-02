const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey=process.env.SECRET_KEY;
const router=express.Router();
const Location=require('../models/locations');
const User=require('../models/user');
haversine= (long1, lat1, long2, lat2)=>{
    const h= Math.cos(Math.PI*lat1/180)*Math.cos(Math.PI*lat2/180)*Math.sin(Math.PI*(long1-long2)/360)*Math.sin(Math.PI*(long1-long2)/360)+Math.sin(Math.PI*(lat1-lat2)/360)*Math.sin(Math.PI*(lat1-lat2)/360);
    const r=6371;
    const dis= 2*r*Math.asin(Math.sqrt(h));
    return dis;
}
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(401).json({message:'JWT Token absent'});
    }
}
const authenticateUser = async (req, res, next) => {
    jwt.verify(req.token, secretKey, async (err, authData) => {
        if (err) {
            res.status(401).json({message:'JWT Token invalid'});
        }
        else {
            req.email=authData.email;
            next();
        }
    })
}
router.post('/location',verifyToken,authenticateUser,async (req,res)=>{
        if(!req.body.longitude||!req.body.latitude)
        {
          
            return res.status(400).json({message:'Invalid Coordinates'});
        }
        const lat=req.body.latitude;
        const long=req.body.longitude;
        if(lat<-90||lat>90||long<-180||long>180)
        {
            return req.status(400).json({message:'Invalid Coordinated'});
        }
        const user=await User.findOne({email:req.email});
        const location= new Location({user:user._id,latitude:req.body.latitude,longitude:req.body.longitude});
        await location.save();
        return res.status(200).json({message:'Location Point Created Successfully'});
    
    })
    
    router.get('/distance',async(req,res)=>{
 
        if(!req.query.longitude1||!req.query.longitude2||!req.query.latitude1||!req.query.latitude2)
        {
            
            return res.status(400).json({message:'Invalid Coordinates'});
        }
    
        const long1=req.query.longitude1;
        const lat1=req.query.latitude1;
    
        const long2=req.query.longitude2;
        const lat2=req.query.latitude2;
        if(lat1<-90||lat2<-90||lat1>90||lat2>90||long1<-180||long1>180||long2<-180||long2>180)
        {
            return res.status(400).json({message:'Invalid Coordinates'});
        }
        const dis=haversine(long1,lat1,long2,lat2);
        return res.status(200).json({distance:dis+' Km'});
    })
    
    
    router.get('/closest',async(req,res)=>{
        if(!req.query.longitude||!req.query.latitude)
        {
            return res.status(400).json({message:'Invalid Coordinates'});
        }
        const long=req.query.longitude;
        const lat=req.query.latitude;
        if(lat<-90||lat>90||long<-180||long>180)
        {
           
            return req.status(400).json({message:'Invalid Coordinates'});
        }
        points=await Location.find({});
        console.log(points.length);
        if(points.length==0)
        {
            return res.status(200).json({longitude:NULL,latitude:NULL});
        }
        let minDistance=Number.POSITIVE_INFINITY;
        let minLong;
        let minLat;
       
       
        
        for (let i=0;i<points.length;i++)
        {
           
            const dis=haversine(points[i].longitude,points[i].latitude,long,lat);
            if(dis<minDistance)
            {
                minDistance=dis;
                minLong=points[i].longitude;
                minLat=points[i].latitude;
            }
          
        }
        return res.status(200).json({longitude:minLong,latitude:minLat});
    
    })

module.exports=router;