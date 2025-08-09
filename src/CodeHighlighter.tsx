import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useEffect, useRef } from 'react';

function CodeHighlighter({ language, code }: { language: string, code: string }) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <pre>
      <code ref={codeRef} className={language}>
        {code}
      </code>
    </pre>
  );
}

export default CodeHighlighter;