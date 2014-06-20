//Working

var WHITE_KING = 6;
var WHITE_QUEEN = 5;
var WHITE_ROOK = 4;
var WHITE_BISHOP = 3;
var WHITE_KNIGHT = 2;
var WHITE_PAWN = 1;
 
var BLACK_KING = -WHITE_KING;
var BLACK_QUEEN = -WHITE_QUEEN;
var BLACK_ROOK = -WHITE_ROOK;
var BLACK_BISHOP = -WHITE_BISHOP;
var BLACK_KNIGHT = -WHITE_KNIGHT;
var BLACK_PAWN = -WHITE_PAWN;
var board = [[BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_QUEEN, BLACK_KING, BLACK_BISHOP, BLACK_KNIGHT, BLACK_ROOK],
             [BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN],
             [WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_QUEEN, WHITE_KING, WHITE_BISHOP, WHITE_KNIGHT, WHITE_ROOK]];
/*
var board = [[0,0,0,0,BLACK_KING,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,WHITE_KING,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0]];
*/
var click_count=0,move_count=0;
var from=[],to=[];
var oldtarget,newtarget;
var killstr=' ';
var white_king_coor=[];
var black_king_coor=[];
white_king_coor[0]=7;
white_king_coor[1]=4;
black_king_coor[0]=0;
black_king_coor[1]=4;
var tempkingcoor=[];
function drawBoard(board){ //to draw the board
    var str = '';
    for( var i = 0 ; i < 8 ; i++ ){
        str += '<div class="row">';
        for( var j = 0 ; j < 8 ; j++ ){
            str += '<div class="column ' +
            ( (i + j) % 2 === 0 ? 'light': 'dark') + '">' +
            '<div class="' + getPieceName(board[i][j]) +'" data-piece="' + getPieceName(board[i][j]) +
            '" data-row="' + i + '" data-column="'+j+'"></div>' + //properties of the div
            '</div>';
        }
        str += '</div>';
    }
    $('#board').append(str);
}

function getPieceName(pieceValue){
    switch (pieceValue) {
        case WHITE_KING:
            return 'WHITE_KING';
            break;
        case WHITE_QUEEN:
            return 'WHITE_QUEEN';
            break;
        case WHITE_ROOK:
            return 'WHITE_ROOK';
            break;
        case WHITE_BISHOP:
            return 'WHITE_BISHOP';
            break;
        case WHITE_KNIGHT:
            return 'WHITE_KNIGHT';
            break;
        case WHITE_PAWN:
            return 'WHITE_PAWN';
            break;
        
        case BLACK_KING:
            return 'BLACK_KING';
            break;
        case BLACK_QUEEN:
            return 'BLACK_QUEEN';
            break;
        case BLACK_ROOK:
            return 'BLACK_ROOK';
            break;
        case BLACK_BISHOP:
            return 'BLACK_BISHOP';
            break;
        case BLACK_KNIGHT:
            return 'BLACK_KNIGHT';
            break;
        case BLACK_PAWN:
            return 'BLACK_PAWN';
            break;
        
        default:
            return 'EMPTY';
            break;
    }
}


$(document).ready(function()
{
drawBoard(board);
$('#board').click(function(event)
    {
        move_init(board,event);
    });
});

