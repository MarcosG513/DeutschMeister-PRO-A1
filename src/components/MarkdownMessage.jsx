import React from 'react';

const MarkdownMessage = ({ text }) => {
  if (!text || typeof text !== 'string') return null;
  let cleanText = text.replace(/(?:🇩🇪✨\s*model|✨\s*model|DE|model)\s*$/gi, '').trim();

  const renderInlineStyles = (content, keyPrefix) => {
    const linkParts = content.split(/(\[.*?\]\(.*?\))/g);
    return linkParts.map((linkPart, lIndex) => {
      if (linkPart.startsWith('[') && linkPart.includes('](') && linkPart.endsWith(')')) {
        const textMatch = linkPart.match(/\[(.*?)\]/);
        const urlMatch = linkPart.match(/\((.*?)\)/);
        if (textMatch && urlMatch) {
          return <a key={`${keyPrefix}-l-${lIndex}`} href={urlMatch[1]} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 underline font-bold bg-emerald-50 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1">{textMatch[1]}</a>;
        }
      }

      const parts = linkPart.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={`${keyPrefix}-l-${lIndex}-b-${index}`}>{part.slice(2, -2)}</strong>;
        }
        const subParts = part.split(/(\*.*?\*)/g);
        return subParts.map((subPart, subIndex) => {
          if (subPart.startsWith('*') && subPart.endsWith('*')) {
            return <em key={`${keyPrefix}-l-${lIndex}-b-${index}-i-${subIndex}`}>{subPart.slice(1, -1)}</em>;
          }
          return <span key={`${keyPrefix}-l-${lIndex}-b-${index}-t-${subIndex}`}>{subPart}</span>;
        });
      });
    });
  };

  const lines = cleanText.split('\n');
  const elements = [];
  let currentTable = null;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('|') && trimmed.includes('---')) return;

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.split('|').filter(c => c.trim() !== '');
      if (!currentTable) currentTable = [];
      const isHeader = currentTable.length === 0;
      currentTable.push(
        <div key={`row-${index}`} className={`flex border-b border-slate-200 ${isHeader ? 'font-bold bg-slate-200/80 text-slate-800 rounded-t-lg' : 'bg-white'}`}>
          {cells.map((cell, cIndex) => (
            <div key={`cell-${index}-${cIndex}`} className={`flex-1 p-2 border-r border-slate-200 last:border-r-0 text-sm ${isHeader ? 'text-center' : ''}`}>
              {renderInlineStyles(cell.trim(), `cell-${index}-${cIndex}`)}
            </div>
          ))}
        </div>
      );
      return;
    } else if (currentTable) {
      elements.push(<div key={`table-${index}`} className="my-4 border border-slate-200 rounded-lg overflow-hidden shadow-sm">{currentTable}</div>);
      currentTable = null;
    }

    if (trimmed.startsWith('### ')) { elements.push(<h3 key={`h3-${index}`} className="text-lg font-bold mt-5 mb-2 text-blue-900 border-b border-blue-100 pb-1">{renderInlineStyles(trimmed.replace('### ', ''), `h3-${index}`)}</h3>); return; }
    if (trimmed.startsWith('## ')) { elements.push(<h2 key={`h2-${index}`} className="text-xl font-bold mt-6 mb-3 text-blue-900 border-b border-blue-200 pb-1">{renderInlineStyles(trimmed.replace('## ', ''), `h2-${index}`)}</h2>); return; }
    if (trimmed.startsWith('# ')) { elements.push(<h1 key={`h1-${index}`} className="text-2xl font-black mt-6 mb-3 text-blue-950">{renderInlineStyles(trimmed.replace('# ', ''), `h1-${index}`)}</h1>); return; }
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
      elements.push(<li key={`li-${index}`} className="ml-5 mt-1 list-inside marker:text-blue-500">{renderInlineStyles(trimmed.replace(/^(\* |- |\d+\.\s)/, ''), `li-${index}`)}</li>); return;
    }
    if (trimmed.startsWith('> ')) {
      elements.push(<blockquote key={`quote-${index}`} className="border-l-4 border-blue-500 pl-4 py-2 my-3 bg-blue-50/80 rounded-r-lg text-slate-700 italic shadow-sm">{renderInlineStyles(trimmed.substring(2), `quote-${index}`)}</blockquote>); return;
    }
    if (trimmed === '---' || trimmed === '***') { elements.push(<hr key={`hr-${index}`} className="my-4 border-slate-200" />); return; }
    if (trimmed === '') { elements.push(<div key={`space-${index}`} className="h-2"></div>); } 
    else { elements.push(<p key={`p-${index}`} className="mb-2">{renderInlineStyles(trimmed, `p-${index}`)}</p>); }
  });

  if (currentTable) { elements.push(<div key={`table-end`} className="my-4 border border-slate-200 rounded-lg overflow-hidden shadow-sm">{currentTable}</div>); }

  return <div className="text-[15px] leading-relaxed text-slate-700">{elements}</div>;
};

export default MarkdownMessage;
