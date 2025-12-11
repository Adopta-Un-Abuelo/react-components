const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const postcss = require("rollup-plugin-postcss");
const dts = require("rollup-plugin-dts").default;
const { terser } = require("rollup-plugin-terser");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const json = require("@rollup/plugin-json");
const replace = require("@rollup/plugin-replace");
const svgr = require("@svgr/rollup");
const packageJson = require("./package.json");

module.exports = [
	{
		input: "src/index.ts",
		output: [
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			peerDepsExternal(),
			resolve(),
			commonjs(),
			typescript({
				tsconfig: "./tsconfig.json",
				exclude: ["**/stories", "**/*.stories.tsx"],
				include: ["src/**/*.ts", "src/**/*.tsx"],
			}),
			postcss(),
			terser(),
			json(),
			svgr(),
		],
		external: [
			"react",
			"react-dom",
			"react/jsx-runtime",
			"react-refresh",
			"react-refresh/runtime",
		],
	},
	{
		input: "dist/esm/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "esm" }],
		plugins: [dts()],
		external: [/\.css$/, "react", "react-dom"],
	},
];
