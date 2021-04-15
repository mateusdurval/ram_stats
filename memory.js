const os = require('os')
const osu = require('node-os-utils')
const log = require('./logger')

setInterval(() => {
    const { totalmem, freemem, release } = os
    const { cpu, drive } = osu

    const cpusCount = cpu.count()
    const sysModel = cpu.model()
    const sysPlatform = osu.os.type()
    const sysOp = osu.os.oos()
    const sysArch = osu.os.arch()
    const sysDrive = drive.info()

    const sysRelease = release()
    const total = parseInt(totalmem() / 1024 / 1024) 
    const free = parseInt(freemem() / 1024 / 1024)
    const usage = parseInt(total - free)
    const percents = parseInt((free / total) * 100)

    const stats = {
        total: `${total} MB`,
        usage: `${usage} MB`,
        free: `${free} MB`,
        percents_free: `${percents}%`,
    }

    console.clear()
    console.log('Running...')


    console.table(stats)

    sysOp.then((info) => { console.log('Original Operation System:', info + ', Arch:', sysArch) })
   
    console.log(sysModel, '- CPUS: ' + cpusCount + ', Release:', sysRelease + ', Platform:', `${sysPlatform}`)

    sysDrive.then((sysInfo) => { console.log(
        `Memory RAM: ${total / 1024} GB, Hard Drive Total: ${(sysInfo.totalGb)} GB, Free: ${parseInt(sysInfo.freeGb)} GB,`,
        `Used: ${parseInt(sysInfo.usedPercentage)}%`
    )});

    const date = new Date;
    stats.date = date

    log(`${JSON.stringify(stats)} \n`)
}, 1000)
