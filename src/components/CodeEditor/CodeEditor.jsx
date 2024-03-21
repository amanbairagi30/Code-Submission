import React from 'react'
import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange }) => {

    // function handleEditorChange(value, event) {
    //     // console.log('here is the current model value:', value);
    // }

    console.log(language?.split(" ")[0]?.toLowerCase() , "----- editor me ")
    return (
        <div className='h-full'>
            <Editor
                theme='vs-dark'
                onChange={onChange}
                value={value}
                height={"100%"}
                width={"100%"}
                language={language?.split(" ")[0]?.toLowerCase() === "c++" ? "cpp" : ""}
                defaultLanguage={"javascript"}
                defaultValue="// some comment"
            />
        </div>
    )
}

export default CodeEditor
