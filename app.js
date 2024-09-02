import { createServer } from "node:http";
import { getTeams } from "./functions/api/soccer.js";

const port = 3000;
const host = "127.0.0.1";

const callback = async (request, response) => {
    try {
        response.setHeader('content-type', 'application/json');
        const url = new URL(request.url, `http://${request.headers.host}`);
        const endpoint = `${request.method}:${url.pathname}`;
        let results;
        switch (endpoint) {
            case "GET:/teams":
                results = getTeams();
                break;
            case "POST:/team":
                results = getTeams();
                break;
            default:
                break;
        }
        if (results) {
            response.write(JSON.stringify(results));
        }
    } catch (e) {
        console.log(e);
    }

    response.end();
}

createServer(callback).listen(port, (e) => {
    if (e) throw new Error("misy olana");
    console.log(`Project run in http://${host}:${port}/`);
})