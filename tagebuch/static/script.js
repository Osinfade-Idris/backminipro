
import { recentlyadded,register,dailytask } from "./regist.js";
import {users } from "./users.js";
import {RegisteringUser} from "./registerUser.js"

let username = document.getElementById('username');
let btn_login = document.getElementById('btn_login')
let submittedpanel = document.createElement('div')
let addbtn = document.createElement('button')
let dailymi = document.createElement('div');

let password = document.getElementById('password');
let errorlogger = document.getElementById('errorlogger'); 
let errorlogger2 = document.createElement('errorlogger');
let addedlist = document.getElementById('recentlyadded');
let wordoftheday = document.getElementById('wordoftheday')
let wordofthedaymeaning = document.querySelector('#wordmeaning span')              
let panel = document.querySelector('.container');
const actives = document.querySelectorAll('.nav');
let btn_addnew = document.getElementById('addnew');
let taskpanel = document.getElementById('taskpanel');
let container = document.querySelector('.container')
let mytasks = document.createElement('div')
let newtaskpanel = document.createElement('div');
let newuser = document.getElementById('registerlink')
let loginform = document.getElementById('login');

let spinner = document.createElement('div')
spinner.innerHTML = "<div id='fountainG'><div id='fountainG_1' class='fountainG'></div><div id='fountainG_2' class='fountainG'></div><div id='fountainG_3' class='fountainG'></div><div id='fountainG_4' class='fountainG'></div><div id='fountainG_5' class='fountainG'></div><div id='fountainG_6' class='fountainG'></div><div id='fountainG_7' class='fountainG'></div><div id='fountainG_8' class='fountainG'></div></div>"



let templateDashboard = document.getElementById('template-dashboard');


const pageloader = ()=>{
    if(document.body.id === 'loginbody'){
        loginPage();
        console.log('loaded')
    } if (document.body.id === 'dashboardbody'){
        dashboardPage();
    } else{
        console.log('e no load')
        console.log(document.body.id)
    }
}
window.addEventListener('load',pageloader);


