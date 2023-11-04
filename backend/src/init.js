import "dotenv/config";
import "./db.js";
import app from "./server.js";

app.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}`)
);
