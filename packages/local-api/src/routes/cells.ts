import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
	id: string;
	content: string;
	type: 'code' | 'text';
}

const defaultCells = [
	{
		id: 'jd3tt',
		type: 'text',
		content:
			'# JS Scribe\nThis is an interactive coding ennvironment. You can write and execute __Javascript__ and document using __markdown__.\n\n- Click any text cell to edit it.\n- All code windows are shared, so a variable defined in the top window will be accessible in all subsequent windows.\n- This environment has a built in __show()__ function which will show a string, object or a React component in the preview window on the right hand-side.\n- Reorder or delete cellls using the action buttons in the top right.\n- Add new cells by hovering over the divider in between each cell.\n\nAll of your cells get saved into the file you opened when you served the application, if you did not specify a file it will save to __notebook.js__',
	},
	{
		id: 'bajd5',
		type: 'code',
		content:
			"const Counter = () => {\n    const name = 'Ric'\n    return (<div>\n        <h1>Hello</h1>\n        <p>{name}</p>\n    </div>)\n}\n\nshow(Counter())",
	},
];

export const createCellsRouter = (filename: string, dir: string) => {
	const router = express.Router();
	router.use(express.json());

	const fullPath = path.join(dir, filename);
	const fileEncoding = 'utf-8';

	router.get('/cells', async (req, res) => {
		// read files
		try {
			const result = await fs.readFile(fullPath, {
				encoding: fileEncoding,
			});
			res.send(JSON.parse(result));
		} catch (err: any) {
			if (err.code === 'ENOENT') {
				// create file and add defualt cells
				const result = await fs.writeFile(
					fullPath,
					JSON.stringify(defaultCells),
					fileEncoding
				);
				res.send(defaultCells);
			} else {
				throw err;
			}
		}
	});

	router.post('/cells', async (req, res) => {
		// take the list of cells from the request object
		const { cells }: { cells: Cell[] } = req.body;

		// serialise them
		// write cells into the file
		await fs.writeFile(fullPath, JSON.stringify(cells), fileEncoding);

		res.send({ status: 'ok' });
	});

	return router;
};
