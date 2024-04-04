import jwt from "jsonwebtoken";
import { Member } from "../Modal/Members.js";
import { Borrowing } from "../Modal/Borrowing.js";

async function create(req, res) {
  const body = req.body;
  try {
    const member = new Member({
      membershipDate: new Date().toLocaleDateString(),
      ...body,
    });

    const savedMember = await member.save();

    res.status(201).json({
      message: "Member has been created",
      member: savedMember,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function update(req, res) {
  const id = req.params.id.trim();

  try {
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { name: req.body.name, email: req.body.email },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.status(200).json({
      success: true,
      message: "update Member ",
      data: updatedMember,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function members(req, res) {
  try {
    const members = await Member.find();

    if (!members || members.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No members found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Members found", data: members });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function member(req, res) {
  const id = req.params.id;
  // console.log(id);
  try {
    const member = await Member.findById(id);
    res
      .status(200)
      .json({ success: true, message: "member found", data: member });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function deleted(req, res) {
  const id = req.params.id;
  try {
    await Member.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "member Deleted", data: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function Login(req, res) {
  try {
    const { name, email } = req.body;

    const member = await Member.findOne({ name });

    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    const token = jwt.sign(
      { id: member._id, name: member.name },
      process.env.PrivateKey,
      { expiresIn: "24h" }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
    });

    res
      .status(200)
      .json({ success: true, message: "Member found", data: member });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function List(req, res) {
  try {
    const memberId = req.member.id;
    const borrowList = await Borrowing.find();
    const filterData = borrowList.filter((ele) => ele.memberId == memberId);

    if (filterData.length === 0) {
      return res
        .status(404)
        .json({ message: "No borrowings found for this user" });
    }

    return res
      .status(200)
      .json({ message: "User borrow list", data: filterData });
  } catch (error) {
    console.error("Error in List:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export { create, update, members, member, deleted, Login, List };
