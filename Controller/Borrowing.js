import { Borrowing } from "../Modal/Borrowing.js";
import { Member } from "../Modal/Members.js";

async function borrow(req, res) {
  const memberId = req.member.id;
  const bookId = req.params.id;

  try {
    const existingBorrow = await Borrowing.findOne({ bookId });
    if (existingBorrow) {
      return res
        .status(400)
        .json({ message: "This book is already borrowed." });
    }

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
  const existingBorrow = await Borrowing.findOne({ bookId });

  try {
    if (!existingBorrow) {
      return res.status(400).json({ message: "This book is not borrowed." });
    }
    await existingBorrow.deleteOne();
    const member = await Member.findById(memberId);
    member.Borrow = member.Borrow.filter(
      (id) => id.toString() !== existingBorrow._id.toString()
    );
    await member.save();
    res.json({ message: "Book returned successfully." });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function List(req, res) {
  // return res.status(200).json({ message: "SALAM" });
  const memberId = req.member.id;
  const borrowList = await Borrowing.find();
  // memberId
  console.log(memberId);
  // console.log(borrowList);

  try {
    const list = borrowList.data.filter((ele) => ele.memberId == memberId)
    if (list) {
      res
        .status(200)
        .json({ success: true, message: "Borrowing  List", data: list });
    } else {
      res.status(404).json({ success: true, message: "data  not  found" });
    }
  } catch (error) {}
}

export { borrow, returned, List };
