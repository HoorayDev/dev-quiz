import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  language?: string;
  code: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ language = 'javascript', code }) => {
  // const exampleCode = `
  //   function greeting(name) {
  //     console.log("Hello, " + name + "!");
  //   }
  //
  //   greeting("World");
  // `;

  return (
    <SyntaxHighlighter language={language} style={prism}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
