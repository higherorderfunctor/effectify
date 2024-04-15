import { peerDependencies } from './packages/eslint-config/package.json'
console.log([
    ...Object.keys(peerDependencies),
    ...Object.keys(peerDependencies).map((s) => `${s}/*`)
  ])
await Bun.build({
  entrypoints: ['./eslint.config.ts'],
  outdir: './',
  target: 'node',
  external: [
    ...Object.keys(peerDependencies),
    ...Object.keys(peerDependencies).map((s) => `${s}/*`)
  ],
}).then(console.error).catch(console.error)
