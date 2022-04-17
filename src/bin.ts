#!/usr/bin/env node
import * as dotenv from "dotenv";
import compile from "./index";
import * as mkdirp from "mkdirp";
import { program } from "commander";
import * as fs from "fs-extra";
import * as path from "path";

dotenv.config();

program.option("-o, --outdir <path>", "Output directory path");
program.option("-t, --token <path>", "Figma token");
program.option("-f, --file <path>", "Figma file id");
program.parse();

const args = { token: process.env['FigmaToken'], file: process.env['FigmaFile'], outdir: "figon", ...program.opts() };

function stream(res: any) {
  const dist = path.resolve(process.cwd(), `${args.outdir}/${args.file}.json`);
  mkdirp.sync(path.dirname(dist));
  fs.writeFileSync(dist, JSON.stringify(res, null, 2));
}

const { token, file } = args as any;
if (!!token && !!file) {
  compile(token, file).then(stream);
} else {
  throw new Error("A Figma token and file are required");
}
