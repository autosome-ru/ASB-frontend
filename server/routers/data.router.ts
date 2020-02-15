import * as express from "express";
import * as data from "../mocks/data";

export const dataRouter = express.Router();

dataRouter.get("/snps/rs11260841", (req, res) => {
    res.status(200).json(data.snpInfo);
});
