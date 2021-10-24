//factory function to make buttons

const makeTag = (type,  text, attrclass) => {
    const el = document.createElement(type);
    document.body.append(el);
    el.innerText = text;
    el.classList.add(attrclass);

    
    return{
        el,
        text, 
        attrclass,
        
    }
}

//factory function to remove element
const removeTag = (...args) => {
    
    for(let i = 0; i < args.length; i++){
         
            document.querySelector(args[i]).remove();
    }
}

//make the click process
const theClick = (option, options, comOption) =>{
    const div = document.querySelectorAll('div[data-location]');
    div.forEach(dBlock => {
        dBlock.addEventListener('clickplay', dBlock.onclick = () =>{
            if(dBlock.innerText != ''){
                return;
            }
            dBlock.style.backgroundColor = 'rgb(89 8 120 / 26%)';
            dBlock.innerText = option;
            if(options[0] == 'com'){
                vsCom(comOption, option);
            }else{
                return;
            }
        
        });
    });
};

//Choose the playing option model  
const playingOptionModel = (function(){
    //this variables store the chossen options
    const options = {};

    //the plaing button to start the chossing option process  
    const playButton = document.querySelector('#game-option .play');
        playButton.addEventListener('playBtn', playButton.onclick = () => {
            removeTag('.play');
            const newBody = makeTag('div', '', 'new-element');
            const h1Text = makeTag('h1', 'Choose Playing Type:', 'h1-new');
            const comBtn = makeTag('button', 'VS COM', 'com-btn');
            const friendBtn = makeTag('button', 'VS FRIEND', 'friend-btn'); 
            const btn = document.querySelectorAll('button');
            
            //append new button
            document.querySelector('.new-element').prepend(document.querySelector('.h1-new'));
            document.querySelector('.new-element').append(document.querySelector('.com-btn'));
            document.querySelector('.new-element').append(document.querySelector('.friend-btn'));

            return buttonsChooseVs(btn);
            
        });

    //define the oppenent buttons
    const buttonsChooseVs = (btn) => {
        btn.forEach(btn => {
                
                btn.addEventListener('oppenent', btn.onclick = () => {
                    switch(btn.classList.value) {
                        case 'com-btn':
                            options[0] = 'com';
                            gameOptions(options);
                            break;
                        case 'friend-btn':
                            options[0] = 'friend';
                            gameOptions(options);
                            break;
                        default :
                            break;
                        } 
                    });
                })
            };

    //take the oppenant value and define the next step 
    const gameOptions = (options) =>{
        const oppenent = options[0];  
        removeTag('.friend-btn', '.com-btn'); 
        document.querySelector('.h1-new').innerText = 'choose X or O:';
        
        //make the new buttons
        const x = makeTag('button', 'X', 'x');
        const y = makeTag('button', 'O', 'o');
        //append the element
        document.querySelector('.new-element').append(document.querySelector('.x'));
        document.querySelector('.new-element').append(document.querySelector('.o'));

        //module funk to define option 2
        const xOry =  (function() {
            document.querySelectorAll('button').forEach(btn => btn.onclick = () => {
                switch(btn.innerText){
                    case 'X':
                        options[1] = 'x';
                        break;
                    case 'O':
                        options[1] = 'o';
                        break;
                    default:
                        break;
                }
                
                //strart the game with the defined options 
                startGame(options);
            })
        })();
    };
})();


// start plaing funcion
const startGame = function (options) {
    let option, comOption;
    //if player choose to play aganist computer
    if (options[0] == 'com') {
        switch (options[1]) {
            case 'x':
                option = 'X'
                comOption = 'O';              
                break;
            case 'o':
                option = 'O'
                comOption = 'X'
                break;
            default:
                return;
        }
        theClick(option, options, comOption);
    //if player choose to play aganist friend
    }else {
        switch (options[1]) {
            case 'x':
                theClick();
                vsFriend('X', 'O');
                break;
            case 'o':
                theClick();
                vsFriend('O', 'X')
                break;
            default:
                return;
        }

    };

    //remve the element we don't need
    removeTag('.new-element');

    //add reset button and append it to game options
    makeTag('button', 'RESET', 'play');
    const btnAppend = document.querySelector('#game-option');
    const resetBtn = document.querySelector('.play');
    
     btnAppend.prepend(resetBtn);
    resetBtn.style.color = 'red';
    resetEvent();
}

