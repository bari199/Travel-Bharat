import path from "path";
import { VALID_EXTENSIONS } from "./config.js";

/* ===========================================================
   CHECK IMAGE FILE
=========================================================== */

export function isImage(fileName) {

    if (!fileName) return false;

    const extension = path.extname(fileName).toLowerCase();

    return VALID_EXTENSIONS.includes(extension);

}

/* ===========================================================
   NORMALIZE DESTINATION NAME
=========================================================== */

export function normalizeName(name = "") {

    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ")
        .replace(/[-_]/g, " ");

}

/* ===========================================================
   FORMAT TIME
=========================================================== */

export function formatTime(seconds) {

    const hrs = Math.floor(seconds / 3600);

    const mins = Math.floor((seconds % 3600) / 60);

    const secs = Math.floor(seconds % 60);

    return `${hrs}h ${mins}m ${secs}s`;

}

/* ===========================================================
   SLEEP
=========================================================== */

export function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

/* ===========================================================
   FORMAT FILE SIZE
=========================================================== */

export function formatBytes(bytes) {

    if (bytes === 0) return "0 Bytes";

    const k = 1024;

    const sizes = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
        parseFloat((bytes / Math.pow(k, i)).toFixed(2))
        + " "
        + sizes[i]
    );

}

/* ===========================================================
   CHUNK ARRAY
=========================================================== */

export function chunkArray(array, size) {

    const chunks = [];

    for (let i = 0; i < array.length; i += size) {

        chunks.push(
            array.slice(i, i + size)
        );

    }

    return chunks;

}

/* ===========================================================
   PERCENTAGE
=========================================================== */

export function percentage(current, total) {

    if (total === 0) return 0;

    return ((current / total) * 100).toFixed(1);

}

/* ===========================================================
   PROGRESS BAR
=========================================================== */

export function progressBar(current, total) {

    const width = 30;

    const filled = Math.round(
        (current / total) * width
    );

    return (
        "█".repeat(filled) +
        "░".repeat(width - filled)
    );

}

/* ===========================================================
   RETRY
=========================================================== */

export async function retry(fn, retries = 3) {

    let lastError;

    for (let i = 1; i <= retries; i++) {

        try {

            return await fn();

        } catch (err) {

            lastError = err;

        }

    }

    throw lastError;

}