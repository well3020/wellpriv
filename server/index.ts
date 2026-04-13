import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o arquivo de persistência das visitas
const VISITS_FILE = path.resolve(__dirname, "visits.json");
const INITIAL_VISITS = 360;

// Função para ler as visitas do arquivo
function getVisits(): number {
  try {
    if (fs.existsSync(VISITS_FILE)) {
      const data = fs.readFileSync(VISITS_FILE, "utf-8");
      const parsed = JSON.parse(data);
      return parsed.count || INITIAL_VISITS;
    }
  } catch (error) {
    console.error("Erro ao ler arquivo de visitas:", error);
  }
  return INITIAL_VISITS;
}

// Função para salvar as visitas no arquivo
function saveVisits(count: number) {
  try {
    fs.writeFileSync(VISITS_FILE, JSON.stringify({ count }), "utf-8");
  } catch (error) {
    console.error("Erro ao salvar arquivo de visitas:", error);
  }
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // API para obter e incrementar o contador de visitas
  app.get("/api/visits", (_req, res) => {
    const currentVisits = getVisits();
    res.json({ count: currentVisits });
  });

  app.post("/api/visits/increment", (_req, res) => {
    const currentVisits = getVisits();
    const newVisits = currentVisits + 1;
    saveVisits(newVisits);
    res.json({ count: newVisits });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
