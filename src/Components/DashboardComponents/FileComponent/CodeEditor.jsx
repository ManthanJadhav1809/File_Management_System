
import React, { useState } from "react";
import "./CodeEditor.css";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { duotoneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeEditor({ fileName,data,setData }) {
//   const [data, setData] = useState(`\n`);

  const codes = {
    html: "xml",
    php: "php",
    js: "javascript",
    jsx: "jsx",
    txt: "textfile",
    xml: "xml",
    css: "css",
    c: "clike",
    cpp: "clike",
    java: "java",
    cs: "clike",
    py: "python",
    json: "javascript",
  };

//   const handleKeyDown = (evt) => {
//     let value="" ; // Use 'data' instead of 'content'
//     const selStartPos = evt.currentTarget.selectionStart;
  
//     if (evt.key === "Tab") {
//       value =
//         value.substring(0, selStartPos) +
//         "    " +
//         value.substring(selStartPos, value.length);
//       evt.currentTarget.selectionStart = selStartPos + 4; // Adjusted to add 4 spaces
//       evt.currentTarget.selectionEnd = selStartPos + 4; // Adjusted to add 4 spaces
//       evt.preventDefault();
//       setData(value);
//     }
//   };
  
  const handleKeyDown = (evt) => {
    if (evt.key === "Tab") {
      evt.preventDefault();
  
      const { selectionStart, selectionEnd, value } = evt.target;
  
      const newValue =
        value.substring(0, selectionStart) + "    " + value.substring(selectionEnd);
  
      setData(newValue);
  
      // Move the cursor four positions to the right
      const newCursorPosition = selectionStart + 4;
      evt.target.selectionStart = newCursorPosition;
      evt.target.selectionEnd = newCursorPosition;
    }
  };
   

  return (
    <div className="row px-5 mt-3">
      <div className="col-md-12 mx-auto code-edit-container p-3">
        <textarea
          className="code-input w-100"
          value={data}
          // onKeyDown={handleKeyDown}
          onChange={(e) => setData(e.target.value)}
        ></textarea>
        <pre className="code-output">
          <SyntaxHighlighter
            language={codes[fileName.split(".")[1]]}
            showLineNumbers
            style={duotoneLight}
            wrapLines
            startingLineNumber={1}
          >
        { data}
          </SyntaxHighlighter>
        </pre>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import "./CodeEditor.css";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { duotoneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

// export default function CodeEditor({ fileName }) {
//   const [data, setData] = useState(`\n`);

//   const codes = {
//     html: "xml",
//     php: "php",
//     js: "javascript",
//     jsx: "jsx",
//     txt: "textfile",
//     xml: "xml",
//     css: "css",
//     c: "clike",
//     cpp: "clike",
//     java: "java",
//     cs: "clike",
//     py: "python",
//     json: "javascript",
//   };

  
//   const handleKeyDown = (evt) => {
//     let value = content,
//     selStartPos = evt.currentTarget.selectionStart;

//     console.log(evt.currentTarget);

//     if (evt.key === "Tab") {
//       value =
//         value.subString(0, selStartPos) +
//         " " +
//         value.subString(selStartPos, value.length);
//       evt.currentTarget.selectionStart = selStartPos + 3;
//       evt.currentTarget.selectionEnd = selStartPos + 4;
//       evt.prevenDefault();
//       setData(value);
//     }
//   };
//   return (
//     <div className="row px-5 mt-3">
//       <div className="col-md-12 mx-auto code-edit-container p-3">
//         <textarea
//           className="code-input w-100"
//           value={data}
//           onKeyDown={handleKeyDown}
//           onChange={(e) => setData(e.target.value)}
//         ></textarea>
//         <pre className="code-output">
//           <SyntaxHighlighter
//             language={codes[fileName.split(".")[1]]}
//             showLineNumbers
//             style={duotoneLight}
//             wrapLines
//             startingLineNumber={1}
//           >
//             {" "}
//             {data}
//           </SyntaxHighlighter>
//         </pre>
//       </div>
//     </div>
//   );
// }
