"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.json());
app.get('/ping', (_req, res) => {
    console.log('ponged here');
    res.send('ponged.');
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`We are on port ${PORT}`);
});
