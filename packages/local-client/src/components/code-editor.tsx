import { useRef } from 'react'
import MonacoEditor, {EditorDidMount} from '@monaco-editor/react'
import Prettier from 'prettier'
import parser from 'prettier/parser-babel'
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import './code-editor.css'
import codeShift from 'jscodeshift'
import Highlighter from 'monaco-jsx-highlighter'
import './syntax.css'

interface CodeEditorProps {
    initialValue: string
    onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<any>()

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue())
        })

        const highlighter = new Highlighter(
            // @ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
        )
        highlighter.highLightOnDidChangeModelContent(
            () => {},
            () => {},
            undefined,
            () => {}
        )
    }

    const formatOnClick = () => {
        const unformatted = editorRef.current.getModel().getValue()

        const formatted = Prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            semi: true,
            singleQuote: true,
        }).replace(/\n$/, '')

        editorRef.current.setValue(formatted)
    }

    return <div className='editor-wrapper'>
        <button 
        className='button button-format is-primary is- small' 
        onClick={formatOnClick}>Prettier</button>
        <MonacoEditor 
            value={initialValue}
            editorDidMount={onEditorDidMount}
            options={{
                wordWrap: 'on',
                minimap: { enabled: false },
                showUnused: false,
                lineNumbersMinChars: 5,
                folding: false,
                fontSize: 16,
                scrollBeyondLastLine: false,
                automaticLayout: true,
            }}
            theme="dark" 
            language="javascript" 
            height="100%" 
        />    
    </div>
}

export default CodeEditor