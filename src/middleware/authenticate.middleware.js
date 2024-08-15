const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).send({ message: 'Authentication token missing or invalid' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) =>{
        if(err){
            return res.status(401).send({error:"Invalid or expired token"});
        }

        req.user = user; //sau khi xac thuc thanh cong thi luu thong tin user vao req de middleware và route để xử lý tiếp theo với thông tin người dùng đã xác thực.

        next();
    })
}

module.exports = authenticate;