import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
    borrowDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    borrowStatus: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Borrowing = mongoose.model("Borrow", borrowSchema);

export { Borrowing };
