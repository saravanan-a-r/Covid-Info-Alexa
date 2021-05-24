const https = require('https');

class CovidAPI {
    
    constructor() {
        
        this.regionals = undefined;
        
        this.regionalStatsAPI = `https://api.rootnet.in/covid19-in/stats/latest`;
    }
    
    getAllStateStats() {
    
        return new Promise((resolve, reject) => {

            try {
                
                if(this.regionals && this.regionals.length) {
                    resolve(this.regionals);
                    return;
                }
                
                https.get(this.regionalStatsAPI, (resp) => {
                    
                    let data = '';
    
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });
    
                    resp.on('end', () => {
    
                        let dataJSON = JSON.parse(data);
    
                        if(dataJSON && dataJSON.success) {
                            this.regionals = dataJSON.data.regional || [];
                            resolve(this.regionals);
                            return;
                        }
    
                        reject();
                    });
    
                }).on("error", (err) => {
                    reject(new Error("No data available"));
                });
            }
            catch(e) {
                reject(e);
            }
        });
    }

    getStateStats(indianState) {
    
        return new Promise(async (resolve, reject) => {
           
           try {
               let allStateStats = await this.getAllStateStats();
               
               if(allStateStats && allStateStats.length) {
                   
                    for(let i = 0; i<allStateStats.length; i++) {
                        
                        if(isStateEqual(allStateStats[i].loc, indianState)) {
                            
                            resolve(allStateStats[i]);
                            return;
                        }
                    }
                    
                    reject();
               }
            }
            catch(e) {
                reject(e);
            }
        });
    }
    
}


function isStateEqual(state1, state2) {
    state1 = state1.toLowerCase();
    state2 = state2.toLowerCase();
    
    state1 = state1.split(" ").join("");
    state2 = state2.split(" ").join("");
    
    return(state1 === state2);
}

module.exports = new CovidAPI();