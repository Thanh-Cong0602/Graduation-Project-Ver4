import './LoginDelegationPage.scss'
import { Button, Space } from 'antd'
import logo_hcmut from '../../../assets/hcmut.png'
import { useNavigate } from 'react-router-dom'
import { setRoleUser } from '../../../redux/_actions/user.action'
import { useDispatch } from 'react-redux'

function LoginDelegationScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSetRole = (role: string) => {
    dispatch(setRoleUser(role))
    navigate('/login')
  }
  return (
    <div className='login__delegation'>
      <div className='login__delegation__form'>
        <img src={logo_hcmut} alt='Logo HCMUT' />
        <p>Đăng nhập dành cho</p>
        <Space
          direction='vertical'
          style={{
            width: '80%',
            paddingBottom: 50
          }}
        >
          <Button
            block
            size={'large'}
            style={{ fontSize: 16, fontWeight: 500 }}
            onClick={() => onSetRole('student')}
          >
            Sinh viên
          </Button>
          <Button
            block
            size={'large'}
            style={{ fontSize: 16, fontWeight: 500 }}
            onClick={() => onSetRole('advisor')}
          >
            Cán bộ hướng dẫn
          </Button>
          <Button
            block
            size={'large'}
            style={{ fontSize: 16, fontWeight: 500 }}
            onClick={() => onSetRole('headofsubject')}
          >
            Trưởng bộ môn
          </Button>
          <Button
            block
            size={'large'}
            style={{ fontSize: 16, fontWeight: 500 }}
            onClick={() => onSetRole('secretary')}
          >
            Giáo vụ khoa
          </Button>
          <Button
            block
            size={'large'}
            style={{ fontSize: 16, fontWeight: 500 }}
            onClick={() => onSetRole('council')}
          >
            Hội đồng ngành
          </Button>
        </Space>
      </div>
    </div>
  )
}
export default LoginDelegationScreen
