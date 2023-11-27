import React from 'react'
import './RegisterThesis.scss'
import { Button, Checkbox, Form, Input, Row, Col, message, Space, Tag } from 'antd'
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons'
import TableAdvisor from './TableAdvisor'
import TableStudent from './TableStudent'
import type { FormInstance } from 'antd'
import { createThesis } from '../../../Api/Service/thesis.service'
import { useSelector } from 'react-redux'
import ThesisType from '../../../types/ThesisType'
import StudentType from '../../../types/StudentType'
import AdvisorType from '../../../types/AdvisorType'
const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false)
  const values = Form.useWatch([], form)
  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      }
    )
  }, [values, form])
  return (
    <Button type='primary' htmlType='submit' disabled={!submittable}>
      Đăng ký
    </Button>
  )
}

function RegisterThesis() {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  interface RootState {
    thesisReducer: {
      saveInforStudents: StudentType[]
      saveInforAdvisors: AdvisorType[]
    }
  }
  const students = useSelector((state: RootState) => state.thesisReducer.saveInforStudents)
  const advisors = useSelector((state: RootState) => state.thesisReducer.saveInforAdvisors)
  const onFinish = (values: ThesisType) => {
    const requiredFields: ThesisType[] = [
      {
        title_vi: values.title_vi,
        title_en: values.title_en,
        approval_status: 0,
        thesis_type: 1,
        semester: '232',
        program: values.program.map(item => ({
          value: item.toString() === 'formal' ? 0 : 1
        })),
        user_role_owner: 0,
        thesis_info: values.thesis_info,
        thesis_task: [],
        students: students.map((student: { uuid: string }) => ({
          status: true,
          uuid: student.uuid
        })),
        advisors: advisors.map((advisor: { uuid: string }) => ({
          uuid: advisor.uuid
        })),
        missions: values.missions
      }
    ]
    createThesis('thesis', requiredFields)
      .then(res => {
        const messageSuccess = res.data.message
        messageApi.open({
          type: 'success',
          content: messageSuccess
        })
      })
      .catch(err => {
        const messageError = err.response.message
        messageApi.open({
          type: 'error',
          content: messageError
        })
      })
  }
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name='registerThesis'
        layout='vertical'
        autoComplete='off'
        style={{ maxWidth: 1400 }}
        labelWrap
        wrapperCol={{ flex: 1 }}
        onFinish={onFinish}
      >
        <Form.Item
          name='title_vi'
          label='Tên đề tài (Tiếng Việt)'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đề tài bằng tiếng việt'
            }
          ]}
        >
          <Input placeholder='Nhập tên đề tài tiếng việt' />
        </Form.Item>
        <Form.Item
          name='title_en'
          label='Tên đề tài (Tiếng Anh)'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đề tài bằng tiếng anh'
            }
          ]}
        >
          <Input placeholder='Nhập tên đề tài tiếng anh' />
        </Form.Item>
        <Form.Item name='advisors' label='Thông tin CBHD'>
          <TableAdvisor />
        </Form.Item>
        <Form.Item
          name='specialization'
          label='Ngành:'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn chuyên ngành'
            }
          ]}
        >
          <Checkbox.Group style={{ width: '100%' }}>
            <Row gutter={[0, 16]}>
              <Col xs={24} sm={8}>
                <Checkbox value='CS'>Khoa học máy tính</Checkbox>
              </Col>
              <Col xs={24} sm={8}>
                <Checkbox value='CE'>Kỹ thuật máy tính</Checkbox>
              </Col>
              <Col xs={24} sm={8}>
                <Checkbox value='CS_CE'>Liên ngành CS-CE</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          name='program'
          label='Chương trình đào tạo:'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn CTĐT'
            }
          ]}
        >
          <Checkbox.Group style={{ width: '100%' }}>
            <Row gutter={[0, 16]}>
              <Col xs={24} sm={{ span: 6 }}>
                <Checkbox value='formal'>Chính quy</Checkbox>
              </Col>
              <Col xs={24} sm={{ offset: 2, span: 8 }}>
                <Checkbox value='high_quality'>Chất lượng cao</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name='students' label='Thông tin sinh viên thực hiện:'>
          <TableStudent />
        </Form.Item>
        <Form.Item
          name='thesis_info'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập thông tin mô tả đề tài'
            }
          ]}
          label='Mô tả đề tài:'
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <label>Thông tin nhiệm vụ</label>
        <Form.List name='missions'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', rowGap: 8, justifyContent: 'space-between' }}
                  align='baseline'
                >
                  <Form.Item
                    style={{ width: '80vw' }}
                    {...restField}
                    name={[name, 'value']}
                    rules={[{ required: true, message: 'Điền thông tin nhiệm vụ' }]}
                  >
                    <Input placeholder='Thông tin nhiệm vụ' />
                  </Form.Item>
                  <Tag style={{ fontSize: '16px' }} color='red'>
                    <DeleteTwoTone
                      style={{ color: 'red !important' }}
                      onClick={() => remove(name)}
                    />
                  </Tag>
                </Space>
              ))}
              <Form.Item>
                <Button
                  type='dashed'
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ width: '200px' }}
                >
                  Thêm nhiệm vụ
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Space>
            <SubmitButton form={form} />
            <Button htmlType='reset'>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default RegisterThesis
