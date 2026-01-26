import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";
import svgr from "@svgr/rollup";
import { readFileSync } from "fs";

const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

export default [
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
			json(),
			svgr(),
			resolve({
				extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
			}),
			typescript({
				tsconfig: "./tsconfig.json",
				exclude: ["**/stories", "**/*.stories.tsx"],
			}),
			babel({
				babelHelpers: "bundled",
				extensions: [".ts", ".tsx", ".js", ".jsx"],
				exclude: "node_modules/**",
			}),
			commonjs(),
			postcss(),
			terser(),
		],
		external: (id) =>
			!id.startsWith(".") && !id.startsWith("/") && !id.includes("src"),
	},
	{
		input: "dist/esm/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "esm" }],
		plugins: [dts()],
		external: [/\.css$/, "react", "react-dom"],
	},
];
