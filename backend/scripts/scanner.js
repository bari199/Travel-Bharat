import fs from "fs/promises";
import path from "path";

import { HERO_FOLDER } from "./config.js";
import { isImage } from "./helpers.js";

/* ===========================================================
   CHECK DIRECTORY EXISTS
=========================================================== */

export async function directoryExists(directory) {

    try {

        const stat = await fs.stat(directory);

        return stat.isDirectory();

    } catch {

        return false;

    }

}

/* ===========================================================
   GET DESTINATION FOLDERS
=========================================================== */

export async function getDestinationFolders() {

    const exists = await directoryExists(HERO_FOLDER);

    if (!exists) {

        throw new Error(
            `Hero folder not found:\n${HERO_FOLDER}`
        );

    }

    const entries = await fs.readdir(
        HERO_FOLDER,
        {
            withFileTypes: true
        }
    );

    return entries
        .filter(item => item.isDirectory())
        .map(item => item.name)
        .sort();

}

/* ===========================================================
   GET IMAGE FILES
=========================================================== */

export async function getImages(destinationFolder) {

    const folder = path.join(
        HERO_FOLDER,
        destinationFolder
    );

    const entries = await fs.readdir(
        folder,
        {
            withFileTypes: true
        }
    );

    return entries
        .filter(file =>
            file.isFile() &&
            isImage(file.name)
        )
        .map(file => ({
            fileName: file.name,
            fullPath: path.join(
                folder,
                file.name
            )
        }))
        .sort((a, b) =>
            a.fileName.localeCompare(b.fileName)
        );

}

/* ===========================================================
   SCAN HERO DIRECTORY
=========================================================== */

export async function scanHeroFolder() {

    const folders =
        await getDestinationFolders();

    const result = [];

    for (const folder of folders) {

        const images =
            await getImages(folder);

        result.push({

            destination: folder,

            imageCount: images.length,

            images

        });

    }

    return result;

}