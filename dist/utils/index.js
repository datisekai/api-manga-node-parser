"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryVariable = void 0;
function getQueryVariable(search, variable) {
    var query = search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}
exports.getQueryVariable = getQueryVariable;
//# sourceMappingURL=index.js.map