const divlocation = {}
const vsCom = (comOption, option) => {
    let i = 0;
    
    let comPlay =  () => {
               const randomNum = Math.floor(Math.random() * 9);
               d = document.querySelector(`div[data-location="${randomNum}"]`);
               
               
                return check(d);
            };
    
    const check = (d) =>{
    //recursive function to check if the position is taken
    if(d.innerText != '' && i < 81 ){
        i++;
        comPlay();
    }else{
        d.innerText = comOption;   
    }
    
};
comPlay();
wining(option, comOption);

}


const vsFriend = (optionOne, optionTwo) => {
    let changeTrigger = false;
    const dvblocks = document.querySelectorAll('div[data-location]');
    dvblocks.forEach(blocks  => {
        blocks.addEventListener('clickOne', blocks.onclick =(e) => {
            if(e.target.innerText == ''){
                if(changeTrigger == false){
                e.target.innerText = optionOne;
                changeTrigger = true;
                }else{
                    e.target.innerText = optionTwo;
                    changeTrigger = false;
                };
            }
            wining(optionOne, optionTwo);
        });
    }); 


}

const wining = (optionOne, optionTwo) =>{
    const positions = [];
    const block = document.querySelectorAll(`div[data-location]`);
    block.forEach(b => {
      positions[b.dataset.location] = b.innerText;
      return positions;
    });
    const winingCondition = (positions) =>{
        //X axis
        let axisXUp = positions.slice(0, 3);
        let axisXMiddle = positions.slice(3, 6);
        let axisXDown = positions.slice(6);

        //Y axix
        let axisYleft = [positions[0], positions[3], positions[6]];
        let axisYMiddle = [positions[1], positions[4], positions[7]];
        let axisYRight = [positions[2], positions[5], positions[8]];

        //cross axis 
        let axisCrossUp = [positions[0], positions[4], positions[8]];
        let axisCrossDown = [positions[2], positions[4], positions[6]];

        //check if win by axix X 
        conditionAxisSame(axisXUp, optionOne, optionTwo);
        conditionAxisSame(axisXMiddle, optionOne, optionTwo);
        conditionAxisSame(axisXDown, optionOne, optionTwo);
        
        //check if win by axis Y
        conditionAxisSame(axisYleft, optionOne, optionTwo);
        conditionAxisSame(axisYMiddle, optionOne, optionTwo);
        conditionAxisSame(axisYRight, optionOne, optionTwo);
        //check if win by cross axis
        conditionAxisSame(axisCrossUp, optionOne, optionTwo)
        conditionAxisSame(axisCrossDown, optionOne, optionTwo)
    };
    const conditionAxisSame =  (axis, optionOne, optionTwo) => {
        //style of div after win or lose
        const st = () => {
            let newEl = document.querySelector('.new-element');
            let h1El = document.querySelector('.h1-new');
            let btEl = document.querySelector('.play');
            newEl.append(h1El);
            newEl.append(btEl);
            newEl.style.display = 'flex';
            newEl.style.flexDirection = 'column-reverse';
            newEl.style.justifyContent = 'space-arownd';
            newEl.style.alignItems = 'center';
            h1El.style.wordSpacing = '25px';
            
            (function handleChange(e){
                if(window.innerWidth <= 640){
                    console.log('yes');
                    newEl.style.flexDirection = 'column';
                    h1El.style.width = 'unset';
                    h1El.style.margin = 'o';

                }
            })();
            resetEvent();
            return{
                newEl, h1El, btEl
            }
        }
        //in com one is player
        if(axis.every(x => x == optionOne)) {
            makeTag('div', '', 'new-element');
            makeTag('h1', 'YOU WIN', 'h1-new');                       

            //chane h1 color
            document.querySelector('.h1-new').style.color = 'yellow';
            st();
            

        }else if(axis.every(x => x == optionTwo)) {
            makeTag('div', '', 'new-element');
            makeTag('div', 'YOU LOSE', 'h1-new');

            document.querySelector('.h1-new').style.color = 'red';
            st();
        }else if(positions.every(x => x != '') && axis.every(x => x != optionOne) && axis.every(x => x != optionTwo)){
            makeTag('div', '', 'new-element');
            makeTag('h1', 'DRAW', 'h1-new');

            document.querySelector('.h1-new').style.color = 'orange';
            st();
        };
        
    };

    winingCondition(positions);   
}

function resetEvent () {
    const btn = document.querySelector('.play');
    if(btn.innerText == 'RESET'){
        btn.addEventListener('reset', btn.onclick = () => {
        document.location.reload();
    });
    }
};