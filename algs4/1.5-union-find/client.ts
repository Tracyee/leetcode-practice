/** Dynamic connectivity client interface.
 * - Read in number of objects **N** from standard input.
 * - Repeat:
 *    - read in pair of integers from standard input
 *    - if they are not yet connected, connect them and print out pair
 */

import UF from './UF';
import QuickFindUF from './QuickFindUF';
import QuickUnionUF from './QuickUnionUF';
import WeightedQuickUnionUF from './WeightedQuickUnionUF';
import WeightedQuickUnionByHeightUF from './WeightedQuickUnionByHeightUF';
import WeightedQuickUnionByHeightPathCompressionUF from './WeightedQuickUnionByHeightPathCompressionUF';
import * as readline from 'readline';
import * as fs from 'fs';

const parseIntegerPair = (input: string) => [
  Number(input.split(/\s+/)[0]),
  Number(input.split(/\s+/)[1]),
];

let uf: UF;

const rl = readline.createInterface({
  input: process.stdin,
  // input: fs.createReadStream('./test/mediumUF.txt'),
  // output: process.stdout,
});

rl.once('line', input => {
  console.time();
  // uf = new QuickFindUF(Number(input));
  // uf = new QuickUnionUF(Number(input));
  // uf = new WeightedQuickUnionUF(Number(input));
  // uf = new WeightedQuickUnionByHeightUF(Number(input));
  uf = new WeightedQuickUnionByHeightPathCompressionUF(Number(input));
})
  .on('line', input => {
    const [p, q] = parseIntegerPair(input);
    if (Number.isNaN(p) || Number.isNaN(q)) return;
    if (!uf.connected(p, q)) {
      uf.union(p, q);
      process.stdout.write(input.concat('\n')); // much faster than `console.log()`
    }
  })
  .on('close', () => {
    console.log(`# of components: ${uf.count()}`);
    console.timeEnd();
    process.exit(0);
  });
