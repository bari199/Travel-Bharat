import "dotenv/config";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import { Destination } from "../models/destination.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HERO_ROOT = path.join(__dirname, "../bulk-images");

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

const summary = {
  totalFolders: 0,
  matched: 0,
  uploaded: 0,
  skipped: 0,
  failed: 0,
};

const normalize = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]/g, "");

async function deleteOldImages(images = []) {
  if (!Array.isArray(images) || images.length === 0) return;

  for (const image of images) {
    try {
      if (!image?.public_id) continue;

      await cloudinary.uploader.destroy(image.public_id, {
        resource_type: "image",
      });

      console.log(`   🗑 Deleted: ${image.public_id}`);
    } catch (err) {
      console.log(`   ⚠ Delete failed: ${image.public_id}`);
    }
  }
}

async function uploadImages(destinationName, imagePaths) {
  const uploaded = [];

  for (let i = 0; i < imagePaths.length; i++) {
    const file = imagePaths[i];

    const result = await cloudinary.uploader.upload(file, {
      folder: `TravelBharat/Hero/${destinationName}`,
      resource_type: "image",
      overwrite: true,
    });

    uploaded.push({
      url: result.secure_url,
      public_id: result.public_id,
    });

    console.log(
      `   ✅ Uploaded ${i + 1}/${imagePaths.length}: ${path.basename(file)}`,
    );
  }

  return uploaded;
}

async function processFolder(folderName) {
  const folderPath = path.join(HERO_ROOT, folderName, "hero");
  const files = fs
    .readdirSync(folderPath)
    .filter((file) =>
      IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()),
    )
    .map((file) => path.join(folderPath, file));

  if (files.length === 0) {
    console.log(`⚠ No images: ${folderName}`);
    summary.skipped++;
    return;
  }

  const destinations = await Destination.find({
    name: new RegExp(`^${folderName}$`, "i"),
  });

  let destination = destinations[0];

  if (!destination) {
    const all = await Destination.find({}, "name");

    destination = all.find((d) => normalize(d.name) === normalize(folderName));

    if (destination) {
      destination = await Destination.findById(destination._id);
    }
  }

  if (!destination) {
    console.log(`❌ Destination not found: ${folderName}`);
    summary.failed++;
    return;
  }

  summary.matched++;

  console.log(`\n📍 ${destination.name}`);

  // ✅ Skip if hero images already exist
  if (
    Array.isArray(destination.images) &&
    destination.images.length > 0 &&
    destination.images[0]?.public_id
  ) {
    console.log(`   ⏭ Hero images already exist. Skipping...`);
    summary.skipped++;
    return;
  }

  await deleteOldImages(destination.images);

  const uploadedImages = await uploadImages(destination.name, files);

  await Destination.updateOne(
    { _id: destination._id },
    {
      $set: {
        images: uploadedImages,
      },
    },
    {
      runValidators: false,
    },
  );

  summary.uploaded++;

  console.log(`   💾 MongoDB Updated`);
}

async function main() {
  try {
    console.log("\n==================================");
    console.log(" TravelBharat Hero Bulk Upload");
    console.log("==================================\n");

    await connectDB();

    if (!fs.existsSync(HERO_ROOT)) {
      throw new Error(`Folder not found:\n${HERO_ROOT}`);
    }

    const folders = fs
      .readdirSync(HERO_ROOT)
      .filter((folder) =>
        fs.statSync(path.join(HERO_ROOT, folder)).isDirectory(),
      );

    summary.totalFolders = folders.length;

    for (const folder of folders) {
      await processFolder(folder);
    }

    console.log("\n==================================");
    console.log(" Upload Summary");
    console.log("==================================");
    console.log(`Folders Found      : ${summary.totalFolders}`);
    console.log(`Matched            : ${summary.matched}`);
    console.log(`Updated            : ${summary.uploaded}`);
    console.log(`Skipped            : ${summary.skipped}`);
    console.log(`Failed             : ${summary.failed}`);
    console.log("==================================\n");

    process.exit(0);
  } catch (err) {
    console.error("\n❌ ERROR");
    console.error(err);
    process.exit(1);
  }
}

main();
