import { peerDependencies } from '@effectify/eslint-config/package.json'

await Bun.build({
  entrypoints: ['./eslint.config.ts'],
  outdir: './',
  target: 'node',
  external: Object.keys(peerDependencies),
}).then(console.error).catch(console.error)
