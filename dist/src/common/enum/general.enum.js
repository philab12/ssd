"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSTYPE = exports.USERLEVEL = exports.STATUS = exports.PORTALENUM = exports.YESNO = void 0;
var YESNO;
(function (YESNO) {
    YESNO["YES"] = "YES";
    YESNO["NO"] = "NO";
})(YESNO || (exports.YESNO = YESNO = {}));
var PORTALENUM;
(function (PORTALENUM) {
    PORTALENUM["GERDD"] = "GERDD";
    PORTALENUM["PROVIDER"] = "PROVIDER";
    PORTALENUM["SUPPORT"] = "SUPPORT";
})(PORTALENUM || (exports.PORTALENUM = PORTALENUM = {}));
var STATUS;
(function (STATUS) {
    STATUS["PENDING"] = "PENDING";
    STATUS["APPROVED"] = "APPROVED";
    STATUS["REJECTED"] = "REJECTED";
})(STATUS || (exports.STATUS = STATUS = {}));
var USERLEVEL;
(function (USERLEVEL) {
    USERLEVEL["GLOBAL"] = "GLOBAL";
    USERLEVEL["COUNTRY"] = "COUNTRY";
    USERLEVEL["LOCAL"] = "LOCAL";
    USERLEVEL["ADMIN"] = "ADMIN";
    USERLEVEL["AUTHORIZER"] = "AUTHORIZER";
    USERLEVEL["SUPPORT"] = "SUPPORT";
})(USERLEVEL || (exports.USERLEVEL = USERLEVEL = {}));
var TRANSTYPE;
(function (TRANSTYPE) {
    TRANSTYPE["BANK"] = "BANK";
    TRANSTYPE["MOMO"] = "MOMO";
    TRANSTYPE["CREDIT_CARD"] = "CREDIT_CARD";
})(TRANSTYPE || (exports.TRANSTYPE = TRANSTYPE = {}));
//# sourceMappingURL=general.enum.js.map