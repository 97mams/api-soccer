const { createServer } = require("node:http");
const { getTeam, getTeams, addTeam, modifTeam } = require("./controllers/Team");
const { getGroup, addTeamGroup, getGroupByname } = require("./controllers/Group");
const { getMatches, addMatch, updateMatch, getMatchByGroup } = require("./controllers/Match");

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
                results = await getTeam(url);
                break;
            case "POST:/team":
                results = await addTeam(request, response);
                break;
            case "PUT:/team":
                results = await modifTeam(request, url);
                break;
            case "GET:/groups":
                results = await getGroup(request, response);
                break;
            case "GET:/group":
                results = await getGroupByname(url);
                break;
            case "POST:/groups":
                results = await addTeamGroup(request, response);
                break;
            case "GET:/match":
                results = await getMatchByGroup(url);
                break;
            case "GET:/matches":
                results = await getMatches();
                break;
            case "POST:/matches":
                results = await addMatch(request, response, url);
                break;
            case "PUT:/matches":
                results = await updateMatch(request, url);
                break;
            case "OPTIONS:/":
                response.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');
                break;
            default:
                response.writeHead(400)
                results = {
                    "status": "error",
                    "message": "Unable to communicate with database"
                }
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