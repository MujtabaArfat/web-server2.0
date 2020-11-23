

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const result = document.querySelector('#message-1');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    console.log(search.value);
    fetch('http://localhost:3001/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        }
        else{
                console.log(data.response);
                result.innerText=data.response;
        }
    })
})

})