
/* IMPORT */

import {validate} from 'grammex';
import Grammar from './grammar';

/* MAIN */

const _validate = ( input: string ): boolean => {

  return validate ( input, Grammar, { memoization: false } );

};

/* EXPORT */

export default _validate;
