// user.validation.js

// Middleware function to validate username parameter
function validateUsername(req, res, next) {
    const { username } = req.params;
    if (!username) {
        return res.status(400).json({ error: 'Username parameter is required' });
    }
    next();
}

// Middleware function to validate query parameters for user search
function validateSearchQuery(req, res, next) {
    const { username, location } = req.query;
    if (!username && !location) {
        return res.status(400).json({ error: 'At least one search parameter (username or location) is required' });
    }
    next();
}

// Middleware function to validate sortBy parameter for sorting users
function validateSortBy(req, res, next) {
    const { sortBy } = req.query;
    if (!sortBy || !['public_repos', 'public_gists', 'followers'].includes(sortBy)) {
        return res.status(400).json({ error: 'Invalid sortBy parameter. It should be one of: public_repos, public_gists, followers' });
    }
    next();
}

module.exports = { validateUsername, validateSearchQuery, validateSortBy };
