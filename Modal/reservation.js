import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
    reservationDate: {
      type: Date,
      default: Date.now,
      required: "Must have start date - default value is the created date",
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("reservations", reservationSchema);
export { Reservation };
