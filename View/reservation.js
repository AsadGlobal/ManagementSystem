import express from "express";

import { verifytoken } from "../jwt.js";
import { reservation } from "../Controller/reservation.js";

const reservationRoutes = express.Router();

reservationRoutes.post("/reservation/:id", verifytoken, reservation);

export { reservationRoutes };
