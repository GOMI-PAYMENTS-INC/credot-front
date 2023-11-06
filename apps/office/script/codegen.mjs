import fs from "fs";
import path from "path";
import util from "util";
import OpenAPI from "openapi-typescript-codegen";
import * as child from 'child_process';
import config from './config.mjs';

const exec = util.promisify(child.exec);

async function run() {
  if (!config.enable) {
    return;
  }

  try {
    // front api dto 생성
    if (config.frontApi && config.frontApi.url && config.frontApi.outPath) {
      const modelPath = path.resolve(config.frontApi.outPath, "models");
      const servicePath = path.resolve(config.frontApi.outPath, "services");
      const corePath = path.resolve(config.frontApi.outPath, "core");

      if (fs.existsSync(modelPath)) {
        fs.rmSync(modelPath, { recursive: true });
      }

      if (fs.existsSync(servicePath) && config.exportService) {
        fs.rmSync(servicePath, { recursive: true });
      }

      if (fs.existsSync(corePath) && config.exportCore) {
        fs.rmSync(corePath, { recursive: true });
      }

      await OpenAPI.generate({
        input: config.frontApi.url,
        output: config.frontApi.outPath,
        exportCore: config.exportCore,
        exportServices: config.exportService,
        httpClient: "axios",
        indent: "2",
      });

      await exec(
        `npx prettier --write --loglevel silent ${config.frontApi.outPath}`
      );
    }
    console.log("🎉  DTO 생성 완료");
  } catch (err) {
    console.error(err);
  }
}

run();
