const argv = process.argv
const fs = require('fs')
const { get } = require('http')
const axios = require('axios')
// const ajax = require('ajax')

function createFileName(str){
    return str.replace('http://', '').replace('.com', '').replace('https://', '').concat('.txt')
}

// $.ajax({ url: 'your-url', success: function(data) { alert(data); } });

for (let i = 2; i < argv.length; i++){
    try{
        fs.readFile(argv[i], 'utf8', (err, data) => {
            if(err){
                console.log('Unable to read file:', err)
            }
            
            // Individual downloads
            // data.split('\n').forEach(async (line) => {
            //     console.log(line)
            //     await axios.get(line).then((response) => {
            //         try{
            //             fs.writeFile(createFileName(line), response.data, { encoding: 'utf8', flag: 'a'}, err => {
            //                 if(err){
            //                     console.log(`Couldn\'t download ${line}`)
            //                 }
            //                 console.log(`Wrote to ${line}`)
            //             })
            //         } catch(err) {
            //             console.log(err)
            //         }
                       
            //     }).catch(console.log(err))
            // })

            // simultaneous donwload
            const promises = []

            data.split('\n').forEach(async (line) => {
                console.log(line)
                promises.push(axios.get(line))
            })

            Promise.all(promises)
            .then(response => response.forEach((r) => {
                fs.writeFile(createFileName(r), res, { encoding: 'utf8', flag: 'a'}, err => {
                    if(err){
                        console.log(`Couldn\'t download ${line}`)
                    }
                    console.log(`Wrote to ${line}`)
                })    
            }))
        })
    } catch {
        console.log('Unable to read file')
    }
}
