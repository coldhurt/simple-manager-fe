import React, { KeyboardEvent, FocusEvent } from 'react'
import { Table, Input, Button, Popconfirm, Form } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { IProduct } from '../../store/client/types'
import { ColumnProps } from 'antd/lib/table'

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

const EditableFormRow = Form.create()(EditableRow)

interface IEditableCellProps {
  record: any
  handleSave(data: Object): void
  editable: boolean
  dataIndex: string
  title: string
  index: number
  form: WrappedFormUtils
}

interface IEditableCellState {
  editing: boolean
  dataSource: IProductData[]
  count: number
}

class EditableCell extends React.Component<
  IEditableCellProps,
  IEditableCellState
> {
  form: WrappedFormUtils | null
  input: Input | null
  state = {
    editing: false,
    dataSource: [],
    count: 0
  }
  constructor(props: IEditableCellProps) {
    super(props)
    this.form = null
    this.input = null
  }

  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState({ editing }, () => {
      if (editing && this.input) {
        this.input.focus()
      }
    })
  }

  save = (
    e: KeyboardEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
  ) => {
    const { record, handleSave } = this.props
    if (this.form)
      this.form.validateFields((error, values) => {
        if (error && error[e.currentTarget && e.currentTarget.id]) {
          return
        }
        this.toggleEdit()
        handleSave({ ...record, ...values })
      })
  }

  renderCell = (form: WrappedFormUtils) => {
    this.form = form as WrappedFormUtils
    const { children, dataIndex, record, title } = this.props
    const { editing } = this.state
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
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    )
  }

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      form,
      ...restProps
    } = this.props
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    )
  }
}

interface IEditableTableState {
  dataSource: IProductData[]
  count: number
}

interface ColumnsType extends ColumnProps<IProductData> {
  editable?: boolean
}

interface IProductData extends IProduct {
  key: string | number
}

export default class EditableTable extends React.Component<
  {},
  IEditableTableState
> {
  columns: ColumnsType[]
  input: Input | null
  form: WrappedFormUtils | null
  constructor(props: Object) {
    super(props)
    this.input = null
    this.form = null
    this.columns = [
      {
        title: '商品名',
        dataIndex: 'productName',
        width: '30%',
        editable: true
      },
      {
        title: '数量',
        dataIndex: 'count',
        editable: true
      },
      {
        title: '类型',
        dataIndex: 'type',
        editable: true
      },
      {
        title: '加工费',
        dataIndex: 'processingFee',
        editable: true
      },
      {
        title: '存储费',
        dataIndex: 'storageFee',
        editable: true
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text: string, record: IProductData) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title='Sure to delete?'
              onConfirm={() => this.handleDelete(record.key as string)}
            >
              <a href='javascript:;'>Delete</a>
            </Popconfirm>
          ) : null
      }
    ]

    this.state = {
      dataSource: [],
      count: 2
    }
  }

  handleDelete = (key: string) => {
    const dataSource = [...this.state.dataSource]
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) })
  }

  handleAdd = () => {
    const { count, dataSource } = this.state
    const newData = {
      key: count,
      productName: `Edward King ${count}`,
      count: 32,
      type: `London, Park Lane no. ${count}`,
      processingFee: 22,
      storageFee: 22
    }
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    })
  }

  handleSave = (row: IProductData) => {
    const newData = [...this.state.dataSource]
    const index = newData.findIndex(item => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row
    })
    this.setState({ dataSource: newData })
  }

  render() {
    const { dataSource } = this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    }
    const columns = this.columns.map((col: ColumnsType) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record: IProductData) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      }
    })
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type='primary'
          style={{ marginBottom: 16 }}
        >
          添加商品
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    )
  }
}
