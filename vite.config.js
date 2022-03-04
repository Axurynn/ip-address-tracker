import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@honkhonk/vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	server: {
		proxy: {
			'/api': {
				target: 'https://geo.ipify.org/api/v2/country,city',
				changeOrigin: true,
				secure: false,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
	base: './',
});
