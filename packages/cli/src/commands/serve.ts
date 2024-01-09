import path from 'path';
import { Command } from 'commander';
import { serve } from '@js-scribe/local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
	.command('serve [filename]')
	.description('Open a file for editing')
	.option('-p, --port <number>', 'port to run server on', '4005')
	.action(async (filename = 'notebook.js', options: { port: string }) => {
		try {
			const dir = path.join(process.cwd(), path.dirname(filename));
			await serve(
				parseInt(options.port),
				path.basename(filename),
				dir,
				!isProduction
			);
			console.log(
				`Opened ${filename}. Navigate to http://localhost:${options.port}.`
			);
		} catch (err: any) {
			if (err.code === 'EADDRINUSE') {
				console.error(
					'Port in use, please use a different port. Use the flag -p to specify a port.'
				);
			} else {
				console.log(err.message);
			}
			process.exit(1);
		}
	});
