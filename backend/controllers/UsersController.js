const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/UsersModel")


const getusers = async (req,res) => {
    let response = res;
    try {
    const users = await User.find({})
    res.status(200).json(users)
    }
    catch (err) {
     res.status(500).json(err.message)
    }
   
}

const login=async(req, res)=> {
 const { userName, password } = req.body;  
    const foundUser = await User.findOne({ userName:userName });
    if (!foundUser) {
        res.status(403).json("not registered")
    }
  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password);
    if (passOk) {
      jwt.sign(
        { userId: foundUser._id, userName },
        process.env.SECRET_KEY,
        {},
        (err, token) => {
          res.cookie("token", token, { sameSite: "none", secure: true }).json({
            id: foundUser._id,
          });
        },
      );
    }
  }
};
const signup= async(req, res)=>{
    const { userName, password } = req.body;
    try {
        const exists = await User.findOne({ userName: userName })
      if (exists) {
            res.status(401).json("userName already taken")
        }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await User.create({
      userName: userName,
      password: hashedPassword,
    });
      if (!createdUser) {
          res.status(422).json("user not saved")
      }
    jwt.sign(
      { userId: createdUser._id, userName },
      process.env.SECRET_KEY,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(200)
            .json("Registered successfully");
      },
    );
  } catch (err) {
    if (err) throw err;
    res.status(500).json("error");
  }
};

module.exports={login,signup,getusers}