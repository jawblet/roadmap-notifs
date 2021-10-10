import User from "@models/User";
import Feature from "@models/Feature";
import { getSession } from "next-auth/react";
import dbConnect from '../../../utils/dbConnect';

dbConnect(); 

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { email } = session.user;

  // update watched features
    if(req.method === "PUT") {
        try {
            const user = await User.findOneAndUpdate({ email }, req.body);
            res.status(200).json(user);
        } catch(err) {
            console.log(err);
        }
    }
}