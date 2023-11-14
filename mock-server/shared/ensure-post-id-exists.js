function ensurePostIdExists(req, res, next) {
    if (['null', 'undefined', ''].includes(req.body.id)) {
        res.status(400).json({ message: 'id cannot be non-numeric: ' + req.body.id });
    }
    else next();
}

module.exports = ensurePostIdExists;
