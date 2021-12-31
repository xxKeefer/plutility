import { Layout, Menu } from 'antd'
import { useState } from 'react'

const { Sider } = Layout

type LayoutProps = {
    children: React.ReactNode
}

export const MainLayout = ({ children }: LayoutProps) => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={menuOpen} onCollapse={setMenuOpen}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ maxWidth: '100%' }}>{children}</Layout>
        </Layout>
    )
}

export default MainLayout
