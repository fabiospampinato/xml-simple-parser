
/* IMPORT */

import parse from './parse';
import stringify from './stringify';
import validate from './validate';
import type {NodeAttribute, NodeAttributes, NodeComment, NodeDoctype, NodeElement, NodeElementTag, NodeProlog, NodeText, NodeRoot, Node} from './types';

/* MAIN */

const XML = {
  parse,
  stringify,
  validate
};

/* EXPORT */

export default XML;
export type {NodeAttribute, NodeAttributes, NodeComment, NodeDoctype, NodeElement, NodeElementTag, NodeProlog, NodeText, NodeRoot, Node};
