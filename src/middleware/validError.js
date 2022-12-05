const validError = (req, res, next) => {
    if (!req.params.id) {
        res.json ({
            error: 'Bad request, missing ID'
        }).status(404);
    } else {
        next();
    }
}

module.exports = validError