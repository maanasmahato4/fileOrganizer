import { prompt } from 'enquirer';
import * as fs from 'fs';
import * as path from 'path';

type TPrompt = {
	sourceDirectory: string;
	newDirectory: string;
	fileType: string;
};

function Organize({ sourceDirectory, newDirectory, fileType }: TPrompt): void {
	if (!fs.existsSync(path.join(__dirname, `../${newDirectory}`))) {
		fs.mkdirSync(newDirectory);
	}
	fs.readdirSync(sourceDirectory).forEach((file) => {
		if (file.endsWith(fileType)) {
			const oldPath = `${path.join(__dirname, `../${sourceDirectory}`)}/${file}`;
			const newPath = `${path.join(__dirname, `../${newDirectory}`)}/${file}`;
			fs.renameSync(oldPath, newPath);
		}
	});
}

prompt([
	{
		type: 'input',
		name: 'sourceDirectory',
		message: 'source directory path of the files',
	},
	{
		type: 'input',
		name: 'newDirectory',
		message: 'new directory name to store the files',
	},
	{
		type: 'input',
		name: 'fileType',
		message: 'type or extension of the files eg: .png, .txt etc.',
	},
])
	.then((value: unknown): void => {
		const promptInput: TPrompt = value as TPrompt;
		Organize(promptInput);
	})
	.catch((error) => console.log(error));
