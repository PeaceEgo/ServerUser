// // const eventEmitter = require('events');

const { readFile, createReadStream } = require("fs");

// // const emitter = new eventEmitter();

// // emitter.on('hello', ()=>{
// //    console.log('hello we are learning emitting') 
// // });

// // emitter.emit('hello')

// // emitter.listeners('hello')


// // writeFileSync('./file1.txt', 'hello')

// const {
//     readFileSync,
//     createReadStream,
//     createWriteStream,
//     writeFileSync} = require('fs');

// const streamFile = createWriteStream('./file.txt')

//     for ( let i = 0 ; i < 10000; i++){
//        streamFile.write(`hello world ${i} \n`) 
//     };

// streamFile.write('we are still writing');


//     streamFile.on('close', ()=>{
//         console.log('streaming is closed')
//     });

// const fileRead = createReadStream('file.txt');
// fileRead.on('open', ()=>{
//     console.log('now reading file')
// });

const readFile = createReadStream('./file.txt')
const server = http.createServer((req, res)=>{
res.end(readFile)
});
server.listen(3000,()=>{
    console.log('server is running at port 3000 ...')
})