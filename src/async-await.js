// Async Await (ES7), untuk handle promise lebih mudah dan efisien

// Promise
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0){
                return reject('Number cannot be negative')
        }

        resolve(a + b)
        }, 2000);
    })
}

// add(4, 1).then((res) => {
//     console.log("Addition result", res);
    
// }).catch((e) => {
//     console.log(e);
    
// })

// const getData = (arrey) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             var dataX = arrey

//             if(dataX.length === 0){
//                 return reject({
//                     err: "Cannot found data",
//                     data: dataX
//                 })
//             }


//             resolve({
//                 message: "Data has been found",
//                 data: dataX
//             })
//         }, 3000);
//     })
// }

// const arrey = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi']
// const arreyEmpty = []

// getData(arrey).then(res => {
//     console.log(res.data);
// }).catch(e => {
//     console.log(e);
// })


// Async-await
const funB = async () => {
    const sum = await add(4, 5)
    const sum2 = await add(sum, 5)
    const sum3 = await add(sum2, 5)
    return sum3
}

funB().then(res => {
    console.log('result', res);

}).catch(e => {
    console.log(e);

})
