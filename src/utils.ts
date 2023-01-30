export function stage() {
    if (window.location.hostname.includes('localhost')) {
        return 'development'
    }
    if (window.location.hostname.includes('127.0.0.1')) {
        return 'development'
    }
    if (window.location.hostname.includes('staging')) {
        return 'staging'
    }
    if (window.location.hostname == 'picular.com') {
        return 'production'
    }
}
