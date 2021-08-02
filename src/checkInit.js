function checkInit(includes, excludes, toCall) {
    return () => {
        const pathname = window.location.pathname;
        if ((includes.includes(pathname) || includes.length === 0 ) && !excludes.includes(pathname) && pathname.length > 0) {
            toCall();
        }
    }
}

export default checkInit;