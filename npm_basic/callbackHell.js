function task1(callback){
    console.log('start task1')
    setTimeout(()=>{
        console.log('finish task1');
        callback();
    }, 1000)
}

function task2(callback){
    console.log('start task2')
    setTimeout(()=>{
        console.log('finish task2');
        callback();
    }, 1000)
}

//task1();
//task2();

task1(() => {
    task2(() =>{

    });
});