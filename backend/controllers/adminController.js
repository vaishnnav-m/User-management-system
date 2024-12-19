const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// password hashing function
const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
  }
};

// login for admin
async function adminPostLogin(req, res) {
  try {
    const adminData = await User.findOne({ email: req.body.email });

    if (!adminData)
      return res.status(401).json({ message: "Invalid email or password" });

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      adminData.password
    );

    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const isAdmin = adminData.isAdmin;

    if (!isAdmin)
      return res.status(403).json({ message: "You are not an admin" });

    const secretkey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: adminData._id, isAdmin: true }, secretkey, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// fetch users for admin
async function usersGet(req, res) {
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "You are not an admin" });
  try {
    const userData = await User.find({ isAdmin: false });
    const users = userData.map((user) => {
      user.imageUrl = user.imageUrl
        ? `${req.protocol}://${req.get("host")}/uploads/${user.imageUrl}`
        : null;

      return user;
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// add new user for admin
const addUser = async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "You are not an admin" });
  try {
    const userEmail = await User.findOne({ email: req.body.email });

    if (userEmail) {
      return res.status(409).json({ message: "user already exists" });
    }

    const hashedPassword = await hashPassword(req.body.password);

    const imageUrl = req.file ? req.file.filename : null;

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      imageUrl: imageUrl,
      isActive: true,
      isAdmin: false,
    });

    const userData = await user.save();

    if (userData) {
      return res.json({ message: "Registration was successfull" });
    }

    return res.status(400).json({ message: "Registration failed" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error ", error });
  }
};

// get edit user
const getEditUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.imageUrl = user.imageUrl
      ? `${req.protocol}://${req.get("host")}/uploads/${user.imageUrl}`
      : null;
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//edit user for admin
const editProfile = async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "You are not an admin" });
  try {
    const { name, email } = req.body;
    const userId = req.params.id;

    const userData = await User.findById(userId);

    if (userData.email !== email) {
      const isEmailTaken = await User.findOne({ email });
      if (isEmailTaken) {
        return res.status(403).json({ message: "Email already taken" });
      }
    }

    const imageUrl = req.file ? req.file.filename : userData.imageUrl;

    // only updates the updated field
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (imageUrl) updatedData.imageUrl = imageUrl;

    await User.findByIdAndUpdate(userId, updatedData);

    res.json({ message: "User details updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const bolckUser = async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "You are not an admin" });

  const userId = req.params.id;
  const userData = await User.findById(userId);

  if (!userData) {
    return res.status(404).json({ message: "User not found" });
  }  
  
  await User.findByIdAndUpdate(userId,{isActive:!userData.isActive});
  res.json({ message: "User details updated successfully" });
};

module.exports = {
  adminPostLogin,
  usersGet,
  addUser,
  getEditUser,
  editProfile,
  bolckUser
};
