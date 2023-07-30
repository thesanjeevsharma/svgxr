const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	// debug: {
	// 	type: `boolean`,
	// 	default: false,
	// 	alias: `d`,
	// 	desc: `Print debug info`
	// },
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	output: {
		type: `string`,
		alias: `o`,
		desc: `Output component name`
	},
	type: {
		type: `string`,
		alias: `t`,
		default: `js`,
		desc: `Use "ts" for TypeScript`
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `svgx`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
