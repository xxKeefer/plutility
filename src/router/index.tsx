import { Spin } from 'antd'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ROUTES } from '../constants'

const TrainerCardMaker = lazy(() => import('../pages/TrainerCardMaker'))

const Router = () => {
    return (
        <Suspense fallback={<Fallback />}>
            <Routes>
                <Route path={ROUTES.SLASH} element={<TrainerCardMaker />} />
                <Route path={ROUTES.TRAINER_CARD} element={<TrainerCardMaker />} />
            </Routes>
        </Suspense>
    )
}

export default Router

const Fallback = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: 'calc(100vh - 80px)',
            }}
        >
            <Spin size="large" />
        </div>
    )
}
