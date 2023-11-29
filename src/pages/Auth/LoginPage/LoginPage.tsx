import './LoginPage.scss'
import logo_hcmut from '../../../assets/hcmut.png'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Flex } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoggedIn } from '../../../redux/_actions/user.action'

function LoginScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = () => {
    dispatch(setLoggedIn(true))
    navigate('/')
  }
  return (
    <div className='login__screen'>
      <div className='login__screen__container'>
        <Flex align='center' justify='space-evenly' gap={24} className='loginscreen__infor'>
          <img src={logo_hcmut} alt='Logo Bách Khoa TP.HCM' />
          <div className='loginscreen__form'>
            <h1>Đăng nhập</h1>
            <Form name='information_login' size='large' onFinish={onFinish}>
              <Form.Item
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên tài khoản!'
                  }
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder='Tên tài khoản' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!'
                  }
                ]}
              >
                <Input prefix={<LockOutlined />} type='password' placeholder='Mật khẩu' />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Flex>
      </div>
    </div>
  )
}

export default LoginScreen
