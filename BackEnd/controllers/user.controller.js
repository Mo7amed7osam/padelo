// controllers/userController.js
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

 
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

     
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

     
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


 
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');  
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.addImage = async (req, res) => {
  try {
    const { userId, imageUrl } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'USER NOT FOUND'  });

    user.image = imageUrl;
    await user.save();

    res.status(200).json({ 
      message: 'added image successfully',
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: ' user not found ' });

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: 'deleted profile successfully'
    });

  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};




exports.addPhoneNumber = async (req, res) => {
  try {
    const { userId, phoneNumber } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found'  });

    user.phoneNumber = phoneNumber;
    await user.save();

    res.status(200).json({
      message: 'added phone number successfully',
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



