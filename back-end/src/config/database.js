const { Pool } = require("pg");

const { Pool } = require('pg');

// Esta línea es la clave: 
// En Render usará DATABASE_URL. En tu PC, como no existe esa variable, 
// usará los valores individuales de tu .env local.
const pool = new Pool(
  process.env.DATABASE_URL 
    ? { 
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false } 
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      }
);

pool.on("connect", () => {
  console.log("✅ Conectado a PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ Error en PostgreSQL", err);
  process.exit(1);
});

module.exports = pool;
