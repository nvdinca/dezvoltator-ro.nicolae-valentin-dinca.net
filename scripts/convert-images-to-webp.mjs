import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const imageRoot = path.join(rootDir, "public", "images");

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    files.push(fullPath);
  }

  return files;
}

async function convert() {
  const files = await walk(imageRoot);
  const jpgFiles = files.filter((file) => /\.(jpe?g)$/i.test(file));

  await Promise.all(
    jpgFiles.map(async (jpgFile) => {
      const webpFile = jpgFile.replace(/\.(jpe?g)$/i, ".webp");
      await sharp(jpgFile).webp({ quality: 78 }).toFile(webpFile);
    }),
  );

  console.log(`Converted ${jpgFiles.length} image(s) to WebP.`);
}

convert().catch((error) => {
  console.error(error);
  process.exit(1);
});
