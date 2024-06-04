var board;
var score=0;
var rows=4;
var columns=4;

window.onload = function(){
    setgame();

}

function setgame(){
    board=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];

    // board=[
    //     [2,2,2,2],
    //     [2,2,2,2],
    //     [4,4,8,8],
    //     [4,4,8,8]
    // ];

    for(let r=0;r<rows;r++)
    {
        for(let c=0;c<columns;c++)
        {
            //creates div tag: <div id="r-c"></div>
            let tile=document.createElement("div");
            tile.id = r.toString()+"-"+c.toString();
            let num = board[r][c];
            updatetile(tile,num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
    document.getElementById("new-game").addEventListener("click", newgame);
}

function hasemptytile(){
    for(let r=0;r<rows;r++)
    {
        for(let c=0;c<columns;c++)
        {
            if(board[r][c]==0)
            {
                return true;
            }
        }
    }
    return false;
}

function setTwo(){
    if(!hasemptytile())
    {
        return;
    }

    let found=false;
    while(!found){
        //random r,c
        let r = Math.floor(Math.random()*rows);
        let c = Math.floor(Math.random()*columns);

        if(board[r][c]==0)
        {
            board[r][c]=2;
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText="2";
            tile.classList.add("x2");
            found=true;
        }
    }
}


function updatetile(tile, num)
{
    tile.innerText="";
    tile.classList.value =""; //clear class list
    tile.classList.add("tile");
    if(num>0){
        tile.innerText = num.toString();
        if(num<=4096){
            tile.classList.add("x"+num.toString());
        }
        else{
            tile.classList.add("x8192");
        }
    }
}

function hasValidMoves() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const currentValue = board[r][c];

            // Check adjacent tiles
            if (
                (r > 0 && board[r - 1][c] === currentValue) ||
                (r < rows - 1 && board[r + 1][c] === currentValue) ||
                (c > 0 && board[r][c - 1] === currentValue) ||
                (c < columns - 1 && board[r][c + 1] === currentValue)
            ) {
                return true; // Valid move found
            }
        }
    }
    return false; // No valid moves
}

// Call this function after each move
function checkGameStatus() {
    if (!hasemptytile() && !hasValidMoves()) {
        // Board is full and no valid moves
        const message = "Game lost! No more valid moves. Click OK to reset the game.";
        const resetConfirmed = confirm(message);

        if (resetConfirmed) {
            location.reload();
        }
    }
}

function newgame(){
    location.reload();
}

document.addEventListener("keyup", (e)=>{
    if(e.code=="ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if(e.code=="ArrowRight"){
        slideRight();
        setTwo();
    }
    else if(e.code=="ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code=="ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText=score;

    checkGameStatus();
})

function filterzero(row)
{
    return row.filter(num=> num!=0);
}

function slide(row){
    row=filterzero(row); //get rid of 0s

    //slide
    for(let i=0;i<row.length-1;i++)
    {
        //check every 2
        if(row[i]==row[i+1])
        {
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
        }
    }
    row=filterzero(row);
    //add 0s back
    while(row.length<columns)
    {
        row.push(0);
    }

    return row;
    
}

function slideLeft(){
    for(let r=0;r<rows;r++)
    {
        let row=board[r];
        row=slide(row);
        board[r]=row;

        for(let c=0;c<columns;c++){
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updatetile(tile,num);
        }
    }
}

function slideRight(){
    for(let r=0;r<rows;r++)
    {
        let row=board[r];
        row.reverse();
        row=slide(row);
        row.reverse();
        board[r]=row;

        for(let c=0;c<columns;c++){
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updatetile(tile,num);
        }
    }
}

function slideUp(){
    for(let c=0;c<columns;c++)
    {
        let row=[board[0][c],board[1][c],board[2][c],board[3][c]];
        row=slide(row);
        // board[0][c]=row[0];
        // board[1][c]=row[1];
        // board[2][c]=row[2];
        // board[3][c]=row[3];
        for(let r=0;r<rows;r++){
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updatetile(tile,num);
        }

    }
}

function slideDown(){
    for(let c=0;c<columns;c++)
    {
        let row=[board[0][c],board[1][c],board[2][c],board[3][c]];
        row.reverse();
        row=slide(row);
        row.reverse();
        // board[0][c]=row[0];
        // board[1][c]=row[1];
        // board[2][c]=row[2];
        // board[3][c]=row[3];
        for(let r=0;r<rows;r++){
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updatetile(tile,num);
        }

    }
}