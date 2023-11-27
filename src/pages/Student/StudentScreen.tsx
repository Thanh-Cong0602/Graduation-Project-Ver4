import '../../scss/_layout.scss'
import { useState } from 'react'
import StudentSidebar from './StudentSibar'
import RegisterThesis from './RegisterThesis/RegisterThesis'
import ImplementThesis from './ImplementThesis/ImplementThesis'
import HeaderGeneral from '../../components/HeaderGeneral/HeaderGeneral'
import StudentHomepage from './StudentHomepage/StudentHomepage'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
const { Content } = Layout

function StudentScreen() {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  return (
    <Layout hasSider className='layout__main'>
      <StudentSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout
        className='layout__right'
        style={{
          paddingLeft: collapsed ? 80 : 200,
          transition: '0.3s ease'
        }}
      >
        <HeaderGeneral collapsed={collapsed} setCollapsed={setCollapsed} />
        <div
          className={`${!collapsed ? 'hidden__content' : ''}`}
          onClick={() => {
            setCollapsed(true)
          }}
        ></div>
        <Content className='layout__content'>
          <Routes>
            <Route path='/' element={<StudentHomepage />} />
            <Route path='/student/registertopic' element={<RegisterThesis />} />
            <Route path='/student/implement_topic' element={<ImplementThesis />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default StudentScreen
