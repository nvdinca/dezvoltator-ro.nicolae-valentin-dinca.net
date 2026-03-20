import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const heroDir = path.join(rootDir, "public", "images", "hero");
const outputDir = path.join(heroDir, "variants");

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  const files = await fs.readdir(heroDir);
  const heroFiles = files.filter((file) => /^hero-\d+\.webp$/i.test(file));

  for (const file of heroFiles) {
    const inputPath = path.join(heroDir, file);
    const baseName = file.replace(/\.webp$/i, "");
    const out800 = path.join(outputDir, `${baseName}-800.webp`);
    const out1200 = path.join(outputDir, `${baseName}-1200.webp`);

    await sharp(inputPath).resize({ width: 800 }).webp({ quality: 74 }).toFile(out800);
    await sharp(inputPath).resize({ width: 1200 }).webp({ quality: 78 }).toFile(out1200);
  }

  console.log(`Generated variants for ${heroFiles.length} hero image(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
