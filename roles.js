const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
    ac.grant("user")
        .readOwn("profile")
        .updateOwn("profile")
    
    ac.grant("admin")
        .extend("basic")
        .extend("supervisor")
        .updateAny("profile")
        .deleteAny("profile")
        .updateAny("products")
        .deleteAny("products")
    
    return ac;
})();