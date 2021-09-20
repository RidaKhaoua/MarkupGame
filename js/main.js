
/* ********************* Events ******************************* */
//Get button start
let userName = "";
document
  .querySelector(".control-buttons span")
  .addEventListener("click", function () {
    let yourName = prompt("Entre your Name");
    //verfication si le name is null or empty
    if (yourName === null || yourName === "") {
      document.querySelector(".name span").textContent = "Unknow";
      userName = "Unknow";
    } else {
      document.querySelector(".name span").textContent = yourName;
       userName = yourName;
    }
      document.querySelector("#music").play()
      countDownTimer(min)
   document.querySelector(".control-buttons").remove() = "none";
  });

  //relod window
  document.querySelector(".restart").addEventListener("click", function (params) {
      window.location.reload()
  })

/* ************************** END Events **************************** */

//Get Main memory game block
let memoryBlock = document.querySelector(".memory-game-blocks");

//Get  ALL children Element inside memory gamme block
let blocks = Array.from(memoryBlock.children);

//Get Leader Boread Element
let leaderBoread = document.querySelector(".leader-content");

//Set Array with numbers
let orderRange = [...Array(blocks.length).keys()];
shufle(orderRange)

//Get tires element
  let triesElement = document.querySelector(".tries span");
//Set duration 
let duarition = 1000;

//Set Timing
let min = 1;

//Counter 
let counter

//Set Point 
let points = 5;

//Set res  
let res = 0



//Add order css property To Game Blocks
blocks.forEach((block,index) => {

    //Add Css Order Property
    block.style.order = orderRange[index];

    //Add click Event 
    block.addEventListener("click", function () {
      
      //Triger The Flip Block Function
      flipBlock(block)

    })
})


/* ******************** Trigger Functions Load with chargment *********************** */

//Get function shufle 
shufle(orderRange)

//Flip Block function 
function flipBlock(selectedBlock) {
   //Add class is-flipped
    selectedBlock.classList.add("is-flipped");
    let allFlipedBlocks = blocks.filter(flipedBlock => flipedBlock.classList.contains("is-flipped"));

    if(allFlipedBlocks.length === 2) {
      //Triger function stopClicking
      stopClicking();

      //Triger function 
      checkMatcheBlocks(allFlipedBlocks[0], allFlipedBlocks[1])
    }
}

/* ****************** END Trigger Functions */

/* ******************************** Functions ******************************* */
//Check Matched Block
function checkMatcheBlocks(firstBlock, secondBlock) {
   if(firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match" );
    document.querySelector("#success").play();
      res +=points;
  } else {
    triesElement.textContent = parseInt(triesElement.textContent) + 1;
    document.querySelector("#fail").play();
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    }, 1000);
  }
}


function stopClicking() {
  ///Add class to memory gamme block
  memoryBlock.classList.add("no-clicking");

  setTimeout(() => {
  memoryBlock.classList.remove("no-clicking");
    
  }, 1000);

}

// Shufle function
function shufle(array) {
  //Seting Vars
    let current = array.length,
        temp,
        random;
    while (current > 0) {
      //Get Random Number
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
    }
}


function countDownTimer(min, sec = 59) {
   counter = setInterval(() => {
    sec--;
    if(sec === 0 && min === 0) {
      memoryBlock.classList.add("no-clicking");
      document.querySelector("#music").pause();
      document.querySelector(".is-finish").classList.add("active")
      score()
    createLeaderBoared(userName, `${document.querySelector(".min").textContent}:${document.querySelector(".sec").textContent}`, res, triesElement.textContent)
      clearInterval(counter);
    } else if(sec === 0) {
      min = min - 1;
      sec = 59;
    } else {
      verifAllHasMatch(counter)
    }
    document.querySelector(".min").textContent = min;
    document.querySelector(".sec").textContent = sec;
  }, 1000);
}

function removeAllchildren(params) {
  document.querySelectorAll(".leader-content .leader-block").forEach(item => item.remove())
}



