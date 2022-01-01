import { Layout, Menu } from 'antd'
import { useState } from 'react'
import { AiOutlineHome, AiOutlineIdcard } from 'react-icons/ai'
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

    const iconStyleFix = (menuOpen: boolean) => {
        const closedMenuStyle = {
            marginBottom: '-8px',
            marginLeft: '-6px',
            fontSize: '200%',
        }
        return menuOpen ? closedMenuStyle : { fontSize: '200%' }
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={menuOpen} onCollapse={setMenuOpen} collapsedWidth={50}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item
                        key="1"
                        icon={<AiOutlineHome style={iconStyleFix(menuOpen)} />}
                        onClick={() => navigate(ROUTES.SLASH)}
                    >
                        Home
                    </Menu.Item>
                    <Menu.Item
                        key="2"
                        icon={<AiOutlineIdcard style={iconStyleFix(menuOpen)} />}
                        onClick={() => navigate(ROUTES.TRAINER_CARD)}
                    >
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
