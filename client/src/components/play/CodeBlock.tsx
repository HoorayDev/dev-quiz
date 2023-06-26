import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { merge } from 'lodash';

interface CodeBlockProps {
  language?: string;
  code: string;
}

const exampleCode = `
  function greeting(name) {
    console.log("Hello, " + name + "!");
  }

  greeting("World");
`;

const customStyle = {
  width: '100%',
  marginTop: '60px',
}

const CodeBlock: FC<CodeBlockProps> = ({ language = 'javascript', code }) => {
  return (
    <SyntaxHighlighter language={language} style={prism} customStyle={customStyle}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