function loginPage (){
        btn_login.addEventListener('click', ()=>{
            let accountname = username.value.trim();
            let accountpassword = password.value.trim();

            if(accountname == ''){
                errorlogger.textContent = "*kindly enter your username"
            } else{
                if(accountpassword.trim() === ''){
                    errorlogger.textContent = "*kindly enter your password"
                } else{
                    if(!(accountname in users)){errorlogger.textContent = "Account does not exist"}
                    else{
                        if(accountpassword !== users[accountname].password){
                            errorlogger.textContent = 'Incorrect password'
                        }else{
                            let loadingtime = Math.floor(Math.random()*6000 + 1000)

                            loginform.classList.add('fadeIn');
                            loginform.parentElement.appendChild(spinner);                
                            setTimeout(()=>{
                            location.href = 'dashboard.html'       
                            },loadingtime)
                            console.log(loadingtime);
                        }
                    }
    
                }
            }
        })
        newuser.addEventListener('click', ()=>{
            removeError(errorlogger2);
            let newUserdetails = ['First Name', 'Last Name', 'Email', 'Username', 'Password', 'Confirm Password'];
            let signupform = document.createElement('form')
            let welcomeMessage = document.createElement('div')
            welcomeMessage.innerText= 'Neuen Account Registrieren'
            welcomeMessage.id = 'welcomemessage'
            signupform.appendChild(welcomeMessage);
            signupform.id = 'signupform';
            signupform.method = 'post';
            newUserdetails.forEach((details)=>{
                let detail = document.createElement('input');
                detail.id = details.replace(/ /g, '_').toLowerCase()
                detail.placeholder = details

                if(details.endsWith('e')){
                    detail.type = 'text'
                } else if(details.endsWith('d')){
                    detail.type = 'password'
                } else {detail.type = 'email'} 
                signupform.appendChild(detail);    
            })
            let registerbutton = document.createElement('input');
            registerbutton.type = 'button';
            registerbutton.value = 'Registrieren'
            let signinlink = document.createElement('div');
            signinlink.innerText = 'Sie haben bereits ein Konto? Einloggen';
            signinlink.id = 'signinlink';
            signinlink.addEventListener('click',()=>{
                removeError(errorlogger);
                signupform.classList.add('fadeIn')
                setTimeout(()=>{
                    signupform.replaceWith(loginform);
                },500)
                setTimeout(()=>{
                    signupform.classList.remove('fadeIn')
                },1200)
            });
            signupform.appendChild(registerbutton);
            errorlogger2.id = 'errorlogger'
            signupform.appendChild(errorlogger2);
            signupform.appendChild(signinlink);
            loginform.classList.add('fadeIn');
            
            setTimeout(()=>{
                loginform.replaceWith(signupform);
            },500)
            setTimeout(()=>{
                loginform.classList.remove('fadeIn')
            },1200)

            registerbutton.addEventListener('click',()=>{
                let registeringUser = new RegisteringUser;
                let password, confirmPassword, username;
                newUserdetails.forEach((detail)=>{
                    detail = detail.replace(/ /g, '_').toLowerCase()
                    let val = document.getElementById(detail);
                    val.addEventListener('focus', ()=>{
                        removeError(errorlogger2);
                        let boxes = document.querySelectorAll('#signupform input');
                        boxes.forEach((box)=>{
                            box.style.border = 'none';
                        })
                    })
                    let vals= val.value.trim();
                    if(vals === ''){
                        val.style.border = 'solid red 1px';
                        errorlogger2.textContent = 'Fill in the marked box(es)'
                    } else{
                        if(detail ==='first_name'){registeringUser.firstName = vals}
                        if(detail ==='last_name'){registeringUser.lastName = vals}
                        if(detail ==='email'){registeringUser.email = vals}
                        if(detail ==='username'){ username = vals}
                        if(detail ==='password'){password = vals}
                        if(detail ==='confirm_password'){confirmPassword = vals}
                    }
                })
                       
                if(password!=='' && confirmPassword !== ' ' && password !== confirmPassword){
                    errorlogger2.textContent = 'Please enter matching password'
                } else{
                    registeringUser.password = password;
                    console.log( {[username]: registeringUser})
                    users[username] = registeringUser;
                }
                
                
            })


        }) 
        function removeError(err){
            err.textContent = '';
        }
        
        username.addEventListener('focus',()=>{
            removeError(errorlogger);
        });
        password.addEventListener('focus',()=>{
            removeError(errorlogger);
        });
}

function dashboardPage(){
    mytasks.id = 'mytasks';
    submittedpanel.id = 'submittedtasks';
    mytasks.appendChild(submittedpanel);
    dailymi.id = 'dailytask';
    addbtn.id = 'addnew';
    addbtn.textContent = 'Neue Aufgabe';
    dailymi.innerHTML = '';
    dailymi.appendChild(addbtn);
    mytasks.appendChild(dailymi);

   if(actives[0].className === 'nav active'){
  //  if(container.firstChild.id !== 'home'){
        container.innerHTML = '';
        container.appendChild(taskpanel);
  //  }

    test();
   }
   if(actives[1].className === 'nav active'){    
    container.firstElementChild.replaceWith(mytasks); 
    taskdash();
   }
   if(actives[2].className === 'nav active'){
    
    let reward = document.createElement('div');
    reward.className = 'reward';
    reward.innerText = 'working on the page';
    container.firstElementChild.replaceWith(reward);

   }

}
//dashboardPage();
//navselector
actives.forEach((active) => {
    active.addEventListener('click', () => {
        removeActiveClasses();
        active.classList.add('active');
        dashboardPage();
    });
});
function removeActiveClasses() {
    actives.forEach((active) => {
        active.classList.remove('active');
    });
}
Object.entries(recentlyadded).forEach((entry) =>{
   const [wrd,meaning] = entry; 
   register.push({[wrd] : meaning});
   })
