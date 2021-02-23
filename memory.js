const os = require('os')
const log  = require('./logger')

setInterval(() => {
    const { totalmem, freemem } = os

    const total = parseInt(totalmem() / 1024 / 1024) 
    const free = parseInt(freemem() / 1024 / 1024)
    const usage = parseInt(total - free)
    const percents = parseInt((free / total) * 100)
    const date = new Date;

    const stats = {
        total: `${total} MB`,
        usage: `${usage} MB`,
        free: `${free} MB`,
        percents: `${percents}%`
    }

    console.clear()
    console.log(`Running...`)
    console.table(stats)
    console.log('Running...')

    stats.date = date

    log(`${JSON.stringify(stats)} \n`)
}, 1000)