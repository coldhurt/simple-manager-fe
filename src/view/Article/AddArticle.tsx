import React, { Component, FormEvent } from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor, {
  EditorState,
  BuiltInControlType,
  ExtendControlType
} from 'braft-editor'
import { Input, Form, Button } from 'antd'

declare global {
  interface Window {
    previewWindow: any
  }
}

class AddArticle extends Component {
  state = { editorState: BraftEditor.createEditorState(null) }

  handleChange = (editorState: EditorState) => this.setState({ editorState })

  onSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(this.state.editorState.toHTML())
  }

  preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close()
    }

    window.previewWindow = window.open()
    window.previewWindow.document.write(this.buildPreviewHtml())
    window.previewWindow.document.close()
  }

  buildPreviewHtml() {
    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `
  }

  render() {
    const excludeControls: BuiltInControlType[] = [
      'letter-spacing',
      'line-height',
      'clear',
      'headings',
      'list-ol',
      'list-ul',
      'remove-styles',
      'superscript',
      'subscript',
      'hr',
      'text-align'
    ]

    const extendControls: ExtendControlType[] = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview
      }
    ]
    return (
      <div style={{ padding: 20 }}>
        <Form layout='vertical' onSubmit={this.onSubmit}>
          <Form.Item label='标题'>
            <Input />
          </Form.Item>
          <Form.Item label='正文'>
            <BraftEditor
              excludeControls={excludeControls}
              extendControls={extendControls}
              value={this.state.editorState}
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default {
  name: 'addArticle',
  view: AddArticle
}
