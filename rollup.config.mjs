// rollup.config.mjs
import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";
import svgr from "@svgr/rollup";
import alias from "@rollup/plugin-alias";
import packageJson from "./package.json" assert { type: "json" };

const inputFile = "src/index.ts";

export default [
	// Bundle principal (ESM + CJS)
	{
		input: inputFile,
		output: [
			{
				file: packageJson.module, // ESM
				format: "esm",
				sourcemap: true,
			},
			{
				file: packageJson.main, // CJS
				format: "cjs",
				sourcemap: true,
				exports: "named",
			},
		],
		plugins: [
			peerDepsExternal(), // excluir peer deps
			resolve(), // resolver node_modules
			commonjs(), // convertir CommonJS a ESM
			alias({
				entries: [
					{
						find: "@components",
						replacement: path.resolve("src/components"),
					},
					{
						find: "@constants",
						replacement: path.resolve("src/constants"),
					},
					{
						find: "@animations",
						replacement: path.resolve("src/assets/animations"),
					},
				],
			}),
			typescript({
				tsconfig: "./tsconfig.json",
				exclude: ["**/stories", "**/*.stories.tsx"],
				include: ["src/**/*.ts", "src/**/*.tsx"],
			}),
			postcss(), // CSS
			terser(), // minificar
			json(), // JSON
			svgr(), // SVG como componentes
		],
		external: (id) =>
			!id.startsWith(".") && !id.startsWith("/") && !id.includes("src"),
	},

	// Bundle de tipos
	{
		input: "dist/esm/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "esm" }],
		plugins: [dts()],
		external: [/\.css$/, "react", "react-dom"],
	},
];
