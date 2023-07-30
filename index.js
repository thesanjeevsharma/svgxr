#!/usr/bin/env node

/**
 * svgxr
 * Convert SVGs to React components with CLI
 *
 * @author Sanjeev Sharma <https://twitter.com/thesnjvsharma>
 */

const chalk = require('chalk');
const fs = require('fs');
const prettier = require('prettier');

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const parseSvg = require('./utils/parseSvg');
const template = require('./utils/template');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	const filePath = flags.i ?? input[0];
	const outputPath = flags.output ?? filePath.split('/').pop().split('.')[0];

	const capitalizedName =
		outputPath.charAt(0).toUpperCase() + outputPath.slice(1);
	const componentName = capitalizedName.replace(/ /g, '');

	fs.readFile(filePath, 'utf8', async (err, data) => {
		if (err) {
			console.error('Error reading the file:', err);
			return;
		}

		const index = data.indexOf('<svg');
		const lIndex = data.indexOf('>');
		const svgTagLine = data.slice(index, lIndex + 1);

		const { width, height, restProps } = parseSvg(svgTagLine);

		const svgRestProps = Object.entries(restProps).reduce(
			(acc, [key, value]) => {
				return acc + `${key}={${value}} `;
			},
			''
		);

		const componentData = `
		${template(flags.type, { componentName, width, height })}
			<svg height={height} width={width} viewBox="0 0 ${parseFloat(
				width
			)} ${parseFloat(height)}" ${svgRestProps} {...props}>
			${data.slice(lIndex + 1)}
		)
		
		export default ${componentName};
		`;

		const prettyData = await prettier.format(componentData, {
			parser: 'babel-ts'
		});

		const extension = flags.type === 'ts' ? 'tsx' : 'jsx';

		// Write the modified content back to the file
		fs.writeFile(
			`${componentName}.${extension}`,
			prettyData,
			'utf8',
			err => {
				if (err) {
					console.error('Error writing to the file:', err);
				} else {
					console.log(
						chalk(
							`✅ File "${filePath}" successfully converted to React component - ${componentName}!`
						)
					);
					console.log();
				}
			}
		);
	});

	// debug && log(flags);
})();
