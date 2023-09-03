
/* IMPORT */

import benchmark from 'benchloop';
import XML from '../dist/index.js';
import {SVG, AST} from '../test/fixtures.js';

/* MAIN */

benchmark.config ({
  iterations: 10_000
});

benchmark ({
  name: 'parse',
  fn: () => {
    XML.parse ( SVG );
  }
});

benchmark ({
  name: 'stringify',
  fn: () => {
    XML.stringify ( AST );
  }
});

benchmark ({
  name: 'validate',
  fn: () => {
    XML.validate ( SVG );
  }
});

benchmark.summary ();
