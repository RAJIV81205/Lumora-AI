import React from 'react'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { FileText } from 'lucide-react';

const Summary = ({ material, onClose }) => {
    if (!material) return null;

    return (
        <div className="h-full flex flex-col justify-center items-center bg-gray-200">

            <div className='bg-white h-[95%] w-[95%] rounded-xl shadow-md flex flex-col'>
                <div className="flex-none p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-blue-600" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 font-open-sans">{material.subName}</h1>
                            <p className="text-sm text-gray-500 font-inter">Summary</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="prose prose-lg max-w-none font-inter">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                            components={{
                                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-gray-950 mb-4 font-open-sans" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-gray-900 mb-3 font-open-sans underline" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-gray-800 mb-2 font-open-sans" {...props} />,
                                p: ({ node, ...props }) => <p className="text-gray-700 mb-4 leading-relaxed font-inter" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 text-gray-600 font-inter" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 text-gray-600 font-inter" {...props} />,
                                li: ({ node, ...props }) => <li className="mb-1 font-inter" {...props} />,
                                blockquote: ({ node, ...props }) => (
                                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4 font-inter" {...props} />
                                ),
                                code: ({ node, inline, ...props }) => (
                                    inline ?
                                        <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono" {...props} /> :
                                        <code className="block bg-gray-100 rounded p-4 text-sm font-mono overflow-x-auto" {...props} />
                                ),
                                table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto my-4">
                                        <table className="min-w-full divide-y divide-gray-200 font-inter" {...props} />
                                    </div>
                                ),
                                th: ({ node, ...props }) => (
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-open-sans" {...props} />
                                ),
                                td: ({ node, ...props }) => (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-inter" {...props} />
                                ),
                            }}
                        >
                            {material.summary}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;