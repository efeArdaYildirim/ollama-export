#!/usr/bin/env node

const fs = require("fs")
const { join } = require("path")
const { stdout } = require("process")
const tar = require("tar")


const PATH = process.env.OLLAMA_PATH

if (!PATH) {
    console.error("You must define ollama path env. EX: OLLAMA_PATH=\\Users\\dev\\.ollama")
    process.exit(1)
}

const modelParam = process.argv[2]

const isStdOut = process.argv[3] === "-o"

const ollamaLibs = join("models", "manifests", "registry.ollama.ai", "library")
const ollamaBlobs = join("models", "blobs")

const [model, _vers] = modelParam.split(":")
const version = _vers || "latest"

const modelMetaPath = join(ollamaLibs, model, version)

const modelMeta = JSON.parse(fs.readFileSync(join(PATH, modelMetaPath)))

const blobsPaths = []

for (const layer of modelMeta.layers) {
    blobsPaths.push(join(ollamaBlobs, layer.digest.replace(":", "-")))
}


if (isStdOut) {
    tar.c(
        {
            C: join(PATH.split(".ollama")[0], ".ollama"), 
        },
        [...blobsPaths, modelMetaPath] 
    ).pipe(stdout)
} else {

    tar.c(
        {
            file: modelParam.replace(":", "_") + ".tar", 
            C: join(PATH.split(".ollama")[0], ".ollama"), 
        },
        [...blobsPaths, modelMetaPath] 
    )
        .then(() => {
            console.log('Dosyalar başarıyla arşivlendi');
        })
        .catch(err => {
            console.error('Arşivleme hatası:', err);
        });
}