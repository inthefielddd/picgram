import "regenerator-runtime";
import dotenv from "dotenv";

import "./db";
import app from "./app";

import "./passport";

//models
import "./models/Image";
import "./models/User";
import "./models/Comment";

dotenv.config();

//port
const PORT = process.env.PORT || 1005;

const handleListening = () => {
    console.log(`✅Listening on : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
