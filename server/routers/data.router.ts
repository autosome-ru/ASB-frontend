import * as express from "express";
import * as data from "../mocks/data";

export const dataRouter = express.Router();

dataRouter.get("/snp_info/rs1", (req, res) => {
    res.status(200).json(data.snpInfo);
});
