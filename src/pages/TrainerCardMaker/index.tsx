import { Col, Row } from 'antd'
import { useRef } from 'react'
import { exportComponentAsPNG } from 'react-component-export-image'
import styled from 'styled-components'

import { PokemonForm, TeamDisplay, TrainerCard } from '~/components'
import { TCMProvider } from '~/contexts'
import { MainLayout } from '~/layout'

const FrameRow = styled(Row)`
    padding: 16px;
    max-width: 100%;
`

const TrainerCardMaker = () => {
    const png = useRef<HTMLDivElement>(null)

    const exportPNG = () => {
        exportComponentAsPNG(png, {
            fileName: 'trainer-card',
            html2CanvasOptions: {
                removeContainer: true,
                backgroundColor: 'transparent',
                height: 460,
                width: 800,
            },
        })
    }
    return (
        <MainLayout>
            <TCMProvider>
                <FrameRow gutter={16} align="middle" justify="center">
                    <Col>
                        <PokemonForm exportPNG={exportPNG} />
                        <TeamDisplay />
                        <TrainerCard ref={png} />
                    </Col>
                </FrameRow>
            </TCMProvider>
        </MainLayout>
    )
}

export default TrainerCardMaker
