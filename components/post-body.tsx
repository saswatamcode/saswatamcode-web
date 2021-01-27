import markdownStyles from "./markdown-styles.module.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";

type Props = {
  content: string;
};

interface CodeBlockProps {
  language?: string;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  language = undefined,
  value,
}) => {
  return (
    <SyntaxHighlighter language={language} style={dracula}>
      {value}
    </SyntaxHighlighter>
  );
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className={markdownStyles["markdown"]}>
        <ReactMarkdown
          source={content}
          renderers={{
            code: CodeBlock,
          }}
        />
      </div>
    </div>
  );
};

export default PostBody;
