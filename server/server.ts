import * as express from "express";
import * as bodyParser from "body-parser";
import appRouter from "./app.router";

const app = express(),
      port = process.env.NODEJS_PORT || 3000,
      root =  "/";

const allowCrossDomain = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
};


// Add your mock router here
const routers = [
    {
        url: "",
        middleware: appRouter,
    },
];

app.use(allowCrossDomain);
app.use(bodyParser.json());

routers.forEach(router => app.use(root + router.url, router.middleware));

app.listen(port, () => {
    console.log(`Mock server is listening on port ${port}`);
});
