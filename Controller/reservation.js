import { Book } from "../Modal/Books.js";
import { Borrowing } from "../Modal/Borrowing.js";
import { Member } from "../Modal/Members.js";
import { Reservation } from "../Modal/reservation.js";

async function reservation(req, res) {
  const memberId = req.member.id;
  const bookId = req.params.id;

  const book = await Borrowing.findOne({ bookId });
  try {
    if (book) {
      return res
        .status(200)
        .json({ message: "This book is already borrowed." });
    } else {
      const alreadyReservation = await Reservation.findOne({ bookId });
      if (alreadyReservation) {
        return res
          .status(400)
          .json({ status: false, message: "This book is already reserved." });
      }
      const member = await Member.findOne({ _id: memberId });
      const book = await Book.findOne({ _id: bookId });

      if (!member || !book) {
        return res
          .status(404)
          .json({ status: false, message: "Member or book not found." });
      }
      const reservationDate = new Date();
      reservationDate.setDate(reservationDate.getDate() + 3);

      const newReservation = new Reservation({
        memberId: member._id,
        bookId: book._id,
        reservationDate: reservationDate,
      });

      await newReservation.save();

      const formattedDate = reservationDate.toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      return res.status(200).json({
        status: true,
        message: "Thank you for your reservation!",
        dateMessage: `Your reservation is confirmed. Pickup date: ${formattedDate}`,
      });
    }
  } catch (error) {
    console.error("Error making reservation:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
}

export { reservation };
