function jsonResponse(name, data) {
    if (data !== null) {
        return { status: "success", data: { [name]: data } }
    }
    return { status: "error", message: `${name} not found` }
}

module.exports = { jsonResponse }