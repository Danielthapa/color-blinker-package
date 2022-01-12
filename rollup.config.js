import commonjs from "@rollup/plugin-commonjs";
import babel, { getBabelOutputPlugin } from "@rollup/plugin-babel";
// import postcss from "rollup-plugin-postcss";
// import sass from "rollup-plugin-sass";
import styles from "rollup-plugin-styles";
import pkg from "./package.json";
import jsx from "rollup-plugin-jsx";

// import simplevars from "postcss-simple-vars";
// import nested from "postcss-nested";
// import cssnext from "postcss-cssnext";
// import cssnano from "cssnano";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
      plugins: getBabelOutputPlugin({
        presets: ["@babel/preset-react"],
      }),
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    // This prevents needing an additional `external` prop in this config file by automaticall excluding peer dependencies
    // peerDepsExternal(),
    // sass({ insert: true }),
    styles(),
    // Convert CommonJS modules to ES6
    commonjs({
      include: "node_modules/**",
      // This was required to fix some random errors while building
      namedExports: {
        "react-is": ["isForwardRef", "isValidElementType"],
      },
    }),
    // "...locates modules using the Node resolution algorithm"
    // resolve(),
    // Do Babel transpilation
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    // transfrom jsx to js
    jsx({ factory: "React.createElement" }),
    //  css
    // css(),
    // Does a number of things; Compiles sass, run autoprefixer, creates a sourcemap, and saves a .css file
    // postcss({
    //   extensions: [".css"],
    //   plugins: [
    //     simplevars(),
    //     nested(),
    //     cssnext({ warnForDuplicates: false }),
    //     cssnano(),
    //   ],
    //   // preprocessor: (content, id) =>
    //   //   new Promise((res) => {
    //   //     const result = sass.renderSync({ file: id });

    //   //     res({ code: result.css.toString() });
    //   //   }),
    //   // modules: {
    //   //   scopeBehaviour: "global",
    //   // },
    //   // sourceMap: true,
    //   // extract: true,
    // }),
  ],
};
