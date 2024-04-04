import { Book } from "../Modal/Books.js";

async function create(req, res, next) {
  const body = req.body;
  const memberId = req.member.id;
  try {
    const book = new Book({
      publicationDate: new Date().toLocaleDateString(),
      memberId,
      ...body,
    });
    const savedBook = await book.save();

    res.status(201).json({
      success: true,
      message: "Book has been created and added to member's books",
      book: savedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
 
  }
}

async function update(req, res, next) {
  const id = req.params.id.trim();
  const { title, authors, genre } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title: title, authors: authors, genre: genre },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "update book ",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function books(req, res, next) {
  try {
    const books = await Book.find();

    if (!books || books.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No books found" });
    }
    res
      .status(200)
      .json({ success: true, message: "books found", data: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function book(req, res, next) {
  const id = req.params.id;
  // console.log(id);
  try {
    const singleBook = await Book.findById(id);
    res
      .status(200)
      .json({ success: true, message: "Book found", data: singleBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function deleted(req, res, next) {
  const id = req.params.id;
  try {
    const book = await Book.findByIdAndDelete(id);
    // console.log(book)
    if (book == null) {
      return res
        .status(404)
        .json({ success: false, message: "book not  find" });
    } else {
      return res.status(200).json({ success: true, message: "book Deleted" });
    }
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
export { create, update, book, books, deleted };
