import { Select, Form, Input, DatePicker, message, Button, Space } from 'antd'
import './RegisterPage.scss'
import { Link } from 'react-router-dom'
import { registerNewAccountAPI } from '../../../Api/Service/auth.service'
import StudentType from '../../../types/StudentType'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
const { Option } = Select
const config = {
  rules: [
    {
      required: true,
      message: 'Please select time!'
    }
  ]
}

function RegisterPage() {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const onFinish = (values: StudentType) => {
    // eslint-disable-next-line no-console
    console.log(values)
    const requiredFields: StudentType[] = [
      {
        code: '2012754',
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        username: values.username,
        firstName: 'ttt',
        lastName: 'tt',
        image: '',
        fullName: values.fullName,
        gender: values.gender,
        phoneNumber: values.phoneNumber,
        role: 1,
        birthday: '06/03/2002',
        address: values.address
      }
    ]
    registerNewAccountAPI('signup', requiredFields)
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
      <div className='registerPage'>
        <h1>Register New Account</h1>
        <div className='registerForm'>
          <Form
            {...formItemLayout}
            form={form}
            layout='horizontal'
            autoComplete='off'
            style={{ maxWidth: 600, margin: '0 auto' }}
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name='email'
              label='Email'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Email'
                }
              ]}
            >
              <Input placeholder='Nhập email của bạn' type='email' />
            </Form.Item>
            <Form.Item label='Password' name='password' rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='Confirm Password'
              name='passwordConfirm'
              dependencies={['password']}
              rules={[
                {
                  required: true
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('The new password that you entered do not match!')
                    )
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='username'
              label='Username'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Username'
                }
              ]}
            >
              <Input placeholder='Nhập Username' />
            </Form.Item>
            <Form.Item
              name='fullName'
              label='Họ và tên'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền họ và tên của bạn'
                }
              ]}
            >
              <Input placeholder='Nhập họ và tên của bạn' />
            </Form.Item>
            <Form.Item
              name='gender'
              label='Gender'
              rules={[{ required: true, message: 'Please select gender!' }]}
            >
              <Select placeholder='Chọn giới tính'>
                <Option value='male'>Nam</Option>
                <Option value='female'>Nữ</Option>
              </Select>
            </Form.Item>
            <Form.Item name='birthday' label='DateOfBirth' {...config}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name='phoneNumber'
              label='Phone Number'
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!'
                }
              ]}
            >
              <Input
                addonBefore={'+84'}
                style={{
                  width: '100%'
                }}
              />
            </Form.Item>
            <Form.Item name='address' label='Địa chỉ'>
              <Input placeholder='Nhập địa chỉ của bạn' />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type='primary' htmlType='submit'>
                  Đăng ký
                </Button>
                <Button htmlType='reset'>Hủy</Button>
              </Space>
            </Form.Item>
            <div className='loginBtn'>
              <div>
                <p>Bạn đã có tài khoản?</p>
              </div>
              <Link to='/login_delegation'>Đăng nhập</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
