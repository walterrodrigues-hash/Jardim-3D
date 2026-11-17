// Gera dist/index.html injetando as variáveis de ambiente (Vercel ou .env local).
const fs = require("fs"), path = require("path");
const envFile = path.join(__dirname, ".env");
if (fs.existsSync(envFile)) {
  for (const l of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) { console.error("Defina SUPABASE_URL e SUPABASE_PUBLISHABLE_KEY (veja .env.example)."); process.exit(1); }
if (!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url)) { console.error("SUPABASE_URL inválida."); process.exit(1); }
const html = fs.readFileSync(path.join(__dirname, "src", "index.template.html"), "utf8")
  .replace("__SUPABASE_URL__", url.replace(/\/$/, "")).replace("__SUPABASE_KEY__", key);
fs.mkdirSync(path.join(__dirname, "dist"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "dist", "index.html"), html);
console.log("dist/index.html gerado.");
