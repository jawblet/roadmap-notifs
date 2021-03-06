import User from "@models/User";
import Feature from "@models/Feature";
import dbConnect from "@utils/dbConnect";
import { getSession } from "next-auth/react";

dbConnect();

export default async function handler(req, res){
  const { email } = req.query;
  const session = await getSession({ req });

  try {
    let user = await User.findOne({ email }).populate("features");
    
    // if user exists, return user 
    if(user) {
      res.status(200).json({user});
    }

    // if not, create 
    if(!user) {
      let { email, name } = session.user;
      const newUser = await User.create({name, email});
      res.status(201).json({user: newUser, newUser: true});
    }

  } catch(err) {
    console.log(err);
    res.status(400).json(err);
  }
}

