import { createServer } from "node:http";

const port = 300;
const host = "127.0.0.1";

const callback = (request, response) => {

}

createServer(callback).listen(3000, (e) => {
    if (e) throw new Error("misy olana");
    console.log(`Project run in https://${host}:${port}/`);
})