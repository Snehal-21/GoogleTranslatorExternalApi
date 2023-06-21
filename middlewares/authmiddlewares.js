import { response } from "express";
import User from "../modules/user.js";
import encrypt from "encryptjs";

export const checks=async(req,res,next)=>{
    try{
        const{name,email,password,confirmpassword}=req.body;
        if(!name) return res.send("Name isrequired.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");
        if(!confirmpassword) return res.send("Confirm password is required.");
        if(password<5 && confirmpassword <5) return res.send("passowrd and confirm password must be greter than or equal to 5 digits");
        if(password != confirmpassword) return res.send("password andconfirm password must be equal");
        next();
    }catch(error){
        return res.send(error);
    }
}

export const registeredUSer=async(req,res,next)=>{
    try{
        const{_id,password}=req.body;
        if(!_id) return res.send("Id is required");
        if(!password) return res.sewnd("password is required");

        const reponse=await User.find({_id}).exec();
        if(!reponse.length) return res.send("user not found");

        const decipherpass="pass";
        const decryprpass=encrypt.decrypt(reponse[0].password,decipherpass,256);

        if(decryprpass==password){
            next();
        }else{
            return res.send("incorrect password.")
        }

    }catch(error){
        return res.send(error);
    }
}