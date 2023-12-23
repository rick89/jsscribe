import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
		// handle root entry file of index.js
		build.onResolve({ filter: /(^index\.js$)/ }, () => {
			return { path: 'index.js', namespace: 'a' }
		})

		// handle relative paths in a module
		build.onResolve({ filter: /^\.+\// }, (args: any) => {
			return { 
				path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href, 
				namespace: 'a'
			}
		})
		
		// handle root file in a module
      	build.onResolve({ filter: /.*/ }, async (args: any) => {
			return {
				namespace: 'a',
				path: `https://unpkg.com/${args.path}`
			}
			return { path: args.path, namespace: 'a' };
      	});
    },
  };
};