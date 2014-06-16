function isCheck(kingcoor[])
{
    var i,j,i_incr,j_incr;
    //i_incr=1,j_incr=0
    for(i=kingcoor[0]+1,j=kingcoor[1];board[i][j]!=0;i++);                                   //Horizontal right -- i stops at the first piece it sees (either white or black)

    if(board[i][j]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    for(i=kingcoor[0]-1,j=kingcoor[1];board[i][j]!=0;i--);                                   //Horizontal left -- i stops at the first piece it sees (either white or black)

    if(board[i][j]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    for(i=kingcoor[0],j=kingcoor[1]+1;board[i][j]!=0;j++);                                   //Up -- j stops at the first piece it sees (either white or black)

    if(board[i][j]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    for(i=kingcoor[0],j=kingcoor[1]-1;board[i][j]!=0;j--);                                   //down -- j stops at the first piece it sees (either white or black)

    if(board[i][j]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    for(i=kingcoor[0]+1,j=kingcoor[1]+1;board[i][j]!=0;i++,j++);                              //Diagonal right down -- (i,j) stops at the first piece it sees (either white or black)

    if(board[i][j]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    for(i=kingcoor[0]+1,j=kingcoor[1]-1;board[i][j]!=0;i++,j--);                              //Diagonal right up-- (i,j) stops at the first piece it sees (either white or black)

    if(board[i][j]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    for(i=kingcoor[0]-1,j=kingcoor[1]-1;board[i][j]!=0;i--,j--);                              //Diagonal left up -- (i,j) stops at the first piece it sees (either white or black)

    if(board[i][j]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;

    for(i=kingcoor[0]-1,j=kingcoor[1]+1;board[i][j]!=0;i--,j++);                              //Diagonal left down -- (i,j) stops at the first piece it sees (either white or black)

    if(board[i][j]*board[kingcoor[0]][kingcoor[1]]<0)
        return 1;
}




if((move_count%2==0 && isCheck(white_king_coor)==1) || (move_count%2==1 && isCheck(black_king_coor)==1))
                $("#boarddetails").html("Check, mate");