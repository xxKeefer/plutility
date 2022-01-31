export const getLocationName = (pathname: string): string => {
    switch (pathname) {
        case '/':
            return 'Pokemon League Utility Tool'
        case '/trainer-card-maker':
            return 'Trainer Card Maker'
        case '/threat-analysis':
            return 'Threat Analysis'
        default:
            return ''
    }
}