function score() {
  let time = `${document.querySelector(".min").textContent}:${document.querySelector(".sec").textContent}`;
  StoreInfoGameUser(userName, time, res, triesElement.textContent);
  document.querySelector(".score").textContent = res;
}

function verifAllHasMatch(counter) {
  let fileterBlockHasMatch = blocks.filter(block => block.classList.contains("has-match"));
  if(fileterBlockHasMatch.length === 20) {
    score();
    document.querySelector(".is-finish").classList.add("active")
    document.querySelector("#music").pause()
    createLeaderBoared(userName, `${document.querySelector(".min").textContent}:${document.querySelector(".sec").textContent}`, res, triesElement.textContent)
    clearInterval(counter);
  }
}

function StoreInfoGameUser(name, time, score, tries) {
  window.localStorage.setItem([name, time, score, tries],"user" );
}

// console.log(StoreInfoGameUser("reda","1:08",50, 12))

function createLeaderBoared(name, time, score, tries) {
  // Create Leader Block 
  let leaderBlock = document.createElement("div");

  // Add Class in leaderBlock
  leaderBlock.classList.add("leader-block");

  // Create User Naùe Block
  let userNameBlock = document.createElement("div");

  //Add Class in UserNameBlock
  userNameBlock.classList.add("user-name");

  // Add text in userNameBlock
  userNameBlock.textContent= "UserName:";

  // Create show User Name
  let showUserName = document.createElement("span");

  // Add Class in show User Name
  showUserName.classList.add("user-name");

  //Add text in show User Name
  showUserName.textContent = name;

  //Add span show User Name into user Name Block
  userNameBlock.appendChild(showUserName);
  
  // Create time block
  let timeBlock = document.createElement("div");

  // Add classList time
  timeBlock.classList.add("time");

  //Add text inside timeBlock
  timeBlock.textContent = "Time:"

  // Create Element showTime
  let showTime = document.createElement("span");

  // Add classList time in showTime
  showTime.classList.add("time");

  // Add text value in showTime
  showTime.textContent = time;

  //Add showTime element in timeBlock
  timeBlock.appendChild(showTime);

  // Create Tries 
  let triesBlock = document.createElement("div");

  //Add Class in trieBlock
  triesBlock.classList.add("wrong");

  //Add text in triesBlock
  triesBlock.textContent = "Tries:"



  // Create showTries element 
  let showTries = document.createElement("span");

  //Add class in showTries
  showTries.classList.add("tries");

  // Add text in showTries 
  showTries.textContent = tries;

  triesBlock.appendChild(showTries)

  // Create Score element 
  let scoreBlock = document.createElement("div");

  // Add Class in triesBlock
  scoreBlock.classList.add("score");
  
  //Add text in scoreBlock
  scoreBlock.textContent = "Score"
  // Create showScore 
  let showScore = document.createElement("span");

  // Add class in showScore
  showScore.classList.add("score");

  //Add text in showScore 
  showScore.textContent = score;

  //Add showscore in scoreBlock
  scoreBlock.appendChild(showScore);

  leaderBlock.append(userNameBlock, timeBlock, triesBlock, scoreBlock);
  document.querySelector(".leader-content").appendChild(leaderBlock)
}


function getAllInfoUser(params) {
    for(let item of Object.keys(window.localStorage)) {
      if(item.includes(',')) {
        let items = item.split(",")
        let userName = items[0];
        let time = items[1];
        let tries = items[2];
        let score = items[3];
        createLeaderBoared(userName, time, score, tries);
      }
    }
}
getAllInfoUser()

/* 
   <div class="leader-block">
                <div class="name">UserName: <span class="user-name">reda</span></div>
                <div class="time">Time: <span class="time">1:30</span> </div>
                <div class="tries">Tries: <span class="tries">10</span></div>
                <div class="score">Score: <span class="score">50</span></div>
            </div>
*/

/* **************************END Functions****************************** */ 