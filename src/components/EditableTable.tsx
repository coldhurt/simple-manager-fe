import React, {
  KeyboardEvent,
  FocusEvent,
  Children,
  ReactChildren
} from 'react'
import { Table, Input, Button, Form } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { ColumnProps } from 'antd/lib/table'
import { IProductData } from './types'

const EditableContext = React.createContext<WrappedFormUtils>(
  {} as WrappedFormUtils
)

interface IEditableRowProps {
  form: WrappedFormUtils
  index: number
}
const EditableRow: React.FC<IEditableRowProps> = ({
  form,
  index,
  ...props
}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

// const EditableFormRow = Form.create()(EditableRow)

type BaseRecord = {
  dataIndex: string
}

type EditableCellProps<T> = {
  handleSave: Function
  record: T & BaseRecord
  children: ReactChildren
  dataIndex: string
  title: string
  editable: boolean
}

const EditableCell: React.SFC<EditableCellProps<any>> = ({
  handleSave,
  editable,
  record,
  children,
  dataIndex,
  title,
  ...restProps
}) => {
  let form: WrappedFormUtils | null = null
  let input: Input | null = null
  const [state, setState] = React.useState({
    editing: false
  })

  const toggleEdit = () => {
    const editing = !state.editing
    if (editing && input) {
      input.focus()
    }
    setState({ editing })
  }

  const save = (
    e: KeyboardEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
  ) => {
    if (form)
      form.validateFields((error, values) => {
        if (error && error[e.currentTarget && e.currentTarget.id]) {
          return
        }
        toggleEdit()
        handleSave({ ...record, ...values })
      })
  }

  const renderCell = (form: WrappedFormUtils) => {
    form = form as WrappedFormUtils
    const { editing } = state
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`
            }
          ],
          initialValue: record[dataIndex]
        })(
          <Input
            ref={node => (input = node)}
            onPressEnter={save}
            onBlur={save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return (
    <td {...restProps}>
      {editable ? (
        <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>
      ) : (
        children
      )}
    </td>
  )
}

type BaseColumn = {
  editable: boolean
  dataIndex: number | string
  title: string
}

type EditableTableProps<S, K> = {
  handleAdd: React.MouseEventHandler
  handleSave: Function
  form: WrappedFormUtils
  // input: Input
  columns: Array<S & BaseColumn>
  dataSource: K[]
}

const EditableTable: React.SFC<EditableTableProps<any, IProductData>> = ({
  handleSave,
  handleAdd,
  columns,
  dataSource,
  form
}) => {
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }
  const _columns = columns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: Object) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave
      })
    }
  })
  return (
    <div>
      <Button onClick={handleAdd} type='primary' style={{ marginBottom: 16 }}>
        添加商品
      </Button>
      <EditableContext.Provider value={form}>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={_columns as ColumnProps<Object>[]}
        />
      </EditableContext.Provider>
    </div>
  )
}

export default EditableTable
