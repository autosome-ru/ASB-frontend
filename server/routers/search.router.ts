import * as express from "express";
import * as search from "../mocks/search";

export const searchRouter = express.Router();

searchRouter.get("/options/rs1", (req, res) => {
    res.status(200).json(search.searchOptions);
});