function move_init(board,event) //to move the corresponding clicked pieces
{
          var target,row_index,column_index,piece;
          target = $(event.target);
          target.addClass("divborder");
          row_index=target.data("row");
          column_index=target.data("column");
          
          if(click_count===0)
          {
            piece=target.data("piece");
            var str1='row = '+row_index+' column= '+ column_index + " piece = " + piece;
            var str2=target.attr('class');
            $("#details").html(str1);
            $('#boarddetails').append(str2);
            from[0]=row_index;
            from[1]=column_index;
            if((board[row_index][column_index]>0 && move_count%2===0) || (board[row_index][column_index]<0 && move_count%2===1))
            { //only if piece is clicked, do this (from position)
              click_count=1;
              oldtarget=target;
           //   newtarget.removeClass("divborder");
            }
          }
          else if(click_count===1) //second click,i.e, to position
          {
            to[0]=row_index;
            to[1]=column_index;
            //$('#turn').html("to[0]="+to[0]+"to[1]"+to[1]);
            if(board[from[0]][from[1]]*board[to[0]][to[1]] > 0)
            {
              from[0]=row_index;
              from[1]=column_index;
              click_count=1;
              oldtarget=target;
             // newtarget.removeClass("divborder");
              return;
            }
            click_count=0;
            validate_move(from,to,oldtarget.data("piece")); //to validate move. oldtarget's piece cuz new target will be empty space
            
            newtarget=target;
            oldtarget.removeClass("divborder");
            $("#board").html(" ");
            $("#turn").html(move_count%2);
            drawBoard(board);
        }
}
function possible_move(from,to,piece) //To adhere to the movements of the pieces according to the chess rules
{
  $("#boarddetails").append(" ");
  var row_diff,column_diff;
  row_diff=Math.abs(to[0]-from[0]);
  column_diff=Math.abs(to[1]-from[1]);
  switch (piece)
  {
        case 'WHITE_KING':
        case 'BLACK_KING':
            if((row_diff===0 || row_diff===1) && (column_diff===0 || column_diff===1))
            {
                if(board[to[0]][to[1]]!=0)
                {
                    killstr+='<div class="'+getPieceName(board[to[0]][to[1]])+'"></div>';
                    $('#kill').html(killstr);
                }
                if(move_count%2==0)
                {
                    white_king_coor[0]=to[0];
                    white_king_coor[1]=to[1];
                }
                else
                {
                    black_king_coor[0]=to[0];
                    black_king_coor[1]=to[1];
                }
                return 1;
            }
            else
              return 0;
            break;
        case 'WHITE_QUEEN':
        case 'BLACK_QUEEN':
           if((row_diff===column_diff || to[0]===from[0] || to[1]===from[1]) && isPathValid(from,to,piece))
            {

                if(board[to[0]][to[1]]!=0)
                {
                    //$('#boarddetails').append('\n\nWait.board[to[0][to[1]]='+board[to[0]][to[1]]);
                    killstr+='<div class="'+getPieceName(board[to[0]][to[1]])+'"></div>';
                    $('#kill').html(killstr);
                }

                return 1;
            }
            else
              return 0;
            break;
        case 'WHITE_ROOK':
        case 'BLACK_ROOK':
            if((to[0]===from[0] || to[1]===from[1]) && isPathValid(from,to,piece)) //only horizontal/vertical movement
            {
                if(board[to[0]][to[1]]!=0)
                {
                    killstr+='<div class="'+getPieceName(board[to[0]][to[1]])+'"></div>';
                    $('#kill').html(killstr);
                }
                return 1;
            }
            else
              return 0;
            break;
        case 'WHITE_BISHOP':
        case 'BLACK_BISHOP':
            if((row_diff===column_diff) && isPathValid(from,to,piece)) //only diagonal movement
            {
                if(board[to[0]][to[1]]!=0)
                {
                    killstr+='<div class="'+getPieceName(board[to[0]][to[1]])+'"></div>';
                    $('#kill').html(killstr);
                }
                return 1;
            }
            else
                return 0;
            break;
        case 'WHITE_KNIGHT':
        case 'BLACK_KNIGHT':
            if((row_diff===2 && column_diff===1) || (row_diff===1 && column_diff===2))
            {
                if(board[to[0]][to[1]]!=0)
                {
                    killstr+='<div class="'+getPieceName(board[to[0]][to[1]])+'"></div>';
                    $('#kill').html(killstr);
                }
                return 1;
            }
            else
                return 0;
            break;
        case 'WHITE_PAWN':
            if(to[0]-from[0]<0) //Pawn moves forward
            {
                if(from[0]===6 && from[0]-to[0]<=2) //First move of a pawn
                {
                    if(to[1]===from[1] && board[to[0]][to[1]]===0)
                    {
                        if(board[to[0]][to[1]]!=0)
                        {
                            killstr+='<div class="'+getPieceName(board[to[0]][to[1]])+'"></div>';
                            $('#kill').html(killstr);
                        }
                        return 1;
                    }
                    else if((column_diff===1) && board[to[0]][to[1]]!=0) //Diagonal kill, !=0 cuz >0 condn already checked in validate_move
                    {
                        if(board[to[0]][to[1]]!=0)
                        {
                            killstr+='<div class="'+getPieceName(board[to[0]][to[1]])+'"></div>';
                            $('#kill').html(killstr);
                        }
                        return 1;
                    } //there's a black piece present
                    else
                        return 0;
                }
                else if(to[0]-from[0]===-1) //Anything but the first move
                {
                    if(to[1]===from[1] && board[to[0]][to[1]]===0) //if same column and empty space,move
                    {
                        if(board[to[0]][to[1]]!=0)
                        {
                            killstr+='<div class="'+getPieceName(board[to[0]][to[1]])+'"></div>';
                            $('#kill').html(killstr);
                        }
                        return 1;
                        }
                    else if((column_diff===1) && board[to[0]][to[1]]!=0) //Kill
                    {
                        if(board[to[0]][to[1]]!=0)
                        {
                            killstr+='<div class="'+getPieceName(board[to[0]][to[1]])+'"></div>';
                            $('#kill').html(killstr);
                        }
                        return 1;
                    }
                    else
                        return 0;
                }
                else //any other condn => false
                    return 0;
            }
            else //if pawn to move backwards => false
                return 0;
            
            break;

        case 'BLACK_PAWN':
            //have to change it back to white pawn later cuz in multiplayer view, even 2nd player will have his black pieces at the bottom in the beginning
            if(to[0]-from[0]>0) //Black Pawn moves forward
            {
                if(from[0]===1 && to[0]-from[0]<=2) //First move of a pawn
                {
                    if(to[1]===from[1] && board[to[0]][to[1]]===0)
                    {
                        if(board[to[0]][to[1]]!=0)
                        {
                            killstr+='<div class="'+getPieceName(board[to[0]][to[1]])+'"></div>';
                            $('#kill').html(killstr);
                        }
                        return 1;
                    }
                    else if((column_diff===1) && board[to[0]][to[1]]!=0) //Diagonal if
                    {
                        if(board[to[0]][to[1]]!=0)
                        {
                            killstr+='<div class="'+getPieceName(board[to[0]][to[1]])+'"></div>';
                            $('#kill').html(killstr);
                        }
                        return 1;
                    } //there's a white piece present
                    else
                        return 0;
                }
                else if(to[0]-from[0]===1) //Anything but the first move
                {
                    if(to[1]===from[1] && board[to[0]][to[1]]===0) //if same column and empty space,move
                    {
                        if(board[to[0]][to[1]]!=0)
                        {
                            killstr+='<div class="'+getPieceName(board[to[0]][to[1]])+'"></div>';
                            $('#kill').html(killstr);
                        }
                        return 1;
                    }
                    else if((column_diff===1) && board[to[0]][to[1]]!=0) //Kill
                    {
                        if(board[to[0]][to[1]]!=0)
                        {
                            killstr+='<div class="'+getPieceName(board[to[0]][to[1]])+'"></div>';
                            $('#kill').html(killstr);
                        }
                        return 1;
                    }
                    else
                        return 0;
                }
                else //any other condn => false
                    return 0;
            }
            else //if pawn to move backwards => false
                return 0;
            break;
        
        default: $("#boarddetails").append("Dafuq");

            return 0;
            break;
    }
}

