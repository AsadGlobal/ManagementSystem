import express from "express";
import {
  create,
  update,
  members,
  member,
  deleted,
  Login,
  List
} from "../Controller/Members.js";
import { verifytoken } from "../jwt.js";

const membersRoutes = express.Router();

// Read
membersRoutes.get("/members", members);
membersRoutes.get("/members/:id", member);
// Create
membersRoutes.post("/members", create);
// PUT Update
membersRoutes.put("/members/:id", verifytoken, update);
//  DELETE
membersRoutes.delete("/members/:id", verifytoken, deleted);

// LOGIN
membersRoutes.post("/members/Login", Login);

// GET
// membersRoutes.get("/members/borrowList", verifytoken, List);
// membersRoutes.get("/members/borrowList", verifytoken, List);
membersRoutes.get("/borrowList", verifytoken, List);


export { membersRoutes };
