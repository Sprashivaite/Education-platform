import User from "../models/user.js";

export const userRepository = {
  async findByAll() {
    const users = await User.find({});
    return users;
  },
  async findById(userId: string) {
    const users = await User.find({ userId });
    return users;
  },
  async findByName(username: string) {
    const users = await User.findOne({ username });
    return users;
  },
  async addUser(username: string, password: string) {
    const user = new User({ username, password });
    await user.save();
    return user;
  },
};
