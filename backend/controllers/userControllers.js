import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const registerUser = async (req, res) => {
    const { name, codeforces_ID, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, codeforces_ID, email, password: hashedPassword });
    await newUser.save();
    // const newUser = await User.create({ name, codeforces_ID, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Wrong username or password' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Wrong username or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
}

export { registerUser, loginUser };