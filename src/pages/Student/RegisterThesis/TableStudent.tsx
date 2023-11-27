import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { Button, Input, Popconfirm, Space, Table, Tag, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { SearchProps } from 'antd/lib/input/Search'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getStudentByStudentID } from '../../../Api/Service/user.service'
import StudentType from '../../../types/StudentType'
import { saveInforStudents } from '../../../redux/_actions/thesis.action'
const { Search } = Input
function TableStudent() {
  const [messageApi, contextHolder] = message.useMessage()
  const [students, setStudents] = useState<StudentType[]>([])
  const [isInsertStudent, setIsInsertStudent] = useState<boolean>(false)
  const [countStudent, setCountStudent] = useState<number>(0)
  const handleInsertStudent = () => {
    setIsInsertStudent(true)
  }
  const handleDelete = (uuid: string) => {
    const newDataSource = students?.filter(item => item.uuid !== uuid)
    setStudents(newDataSource)
    setCountStudent(countStudent - 1)
  }
  const onSearchStudentWithKey: SearchProps['onSearch'] = (_value: string) => {
    getStudentByStudentID(`student/MSSV/${_value}`)
      .then(res => {
        const newStudent: StudentType = { ...res.data.data, key: countStudent + 1 }
        setStudents([...students, newStudent])
        setCountStudent(countStudent + 1)
      })
      .catch(err => {
        const messageError = err.response.message
        messageApi.open({
          type: 'error',
          content: messageError
        })
      })
  }
  const dispatch = useDispatch()
  const handlesaveChange = () => {
    setIsInsertStudent(false)
    dispatch(saveInforStudents(students))
  }
  const columns: ColumnsType<StudentType> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: '10px',
      responsive: ['sm']
    },
    {
      title: 'MSSV',
      dataIndex: 'MSSV',
      key: 'MSSV',
      responsive: ['sm']
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['sm']
    }
  ]
  if (isInsertStudent) {
    columns.push({
      title: 'Xóa sinh viên',
      dataIndex: 'deleteAdvisor',
      key: 'deleteAdvisor',
      width: '20px',
      align: 'center',
      render: (_, record) =>
        students.length >= 1 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Popconfirm
              title='Bạn chắc chắn?'
              onConfirm={() => handleDelete(record.uuid)}
              placement='left'
              okText='Xóa'
              cancelText='Hủy'
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Space size='large' style={{ cursor: 'pointer' }}>
                  <Tag style={{ fontSize: '16px' }} color='red'>
                    <DeleteTwoTone style={{ color: 'red !important' }} />
                  </Tag>
                </Space>
              </div>
            </Popconfirm>
          </div>
        ) : null
    })
  }
  return (
    <>
      {contextHolder}
      <Space size='large' style={{ cursor: 'pointer', margin: '10px' }}>
        <Tag
          style={{ fontSize: '14px', padding: '5px' }}
          color='green'
          onClick={handleInsertStudent}
        >
          <span style={{ color: 'black' }}>Thêm thông tin sinh viên</span>
          <EditTwoTone />
        </Tag>
      </Space>
      {isInsertStudent ? (
        <div>
          <Search
            style={{ width: 250, padding: '10px' }}
            placeholder='Nhập MSSV'
            allowClear
            enterButton
            onSearch={onSearchStudentWithKey}
          />
        </div>
      ) : null}
      {students.length > 0 ? (
        <div>
          <Table
            style={{ margin: '20px 0px' }}
            bordered
            dataSource={students}
            columns={columns}
            pagination={false}
            expandable={{
              expandedRowRender: record => (
                <div>
                  <ul>
                    <li>
                      <p style={{ margin: 0 }}>MSSV: {record.MSSV}</p>
                    </li>
                    <li>
                      <p style={{ margin: 0 }}>Họ và tên: {record.fullName}</p>
                    </li>
                    <li>
                      <p style={{ margin: 0 }}>Email: {record.email}</p>
                    </li>
                  </ul>
                </div>
              )
            }}
          />
          {isInsertStudent ? (
            <Button
              onClick={handlesaveChange}
              type='primary'
              style={{ marginTop: '20px' }}
            >Lưu thông tin SV</Button>
          ) : null}
        </div>
      ) : null}
    </>
  )
}

export default TableStudent