function validate_move(from,to,piece) //Check whether the to[] coordinates are empty and if the piece can be moved to the given to[] coordinate
{
  var str="from=" + from[0] +" "+from[1]+" to="+to[0]+" "+to[1];
  $("#details").html(str);
  if((board[to[0]][to[1]]*board[from[0]][from[1]])>0)                                   //Return 0 if same color piece is present in to[]
    return 0;

  if((move_count%2==1 && move_leads_to_check(from,to,black_king_coor)===1) || (move_count%2==0 && move_leads_to_check(from,to,white_king_coor)===1))
  {
//    $("#boarddetails").html("Check if this move is made");
    return ;
  }
  //$("#boarddetails").append("Changing the coor");
//$("#boarddetails").html("Value of blackkingcoor is: "+black_king_coor[0]+' and '+black_king_coor[1]);

  if(possible_move(from,to,piece) === 1)
  {
    change(from,to,piece);
  }
// else
// $("#details").html("Problem");
}

function change(from,to,piece)
{
    $("#boarddetails").append("Entered change function\n");
    
    board[to[0]][to[1]]=board[from[0]][from[1]];
    board[from[0]][from[1]]=0;
    $("#boarddetails").append("board[to[0][to[1]="+board[to[0]][to[1]]+"\n to[0]="+to[0]+"to[1]="+to[1]);
    if(move_count%2===0)
        tempkingcoor=black_king_coor;
    else
        tempkingcoor=white_king_coor;
    $("#boarddetails").append("checking for the check for the other color\n");
    if(isCheck(tempkingcoor,0)===1)                           //is there a check for the other colour?  
    {   
       // var tuple=[];
       // tuple=tempkingcoor;
        $("#boarddetails").html(move_count%2==0?'Check for black':'Check for white');
            if(isCheckMate(tempkingcoor))
                $("#boarddetails").append("Checkmate!");
            else
                $("#boarddetails").append("Not checkmate");
        //target.removeClass("divborder");
    }
    move_count++;
    var str="board="+board[to[0]][to[1]];
    $("#details").html(str);
}

