const div = document.getElementById('test')


function getDevices() {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            console.log(devices)
            const codeTag = document.createElement('code')
            codeTag.innerHTML =JSON.stringify(devices)
            div.append(codeTag)
        })
}

getDevices()

// function getConnectedDevices(type, callback) {
//     navigator.mediaDevices.enumerateDevices()
//         .then(devices => {
//             const filtered = devices.filter(device => device.kind === type);
//             callback(filtered);
//         });
// }