function dayword (){
    const choice = register[Math.floor(Math.random() * register.length)];
    for(const[word,meaning] of Object.entries(choice)){
        wordoftheday.textContent = word;
        wordofthedaymeaning.textContent = meaning;
    }
}
function taskdash (){
    function alltasks(){
        submittedpanel.innerHTML = '';

        let taskwrapper = document.createElement('div');
        if(dailytask.length>0){
            let counter = 1;
            dailytask.forEach((task)=>{
                taskwrapper.className = 'taskwrapper'
                let daywrapper = document.createElement('div')
              /*  daywrapper.addEventListener('click', ()=>{
                    all = document.querySelectorAll
                    console.log('clicked');
                }) */
                daywrapper.id = 'daywrapper';
                let challengeday = document.createElement('div');
                challengeday.id = 'day';
                challengeday.textContent = 'Day ' + counter +':';
                let daycard = document.createElement('div');

                daycard.className = 'daycard';
                Object.entries(task).forEach((entry)=>{
                   const [word,meaning] = entry;
                   const filteredword = word.replace(/_/g, ' ');
                    let daysumbitted = document.createElement('div');
                    daysumbitted.id = 'submitted';
                    let newsubmissionword = document.createElement('div');
                    newsubmissionword.id = 'submissionword';
                    let newsubmissionmeaning = document.createElement('div');
                    newsubmissionmeaning.id = 'submissionmeaning';
                    newsubmissionmeaning.textContent = meaning;
                    newsubmissionword.textContent = filteredword;
                    daysumbitted.appendChild(newsubmissionword)
                    daysumbitted.appendChild(newsubmissionmeaning);
                    daycard.appendChild(daysumbitted); 
                })
                daywrapper.appendChild(challengeday)
                daywrapper.appendChild(daycard);

                taskwrapper.appendChild(daywrapper);
        
                submittedpanel.appendChild(taskwrapper)
                counter++;

            })
        }
    
    }

    
    
    //new daily task
    
    addbtn.addEventListener('click', funnewtask);
    
    
    function funnewtask (e){
        e.preventDefault;
        newtaskpanel.innerHTML = '';
        newtaskpanel.className = 'newtaskpanel';
        
        container.appendChild(newtaskpanel);
        const vocabcount = 10;
        let counter = 0;
        let taskclose = document.createElement('div')
        taskclose.id = 'closetask';
        taskclose.textContent = 'close (x)';
        newtaskpanel.appendChild(taskclose);
        let taskheading = document.createElement('div');
        taskheading.id = 'taskheading';
        taskheading.textContent = 'Geben Sie Ihre täglichen zehn Vokabeln ein'
        newtaskpanel.appendChild(taskheading);
        while (counter<vocabcount){
            let newinputwrapper = document.createElement('div');
            newinputwrapper.className = 'newinputwrapper';
            let wordinput = document.createElement('input');
            wordinput.type = 'text';
            wordinput.id = 'newword'
            wordinput.placeholder = 'neue wort';
            wordinput.setAttribute('required', '')
    
            let meaninginput = document.createElement('input');
            meaninginput.type = 'text';
            meaninginput.id = 'newmeaning'
            meaninginput.placeholder = 'Bedeutung'
            meaninginput.setAttribute('required', '')
    
    
            newinputwrapper.appendChild(wordinput);
            newinputwrapper.appendChild(meaninginput);
    
            newtaskpanel.appendChild(newinputwrapper);
    
            counter++;
    
        }

    
        let buttoninput = document.createElement('input');
        buttoninput.type = 'button';
        buttoninput.id = 'newbutton'
        buttoninput.value = 'Einreichen'
    
        newtaskpanel.appendChild(buttoninput);
    
        taskclose.addEventListener('click', (e)=>{
            
            newtaskpanel.remove();
            container.appendChild(mytasks);
   
        })

        mytasks.replaceWith(newtaskpanel);
    
        buttoninput.addEventListener('click',submittednewwords);

        let newwords = document.querySelectorAll('#newword');
        let newmeanings = document.querySelectorAll('#newmeaning');
        //set back all border to none on focus

        function setborder (){
            newwords.forEach((word)=>{
                word.addEventListener('focus', ()=>{
                    newwords.forEach((word)=>{
                        word.style.border = 'none';
                    })
                    newmeanings.forEach((meaning)=>{
                        meaning.style.border = 'none';
                    })
                })
    
            })
            newmeanings.forEach((word)=>{
                word.addEventListener('focus', ()=>{
                    newwords.forEach((word)=>{
                        word.style.border = 'none';
                    })
                    newmeanings.forEach((meaning)=>{
                        meaning.style.border = 'none';
                    })
                })
    
            })
           
        }

        setborder();
        

        function submittednewwords(){
           
    
            let objsub = new Object();
    
            let count = 0;
    
            while(count< 10){
                let un_key = newwords[count].value.trim().toLowerCase();
                let filmeaning = newmeanings[count].value.trim().toLowerCase();
                //if word has space, replace it with underscore in object key
                let key = un_key.replace(/ /g,'_');

                //check if all input box are filled
                if(key.length<= 1 || filmeaning.length <= 1 || un_key === null ){
                    newwords[count].style.border = 'solid 1px red'
                    newmeanings[count].style.border = 'solid 1px red'
                }else{                    
                    //if same word with different meanings is inserted in same day
                    //the word just get replaced in the object
                    //also check if they dont have same value
                    while(Object.hasOwn(objsub, [key]) && objsub[key] !== filmeaning){
                        key = key.padEnd(key.length +1, '_')
                    }
                    
                    objsub[key] = filmeaning;
                }
                count++;      
            }

            //check if all the entries in our new object is up to ten
            //if it is, push object to our daily task array
            console.log(Object.keys(objsub));
            if(Object.keys(objsub).length === 10){
                
                dailytask.push(objsub);
                newtaskpanel.replaceWith(mytasks);

                taskAndCard()
                .then(showFullCard)
          }
   
        }
    
    
    }
    const taskAndCard = ()=>{
        return new Promise((resolve,reject)=>{
            alltasks();
            const error = false;

            if(!error){
                resolve();
            } else{
                reject ('error in the event thing')
            }
        })

    }
    taskAndCard()
    .then(showFullCard)
    .catch((err)=>(console.log(err)))

    function showFullCard (){
        let daycard = document.querySelectorAll('#daywrapper')
        daycard.forEach((card)=>{
            card.addEventListener('click', ()=>{
                daycard.forEach((cards)=>{
                    cards.classList.add('hidecard')
                })
                card.classList.remove('hidecard')
                card.classList.add('fullcard')
                let backbutton = document.createElement('button')
                backbutton.innerText = '<- geh zuruck'
                backbutton.style.color = 'black'
                backbutton.style.backgroundColor = 'white'
                backbutton.style.width = '90%'
                backbutton.style.border = 'solid 0.5px black'
                addbtn.replaceWith(backbutton);
                backbutton.addEventListener('click',()=>{
                    taskAndCard()
                    .then(showFullCard)
                    .then(()=>{
                        backbutton.replaceWith(addbtn);
                    })
                })
                
            })
        })
    }

}


