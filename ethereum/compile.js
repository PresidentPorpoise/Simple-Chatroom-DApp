const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const chatroomPath = path.resolve(__dirname, 'contracts', 'Chatroom.sol');
const source = fs.readFileSync(chatroomPath, 'utf8');

//
var input = {
	language: 'Solidity',
	sources: {
		'Chatroom.sol': {
			"content": source
		}
	},
	settings: {
		outputSelection: {
      "*": {
        "*": ["evm.bytecode", "abi"]
      },
		
		}
	}
}

var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Chatroom.sol'];
//

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
