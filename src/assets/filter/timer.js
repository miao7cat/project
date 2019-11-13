export default function Totime(n){
    // 因为转换过来的是字符串，所以要转换
    n=parseInt(n)
    let date = new Date(n)
    console.log(date)
    let year = date.getFullYear()
    console.log(year,'年')
    let month = date.getMonth()+1 >=10 ? date.getMonth()+1 : "0" +( date.getMonth()+1)
    let day = date.getDate() >=10 ? date.getDate() : "0"+ date.getDate()
    let hour = date.getHours()>=10 ? date.getHours() : "0"+ date.getHours()
    let mine = date.getMinutes()>=10 ? date.getMinutes() : "0"+ date.getMinutes()
    let second = date.getSeconds()>=10 ? date.getSeconds() : "0"+ date.getSeconds()
    return `${year}-${month}-${day} :${hour} :${mine} :${second}`
}