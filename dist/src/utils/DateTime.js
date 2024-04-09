"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localTime = void 0;
const localTime = (timeZoneOffset) => {
    console.log('TimeZoneOffset', timeZoneOffset);
    if (timeZoneOffset) {
        const offsetInMilliseconds = parseInt(timeZoneOffset, 10) * 60 * 1000;
        const localDateTime = new Date(new Date().getTime() - offsetInMilliseconds).toISOString();
        console.log('localDateTime =>=> ', localDateTime);
        return localDateTime;
    }
};
exports.localTime = localTime;
