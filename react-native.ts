// React-Native Platform Support
import { ReadableStream } from 'web-streams-polyfill';
import { ICache } from 'youtubei.js/dist/src/types/Cache.js';
import { Platform } from 'youtubei.js/dist/src/utils/Utils.js';
import crypto from 'react-native-quick-crypto';
import { FetchFunction } from 'youtubei.js/dist/src/types/PlatformShim.js';
import DOMParser from 'youtubei.js/dist/src/platform/polyfills/server-dom.js';
import CustomEvent from 'youtubei.js/dist/src/platform/polyfills/node-custom-event.js';
import { fileURLToPath } from 'url';
import evaluate from 'youtubei.js/dist/src/platform/jsruntime/jinter.js';

// const meta_url = import.meta.url;
// const is_cjs = !meta_url;
// const __dirname__ = is_cjs ? __dirname : path.dirname(fileURLToPath(meta_url));
//
// const package_json = JSON.parse(readFileSync(path.resolve(__dirname__, is_cjs ? '../package.json' : '../../package.json'), 'utf-8'));
// const repo_url = package_json.homepage?.split('#')[0];

// class Cache implements ICache {
//   #persistent_directory: string;
//   #persistent: boolean;
//
//   constructor(persistent = false, persistent_directory?: string) {
//     this.#persistent_directory = persistent_directory || Cache.default_persistent_directory;
//     this.#persistent = persistent;
//   }
//
//   static get temp_directory() {
//     return `${os.tmpdir()}/youtubei.js`;
//   }
//
//   static get default_persistent_directory() {
//     return path.resolve(__dirname__, '..', '..', '.cache', 'youtubei.js');
//   }
//
//   get cache_dir() {
//     return this.#persistent ? this.#persistent_directory : Cache.temp_directory;
//   }
//
//   async #createCache() {
//     const dir = this.cache_dir;
//     try {
//       const cwd = await fs.stat(dir);
//       if (!cwd.isDirectory())
//         throw new Error('An unexpected file was found in place of the cache directory');
//     } catch (e: any) {
//       if (e?.code === 'ENOENT')
//         await fs.mkdir(dir, { recursive: true });
//       else
//         throw e;
//     }
//   }
//
//   async get(key: string) {
//     await this.#createCache();
//     const file = path.resolve(this.cache_dir, key);
//     try {
//       const stat = await fs.stat(file);
//       if (stat.isFile()) {
//         const data: Buffer = await fs.readFile(file);
//         return data.buffer;
//       }
//       throw new Error('An unexpected file was found in place of the cache key');
//
//     } catch (e: any) {
//       if (e?.code === 'ENOENT')
//         return undefined;
//       throw e;
//     }
//   }
//
//   async set(key: string, value: ArrayBuffer) {
//     await this.#createCache();
//     const file = path.resolve(this.cache_dir, key);
//     await fs.writeFile(file, new Uint8Array(value));
//   }
//
//   async remove(key: string) {
//     await this.#createCache();
//     const file = path.resolve(this.cache_dir, key);
//     try {
//       await fs.unlink(file);
//     } catch (e: any) {
//       if (e?.code === 'ENOENT') return;
//       throw e;
//     }
//   }
// }

Platform.load({
  runtime: 'node',
  info: {
    version: "",
    bugs_url: "",
    repo_url: ""
  },
  server: true,
  Cache: {} as any,
  sha1Hash: async (data: string) => {
    return crypto.createHash('sha1').update(data).digest('hex');
  },
  uuidv4() {
    return crypto.randomUUID();
  },
  serializeDOM(document) {
    return document.toString();
  },
  eval: evaluate,
  DOMParser,
  fetch: fetch as unknown as FetchFunction,
  Request: Request as unknown as typeof globalThis.Request,
  Response: Response as unknown as typeof globalThis.Response,
  Headers: Headers as unknown as typeof globalThis.Headers,
  FormData: FormData as unknown as typeof globalThis.FormData,
  File: {} as unknown as typeof globalThis.File,
  ReadableStream: ReadableStream as unknown as typeof globalThis.ReadableStream,
  CustomEvent: CustomEvent as unknown as typeof globalThis.CustomEvent
});

export * from 'youtubei.js/dist/src/platform/lib';
import Innertube from 'youtubei.js/dist/src/platform/lib';
export default Innertube;