function isPathValid(from,to,piece)
{
    $("#boarddetails").append("Entered isPathValid\n");
    var row_diff,column_diff;
    var direction;
    var i=-1,j=-1,incr_j,incr_i;
    row_diff=to[0]-from[0];
    column_diff=to[1]-from[1];
    if(row_diff<0) //positive direction, i.e, upwards
    {
        i=from[0]-1;
        if(column_diff===0) //vertical upwards
        {
            j=from[1]; //board[i][j]
            incr_j=0;
        }
        else if(column_diff>0) //right diagonal upwards
        {
            j=from[1] + 1;
            incr_j=1;
        }
        else //left diagonal upwards
        {
            j=from[1] - 1; //j is for column
            incr_j=-1;
        }
    }
    else if(row_diff>0) //negative direction
    {
        i=from[0]+1;
        if(column_diff===0) //vertical downwards
        {
            j=from[1];
            incr_j=0;
        }
        else if(column_diff>0) //left diagonal downwards
        {
            j=from[1]+1;
            incr_j=1;
        }
        else //right diagonal downwards
        {
            j=from[1]-1;
            incr_j=-1;
        }
    }
   else //row_diff=0 => horizontal movement
    {
        i=from[0];
        if(column_diff>0) //horizontal right
        {
            j=from[1]+1;
            incr_j=1;
        }
        else //horizontal left
        {
            j=from[1]-1;
            incr_j=-1;
        }

    }


    if(row_diff<0)
    {
        while(i>to[0])
        {
            if(checkforboundary(i,j))
                if(board[i][j])
                {
                    $("#boarddetails").append("Invalid move. i= "+i+" j= "+ j);
                    return false;
                }
            i--;
            j+=incr_j;
        }
    }
    else if(row_diff>0)
    {
        while(i<to[0])
        {
            if(checkforboundary(i,j))
                if(board[i][j])
                {
                    $("#boarddetails").append("Invalid move. i= "+i+" j= "+ j);
                    return false;
                }
            i++;
            j+=incr_j;
        }
    }
    else //horizontal
    {
        if(column_diff>0)
            while(j<to[1])
            {
                if(checkforboundary(i,j))
                {   if(board[i][j])
                    {
                        $("#boarddetails").append("Invalid move. i= "+i+" j= "+ j);
                        return false;
                    }
                    j+=incr_j;
                }
            }
        else
            while(j>to[1])
            {
                if(checkforboundary(i,j))
                {   
                    if(board[i][j])
                    {
                        $("#boarddetails").append("Invalid move. i= "+i+" j= "+ j);
                        return false;
                    }
                j+=incr_j;
                }
            }
    }
    
    return true;
}

