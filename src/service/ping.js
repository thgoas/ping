const childProcess = require('child_process');
function pingIp(ip) {
    try {
        const output = childProcess.execSync(`ping -c 3 ${ip}`);
        if (output.toString().includes("bytes from")) {
            console.log(`${ip} está online!`);
            return true
        }
    } catch (error) {
        console.log(`Erro ao executar o comando ping: ${error.message}`);
        return false
    }
}

module.exports = pingIp