const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	safelist: [
		'prose',
	],
	daisyui: {
		themes: [
			{
				light: {
					'primary': '#38bdf8',
					'secondary': '#4f46e5',
					'accent': '#d946ef',
					'neutral': '#1f2937',
					'base-100': '#ffffff',
					'info': '#00beff',
					'success': '#22c55e',
					'warning': '#facc15',
					'error': '#f87171',
				},
			},
			{
				dark: {
					'primary': '#38bdf8',
					'secondary': '#4f46e5',
					'accent': '#d946ef',
					'neutral': '#1f2937',
					'base-100': '#111827',
					'info': '#00beff',
					'success': '#22c55e',
					'warning': '#facc15',
					'error': '#f87171',
				},
			},
		],
		darkTheme: 'dark',
	},
	theme: {
		screens: {
			xs: '475px',
			...defaultTheme.screens,
		},

		container: {
			center: true,
			padding: '1.5rem',
			screens: {
				xs: '475px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
			},
		},

		extend: {
			aspectRatio: {
				wide: '21 / 9',
			},
			fontFamily: {
				'pacifico': ['Pacifico', 'cursive'],
				'overpass': ['Overpass', 'cursive'],
				'poppins': ['Poppins', 'cursive'],
				'sans': ['Poppins', 'sans-serif'],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('daisyui'),
	],
};
