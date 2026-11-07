import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Mermaid } from "mdx-mermaid/lib/Mermaid";
import "./Preview.css";

interface PreviewProps {
  value: string;
}

const Preview: React.FC<PreviewProps> = ({ value }) => (
  <div className='preview'>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code: ({ node, className, children, ...props }) => {
          const isInline =
            node?.tagName === "code" && !className?.includes("language-");
          const isMermaid = className?.includes("language-mermaid");
          if (!isInline && isMermaid) {
            return <Mermaid chart={String(children).trim()} />;
          }

          if (isInline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }

          return (
            <pre
              className={className}
              {...(props as React.HTMLAttributes<HTMLPreElement>)}
            >
              <code className={className}>{children}</code>
            </pre>
          );
        },
      }}
    >
      {value}
    </ReactMarkdown>
  </div>
);

export default React.memo(Preview);
