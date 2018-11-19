import Cookie from './cookie';
import Host from './host';
import Storage from './storage';


function serialize(obj) {
    var result = [];
    if (obj && typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]') {
        for (var k in obj) {
            result.push(k + '=' + obj[k]);
        }
        return result.join('&');
    }
    return '';
}

function Fetch(obj) {
    return new Promise(function(resolve, reject) {
        var host = obj.host ? obj.host : Host;
        let projectId = Storage.get('key');
        // obj.param.projectId = projectId == null ? '1' : projectId;
        var param = serialize(obj.param);
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Access-Control-Allow-Credentials', true);
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('Access-Control-Allow-Headers', 'Content-Type');

        // fetch(host + obj.url, {
        fetch(obj.url, {
            method: obj.method,
            mode: "no-cors",
            headers: myHeaders,
            body: param
        }).then((response) => {
            console.log(response)
            return response.json();
        }).then((data) => {
            resolve(data);
        })
    })
}


export default Fetch;