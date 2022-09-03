"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePathPerNameFolder = void 0;
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const util_1 = require("util");
const globPromise = (0, util_1.promisify)(glob_1.default);
async function getFilePathPerNameFolder(nameFolder) {
    //test with glob
    const fileNames = await globPromise(`./src/${nameFolder}/**/*.{ts,js}`, {
        ignore: '**/node_modules/**',
    });
    //transforma in absoltue path
    const filePaths = fileNames.map((fileName) => path_1.default.resolve(fileName));
    return filePaths;
}
exports.getFilePathPerNameFolder = getFilePathPerNameFolder;
