import "dotenv/config";
import "./db.js";
import app from "./server.js";

app.listen(process.env.PORT || 4000, () =>
    console.log(`Server listening on port ${process.env.PORT || 4000}`)
);
