import React from 'react'
import '../../scss/_layout.scss'
import { Layout, Flex, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
const { Header } = Layout

interface HeaderGeneralProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}
function HeaderGeneral({ collapsed, setCollapsed }: Readonly<HeaderGeneralProps>) {
  interface RootState {
    userReducer: {
      role: string
    }
    appReducer: {
      titlePage: string
    }
  }
  const role = useSelector((state: RootState) => state.userReducer.role)
  const titlePage = useSelector((state: RootState) => state.appReducer.titlePage)
  let btn_collapsed: string = ''
  switch (role) {
    case 'student':
      btn_collapsed = 'student_header_btn_collapsed'
      break
    case 'advisor':
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      btn_collapsed = 'advisor_header_btn_collapsed'
      break
    default:
      break
  }
  return (
    <Header className='layout__header'>
      <Flex gap={8} align='center'>
        <Button
          className={`${!collapsed ? 'btn_collapsed' : ''}`}
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: '16px', width: 64, height: 64 }}
        />
        <h1 className={`header_title ${!collapsed ? 'header_title_hidden' : ''}`}>{titlePage}</h1>
      </Flex>
    </Header>
  )
}

export default HeaderGeneral
