const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const mail = require("./services/mail");

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());


app.use("/api/auth", require("./routes/authRoutes"));

app.post("/api/mail", mail);


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
