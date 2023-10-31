
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

  
  // const handleKeyDown = (evt) => {
  //   if (evt.key === "Tab") {
  //     evt.preventDefault();
  
  //     const { selectionStart, selectionEnd, value } = evt.target;
  
  //     const newValue =
  //       value.substring(0, selectionStart) + "    " + value.substring(selectionEnd);
  
  //     setData(newValue);
  
  //     // Move the cursor four positions to the right
  //     const newCursorPosition = selectionStart + 4;
  //     evt.target.selectionStart = newCursorPosition;
  //     evt.target.selectionEnd = newCursorPosition;
  //   }
  // };
   

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
