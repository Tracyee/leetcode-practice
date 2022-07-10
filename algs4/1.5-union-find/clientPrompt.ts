import UF from './UF';
import QuickFindUF from './QuickFindUF';
import QuickUnionUF from './QuickUnionUF';
import prompt from 'prompt';

prompt.message = '';

// Start the prompt
prompt.start();

const schemaInitial: prompt.Schema = {
  properties: {
    size: {
      message: 'size must be only integers',
      required: true,
      pattern: /^[0-9]*$/,
    },
  },
};

const schema: prompt.Schema = {
  properties: {
    integerPair: {
      message: 'input must be only integer pairs, e.g. 5 2',
      pattern: /^[0-9]*\s[0-9]*$/,
    },
  },
};

const parseIntegerPair = (input: string) => [
  Number(input.split(' ')[0]),
  Number(input.split(' ')[1]),
];

let uf: UF = new QuickFindUF(10);

/** Dynamic connectivity client interface.
 * - Read in number of objects **N** from standard input.
 * - Repeat:
 *    - read in pair of integers from standard input
 *    - if they are not yet connected, connect them and print out pair
 * @param {boolean} [initial] enable initializing the number of objects if set to `true`
 */
export const client = (initial: boolean = true) => {
  prompt.get(initial ? schemaInitial : schema, function (err, result) {
    if (initial) {
      // uf = new QuickFindUF(Number(result.size));
      uf = new QuickUnionUF(Number(result.size));
    } else {
      if (!result.integerPair) {
        console.log(`# of components: ${uf.count()}`);
        return;
      }
      const [p, q] = parseIntegerPair(result.integerPair as string);
      if (!uf.connected(p, q)) {
        uf.union(p, q);
        // console.log(`${p} and ${q} are now connected.`); // TODO: remove this
      } else {
        // console.log(`${p} and ${q} are already connected.`); // TODO: remove this
      }
    }
    client(false);
  });
};

client();
