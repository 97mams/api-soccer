import { createServer } from "node:http";
import { getTeam, getTeams, addTeam, modifTeam } from "./functions/api/Team.js";
import { addGroup, allGroup, getGroupByType } from "./functions/api/Group.js";
import { getMatch, getMatchByGroup, updateStatMatch } from './functions/api/Match.js'
import { updateMatchs } from "./functions/matchStorage.js";

const port = 3000;
const host = "127.0.0.1";

const callback = async (request, response) => {
    try {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', '*');
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
            case "GET:/groups":
                results = await allGroup();
                break;
            case "GET:/group":
                results = await getGroupByType(request, response, url);
                break;
            case "POST:/groups":
                results = await addGroup(request, response, url);
                break;
            case "GET:/match":
                results = await getMatchByGroup(request, response, url);
                break;
            case "GET:/matchs":
                results = await getMatch();
                break;
            case "PUT:/match":
                results = await updateStatMatch(request, response, url);
                break;
            case "OPTIONS:/groups":
                response.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');
                break;
            default:
                response.writeHead(400)
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