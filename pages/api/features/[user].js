import User from "@models/User";
import Feature from "@models/Feature";

export default function handler(req, res) {
    const { user } = req.params;

    const features = await User.findById(user).populate('watched');
    res.status(200).json(features);
}