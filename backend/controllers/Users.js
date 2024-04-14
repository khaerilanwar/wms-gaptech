import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker/locale/id_ID";

// function get user data logged in
export const getUser = async (req, res) => {
  try {
    const user = await Users.findOne(
      { _id: req.userId },
      { refreshToken: 0, password: 0 }
    );
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

// function get all data users
export const getUsers = async (req, res) => {
  try {
    const users = await Users.find(
      {},
      {
        refreshToken: 0,
        password: 0,
      }
    );
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

// function for create username
async function createUsername(firstName, lastName) {
  let newUsername;
  let usernames = await Users.aggregate([
    { $group: { _id: null, usernames: { $push: "$username" } } },
  ]);
  usernames = usernames[0].usernames;

  do {
    newUsername = faker.internet
      .userName({ firstName, lastName })
      .toLowerCase();
  } while (usernames.includes(newUsername));

  return newUsername;
}

// router for register user
export const Register = async (req, res) => {
  const { firstName, lastName, email, password, confPassword } = req.body;

  // if password and confirm is not same
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password dan confirm password tidak cocok!" });
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  try {
    await Users.create({
      name: firstName + " " + lastName,
      username: await createUsername(firstName, lastName),
      email,
      password: hashPassword,
    });
    res.json({ msg: "Register Berhasil!" });
  } catch (error) {
    console.log(error);
  }
};

// router for login process
export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    const match = bcrypt.compareSync(req.body.password, user.password);

    if (!match) {
      return res.status(400).json({ msg: "Password salah" });
    }
    const userId = user._id.toString();
    const name = user.name;
    const username = user.username;
    const email = user.email;

    const accessToken = jwt.sign(
      { userId, name, username, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, username, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.updateOne({ _id: userId }, { refreshToken });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findOne({ refreshToken });
  if (!user) return res.sendStatus(204);
  const userId = user._id;
  await Users.updateOne({ _id: userId }, { refreshToken: null });
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