function recentwords(){
    if(Object.keys(recentlyadded).length < 1){
        addedlist.textContent = 'Keine kürzlich hinzugefügte Wörter'
     } else{
        
        if(Object.keys(recentlyadded).length > 5){
            addedlist.innerHTML = "";
            let counter = 0
            for(const[word,meaning] of Object.entries(recentlyadded)){
                if(counter == 5){
                    return;
                }
                const wordwrapper = document.createElement('div');
                wordwrapper.className = 'wordwrapper';
                let wording = document.createElement('div');
                wording.className = 'word';
                let meanings = document.createElement('div');
                meanings.className = 'meaning';

                //replace _ in words with space, if it exists
                const filteredword = word.replace(/_/g, ' ');
                wording.textContent = filteredword + ':';
                meanings.textContent = meaning;
                wordwrapper.appendChild(wording);
                wordwrapper.appendChild(meanings);
                addedlist.appendChild(wordwrapper);
                counter++;
            }                
            
        } else{
             Object.entries(recentlyadded).forEach((entry) =>{
             let wording = document.createElement('li');
             const [word,meaning] = entry;
             wording.textContent = word + ' : ' + meaning;
             addedlist.appendChild(wording); 

            })
        }

         

         }
     }
function test(){
   recentwords();
    dayword();
}
