import { LaptopOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { deleteMovieById, deleteUserById, getAllMovies, getAllUsers } from '../../api/adminPage'

const { Content, Sider } = Layout

const AdminPage = () => {
  const [activePane, setActivePane] = useState('users')
  const [userDataSources, setUserDataSources] = useState([])
  const [movieDataSources, setMovieDataSources] = useState([])

  const sidebarMenuItems = [
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
    },
    {
      key: 'movies',
      icon: <LaptopOutlined />,
      label: 'Movies',
    },
  ]

  const userColumn = [
    {
      title: '',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Display Name',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Enabled?',
      dataIndex: 'enable',
      key: 'enable',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size='middle'>
            <Link to={`/users/${record.key}`}>Edit</Link>
            <Link onClick={(e) => onDeleteUserClick(e, record.key)}>Delete</Link>
          </Space>
        )
      },
    },
  ]

  const movieColumn = [
    {
      title: '',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Release Date',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
    },
    {
      title: 'Genres',
      dataIndex: 'genres',
      key: 'genres',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size='middle'>
            <Link to={`/movies/${record.key}`}>Edit</Link>
            <Link onClick={(e) => onDeleteMovieClick(e, record.key)}>Delete</Link>
          </Space>
        )
      },
    },
  ]

  const genresTag = {
    Action: 'magenta',
    Adventure: 'red',
    Animation: 'volcano',
    Comedy: 'orange',
    Crime: 'gold',
    Documentary: 'lime',
    Drama: 'green',
    Family: 'cyan',
    Fantasy: 'blue',
    History: 'geekblue',
    Horror: 'purple',
    Music: 'magenta',
    Mystery: 'red',
    Romance: 'volcano',
    'Science Fiction': 'orange',
    'TV Movie': 'gold',
    Thriller: 'lime',
    War: 'green',
    Western: 'cyan',
  }

  const handleSidebarClick = (e) => {
    setActivePane(e.key)
  }

  const deleteMovie = async (id) => {
    try {
      await deleteMovieById(id, localStorage.getItem('accessToken'))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async (id) => {
    try {
      await deleteUserById(id, localStorage.getItem('accessToken'))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await getAllUsers(localStorage.getItem('accessToken'))
        setUserDataSources(
          res?.data?.map((user, index) => ({
            index: index + 1,
            key: user.id,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
            enable: user.enabled,
          }))
        )
      } catch (error) {
        console.log('Admin: ' + error)
      }
    }

    const fetchAllMovies = async () => {
      try {
        const res = await getAllMovies()
        setMovieDataSources(
          res?.data?.map((movie, index) => ({
            index: index + 1,
            key: movie.id,
            title: movie.title,
            releaseDate: movie.releaseDate,
            genres: movie.genres.map((genre, index) => (
              <Tag key={index + genre} color={genresTag[genre]}>
                {genre}
              </Tag>
            )),
            rating: movie.rating,
          }))
        )
      } catch (error) {}
    }

    if (activePane === 'users') {
      fetchAllUsers()
    } else if (activePane === 'movies') {
      fetchAllMovies()
    }
  }, [activePane])

  const onDeleteMovieClick = (e, id) => {
    e.preventDefault()
    deleteMovie(id)
    const newDataSource = movieDataSources.filter((data) => data.key !== id)
    setMovieDataSources(newDataSource)
  }
  const onDeleteUserClick = (e, id) => {
    e.preventDefault()
    deleteUser(id)
    const newDataSource = userDataSources.filter((data) => data.key !== id)
    setUserDataSources(newDataSource)
  }

  return (
    <Layout
      style={{
        padding: '24px 0',
      }}
    >
      <Sider style={{}} width={200}>
        <Menu
          mode='inline'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['users']}
          style={{
            height: '100%',
          }}
          items={sidebarMenuItems}
          onClick={(e) => handleSidebarClick(e)}
        />
      </Sider>
      <Content
        style={{
          padding: '0 24px',
          minHeight: 280,
        }}
      >
        <Table
          dataSource={activePane === 'users' ? userDataSources : movieDataSources}
          columns={activePane === 'users' ? userColumn : movieColumn}
        />
      </Content>
    </Layout>
  )
}

export default AdminPage
