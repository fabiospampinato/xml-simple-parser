
/* IMPORT */

import {describe} from 'fava';
import XML from '../dist/index.js';
import {SVG, AST, STRINGIFIED} from './fixtures.js';

/* MAIN */

//TODO: Write more granular tests also, for each rule in the grammar

describe ( 'XML Simple Parser', it => {

  it ( 'can parse an XML string', t => {

    t.deepEqual ( XML.parse ( SVG ), AST );

  });

  it ( 'can serialize an AST to XML', t => {

    t.deepEqual ( XML.stringify ( AST ), STRINGIFIED );

  });

  it ( 'can validate a string', t => {

    t.true ( XML.validate ( SVG ) );
    t.true ( XML.validate ( STRINGIFIED ) );

    t.false ( XML.validate ( '<foo' ) );

  });

});
