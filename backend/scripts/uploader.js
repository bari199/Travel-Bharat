import cloudinary from "../config/cloudinary.js";

import fs from "fs/promises";

import path from "path";

import {
    CLOUDINARY_FOLDER,
    MAX_RETRY,
    MAX_PARALLEL_UPLOAD
} from "./config.js";

import { retry } from "./helpers.js";

/* ===========================================================
   UPLOAD SINGLE IMAGE
=========================================================== */

export async function uploadImage(filePath) {

    return retry(async () => {

        const result = await cloudinary.uploader.upload(
            filePath,
            {
                folder: CLOUDINARY_FOLDER,
                resource_type: "image"
            }
        );

        return {

            url: result.secure_url,

            public_id: result.public_id

        };

    }, MAX_RETRY);

}

/* ===========================================================
   DELETE CLOUDINARY IMAGE
=========================================================== */

export async function deleteImage(publicId) {

    if (!publicId) return;

    try {

        await cloudinary.uploader.destroy(publicId);

    } catch {

        // Ignore

    }

}

/* ===========================================================
   DELETE OLD HERO IMAGES
=========================================================== */

export async function deleteImages(images = []) {

    for (const image of images) {

        await deleteImage(image.public_id);

    }

}

/* ===========================================================
   PARALLEL IMAGE UPLOAD
=========================================================== */

export async function uploadImages(files) {

    const uploaded = [];

    for (let i = 0; i < files.length; i += MAX_PARALLEL_UPLOAD) {

        const batch = files.slice(
            i,
            i + MAX_PARALLEL_UPLOAD
        );

        const result = await Promise.all(

            batch.map(file =>
                uploadImage(file.fullPath)
            )

        );

        uploaded.push(...result);

    }

    return uploaded;

}

/* ===========================================================
   CHECK LOCAL IMAGE EXISTS
=========================================================== */

export async function imageExists(filePath) {

    try {

        await fs.access(filePath);

        return true;

    }

    catch {

        return false;

    }

}

/* ===========================================================
   GET IMAGE SIZE
=========================================================== */

export async function getImageSize(filePath) {

    const stat = await fs.stat(filePath);

    return stat.size;

}

/* ===========================================================
   SORT NUMERIC

1.jpg
2.jpg
10.jpg
=========================================================== */

export function sortImages(files) {

    return files.sort((a, b) => {

        const aName =
            path.parse(a.fileName).name;

        const bName =
            path.parse(b.fileName).name;

        const aNum = Number(aName);

        const bNum = Number(bName);

        if (

            !Number.isNaN(aNum) &&

            !Number.isNaN(bNum)

        ) {

            return aNum - bNum;

        }

        return a.fileName.localeCompare(
            b.fileName
        );

    });

}