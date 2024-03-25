import db from './firebase.mjs';
import { ref,onValue, set, get, push } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js'
const contactName=document.querySelector('#contactName')
const contactEmail=document.querySelector('#contactEmail')
const contactAddres=document.querySelector('#contactAddress')
const contactPhone=document.querySelector('#contactPhone')
const textareaContact=document.querySelector('.textareaContact')
document.querySelector('#contactBtn').addEventListener('click',async function(e){
    e.preventDefault()
    if(contactName.value.trim()==''){
        alert('enter name')
        return
    }else if(contactEmail.value.trim()==''){
        alert('enter email')
        return
    }else if(!contactEmail.value.includes('@')){
        alert('write the email correctly')
    }else if(contactAddres.value.trim()==''){
        alert('enter address')
    }else if(contactPhone.value.trim()==''){
        alert('enter phone')
    }
    const snapshot=push(ref(db,'JoinUs'))
    await get(ref(db,'contact')).then(e=>{
        const a=e.val()
        console.log(JSON.stringify(a))
        let arr=JSON.stringify(a).split(',"-')
        let count=arr.length
        if(arr[0]==='null'){
            console.log(count)
            count--
        }
        const contact={
            fullname:contactName.value,
            email:contactEmail.value,
            id:count+1,
            adress:contactAddres.value,
            phone:contactPhone.value,
            textareaContact:textareaContact.value
        }
        set(ref(db,`contact/${snapshot.key}`),contact)
    })
    contactName.value=''
    contactAddres.value=''
    contactPhone.value=''
    contactEmail.value=''
    textareaContact.value=''
})