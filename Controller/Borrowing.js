import { Borrowing } from "../Modal/Borrowing.js";
import { Member } from "../Modal/Members.js";
import { Reservation } from "../Modal/reservation.js";

async function borrow(req, res) {
  const memberId = req.member.id;
  const bookId = req.params.id;
  try {
    const existingBorrow = await Borrowing.findOne({ bookId });
    if (existingBorrow) {
      return res.status(400).json({
        message: "This book is already borrowed.",
      });
    }

    const existingReservation = await Reservation.findOne({ bookId });
    if (existingReservation) {
      return res.status(400).json({
        message: "This book is already reserved.",
      });
    }

    // Proceed with borrowing
    const borrowDate = new Date();
    const returnDate = new Date(borrowDate);
    returnDate.setDate(returnDate.getDate() + 7);

    const borrowing = new Borrowing({
      borrowStatus: true,
      borrowDate: borrowDate,
      memberId,
      bookId,
      returnDate: returnDate,
    });

    const savedBookBorrow = await borrowing.save();
    const member = await Member.findById(memberId);
    member.Borrow.push(borrowing._id);
    await member.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully.",
      data: savedBookBorrow,
    });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function returned(req, res) {
  const memberId = req.member.id;
  const bookId = req.params.id;
  try {
    const existingBorrow = await Borrowing.findOne({ bookId });
    if (!existingBorrow) {
      return res.status(400).json({ message: "This book is not borrowed." });
    }
    if (existingBorrow.memberId.toString() !== memberId.toString()) {
      return res
        .status(400)
        .json({ message: "This book was not borrowed by this member." });
    }

    const borrowDate = new Date(existingBorrow.borrowDate);
    const returnDate = new Date();

    const milliseconds = returnDate.getTime() - borrowDate.getTime();
    const days = milliseconds / (1000 * 3600 * 24);

    let fine = 0;
    if (days > 7) {
      const finePerDay = 10;
      fine = finePerDay * Math.ceil(days - 7);
    }

    const member = await Member.findById(memberId);
    member.Borrow = member.Borrow.filter(
      (id) => id.toString() !== existingBorrow._id.toString()
    );
    await member.save();

    await existingBorrow.deleteOne();

    if (fine > 0) {
      return res.json({ status: "Fine", message: `Fine: $${fine}` });
    } else {
      return res.json({ message: "Book returned successfully." });
    }
  } catch (error) {
    console.error("Error returning book:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { borrow, returned };
