/** Dynamic connectivity client interface.
 * - Read in number of objects **N** from standard input.
 * - Repeat:
 *    - read in pair of integers from standard input
 *    - if they are not yet connected, connect them and print out pair
 */

import UF from './UF';
import QuickFindUF from './QuickFindUF';
import QuickUnionUF from './QuickUnionUF';
import readline from 'readline';

const parseIntegerPair = (input: string) => [
  Number(input.split(/\s+/)[0]),
  Number(input.split(/\s+/)[1]),
];

let uf: UF;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.once('line', input => {
  // uf = new QuickFindUF(Number(input));
  uf = new QuickUnionUF(Number(input));
})
  .on('line', input => {
    const [p, q] = parseIntegerPair(input);
    if (Number.isNaN(p) || Number.isNaN(q)) return;
    if (!uf.connected(p, q)) {
      uf.union(p, q);
      // console.log(`${p} and ${q} are now connected.`); // TODO: remove this
    } else {
      // console.log(`${p} and ${q} are already connected.`); // TODO: remove this
    }
  })
  .on('close', () => {
    console.log(`# of components: ${uf.count()}`);
    process.exit(0);
  });
