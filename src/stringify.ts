
/* IMPORT */

import type {NodeComment, NodeDoctype, NodeElement, NodeProlog, NodeText, NodeRoot} from './types';

/* HELPERS */

const stringifyAttributes = ( attributes: Record<string, string | true> ): string => {

  return Object.entries ( attributes ).map ( ([ name, value ]) => {

    if ( value === true ) {

      return name;

    } else if ( value.includes ( '"' ) ) {

      return `${name}='${value}'`;

    } else {

      return `${name}="${value}"`;

    }

  }).join ( ' ' );

};

const stringifyChildren = ( children: (NodeComment | NodeDoctype | NodeElement | NodeProlog | NodeText)[] ): string => {

  return children.map ( stringify ).join ( '' );

};

/* MAIN */

const stringify = ( node: NodeRoot | NodeComment | NodeDoctype | NodeElement | NodeProlog | NodeText ): string => {

  if ( node.type === 'root' ) {

    return stringifyChildren ( node.children );

  } else if ( node.type === 'prolog' ) {

    const attributes = stringifyAttributes ( node.attributes );

    return `<?xml ${attributes} ?>\n`;

  } else if ( node.type === 'doctype' ) {

    return `<!DOCTYPE ${node.value}>\n`;

  } else if ( node.type === 'comment' ) {

    return `<!--${node.value}-->`;

  } else if ( node.type === 'text' ) {

    return node.value;

  } else if ( node.type === 'element' ) {

    const attributes = stringifyAttributes ( node.attributes );
    const separator = attributes.length ? ' ' : '';
    const children = stringifyChildren ( node.children );

    if ( node.void ) {

      return `<${node.name}${separator}${attributes}/>`;

    } else {

      return `<${node.name}${separator}${attributes}>${children}</${node.name}>`;

    }

  } else {

    throw new Error ( 'Unsupported node' );

  }

};

/* EXPORT */

export default stringify;
