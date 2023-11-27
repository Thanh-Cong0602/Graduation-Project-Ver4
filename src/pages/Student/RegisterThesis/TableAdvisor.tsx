import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons'
import { Select, Space, Table, Tag, message, Popconfirm, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveInforAdvisors } from '../../../redux/_actions/thesis.action'
import { getAllAdvisors } from '../../../Api/Service/user.service'
import AdvisorType from '../../../types/AdvisorType'
function TableAdvisor() {
  const [messageApi, contextHolder] = message.useMessage()
  const [advisors, setAdvisors] = useState<AdvisorType[]>([])
  const [isInsertAdvisor, setIsInsertAdvisor] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<AdvisorType[]>([])
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [countAdvisor, setCountAdvisor] = useState<number>(0)
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)
  useEffect(() => {
    getAllAdvisors('advisor')
      .then(res => {
        const responseData = res.data.data
        const _options = responseData.map((item: { uuid: string; fullName: string }) => ({
          value: item.uuid,
          label: item.fullName
        }))
        setOptions(_options)
        setAdvisors(responseData)
      })
      .catch(err => {
        const messageError = err.response.message
        messageApi.open({
          type: 'error',
          content: messageError
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleInsertAdvisor = () => {
    setIsInsertAdvisor(true)
  }
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  const onSelectAdvisor = (value: string) => {
    const newAdvisor = advisors.find(item => item.uuid === value)
    if (newAdvisor) {
      const newDataSource: AdvisorType = {
        ...newAdvisor,
        key: countAdvisor + 1
      }
      setDataSource([...dataSource, newDataSource])
      setCountAdvisor(countAdvisor + 1)
      setSelectedValue('Tìm kiếm thông tin CBHD')
    }
  }
  const handleDelete = (uuid: string) => {
    const newDataSource = dataSource?.filter(item => item.uuid !== uuid)
    setDataSource(newDataSource)
    setCountAdvisor(countAdvisor - 1)
  }
  const dispatch = useDispatch()
  const handlesaveChange = () => {
    setIsInsertAdvisor(false)
    dispatch(saveInforAdvisors(dataSource))
  }
  const columns: ColumnsType<AdvisorType> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: '10px',
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
  if (isInsertAdvisor) {
    columns.push({
      title: 'Xóa CBHD',
      dataIndex: 'deleteAdvisor',
      key: 'deleteAdvisor',
      width: '20px',
      align: 'center',
      render: (_, record) =>
        dataSource.length >= 1 ? (
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
          onClick={handleInsertAdvisor}
        >
          <span style={{ color: 'black' }}>Thêm thông tin CBHD</span>
          <EditTwoTone />
        </Tag>
      </Space>
      {isInsertAdvisor ? (
        <div>
          <Select
            showSearch
            placeholder='Tìm kiếm thông tin CBHD'
            optionFilterProp='children'
            filterOption={filterOption}
            options={options}
            onChange={onSelectAdvisor}
            value={selectedValue}
          />
        </div>
      ) : null}
      {dataSource.length > 0 ? (
        <>
          <Table
            style={{ margin: '20px 0px' }}
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            expandable={{
              expandedRowRender: record => (
                <div>
                  <ul>
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
          {isInsertAdvisor ? (
            <Button
              onClick={handlesaveChange}
              type='primary'
              size='large'
              style={{ marginTop: '20px' }}
            >
              Lưu thông tin CBHD
            </Button>
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default TableAdvisor
