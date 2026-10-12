import { cp, mkdir, rm } from "node:fs/promises";

const source = `${import.meta.dir}/../apps/web/dist`;
const destination = `${import.meta.dir}/../dist`;

await rm(destination, { force: true, recursive: true });
await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });

console.info("Staged apps/web/dist as the deployable root dist/.");
