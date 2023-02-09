function manageLoginRequest(request, response) {
    var data = '';
    request.on('data', function (chunk) {
        data += chunk;
    });
    request.on('end', function () {
        console.log("Je suis en train de gerer le login: ", JSON.parse(data));
    });

    console.log("response2: ", response);
}

exports.manageLogin = manageLoginRequest;