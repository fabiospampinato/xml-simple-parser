
/* IMPORT */

import {parse} from 'grammex';
import Grammar from './grammar';
import type {NodeRoot} from './types';

/* MAIN */

const _parse = ( input: string ): NodeRoot => {

  return parse ( input, Grammar, { memoization: false } )[0];

};

/* EXPORT */

export default _parse;
