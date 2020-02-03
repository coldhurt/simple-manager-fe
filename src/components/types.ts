import { IProduct } from '../store/client/types'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { ColumnProps } from 'antd/lib/table'

export interface IEditableTableState {
  dataSource: IProductData[]
  count: number
}

export interface ColumnsType extends ColumnProps<IProductData> {
  editable?: boolean
}

export interface IProductData extends IProduct {
  key: string | number
}

export interface IEditableCellProps {
  record: any
  handleSave(data: Object): void
  editable: boolean
  dataIndex: string
  title: string
  index: number
  form: WrappedFormUtils
}

export interface IEditableCellState {
  editing: boolean
  dataSource: IProductData[]
  count: number
}
