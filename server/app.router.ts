import * as express from "express";
import * as routers from "./routers";


const appRouter = express.Router();

const routesApi = [
    {
        url: "data",
        middleware: routers.dataRouter
    },
];

routesApi.forEach(router => appRouter.use("/api/" + router.url, router.middleware));

export default appRouter;
