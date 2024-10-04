const childProcess = require('child_process');
async function pingIp(ip) {
    try {
        const output = await new Promise((resolve, reject) => {
            childProcess.exec(`ping -c 5 ${ip}`, (error, stdout, stderr) => {
              if (error) {
                reject(error);
              } else {
                resolve(stdout.trim());
              }
            });
          });
       
        if (output.toString().includes("bytes from")) {
            console.log(`${ip} está online!`);
            return true
        }
    } catch (error) {
        console.log(`Erro ao executar o comando ping: ${error.message}`);
        return false
    }
}

function pingIpSync(ip) {
  try {
      const output = childProcess.execSync(`ping -c 1 ${ip}`);
       
     
      if (output.toString().includes("bytes from")) {
          console.log(`${ip} está online!`);
          return true
      }
  } catch (error) {
      console.log(`Erro ao executar o comando ping: ${error.message}`);
      return false
  }
}


module.exports = {pingIp, pingIpSync}

