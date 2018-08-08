function task1(fullfill, reject){
    console.log('start task1')
    setTimeout(()=>{
        console.log('finish task1');
        //fullfill('result task')
        reject('Error msg')
    }, 1000)
}

function fullfilled(result){
    console.log('fullfilled : ' + result)
}
function rejected(err){
    console.log('rejected : ' + err)
}

new Promise(task1).then(fullfilled, rejected)