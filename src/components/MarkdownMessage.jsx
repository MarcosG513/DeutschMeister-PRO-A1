import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownMessage = ({ text }) => {
  if (!text || typeof text !== 'string') return null;
  let cleanText = text.replace(/(?:🇩🇪✨\s*model|✨\s*model|DE|model)\s*$/gi, '').trim();

  return (
    <div className="text-inherit space-y-3 text-left">
      <ReactMarkdown 
        className="text-inherit space-y-3"
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({node, ...props}) => <span className="block mb-2 text-slate-700" {...props} />,
          strong: ({node, ...props}) => <strong className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded" {...props} />,
          table: ({node, ...props}) => (
            <div className="overflow-x-auto my-5 rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse text-sm min-w-[600px]" {...props} />
            </div>
          ),
          thead: ({node, ...props}) => <thead className="bg-slate-100/80 text-slate-800" {...props} />,
          tbody: ({node, ...props}) => <tbody className="bg-white divide-y divide-slate-100" {...props} />,
          th: ({node, ...props}) => <th className="px-4 py-3 font-bold border-b border-slate-200 whitespace-nowrap" {...props} />,
          td: ({node, ...props}) => <td className="px-4 py-3 align-top leading-relaxed text-slate-600" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 my-2 text-slate-700 marker:text-indigo-400" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-1 my-2 text-slate-700 marker:text-indigo-600 marker:font-bold" {...props} />,
          li: ({node, ...props}) => <li className="pl-1" {...props} />,
          h1: ({node, ...props}) => <h1 className="text-2xl font-black mt-6 mb-3 text-blue-950" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-6 mb-3 text-blue-900 border-b border-blue-200 pb-1" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-5 mb-2 text-blue-900 border-b border-blue-100 pb-1" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-3 bg-blue-50/80 rounded-r-lg text-slate-700 italic shadow-sm" {...props} />,
          hr: ({node, ...props}) => <hr className="my-4 border-slate-200" {...props} />
        }}
      >
        {cleanText}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownMessage;
