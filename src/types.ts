
/* MAIN */

type NodeAttribute = {
  type: 'attribute',
  name: string,
  value: string | true
};

type NodeAttributes = {
  type: 'attributes',
  values: Record<string, string | true>
};

type NodeComment = {
  type: 'comment',
  value: string
};

type NodeDoctype = {
  type: 'doctype',
  value: string,
  values: string[]
};

type NodeElement = {
  type: 'element',
  name: string,
  attributes: Record<string, string | true>,
  children: (NodeComment | NodeElement | NodeText)[],
  void: boolean
};

type NodeElementTag = {
  type: 'tag',
  name: string
};

type NodeProlog = {
  type: 'prolog',
  attributes: Record<string, string | true>
};

type NodeText = {
  type: 'text',
  value: string
};

type NodeRoot = {
  type: 'root',
  children: (NodeComment | NodeDoctype | NodeElement | NodeProlog | NodeText)[]
};

type Node = NodeAttribute | NodeAttributes | NodeDoctype | NodeComment | NodeElement | NodeElementTag | NodeProlog | NodeText | NodeRoot;

/* EXPORT */

export type {NodeAttribute, NodeAttributes, NodeComment, NodeDoctype, NodeElement, NodeElementTag, NodeProlog, NodeText, NodeRoot, Node};
