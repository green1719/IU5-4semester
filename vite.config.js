import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    publicDir: 'static',
    build: {
        outDir: resolve(__dirname, '../lab4.2/public'),
        emptyOutDir: false,
        rollupOptions: {
            input: {
                outcomes: resolve(__dirname, 'outcomes.html'),
            },
        },
    },
};
