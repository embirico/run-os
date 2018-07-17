/**
 * Exports main function: runOS.
 */

const { spawn } = require('cross-spawn')

const ALL_PLATFORMS = 'dw'

const USAGE = 'Usage: `run-os -<platforms: {\'d\'|\'w\'}> <your command>`.\n'
    + 'E.g.: `run-os -dw echo \'Hello world\'`'

const getPlatformOption = () => {
    switch (process.platform) {
        case 'darwin':
            return 'd'
        case 'win32':
            return 'w'
        default:
            console.warn('Unrecognized platform: ', process.platform)
            return '!'
    }
}

const parseArgs = args => {
    try {
        const platformMatch = args[0].match(/^-((d|w)+)$/)
        if (platformMatch) {
            args.shift()
        }
        const platforms = platformMatch !== null ? platformMatch[1] : ALL_PLATFORMS

        const command = args[0]

        const commandArgs = args.slice(1)

        return [command, commandArgs, platforms]

    } catch (error) {
        console.error(USAGE)
        throw error
    }
}

const runOS = args => {

    const [command, commandArgs, platforms] = parseArgs(args)

    if (platforms.includes(getPlatformOption())) {

        console.log(`$$ ${command} ${commandArgs}`)
        const proc = spawn(command, commandArgs, {
            stdio: 'inherit',
        })

        process.on('SIGTERM', () => proc.kill('SIGTERM'))
        process.on('SIGINT', () => proc.kill('SIGINT'))
        process.on('SIGBREAK', () => proc.kill('SIGBREAK'))
        process.on('SIGHUP', () => proc.kill('SIGHUP'))
        proc.on('exit', (code, signal) => {
            let crossEnvExitCode = code
            // exit code could be null when OS kills the process(out of memory, etc) or due to node handling it
            // but if the signal is SIGINT the user exited the process so we want exit code 0
            if (crossEnvExitCode === null) {
                crossEnvExitCode = signal === 'SIGINT' ? 0 : 1
            }
            process.exit(crossEnvExitCode) //eslint-disable-line no-process-exit
        })

        return proc

    } else {

        console.log(`Skipping \`${command} ${commandArgs}\` on ${process.platform}.`)
        return null

    }

}

module.exports = runOS
