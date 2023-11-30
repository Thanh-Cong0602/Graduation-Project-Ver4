import { Input, Modal, Form } from 'antd'
import React from 'react'
import ThesisType from '../../../types/ThesisType'
import { FormInstance } from 'antd/es/form/Form'
interface ModalDetailThesisProps {
  isOpenForm: boolean
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
  form: FormInstance<ThesisType>
}
function ModalDetailThesis({ form, isOpenForm, setIsOpenForm }: Readonly<ModalDetailThesisProps>) {
  const handleCancel = () => {
    setIsOpenForm(false)
  }
  return (
    <>
      <Modal
        getContainer={false}
        open={isOpenForm}
        onCancel={handleCancel}
        width={1000}
        footer={false}
      >
        <div style={{ textAlign: 'center' }}>
          <h2>Thông tin mô tả đề tài</h2>
        </div>
        <Form form={form} id='detailForm'>
          <Form.Item label='Tên đề tài (Tiếng Việt):' name='title_vi'>
            <Input style={{ color: 'blue' }} disabled />
          </Form.Item>
          <Form.Item label='Tên đề tài (Tiếng Anh):' name='title_en'>
            <Input style={{ color: 'blue' }} disabled />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ModalDetailThesis
