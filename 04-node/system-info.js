import os from "node:os";
import ms from "ms";

console.log('OS type', os.type());
console.log('OS platform', os.platform());
console.log('OS release', os.release());
console.log('OS uptime', ms(os.uptime() * 1000));


console.log('OS load average', os.loadavg());
console.log('OS total memory', os.totalmem());
console.log('OS free memory', os.freemem());
console.log('OS cpus', os.cpus());
console.log('OS hostname', os.hostname());
console.log('OS network interfaces', os.networkInterfaces());
