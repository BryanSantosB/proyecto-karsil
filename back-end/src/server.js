const app = require("./app");
const { port } = require("./config/env");

app.listen(port, () => {
  console.log(`🚀 Karsil API running on port ${port}`);
});
