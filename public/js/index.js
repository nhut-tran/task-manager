   
    
document.querySelector('form').addEventListener('submit', (e)=> {
    e.preventDefault()
    

    // const request = new XMLHttpRequest();
    // request.open('POST', '/n', true)
    // request.setRequestHeader('Content-Type', 'application/json')
    // request.onreadystatechange = (e) => {
    //     if(e.target.readyState ===4 && e.target.status === 200) {
    //         console.log(JSON.parse(e.target.responseText))
    //     }else {
    //         console.log('ee')
    //     }
        
    // } 
    // const data = JSON.stringify({"name": `${e.target.elements.name.value}`,
    //                             "age": `${e.target.elements.age.value}`,
    //                             "email": `${e.target.elements.email.value}`,
    //                             "password": `${e.target.elements.password.value}`
    //                             })
    // request.send(data)
})
const request = new XMLHttpRequest();
const header = new Headers()
header.append
    request.open('GET', '/user/me/avatar/send', true)
    request.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRkYTA3Yzc3OWE3NzIzZGM2ZTE0OWIiLCJpYXQiOjE1NjUzNjg0NDR9.AKJKzItT0f4RvJwi-pAuFhssqGIttfi4_WnMaaMY7Fc', )
    request.onreadystatechange = (e) => {
        if(e.target.readyState ===4 && e.target.status === 200) {
            console.log(e.target.response)
        }else {
            console.log('ee')
        }
        
    } 

    request.send()