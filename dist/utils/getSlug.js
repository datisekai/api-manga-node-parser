"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSlugChap = (url, defalltParams) => {
    return url.split(`${process.env.BASE_URL}${defalltParams}`)[1];
};
exports.default = getSlugChap;
//# sourceMappingURL=getSlug.js.map