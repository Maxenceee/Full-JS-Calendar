/**!

#### usage ####

var filesUpdater = require('/filesUpdater');

const item = {
    dayid: "dayid",
    start: "start",
    end: "end",
    txt: "txt",
    level: "level",
    age: "age"
}

const fu = filesUpdater.getfilesUpdaterInstance();

const result = fu.addItem(item);

result
    .then(data => consol.log({isError: !data.stat, result: data.content}))
    .catch(err => console.log(err));

*/


var fs = require('fs');
require('dotenv').config();

let instance = null;

let path = "./data/planning_data.json"

getMax = (arr, prop) => {
    var max;
    if (arr.length == 0) return 0
    for (var i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max.id+1;
}
class FilesUpdater {
    static getfilesUpdaterInstance() {
        return instance ? instance : new FilesUpdater();
    }

    async addItem(item) {
        var content;
        try {
            let response = await new Promise((resolve, reject) => {
                fs.stat(path, (error, stats) => {
                    if (error) {
                        reject(new Error(error.message));
                    } else {
                        fs.readFile(path, (err, data) => {
                            var json = JSON.parse(data);
                            console.log(getMax(json[item.dayid].dayc, "id"));
                            json[item.dayid].dayc.push({id: getMax(json[item.dayid].dayc, "id"), start: item.start, end: item.end, txt: item.txt, isAvailable: 1, level: item.level, age: item.age})
                            content = json
                            fs.writeFile(path, JSON.stringify(json), "utf8", (err) => {
                                if (err) reject(new Error(err.message));
                                resolve(1);
                            });
                        });
                    }
                });
            });
            let stat = response === 1 ? true : false
            return {stat, content}
        } catch (err) {
            console.log(err);
        }
    }
    
    async removeItem(item) {
        var content;
        try {
            // ID = parseInt(ID, 10);
            let response = await new Promise((resolve, reject) => {
                fs.stat(path, (error, stats) => {
                    if (error) {
                        console.log('cant find file');
                        resolve(0);
                    }
                    fs.readFile(path, "utf8", (err, data) => {
                        if (err) reject(new Error(err.message));
                        var json = JSON.parse(data);
                        var foundId = json[item.dayid].dayc.findIndex(function (obj) {
                            return obj.id == item.rm;
                        });
                        console.log(foundId);
                        if (foundId >= 0) {
                            json[item.dayid].dayc.splice(foundId, 1);
                        } else {
                            resolve(0);
                        }
                        content = json
                        var newItem = JSON.stringify(json);
                        fs.writeFile(path, '', "utf8", (err) => {
                            if(!err){
                                fs.writeFile(path, newItem, "utf8", (err) => {
                                    if (err) reject(new Error(err.message));
                                    resolve(1);
                                });
                            } else {
                                reject(new Error(err.message));
                            }
                        });
                    });
                });
            });
            let stat = response === 1 ? true : false
            return {stat, content}
        } catch (err) {
            console.log(err)
        }
    }

    async updateItem(item) {
        var content;
        try {
            // ID = parseInt(ID, 10);
            let response = await new Promise((resolve, reject) => {
                fs.stat(path, (error, stats) => {
                    if (error) {
                        console.log('cant find file');
                        resolve(0);
                    }
                    fs.readFile(path, "utf8", (err, data) => {
                        if (err) reject(new Error(err.message));
                        var json = JSON.parse(data);
                        var foundId = json[item.dayid].dayc.findIndex(function (obj) {
                            return obj.id == item.rm;
                        });
                        console.log(foundId);
                        if (foundId >= 0) {
                            json[item.dayid].dayc[foundId].start = item.start;
                            json[item.dayid].dayc[foundId].end = item.end;
                            json[item.dayid].dayc[foundId].txt = item.txt;
                            json[item.dayid].dayc[foundId].isAvailable = item.isAvailable;
                            json[item.dayid].dayc[foundId].level = item.level;
                            json[item.dayid].dayc[foundId].age = item.age;
                        } else {
                            resolve(0);
                        }
                        content = json
                        var newItem = JSON.stringify(json);
                        fs.writeFile(path, '', "utf8", (err) => {
                            if(!err){
                                fs.writeFile(path, newItem, "utf8", (err) => {
                                    if (err) reject(new Error(err.message));
                                    resolve(1);
                                });
                            } else {
                                reject(new Error(err.message));
                            }
                        });
                    });
                });
            });
            let stat = response === 1 ? true : false
            return {stat, content}
        } catch (err) {
            console.log(err)
        }
    }
    
    async resetData() {
        var j = []
        for (var i=0; i<7; i++) {
            j.push({dayid: i, dayc: []})
        }
        let json = JSON.stringify(j)
        let content = j;
        try {
            let response = await new Promise((resolve, reject) => {
                 fs.stat(path, (error, stats) => {
                    if (!error) {
                        fs.unlink(path, err => {
                            if (err) reject(new Error(err.message));
                        });
                    }
                    fs.appendFile(path, json, 'utf8', (err) => {
                        if (err) reject(new Error(err.message));
                        console.log('created');
                        resolve(1);
                    });
                });
            });
            let stat = response === 1 ? true : false
            return {stat, content}
        } catch (err) {
            console.log(err)
        }
    }

    async getFileContent() {
        var content;
        try {
            let response = await new Promise((resolve, reject) => {
                fs.stat(path, (error, stats) => {
                    if (error) {
                        resolve(0);
                    } else {
                        fs.readFile(path, "utf8", (err, data) => {
                            if (err) reject(new Error(err.message));
                            content = JSON.parse(data);
                            resolve(1)
                        });
                    }
                });
            });
            let stat = response === 1 ? true : false
            return {stat, content}
        } catch (err) {
            console.log(err);
        }
    }
}    

module.exports = FilesUpdater;