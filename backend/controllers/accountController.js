const zod = require("zod");
const Account = require("../models/accountModel");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");

exports.myBalance = async (req, res) => {
  console.log(req._id);
  try {
    const account = await Account.findOne({ userId: req.userId });
    console.log(Account);
    res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "No balance",
    });
  }
};

exports.transfer = async (req, res) => {
  console.log(req.body);
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, to } = req.body;
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  const account1 = await Account.findOneAndUpdate(
    { userId: req.userId },
    { $inc: { balance: -amount } },
    {
      new: true,
      runValidators: true,
    }
  ).session(session);

  const account2 = await Account.findOneAndUpdate(
    { userId: to },
    { $inc: { balance: amount } },
    {
      new: true,
      runValidators: true,
    }
  ).session(session);

  // console.log("money status", account1, account2);

  await session.commitTransaction();
  res.status(200).json({
    message: "Transfer successfull",
  });
};
