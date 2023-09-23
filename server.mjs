import express from "express"
import router from "./routes/routes.mjs";
const app = express();
const PORT = 5001;

// middleware

app.use(express.json());
app.use('/', router);


//server started port

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));