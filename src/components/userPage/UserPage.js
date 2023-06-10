/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react'
import './style.css'
import { Avatar, Button, Form, Input, InputNumber } from 'antd'

const UserPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [userData, setUserData] = useState({
    name: 'Taimanna',
    age: 21,
    email: 'nhannt.gm@gmail.com',
  })

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    style: { width: '100%', marginTop: '2rem', marginRight: '4rem' },
  }

  const validateMessages = {
    required: '${label} không được để trống.',
    types: {
      email: 'Định dạng không đúng!',
      number: '${label} không hợp lệ!',
    },
    number: {
      range: '${label} phải từ ${min} đến ${max}',
    },
  }

  const handleInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleInputNumber = (e) => {
    setUserData({
      ...userData,
      age: e,
    })
  }

  const handleChangeUserInfo = (e) => {
    // cập nhật thay đổi dữ liệu của user

    setIsEdit(false)
  }

  return (
    <div className='user-page'>
      <div className='user-container'>
        <div className='avatar-container'>
          <Avatar size={150} style={{ marginTop: '2rem', backgroundColor: '#fde3cf', color: '#f56a00', fontSize: 50 }}>
            U
          </Avatar>

          <div className='username'>{userData.name}</div>
        </div>
        <div className='infomation-container'>
          {isEdit ? (
            <Form {...layout} validateMessages={validateMessages} size='large'>
              <Form.Item name='name' label='Tên' rules={[{ required: true }]} initialValue={userData.name}>
                <Input name='name' onChange={handleInput} />
              </Form.Item>
              <Form.Item
                name='age'
                label='Tuổi'
                rules={[{ type: 'number', min: 6, max: 200 }]}
                initialValue={userData.age}
              >
                <InputNumber min='6' max='200' name='age' onChange={handleInputNumber} />
              </Form.Item>
              <Form.Item name='email' label='Email' rules={[{ type: 'email' }]} initialValue={userData.email}>
                <Input name='email' onChange={handleInput} />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button type='primary' size='medium' onClick={handleChangeUserInfo}>
                  Hoàn thành
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Form {...layout} validateMessages={validateMessages}>
              <Form.Item label='Tên'>{userData.name}</Form.Item>
              <Form.Item label='Tuổi'>{userData.age}</Form.Item>
              <Form.Item label='Email'>{userData.email}</Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button
                  // size='small'
                  type='primary'
                  onClick={() => {
                    setIsEdit(true)
                  }}
                >
                  Chỉnh sửa
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserPage