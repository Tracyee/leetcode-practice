import UF from './UF';
import QuickFindUF from './QuickFindUF';
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
    from: {
      message: 'from object must be only integers',
      required: true,
      pattern: /^[0-9]*$/,
    },
    to: {
      message: 'to object must be only be integers',
      required: true,
      pattern: /^[0-9]*$/,
    },
  },
};

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
      uf = new QuickFindUF(Number(result.size));
    } else if (!uf.connected(Number(result.from), Number(result.to))) {
      uf.union(Number(result.from), Number(result.to));
      console.log(`${result.from} and ${result.to} are now connected.`);
    } else {
      console.log(`${result.from} and ${result.to} are already connected.`);
    }
    client(false);
  });
};

client();
