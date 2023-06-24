module.exports.profile = (req, res) => {
    return res.end("<h1>Users profile </h1>");
}

module.exports.posts = (req, res) => {
    return res.end('<h1>users post</h1>')
}