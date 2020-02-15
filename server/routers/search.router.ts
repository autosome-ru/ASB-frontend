import * as express from "express";
import * as search from "../mocks/search";

export const searchRouter = express.Router();

searchRouter.get("/snps/options/rs1", (req, res) => {
    res.status(200).json(search.searchOptions);
});
searchRouter.get("/rs11260841", (req, res) => {
    res.status(200).json(search.searchResults);
});
