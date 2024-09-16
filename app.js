import { createServer } from "node:http";
import { getTeam, getTeams, addTeam, modifTeam } from "./functions/api/Team.js";
import { getPoule } from "./functions/pouleStorage.js";
import { addPoule, allPoule } from "./functions/api/Poule.js";

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
                results = await getTeams();
                break;
            case "GET:/team":
                results = await getTeam(request, response, url);
                break;
            case "POST:/team":
                results = await addTeam(request, response);
                break;
            case "PUT:/team":
                results = await modifTeam(request, response, url);
                break;
            case "GET:/poules":
                results = await allPoule();
                break;
            case "GET:/poule":
                results = await getPoule(request, response, url);
                break;
            case "POST:/poules":
                results = await addPoule(request, response, url);
                break;
            case "OPTIONS:/poules":
                res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');
                break;
            default:
                res.writeHead(400)
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