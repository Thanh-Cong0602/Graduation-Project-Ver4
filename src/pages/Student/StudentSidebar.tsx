import React from 'react'
import {
  UploadOutlined,
  FolderAddOutlined,
  HomeOutlined,
  FormOutlined,
  LineChartOutlined,
  FileTextOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedIn, setTitlePage, setSelectedKey } from '../../redux/_actions'
const { Sider } = Layout

interface StudentSidebarProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}
function StudentSidebar({ collapsed, setCollapsed }: Readonly<StudentSidebarProps>): JSX.Element {
  interface RootState {
    appReducer: {
      selectedKey: string
    }
  }
  const selectedKey = useSelector((state: RootState) => state.appReducer.selectedKey)
  const dispatch = useDispatch()
  const handleSetTitleHeader = (title: string) => {
    dispatch(setTitlePage(title))
  }
  const handleLogout = () => {
    dispatch(setSelectedKey('1'))
    dispatch(setTitlePage('Trang chủ hệ thống'))
    dispatch(setLoggedIn(false))
  }
  return (
    <div>
      <Sider
        className={`layout__sidebar ${collapsed ? 'res_sider_open' : 'res_sider_close'}`}
        trigger={null}
        breakpoint='lg'
        collapsedWidth='80'
        onCollapse={collapsed => {
          setCollapsed(collapsed)
        }}
        collapsible
        collapsed={collapsed}
      >
        <Menu
          theme='light'
          mode='inline'
          defaultSelectedKeys={[selectedKey]}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: (
                <Link
                  to='/'
                  onClick={() => {
                    dispatch(setSelectedKey('1'))
                    handleSetTitleHeader('Trang chủ hệ thống')
                  }}
                >
                  Trang chủ hệ thống
                </Link>
              )
            },
            {
              key: '2',
              icon: <FolderAddOutlined />,
              label: (
                <Link
                  to='/student/registerthesis'
                  onClick={() => {
                    dispatch(setSelectedKey('2'))
                    handleSetTitleHeader('Đăng ký đề tài')
                  }}
                >
                  Đăng ký đề tài
                </Link>
              )
            },
            {
              key: '3',
              icon: <LineChartOutlined />,
              label: (
                <Link
                  to='/student/implement_topic'
                  onClick={() => {
                    dispatch(setSelectedKey('3'))
                    handleSetTitleHeader('Triển khai đề tài')
                  }}
                >
                  Triển khai đề tài
                </Link>
              )
            },
            {
              key: '4',
              icon: <FormOutlined />,
              label: (
                <Link
                  to='/student/registertopic'
                  onClick={() => {
                    dispatch(setSelectedKey('4'))
                    handleSetTitleHeader('Yêu cầu phát sinh')
                  }}
                >
                  Yêu cầu phát sinh
                </Link>
              )
            },
            {
              key: '5',
              icon: <FileTextOutlined />,
              label: (
                <Link
                  to='/student/viewform'
                  onClick={() => {
                    dispatch(setSelectedKey('5'))
                    handleSetTitleHeader('Xem biểu mẫu')
                  }}
                >
                  Xem biểu mẫu
                </Link>
              )
            },
            {
              key: '6',
              icon: <UploadOutlined />,
              label: (
                <Link
                  to='/student/uploadreport'
                  onClick={() => {
                    dispatch(setSelectedKey('6'))
                    handleSetTitleHeader('Upload file báo cáo')
                  }}
                >
                  Upload file báo cáo
                </Link>
              )
            },
            {
              key: '7',
              icon: <FolderAddOutlined />,
              label: (
                <Link
                  to='create_exception'
                  onClick={() => {
                    dispatch(setSelectedKey('7'))
                    handleSetTitleHeader('Tạo ngoại lệ')
                  }}
                >
                  Tạo ngoại lệ
                </Link>
              )
            },
            {
              key: '8',
              icon: <LogoutOutlined />,
              label: (
                <Link to='/homepage' onClick={handleLogout}>
                  Đăng xuất
                </Link>
              )
            }
          ]}
        />
      </Sider>
    </div>
  )
}

export default StudentSidebar
