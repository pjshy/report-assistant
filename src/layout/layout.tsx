import React, { memo, useState, useCallback } from 'react'
import { Layout, Menu, Icon } from 'antd'

import styleNames from './layout.styl'

const { Header, Content, Sider } = Layout
const { Item } = Menu

export const AppLayout = memo(() => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = useCallback(() => {
    setCollapsed((val) => !val)
  }, [])

  function renderMenu () {
    return (
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
        <Item key='1'>
          <Icon type='user' />
          <span>Nav 1</span>
        </Item>
        <Item key='2'>
          <Icon type='user' />
          <span>Nav 2</span>
        </Item>
      </Menu>
    )
  }

  function renderHeader () {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggleCollapsed}
        />
      </Header>
    )
  }

  return (
   <Layout className={styleNames.layout}>
     <Sider trigger={null} collapsible={true} collapsed={collapsed}>
       {renderMenu()}
     </Sider>
     <Layout>
       {renderHeader()}
       <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          Content
        </Content>
     </Layout>
   </Layout>
  )
})