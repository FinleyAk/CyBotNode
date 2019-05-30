module.exports = {
    levels: {
        TRACE: {
            value: 5001,
            colour: 'grey'
        },
        DEBUG: {
            value: 10001,
            colour: 'blue'
        },
        INFO: {
            value: 20001,
            colour: 'cyan'
        },
        WARN: {
            value: 30001,
            colour: 'green'
        },
        ERROR: {
            value: 40001,
            colour: 'yellow'
        },
        FATAL: {
            value: 50001,
            colour: 'red'
        }
    },
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '%[[%d{hh:mm:ss}][%-5p] [%-32.32c]%] %m',
            }
        },
        outFilter: {
            type: 'logLevelFilter',
            appender: 'out',
            level: process.argv[2] || 'info'
        },
        debugLog: {
            type: 'dateFile',
            filename: './logs/debug/',
            pattern: 'dd-MM-yyyy.log',
            alwaysIncludePattern: true,
            keepFileExt: true,
            layout: {
                type: 'pattern',
                pattern: '[%d{hh:mm:ss}][%-5p] [%-32.32c] %m'
            }
        },
        errorLog: {
            type: 'dateFile',
            filename: './logs/error/',
            pattern: 'dd-MM-yyyy.log',
            alwaysIncludePattern: true,
            keepFileExt: true,
            layout: {
                type: 'pattern',
                pattern: '[%d{hh:mm:ss}][%-5p] [%-32.32c] %m'
            }
        },
        errorFilter: {
            type: 'logLevelFilter',
            appender: 'errorLog',
            level: 'warn'
        }
    },
    categories: {
        default: {
            appenders: ['outFilter', 'debugLog', 'errorFilter'],
            level: 'all'
        }
    }
};
