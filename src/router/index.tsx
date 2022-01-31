import { Spin } from 'antd'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { MainLayout } from '~/layout'

import { ROUTES } from '../constants'

const HomePage = lazy(() => import('../pages/Home'))
const TrainerCardMaker = lazy(() => import('../pages/TrainerCardMaker'))
const ThreatAnalysis = lazy(() => import('../pages/ThreatAnalysis'))

const Router = () => {
    return (
        <MainLayout>
            <Suspense fallback={<Fallback />}>
                <Routes>
                    <Route path={ROUTES.SLASH} element={<HomePage />} />
                    <Route path={ROUTES.TRAINER_CARD} element={<TrainerCardMaker />} />
                    <Route path={ROUTES.THREAT_ANALYSIS} element={<ThreatAnalysis />} />
                </Routes>
            </Suspense>
        </MainLayout>
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
