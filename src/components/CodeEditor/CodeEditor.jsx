import React from 'react'
import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange }) => {

    // function handleEditorChange(value, event) {
    //     // console.log('here is the current model value:', value);
    // }
    return (
        <div className='h-full'>
            <Editor
                theme='vs-dark'
                onChange={onChange}
                value={value}
                height={"100%"}
                width={"100%"}
                defaultLanguage={language?.toLowerCase() || "javascript"}
                defaultValue="// some comment"
            />
        </div>
    )
}

export default CodeEditor
