import fs from "fs/promises";
import path from "path";

import { LOG_FOLDER } from "./config.js";

/* ===========================================================
   COLORS
=========================================================== */

const COLORS = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    blue: "\x1b[34m"
};

/* ===========================================================
   LOG FILES
=========================================================== */

const SUCCESS_LOG = path.join(
    LOG_FOLDER,
    "success.log"
);

const FAILED_LOG = path.join(
    LOG_FOLDER,
    "failed.log"
);

const MISSING_LOG = path.join(
    LOG_FOLDER,
    "missing.log"
);

/* ===========================================================
   CREATE LOG DIRECTORY
=========================================================== */

export async function initializeLogger() {

    await fs.mkdir(
        LOG_FOLDER,
        {
            recursive: true
        }
    );

    await fs.writeFile(
        SUCCESS_LOG,
        ""
    );

    await fs.writeFile(
        FAILED_LOG,
        ""
    );

    await fs.writeFile(
        MISSING_LOG,
        ""
    );

}

/* ===========================================================
   WRITE LOG
=========================================================== */

async function append(file, message) {

    await fs.appendFile(
        file,
        `${message}\n`
    );

}

/* ===========================================================
   SUCCESS
=========================================================== */

export async function logSuccess(message) {

    console.log(
        `${COLORS.green}✔ ${message}${COLORS.reset}`
    );

    await append(
        SUCCESS_LOG,
        message
    );

}

/* ===========================================================
   FAILED
=========================================================== */

export async function logFailed(message) {

    console.log(
        `${COLORS.red}✖ ${message}${COLORS.reset}`
    );

    await append(
        FAILED_LOG,
        message
    );

}

/* ===========================================================
   WARNING
=========================================================== */

export async function logWarning(message) {

    console.log(
        `${COLORS.yellow}⚠ ${message}${COLORS.reset}`
    );

}

/* ===========================================================
   INFO
=========================================================== */

export async function logInfo(message) {

    console.log(
        `${COLORS.cyan}${message}${COLORS.reset}`
    );

}

/* ===========================================================
   MISSING
=========================================================== */

export async function logMissing(destination) {

    console.log(
        `${COLORS.blue}Missing Folder : ${destination}${COLORS.reset}`
    );

    await append(
        MISSING_LOG,
        destination
    );

}