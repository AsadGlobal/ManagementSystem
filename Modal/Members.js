import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    membershipDate: {
      type: Date,
      default: Date.now,
    },
    Borrow: [],
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);

export { Member };
