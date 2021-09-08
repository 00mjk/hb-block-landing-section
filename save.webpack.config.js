module.exports = {
    stats: {
        children: true,
        // show stats for child compilations

        logging: true,
        // show logging in output
        loggingDebug: /webpack/,
        // show debug type logging for some loggers
        loggingTrace: true,
        // show stack traces for warnings and errors in logging output

        warnings: true,
        // show warnings

        errors: true,
        // show errors
        errorDetails: true,
        // show details for errors
        errorStack: true,
        // show internal stack trace for errors
        moduleTrace: true,
        // show module trace for errors
        // (why was causing module referenced)

    }
}