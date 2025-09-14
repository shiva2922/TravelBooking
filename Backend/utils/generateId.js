const Counter = require("../models/counter");

const generateCustomId = async (name, prefix) => {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  const number = counter.value.toString().padStart(3, "0"); // 001, 002
  return `${prefix}${number}`;
};

module.exports = generateCustomId;
