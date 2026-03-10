/**
 * Enhances the hero figure image: sharpening and clarity.
 * Run: node scripts/enhance-figure.mjs
 * Outputs: public/hero-figure.png, public/hero-figure-mobile.png
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const srcPath = path.join(root, "assets", "hero-figure-source.png");
const outDesktop = path.join(root, "public", "hero-figure.png");
const outMobile = path.join(root, "public", "hero-figure-mobile.png");

async function main() {
  const fs = await import("fs");
  if (!fs.existsSync(srcPath)) {
    console.error("Source image not found:", srcPath);
    process.exit(1);
  }

  // Sharpen: sigma = edge radius, m1/m2 = flat/jagged threshold, x1/y2/y3 = flat/jagged amounts
  const sharpenOptions = { sigma: 1.8, m1: 1, m2: 2, x1: 2, y2: 10, y3: 20 };

  const pipeline = sharp(srcPath)
    .sharpen(sharpenOptions)
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .png({ compressionLevel: 6, effort: 10 });

  const meta = await sharp(srcPath).metadata();
  const { width, height } = meta;

  await pipeline.clone().toFile(outDesktop);
  console.log("Saved:", outDesktop);

  // Mobile: same enhancements, optionally slightly smaller if very large
  const mobileWidth = width > 900 ? 900 : width;
  await pipeline
    .clone()
    .resize(mobileWidth, null, { fit: "inside", withoutEnlargement: true })
    .toFile(outMobile);
  console.log("Saved:", outMobile);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
