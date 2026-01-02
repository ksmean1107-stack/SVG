import { createCanvas } from "canvas";

export default async function handler(req, res) {
  const { title = "TITLE", line1 = "TEXT 1", line2 = "TEXT 2" } = req.query;

  const w = 800, h = 600;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");

  // Background gradient
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#1e1e2f");
  g.addColorStop(1, "#3a3a6a");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Text
  ctx.fillStyle = "#fff";
  ctx.font = "bold 40px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, w / 2, 100);

  ctx.font = "28px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(line1, 80, 460);

  ctx.font = "22px sans-serif";
  ctx.fillStyle = "#ddd";
  ctx.fillText(line2, 80, 510);

  const buf = canvas.toBuffer("image/png");
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "no-store");
  res.send(buf);
}
