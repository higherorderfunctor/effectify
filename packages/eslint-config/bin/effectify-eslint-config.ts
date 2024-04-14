#!/usr/bin/env bun

console.log('hi')

await Bun.build({
  entrypoints: ['./eslint.config.ts'],
  outdir: './',
  target: 'node'
}).then(console.log).catch(console.error)
