import React from 'react';
import { useEffect, useState } from 'react';

const HtmlViewer = ({ filePath }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(htmlContent)
            .then(response => response.text())
            .then(data => setContent(data));
    }, []);

    return (
        <div dangerouslySetInnerHTML={{ __html: content }} />
    );
};

export default HtmlViewer;