const { ZKC } = require('../graphs');
const { printAlgorithmName } = require('../utils');
const { getAPI, ALGORITHM_NAMES, SEED_ALGORITHM_NAMES } = require('../../index');

getAPI({ wasm: true }).then((api) => {
    const { runCommunityDetection } = api;
    const { n, edges } = ZKC;

    ALGORITHM_NAMES.forEach((name) => {
        printAlgorithmName(name);
        const { modularity, membership } = runCommunityDetection(name, n, edges);
        console.log(`membership: [${membership}]`);
        console.log(`modularity: [${modularity}]`);
        console.log(`MAX modularity found: ${modularity.reduce((a, b) => Math.max(a,b), Number.MIN_VALUE)}`);
    });

    const seedMembership = new Array(n).fill(-1);
    seedMembership[33] = seedMembership[31] = 0;
    seedMembership[0] = seedMembership[4] = 1;
    // seedMembership[0] = 0;
    // seedMembership[1] = 0;

    // FIXME - modularity 29.0 for EB seeds
    // seedMembership = [-1, -1, 0, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, 0, 0, -1, -1, 0, -1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    SEED_ALGORITHM_NAMES.forEach((name) => {
        printAlgorithmName(name);
        const { modularity, membership } = runCommunityDetection(name, n, edges, { seedMembership });
        console.log(`membership: [${membership}]`);
        console.log(`modularity: [${modularity}]`);
        console.log(`MAX modularity found: ${modularity.reduce((a, b) => Math.max(a,b), Number.MIN_VALUE)}`);
    });
});
