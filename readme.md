# XML Simple Parser

A simple and tiny XML parser and stringifier.

## Install

```sh
npm install --save xml-simple-parser
```

## Usage

```ts
import XML from 'xml-simple-parser';

// It can parse an XML string

const svg = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
  <rect x="11" y="4" width="2" height="16"/>
</svg>
`;

const ast = XML.parse ( svg );
// {
//   "type": "root",
//   "children": [
//     {
//       "type": "prolog",
//       "attributes": {
//         "version": "1.0",
//         "encoding": "UTF-8",
//         "standalone": "no"
//       }
//     },
//     {
//       "type": "doctype",
//       "value": "svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"",
//       "values": [
//         "svg",
//         "PUBLIC",
//         "-//W3C//DTD SVG 1.1//EN",
//         "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"
//       ]
//     },
//     {
//       "type": "element",
//       "name": "svg",
//       "attributes": {
//         "width": "100%",
//         "height": "100%",
//         "viewBox": "0 0 24 24",
//         "version": "1.1",
//         "xmlns": "http://www.w3.org/2000/svg",
//         "xmlns:xlink": "http://www.w3.org/1999/xlink",
//         "xml:space": "preserve"
//       },
//       "children": [
//         {
//           "type": "text",
//           "value": "\n  "
//         },
//         {
//           "type": "element",
//           "name": "rect",
//           "attributes": {
//             "x": "11",
//             "y": "4",
//             "width": "2",
//             "height": "16"
//           },
//           "children": [],
//           "void": true
//         },
//         {
//           "type": "text",
//           "value": "\n"
//         }
//       ],
//       "void": false
//     },
//     {
//       "type": "text",
//       "value": "\n"
//     }
//   ]
// }

// It can stringify an AST back to an equivalent XML string

const xml = XML.stringify ( ast );
// <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
// <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
// <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
//   <rect x="11" y="4" width="2" height="16"/>
// </svg>

// It can check if a string is a valid XML string, according to this parser anyway

validate ( svg ); // => true
validate ( xml ); // => true
```

## License

MIT © Fabio Spampinato
