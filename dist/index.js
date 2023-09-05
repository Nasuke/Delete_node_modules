"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const promises_1 = __importDefault(require("fs/promises"));
const homeDir = os_1.default.homedir();
const foundDirs = [];
function searchDir(dirPath, searchName) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 找到路径
        yield searchDir(homeDir, 'node_modules');
        // 写入found文件夹 os.EOL换行符
        yield promises_1.default.writeFile('./found', foundDirs.join(os_1.default.EOL));
        console.log("DOWN");
    });
}
//# sourceMappingURL=index.js.map