function move_leads_to_check(from,to,kingcoor)                          //Checks if the move leads to check for the same color
{
    var temp = board[from[0]][from[1]];
    var tempto = board[to[0]][to[1]];
    board[to[0]][to[1]]=board[from[0]][from[1]];
    board[from[0]][from[1]]=0;
    var tempkingcoor=[];
    if(from[0]==kingcoor[0] && from[1]==kingcoor[1])                        //If the king is moved
    {
        tempkingcoor[0]=to[0];
        tempkingcoor[1]=to[1];  
        $("#boarddetails").append("Entered move_leads_to_check");
        if(isCheck(tempkingcoor,0)===1)
        {
            $("#boarddetails").append("  Check on the king");
            //kingcoor[0]=tempkingcoor[0];                            //was from[0], which is wrong since kingcoor should be changed back only if from and kingcoor were same(first if condition) 
            //kingcoor[1]=tempkingcoor[1];                               //was from[1], which is wrong. if it was from kingcoor would change everytime there's a check
            board[from[0]][from[1]]=temp;
            board[to[0]][to[1]]=tempto;
            $("#boarddetails").append("Leaving move_leads_to_check");
            return 1;                                                   //Returns 1 if it leads to a check
        }
        else
        {
            $("#boarddetails").append(" No Check on the king");
            // kingcoor[0]=tempkingcoor[0];
            // kingcoor[1]=tempkingcoor[1];
            board[from[0]][from[1]]=temp;
            board[to[0]][to[1]]=tempto;
            $("#boarddetails").append("Leaving move_leads_to_check");
            return 0;
        }
    }
    if(isCheck(kingcoor,0)===1)
        {
            $("#boarddetails").append("  Check on the king");
            //kingcoor[0]=tempkingcoor[0];                            //was from[0], which is wrong since kingcoor should be changed back only if from and kingcoor were same(first if condition) 
            //kingcoor[1]=tempkingcoor[1];                               //was from[1], which is wrong. if it was from kingcoor would change everytime there's a check
            board[from[0]][from[1]]=temp;
            board[to[0]][to[1]]=tempto;
            $("#boarddetails").append("Leaving move_leads_to_check");
            return 1;                                                   //Returns 1 if it leads to a check
        }
        else
        {
            $("#boarddetails").append(" No Check on the king");
            // kingcoor[0]=tempkingcoor[0];
            // kingcoor[1]=tempkingcoor[1];
            board[from[0]][from[1]]=temp;
            board[to[0]][to[1]]=tempto;
            $("#boarddetails").append("Leaving move_leads_to_check");
            return 0;
        }

}


