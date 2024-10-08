const zod = require("zod");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config");
const Account = require("../models/accountModel");

const signupbody = zod.object({
  userName: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(6),
});

const updateBody = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

const signinBody = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});

const signToken = (id) => {
  console.log(id);
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

const createToken = async (user, statuscode, res) => {
  const token = await signToken(user._id);
  user.password = undefined;
  res.status(statuscode).json({
    status: "success",
    token,
    data: { user },
  });
};

exports.signup = async (req, res) => {
  console.log(req.body);
  try {
    const { success } = signupbody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        status: "failed",
        message: "Email already taken / Incorrect inputs",
      });
    }
    const existingUser = await User.findOne({
      userName: req.body.userName,
    });

    if (existingUser) {
      return res.status(411).json({
        status: "failed",
        message: "Email already taken / Incorrect inputs",
      });
    }

    const user = await User.create(req.body);
    console.log("userdetails", user);

    const account = await Account.create({
      userId: user._id,
      balance: 1 + Math.random() * 100000,
    });
    console.log("token created", account);

    createToken(user, 201, res);
    console.log("token created success");
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Email already taken / Incorrect inputs",
    });
  }
};

exports.signin = async (req, res) => {
  console.log(req.body);
  try {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        status: "failed",
        message: "Provide Credentials",
      });
    }
    console.log("Hi login");
    const user = await User.findOne({ userName: req.body.userName }).select(
      "+password"
    );
    // const user = await User.findOne({
    //   userName: req.body.userName,
    //   password: req.body.password,
    // });
    console.log("login", user);
    if (
      !user?.userName ||
      !(await user.correctPassword(req.body.password, user.password))
    ) {
      // if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Incorrect email and password",
      });
    }
    console.log("password checked");
    createToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Email already taken / Incorrect inputs",
    });
  }
};

exports.update = async (req, res) => {
  console.log(req.body);
  try {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        status: "failed",
        message: "Error while updating information",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(updatedUser);
    res.status(200).json({
      status: "success",
      message: "Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Error while inputs",
    });
  }
};

exports.filter = async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const users = await User.find({
      _id: { $ne: req.userId },
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });

    res.status(200).json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "No data",
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "You are not logged in! Please log in to get access.",
    });
  }

  try {
    const decoded = await jwt.verify(token, config.JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({
      message: "please sign in again.",
    });
  }
};
