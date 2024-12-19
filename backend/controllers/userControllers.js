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

// form post for signup
const signupPost = async (req, res) => {
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
      isActive:true,
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

// form post for login page
const loginPost = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });

    if (!userData)
      return res.status(401).json({ message: "Invalid username or password" });

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid username or password" });

    if(!userData.isActive) return res.status(403).json({message:"Sorry you are blocked from the Site"});

    const secretkey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: userData._id }, secretkey, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//home get data req
const homeGet = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User Not Found" });

    const imageUrl = user.imageUrl
      ? `${req.protocol}://${req.get("host")}/uploads/${user.imageUrl}`
      : null;

    res.json({
      ...user.toObject(),
      imageUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// edit user profile
const editProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userData = await User.findById(req.user.id);

    if (userData.email !== email) {
      const isEmailTaken = await User.findOne({ email });
      if (isEmailTaken) {
        return res.status(403).json({message:"Email already taken"})
          .status(409)
          .json({ message: "User already exists with this email" });
      }
    }

    const newPassword = password
      ?await bcrypt.hash(password, 10)
      : userData.password;

    const imageUrl = req.file ? req.file.filename : userData.imageUrl;

    await User.findByIdAndUpdate(req.user.id, {
      $set: {
        name,
        email,
        password: newPassword,
        imageUrl,
      },
    });

    res.json({ message: "User details updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  signupPost,
  loginPost,
  homeGet,
  editProfile,
};
