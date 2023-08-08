import { FC, useState, useEffect, useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { merge } from 'lodash';

interface CodeBlockProps {
  language?: string;
  code: string;
}

const defaultStyle = {
  width: '100%',
}

const responsiveStyle = {
  mobile: {
    ...defaultStyle,
    fontSize: '14px',
  }
}

const CodeBlock: FC<CodeBlockProps> = ({ language = 'javascript', code }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(function registerMediaQuery(){
    const breakPoint = '(max-width: 768px)'
    const mediaQuery = window.matchMedia(breakPoint);

    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    mediaQuery.addListener(handleResize);

    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);

  const customStyle = useMemo(() => {
    if(isSmallScreen){
      return defaultStyle
    }

    return responsiveStyle.mobile
  }, [isSmallScreen])

  return (
    <SyntaxHighlighter language={language} style={prism} customStyle={customStyle}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
