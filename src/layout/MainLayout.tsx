import { Layout, Menu } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '~/constants'

const { Sider } = Layout

type LayoutProps = {
    children: React.ReactNode
}

export const MainLayout = ({ children }: LayoutProps) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={menuOpen} onCollapse={setMenuOpen}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" onClick={() => navigate(ROUTES.SLASH)}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => navigate(ROUTES.TRAINER_CARD)}>
                        Trainer Card Maker
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ maxWidth: '100%' }}>{children}</Layout>
        </Layout>
    )
}

export default MainLayout
