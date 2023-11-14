const findUserIdByUsername = require("./find-user-id-by-username");

function userHasPermissionOnPost(token, post) {
    const userId = findUserIdByUsername(token.sub);

    return userId === post.authorId || token.roles.includes('admin');
}

module.exports = userHasPermissionOnPost;
