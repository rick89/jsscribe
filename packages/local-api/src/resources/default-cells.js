export const defaultCells = [
	{
		id: 'jd3tt',
		type: 'text',
		content:
			'# JS Scribe\nThis is an interactive coding ennvironment. You can write and execute __Javascript__ and document using __markdown__.\n\n- Click any text cell to edit it.\n- All code windows are shared, so a variable defined in the top window will be accessible in all subsequent windows.\n- This environment has a built in __show()__ function which will show a string, object or a React component in the preview window on the right hand-side.\n- Reorder or delete cellls using the action buttons in the top right.\n- Add new cells by hovering over the divider in between each cell.\n\nAll of your cells get saved into the file you opened when you served the application, if you did not specify a file it will save to __notebook.js__',
	},
	{
		id: 'bajd5',
		type: 'code',
		content: "const foo = 'Hello world! :)'\nshow(foo)",
	},
];
