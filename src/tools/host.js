let host = window.location.protocol + '//' + window.location.host;
let defaultHost = 'http://task.skyunion.net'

// if (ONEMTHost) {
// 	ONEMTHost = /^http/i.test(ONEMTHost) ? ONEMTHost : 'http://' + ONEMTHost;
// 	defaultHost = ONEMTHost;
// 	host = ONEMTHost
// }

const config = {
    // host: Debug ? defaultHost : host
    host: 'http://task.skyunion.net/'
};

export default config.host;