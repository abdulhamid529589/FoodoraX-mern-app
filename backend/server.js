require("dotenv").config(); // ✅ Load environment variables first!

const app = require("./src/app");
const connectToDB = require("./src/db/db.js");

connectToDB();


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
