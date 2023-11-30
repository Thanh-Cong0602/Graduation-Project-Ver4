import { getAllThesesAPI } from '../../../Api/Service/thesis.service'
import { updateStudentAPI } from '../../../Api/Service/user.service'
import { useEffect, useState, useCallback } from 'react'
import ThesisType from '../../../types/ThesisType'
import { Popconfirm, Space, Table, Tag, message, Form } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { useSelector } from 'react-redux'
import StudentType from '../../../types/StudentType'
import ModalDetailThesis from './ModalDetailThesis'
import format from 'date-fns/format'
interface RootState {
  userReducer: {
    userId: string
  }
}
function ListOfTheses() {
  const [messageApi, contextHolder] = message.useMessage()
  const [theses, setTheses] = useState<ThesisType[]>([])
  const [loading, setLoading] = useState(false)
  const [isUser, setIsUser] = useState<boolean>(false)
  const [thesisId, setThesisId] = useState<string>('')
  const [inforStudent, setInforStudent] = useState<StudentType>({})
  const userId = useSelector((state: RootState) => state.userReducer.userId)
  const [form] = Form.useForm()
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  useEffect(() => {
    setLoading(true)
    getAllThesesAPI('thesis')
      .then(res => {
        const addKeyToThesis = res.data.data.reverse().map((item: ThesisType, index: number) => ({
          ...item,
          key: index + 1
        }))
        let found = false
        for (const thesis of addKeyToThesis) {
          for (const student of thesis.students) {
            if (student.uuid === userId && student.state === false) {
              setIsUser(true)
              setInforStudent(student)
              setThesisId(thesis.uuid)
              found = true
              break
            }
          }
          if (found) {
            break
          }
        }
        setTheses(addKeyToThesis)
      })
      .catch(err => {
        const messageError = err.response.message
        messageApi.open({
          type: 'error',
          content: messageError
        })
      })
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleAcceptJoinThesis = () => {
    const updatedInforStudent = { ...inforStudent, status: true }
    updateStudentAPI('student', [updatedInforStudent])
      .then(res => {
        const messageSuccess = res.data.message
        messageApi.open({
          type: 'success',
          content: messageSuccess
        })
        setIsUser(false)
      })
      .catch(err => {
        const messageError = err.response.message
        messageApi.open({
          type: 'error',
          content: messageError
        })
      })
  }
  function handleTimeCreated(text: string): string {
    const dateObject = new Date(text)
    return format(dateObject, 'dd/MM/yyyy')
  }
  const columns: ColumnsType<ThesisType> = [
    {
      title: 'STT',
      width: '5%',
      dataIndex: 'key',
      key: 'key',
      fixed: 'left'
    },
    {
      title: 'Tên đề tài',
      width: '20%',
      dataIndex: 'title_vi',
      key: 'title_vi',
      fixed: 'left'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'CreatedAt',
      width: '10%',
      key: 'CreatedAt',
      render: text => <p>{handleTimeCreated(text)}</p>
    },
    {
      title: 'Học kỳ',
      dataIndex: 'semester',
      key: 'semester',
      width: '5%'
    },
    { title: 'Column 3', dataIndex: 'thesis_info', key: '3', width: '100px' },
    { title: 'Column 4', dataIndex: 'thesis_info', key: '4', width: '100px' },
    {
      title: 'Chi tiết',
      dataIndex: 'details',
      key: 'details',
      width: '6%',
      fixed: 'right',
      render: (_, record: ThesisType) => (
        <Space size='large' style={{ cursor: 'pointer' }}>
          <Tag style={{ fontSize: '14px' }} color='blue' onClick={() => onClickOpenModal(record)}>
            <span>Chi tiết</span>
          </Tag>
        </Space>
      )
    }
  ]
  if (isUser) {
    columns.push({
      title: 'Chấp thuận',
      dataIndex: 'uuid',
      key: 'uuid',
      width: '10%',
      fixed: 'right',
      render: text => (
        <>
          {text === thesisId && isUser ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Popconfirm title='Bạn chắc chắn?' onConfirm={handleAcceptJoinThesis}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Space size='large' style={{ cursor: 'pointer' }}>
                    <Tag style={{ fontSize: '16px' }} color='green'>
                      <CheckOutlined style={{ color: 'green !important' }} />
                    </Tag>
                  </Space>
                </div>
              </Popconfirm>
              <Popconfirm title='Bạn chắc chắn?'>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Space size='large' style={{ cursor: 'pointer' }}>
                    <Tag style={{ fontSize: '16px' }} color='red'>
                      <CloseOutlined style={{ color: 'red !important' }} />
                    </Tag>
                  </Space>
                </div>
              </Popconfirm>
            </div>
          ) : null}
        </>
      )
    })
  }
  const openModalDetailThesis = useCallback(
    (_values: ThesisType) => {
      form.setFieldsValue(_values)
      setIsOpenForm(true)
    },
    [form]
  )
  const onClickOpenModal = useCallback(
    (values: ThesisType) => {
      openModalDetailThesis(values)
    },
    [openModalDetailThesis]
  )
  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={theses}
        bordered
        scroll={{ x: 1500 }}
        loading={loading}
      />
      <ModalDetailThesis isOpenForm={isOpenForm} setIsOpenForm={setIsOpenForm} form={form} />
    </>
  )
}

export default ListOfTheses
