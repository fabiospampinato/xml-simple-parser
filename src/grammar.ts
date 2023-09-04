
/* IMPORT */

import {grammar} from 'grammex';
import type {ExplicitRule} from 'grammex';
import type {NodeAttribute, NodeAttributes, NodeComment, NodeDoctype, NodeElement, NodeElementTag, NodeProlog, NodeText, NodeRoot, Node} from './types';

/* MAIN */

const Grammar = grammar<Node, ExplicitRule<NodeRoot>> ( ({ match, and, or, star, optional }) => {

  /* STATE */

  const TAG_STACK: string[] = [];

  /* HELPERS */

  const makeAttributes = ( nodes: Node[] ): NodeAttributes => {
    const attributes: NodeAttributes = {
      type: 'attributes',
      values: {}
    };
    for ( const node of nodes ) {
      if ( node.type === 'attribute' ) {
        attributes.values[node.name] = node.value;
      } else {
        throw new Error ( 'Unexpected node' );
      }
    }
    return attributes;
  };

  const makeChildren = ( nodes: Node[] ): (NodeComment | NodeElement | NodeText)[] => {
    const children: (NodeComment | NodeElement | NodeText)[] = [];
    for ( const node of nodes ) {
      if ( node.type === 'comment'  || node.type === 'element' || node.type === 'text' ) {
        children.push ( node );
      } else {
        throw new Error ( 'Unexpected node' );
      }
    }
    return children;
  };

  const makeRootChildren = ( nodes: Node[] ): (NodeComment | NodeDoctype | NodeElement | NodeProlog | NodeText)[] => {
    const children: (NodeComment | NodeDoctype | NodeElement | NodeProlog | NodeText)[] = [];
    for ( const node of nodes ) {
      if ( node.type === 'comment' || node.type === 'doctype' || node.type === 'element' || node.type === 'prolog' || node.type === 'text' ) {
        children.push ( node );
      } else {
        throw new Error ( 'Unexpected node' );
      }
    }
    return children;
  };

  const makeDoctypeValues = ( value: string ): string[] => {
    const values: string[] = [];
    const re = /(?:"(.*?)"|'(.*?)'|([a-zA-Z]+))/g;
    for ( const match of value.matchAll ( re ) ) {
      const value = match[1] || match[2] || match[3];
      values.push ( value );
    }
    return values;
  };

  const makeTagOpen = ( node: NodeElementTag ): NodeElementTag => {
    TAG_STACK.push ( node.name );
    return node;
  };

  const makeTagClose = ( node: NodeElementTag ): NodeElementTag => {
    const expected = TAG_STACK.pop ();
    if ( node.name === expected ) {
      return node;
    } else {
      throw new Error ( `Expected closing "${expected}" tag, but got closing "${node.name}" tag instead` );
    }
  };

  /* RULES */

  const TagStackInit = match ( /(?:)/, (): undefined => { TAG_STACK.length = 0 } );

  const AttributeString = match ( /([a-zA-Z0-9_-][a-zA-Z0-9:_-]*)=(["'])([^]*?)\2\s*/, ( _, name, quote, value ): NodeAttribute => ({ type: 'attribute', name, value }) );
  const AttributeBoolean = match ( /([a-zA-Z0-9_-][a-zA-Z0-9:_-]*)(?=\s|\/|>)\s*/, ( _, name ): NodeAttribute => ({ type: 'attribute', name, value: true }) );
  const Attribute = or ([ AttributeString, AttributeBoolean ]);
  const Attributes = star ( Attribute, ( attributes ): NodeAttributes => makeAttributes ( attributes ) );

  const Prolog = and ( [/^\s*<\?xml\s*/, Attributes, /\?>\s*/], ( nodes ): NodeProlog => ({ type: 'prolog', attributes: nodes[0]['values'] }) );

  const Doctype = match ( /\s*<!DOCTYPE\s*((?:"[^]*?"|'[^]*?'|[a-zA-Z ]+)*)>\s*/, ( _, value ): NodeDoctype => ({ type: 'doctype', value, values: makeDoctypeValues ( value ) }) );

  const Comment = match ( /<!--((?:(?!-->).)*)-->/, ( _, value ): NodeComment => ({ type: 'comment', value }) );

  const VoidElementName = match ( /([a-zA-Z0-9_-][a-zA-Z0-9:_-]*)/, ( _, name ): NodeElementTag => ({ type: 'tag', name }) );
  const VoidElement = and ( ['<', VoidElementName, /\s*/, Attributes, '/>'], ( nodes ): NodeElement => ({ type: 'element', name: nodes[0]['name'], attributes: nodes[1]['values'], children: [], void: true }) );

  const ParentElementOpen = match ( /([a-zA-Z0-9_-][a-zA-Z0-9:_-]*)/, ( _, name ): NodeElementTag => makeTagOpen ({ type: 'tag', name }) );
  const ParentElementClose = match ( /([a-zA-Z0-9_-][a-zA-Z0-9:_-]*)/, ( _, name ): NodeElementTag => makeTagClose ({ type: 'tag', name }) );
  const ParentElement = and ( ['<', ParentElementOpen, /\s*/, Attributes, '>', () => Grammar, '</', ParentElementClose, '>' ], ( nodes ): NodeElement => ({ type: 'element', name: nodes[0]['name'], attributes: nodes[1]['values'], children: makeChildren ( nodes.slice ( 2, -1 ) ), void: false }) );

  const Text = match ( /([^<]+)/, ( _, value ): NodeText => ({ type: 'text', value }) );

  const Element = or ([ Comment, VoidElement, ParentElement, Text ]);
  const Grammar = and ( [optional ( Prolog ), optional ( Doctype ), star ( Element )] );
  const Root = and ( [TagStackInit, Grammar, TagStackInit], ( nodes ): NodeRoot => ({ type: 'root', children: makeRootChildren ( nodes ) }) );

  return Root;

});

/* EXPORT */

export default Grammar;
