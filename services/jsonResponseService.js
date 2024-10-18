function jsonResponse(data) {
    console.log(data);

    if (data !== null) {
        return { status: "success", data: data }
    }
    return { status: "error", message: "empty reccords" }
}

module.exports = { jsonResponse }