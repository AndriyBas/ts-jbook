import * as esbuild from "esbuild-wasm";
// https://www.unpkg.com/tiny-test-pkg@1.0.0/index.js
// https://www.unpkg.com/medium-test-pkg@1.0.0/index.js
// https://www.unpkg.com/nested-test-pkg@1.0.0/index.js

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /(^index\.js)$/ }, (args: any) => {
        console.log("onResole index.js", args);
        // entry 'index.js'
        return { path: args.path, namespace: "a" };
      });

      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        console.log("onResole relative", args);
        // relative file of the module (with './' or '../')
        const url = new URL(
          args.path,
          "https://www.unpkg.com" + args.resolveDir + "/"
        );
        return {
          namespace: "a",
          path: url.href,
        };
      });

      build.onResolve({ filter: /.*/ }, (args: any) => {
        console.log("onResole main module", args);
        // main file of the module
        return {
          namespace: "a",
          path: `https://www.unpkg.com/${args.path}`,
        };
      });
    },
  };
};
