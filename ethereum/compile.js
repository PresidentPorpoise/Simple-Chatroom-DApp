const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const chatroomPath = path.resolve(__dirname, 'contracts', 'Chatroom.sol');
const source = fs.readFileSync(chatroomPath, 'utf8');

//
try {

} catch(err) {

}
var input = {
	language: 'Solidity',
	sources: {
		'Chatroom': {
			"content": source
		}
	},
	settings: {
		outputSelection: {
      "*": {
        "*": ["*"]
      }
		}
	}
}

var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;
console.log(output['Chatroom']['Chatroom'].abi)
//

fs.ensureDirSync(buildPath);

fs.outputJsonSync(
	path.resolve(buildPath, 'Chatroom.json'),
	output
);
