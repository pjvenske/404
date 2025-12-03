const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/articles", require("./routes/articleRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
