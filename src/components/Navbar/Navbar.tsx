import { useState } from 'react'
import './Navbar.scss'
import logo_hcmut from '../../assets/hcmut.png'
import { Flex, Button, notification, Image } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BellFilled, MessageFilled } from '@ant-design/icons'
import userImage from '../../assets/images/user_img.png'
import Conversation from '../Conversation/Conversation'
function Navbar() {
  interface RootState {
    userReducer: {
      role: string
      loggedIn: boolean
    }
  }
  const isLoggedIn = useSelector((state: RootState) => state.userReducer.loggedIn)
  const role = useSelector((state: RootState) => state.userReducer.role)
  const [openConversation, setOpenConversation] = useState(false)
  const showDrawer = () => {
    if (openConversation) {
      setOpenConversation(false)
    } else {
      setOpenConversation(true)
    }
  }
  const [api, contextHolder] = notification.useNotification()
  const openNotification = () => {
    api.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      className: 'custom-class',
      style: {
        width: 600
      }
    })
  }
  return (
    <>
      {contextHolder}
      <div className='navbar'>
        <Flex align='center' justify='space-between' style={{ paddingLeft: 10, paddingRight: 10 }}>
          <div>
            <Flex align='center' justify='space-between' gap={8}>
              <Image src={logo_hcmut} alt='Logo HCMUT' preview={false} width={'auto'} height={60} />
              <span className='navbar_infor navbar_infor_hidden'>
                Đại học quốc gia TP.HCM
                <br />
                Trường đại học bách khoa
              </span>
            </Flex>
          </div>
          <div></div>
          <div>
            {isLoggedIn ? (
              <Flex align='center' gap={12} className='navbar_right'>
                <Button style={{ border: 'none', padding: '4px 0px' }} onClick={openNotification}>
                  <BellFilled style={{ fontSize: 18 }} />
                </Button>
                <span>|</span>
                <Button style={{ border: 'none', padding: '4px 0px' }} onClick={showDrawer}>
                  <MessageFilled style={{ fontSize: 18 }} />
                </Button>
                <span style={{ marginRight: 20 }}>|</span>
                <span style={{ fontSize: 16 }} className='user_name_hidden'>
                  Nguyễn Thành Công <br />
                  {role}
                </span>
                <Image
                  src={userImage}
                  alt='Avatar User'
                  width={50}
                  height={'auto'}
                  style={{ borderRadius: '50%' }}
                />
              </Flex>
            ) : (
              <div>
                <Link to={'/login_delegation'}>Đăng nhập</Link>
              </div>
            )}
          </div>
        </Flex>
      </div>
      <Conversation setOpenConversation={setOpenConversation} openConversation={openConversation} />
    </>
  )
}

export default Navbar