function isCheck(kingcoor,flag)                                              //knight and pawn pending
{
    var i,j,tuple=[];
//    $('#boarddetails').html("entered with "+kingcoor[0]+" and "+kingcoor[1]);
    //i_incr=1,j_incr=0
    $("#boarddetails").append("Entered isCheck\n");
    $("#boarddetails").append("kingcoor[0]="+kingcoor[0]+"kingcoor[1]="+kingcoor[1]);
    for(i=kingcoor[0]+1,j=kingcoor[1];i<8&&board[i][j]==0;i++); //Down -- i stops at the first piece it sees (either white or black)

    if(i<8 && board[i][j]*board[kingcoor[0]][kingcoor[1]]<0 && (board[i][j]==5 || board[i][j]==-5 || board[i][j]==4 || board[i][j]==-4))
    {
        if(flag===1)
        {
            tuple[0]=i;
            tuple[1]=j;
            if(isCheck(tuple,0)===0)
                return 1;
            else
                return 0;
        }
        else
            return 1;
    }

    for(i=kingcoor[0]-1,j=kingcoor[1];i>=0&&board[i][j]==0;i--); //Up -- i stops at the first piece it sees (either white or black)

    if(i>=0 && board[i][j]*board[kingcoor[0]][kingcoor[1]]<0 && (board[i][j]==5 || board[i][j]==-5 || board[i][j]==4 || board[i][j]==-4))
    {
        if(flag===1)
        {
            tuple[0]=i;
            tuple[1]=j;
            if(isCheck(tuple,0)===0)
                return 1;
            else
                return 0;
        }
        else
            return 1;
    }

    for(i=kingcoor[0],j=kingcoor[1]+1;j<8&&board[i][j]==0;j++); //Horizontal Right -- j stops at the first piece it sees (either white or black)
            //$("#boarddetails").append('\ni='+i+' and j='+j+'board of ij is '+board[i][j]+'\n');

    if(j<8 && board[i][j]*board[kingcoor[0]][kingcoor[1]]<0 && (board[i][j]==5 || board[i][j]==-5 || board[i][j]==4 || board[i][j]==-4))
    {
        if(flag===1)
        {
            tuple[0]=i;
            tuple[1]=j;
            if(isCheck(tuple,0)===0)
                return 1;
            else
                return 0;
        }
        else
            return 1;
    }
    /*else
    {
        $("#boarddetails").append("NO check at right. i="+i+"j="+j);
    }*/


    for(i=kingcoor[0],j=kingcoor[1]-1;j>=0&&board[i][j]==0;j--); //Horizontal left -- j stops at the first piece it sees (either white or black)

    if(j>=0 && board[i][j]*board[kingcoor[0]][kingcoor[1]]<0  && (board[i][j]==5 || board[i][j]==-5 || board[i][j]==4 || board[i][j]==-4))
    {
        if(flag===1)
        {
            tuple[0]=i;
            tuple[1]=j;
            if(isCheck(tuple,0)===0)
                return 1;
            else
            {
                $("#boarddetails").append("it is under attack");
                return 0;
            }
        }
        else
        { 
            $("#boarddetails").append("some text");
            return 1;
        }
    }

   /* else
    {
        $("#boarddetails").append("NO check at left. i="+i+"j="+j);
    }*/

    for(i=kingcoor[0]+1,j=kingcoor[1]+1;j<8&&i<8&&board[i][j]==0;i++,j++); //Diagonal right down -- (i,j) stops at the first piece it sees (either white or black)

    if(j<8 && i<8 && board[i][j]*board[kingcoor[0]][kingcoor[1]]<0 && (board[i][j]==5 || board[i][j]==-5 || board[i][j]==3 || board[i][j]==-3))
    {
        if(flag===1)
        {
            tuple[0]=i;
            tuple[1]=j;
            if(isCheck(tuple,0)===0)
                return 1;
            else
                return 0;
        }
        else
            return 1;
    }

    for(i=kingcoor[0]+1,j=kingcoor[1]-1;i<8&&j>=0&&board[i][j]==0;i++,j--); //Diagonal left down-- (i,j) stops at the first piece it sees (either white or black)

    if(i<8 && j>=0 && board[i][j]*board[kingcoor[0]][kingcoor[1]]<0  && (board[i][j]==5 || board[i][j]==-5 || board[i][j]==3 || board[i][j]==-3))
    {
        if(flag===1)
        {
            tuple[0]=i;
            tuple[1]=j;
            if(isCheck(tuple,0)===0)
                return 1;
            else
                return 0;
        }
        else
            return 1;
    }
    for(i=kingcoor[0]-1,j=kingcoor[1]-1;i>=0&&j>=0&&board[i][j]==0;i--,j--); //Diagonal left up -- (i,j) stops at the first piece it sees (either white or black)

    if(i>=0 && j>=0 && board[i][j]*board[kingcoor[0]][kingcoor[1]]<0 && (board[i][j]==5 || board[i][j]==-5 || board[i][j]==3 || board[i][j]==-3))
    {
        if(flag===1)
        {
            tuple[0]=i;
            tuple[1]=j;
            if(isCheck(tuple,0)===0)
                return 1;
            else
                return 0;
        }
        else
            return 1;
    }

    for(i=kingcoor[0]-1,j=kingcoor[1]+1;j<8&&i>=0&&board[i][j]==0;i--,j++); //Diagonal right up -- (i,j) stops at the first piece it sees (either white or black)

    if(j<8 && i>=0 && board[i][j]*board[kingcoor[0]][kingcoor[1]]<0 && (board[i][j]==5 || board[i][j]==-5 || board[i][j]==3 || board[i][j]==-3))
    {
        if(flag===1)
        {
            tuple[0]=i;
            tuple[1]=j;
            if(isCheck(tuple,0)===0)
                return 1;
            else
                return 0;
        }
        else
            return 1;
    }

    //Check for Knight
    var knx,kny;
    knx=kingcoor[0]+1;
    kny=kingcoor[1]+2;
    if(checkforboundary(knx,kny) && Math.abs(board[knx][kny])==2 && board[knx][kny]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    knx=kingcoor[0]+2;
    kny=kingcoor[1]+1;
    if(checkforboundary(knx,kny) && Math.abs(board[knx][kny])==2&& board[knx][kny]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    knx=kingcoor[0]-1;
    kny=kingcoor[1]-2;
    if(checkforboundary(knx,kny) && Math.abs(board[knx][kny])==2&& board[knx][kny]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    knx=kingcoor[0]-2;
    kny=kingcoor[1]-1;
    if(checkforboundary(knx,kny) && Math.abs(board[knx][kny])==2&& board[knx][kny]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    knx=kingcoor[0]+1;
    kny=kingcoor[1]-2;
    if(checkforboundary(knx,kny) && Math.abs(board[knx][kny])==2&& board[knx][kny]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    knx=kingcoor[0]+2;
    kny=kingcoor[1]-1;
    if(checkforboundary(knx,kny) && Math.abs(board[knx][kny])==2&& board[knx][kny]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    knx=kingcoor[0]-1;
    kny=kingcoor[1]+2;
    if(checkforboundary(knx,kny) && Math.abs(board[knx][kny])==2&& board[knx][kny]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    knx=kingcoor[0]-2;
    kny=kingcoor[1]+1;
    if(checkforboundary(knx,kny) && Math.abs(board[knx][kny])==2&& board[knx][kny]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    //Pawn
    //Add boundary conditions for the pawn.. Both x and y coordinates
    if((checkforboundary(kingcoor[0]+1,kingcoor[1]+1) && board[kingcoor[0]+1][kingcoor[1]+1]*board[kingcoor[0]][kingcoor[1]]<0 && board[kingcoor[0]+1][kingcoor[1]+1]==1) || (checkforboundary(kingcoor[0]+1,kingcoor[1]-1) && board[kingcoor[0]+1][kingcoor[1]-1]*board[kingcoor[0]][kingcoor[1]]<0 && board[kingcoor[0]+1][kingcoor[1]-1]==1 ))
        return 1;
    if((checkforboundary(kingcoor[0]-1,kingcoor[1]-1) && board[kingcoor[0]-1][kingcoor[1]-1]*board[kingcoor[0]][kingcoor[1]]<0 && board[kingcoor[0]-1][kingcoor[1]-1]==-1) || (checkforboundary(kingcoor[0]-1,kingcoor[1]+1) && board[kingcoor[0]-1][kingcoor[1]+1]*board[kingcoor[0]][kingcoor[1]]<0) && board[kingcoor[0]-1][kingcoor[1]+1]==-1)          //Check for white king by a black pawn
        return 1;

    //for the king, by the king, to the king :D

    var q=kingcoor[0]-1;
    for(;q<=kingcoor[0]+1;q++)
    {
        if(checkforboundary(q,3)==0)
            continue;
        for(var w=kingcoor[1]-1;w<=kingcoor[1]+1;w++)
        {
            if(checkforboundary(w,3)==0)
                continue;
            if(Math.abs(board[q][w])==6 && board[q][w]*board[kingcoor[0]][kingcoor[1]]<0)
                return 1;
            $('#boarddetails').append("No check for king at "+q+w+' .............................');
        }
    }

    return 0;                           //no check
}

function checkforboundary(a,b)
{
    if(a<8 && a>=0 && b<8 && b>=0)
        return 1;
    else
        return 0;
}

function isCheckMate(kingcoor)
{

    $("#boarddetails").append("\nEntering isCheckMate with " + kingcoor[0] + ' and '+kingcoor[1]+'.\n');
    var i=[],temp=0;
    i[0]=kingcoor[0]-1;
    var temporary=0,oldpiece;
    temporary=kingcoor[1]-1;
    i[1]=kingcoor[1]-1;
    temp=board[kingcoor[0]][kingcoor[1]];
    board[kingcoor[0]][kingcoor[1]]=0;
    for(;i[0]<=kingcoor[0]+1;i[0]+=1)
    {
        $("#boarddetails").append("for loop with i[0]="+i[0]+"i[1]="+i[1]+"\n");
        if(i[0]>=8 || i[0]<0)
        {
            $('#boarddetails').append('Exceed bounds i[0]='+i[0]+"\n");
            continue;
        }
        for(i[1]=temporary;i[1]<=kingcoor[1]+1;i[1]+=1)
        {
            if(i[1]>=8 || i[1]<0)
            {
                $('#boarddetails').append('Exceed bounds i[1]='+i[1]+"\n");
                continue;
            }
            oldpiece=board[i[0]][i[1]];
            board[i[0]][i[1]]=temp;
            if(isCheck(i,0)===0)
            {
                $('#boarddetails').append('Exitting coz no check at '+i[0]+' and '+i[1]+' and board[actual kingcoor] is '+board[kingcoor[0]][kingcoor[1]]+'\n');
                board[kingcoor[0]][kingcoor[1]]=temp;
                board[i[0]][i[1]]=oldpiece;
                return 0;  
            }
            board[i[0]][i[1]]=oldpiece;

        }  

    }

    board[kingcoor[0]][kingcoor[1]]=temp;
    $('#boarddetails').append("sdf;fjsfddfds\n");
    if(isCheck(kingcoor,1)===0)
    {
        $('#boarddetails').append("not checkmate");
        return 0;
    }
    else
        return 1;                                           //it is a checkmate
}