export function stage() {
    if (!window.location.hostname.includes('picular.com')) {
        return 'development'
    }
    if (window.location.hostname.includes('staging')) {
        return 'staging'
    }
    if (window.location.hostname == 'picular.com') {
        return 'production'
    }
}
