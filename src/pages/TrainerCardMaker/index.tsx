import { Button, Col, Row } from 'antd'
import { useRef } from 'react'
import { exportComponentAsPNG } from 'react-component-export-image'

import { PokemonForm, TeamDisplay, TrainerCard } from '~/components'
import { TCMProvider } from '~/contexts'

const TrainerCardMaker = () => {
    const png = useRef<any>(null)
    return (
        <TCMProvider>
            <Row gutter={16} align="middle" justify="center">
                <Col md={20} xl={14}>
                    <div ref={png}>
                        <TrainerCard />
                    </div>
                    <Button
                        onClick={() =>
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
                        type="ghost"
                    >
                        Get Card
                    </Button>
                </Col>
                <Col md={20} xl={10}>
                    {/* <header>Trainer Card Maker</header> */}
                    <PokemonForm />
                    <TeamDisplay />
                </Col>
            </Row>
        </TCMProvider>
    )
}

export default TrainerCardMaker
