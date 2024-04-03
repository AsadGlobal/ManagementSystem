import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
    },
    memberId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export { Book };
