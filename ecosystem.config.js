module.exports = {
    apps: [
        {
            name: 'practicum',
            port: '3003',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}