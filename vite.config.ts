import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Remove if no JSX in your API
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react?.(), // Optional: only if your code uses JSX
        dts({
            rollupTypes: true,      // Bundles all types into clean index.d.ts
            tsconfigPath: './tsconfig.json',
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'), // Your main export file
            name: 'ic3-reporting-api',                   // Optional global name
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                '@emotion/react',
                '@emotion/styled',
                '@mui/material',
                '@mui/system',
                '@mui/icons-material',
                /^@mui\//, // All @mui packages
            ],
        },
        sourcemap: true,
        minify: false, // Set true for production minification
        target: 'esnext',
    },
});