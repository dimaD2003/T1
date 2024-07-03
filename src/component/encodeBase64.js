const encodeBase64 =(email, code) => {
    const stringToEncode = `${email}:${code}`;
    const map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let binaryString = '';
    for (let i = 0; i < stringToEncode.length; i++) {
        const binaryChar = stringToEncode.charCodeAt(i).toString(2).padStart(8, '0');
        binaryString += binaryChar;
    }
    
    while (binaryString.length % 6 !== 0) {
        binaryString += '0';
    }

    let base64String = '';
    for (let i = 0; i < binaryString.length; i += 6) {
        const sixBitBlock = binaryString.substring(i, i + 6);
        const decimalValue = parseInt(sixBitBlock, 2);
        base64String += map[decimalValue];
    }

    const padding = (3 - (stringToEncode.length % 3)) % 3;
    for (let i = 0; i < padding; i++) {
        base64String += '=';
    }

    return base64String;

};

export default encodeBase64;