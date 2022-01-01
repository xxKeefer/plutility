import { Layout, Menu } from 'antd'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { PokeText } from '~/components'
import { ROUTES } from '~/constants'
import { getLocationName } from '~/utils'

const { Header, Sider } = Layout

type LayoutProps = {
    children: React.ReactNode
}

export const MainLayout = ({ children }: LayoutProps) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

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
            <Layout style={{ maxWidth: '100%' }}>
                <Header>
                    <PokeText fontSize={42} style={{ color: '#fff' }}>
                        {getLocationName(location.pathname)}
                    </PokeText>
                </Header>
                {children}
            </Layout>
        </Layout>
    )
}

export default MainLayout
