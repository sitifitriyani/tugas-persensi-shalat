import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import routerLogin from "../api/routers/routerLogin.js";
import routerStudent from "../api/routers/routerStudent.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(routerLogin);
app.use(routerStudent);

const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`server is running on http://localhost:${PORT}`));
