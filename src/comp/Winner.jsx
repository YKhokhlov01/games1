export const Winner = ({squares,xIsNext,winner} ) => {
  
    let status;  
    if (!squares.includes(null, 0) && !winner){
      status = "Победила дружба ";
    } else if (winner) {
      status = "Выиграл " + winner;
    } else {
      status = "Следующий ход: " + (xIsNext ? "X" : "O");
    }

    return (       
        <h2>{status}</h2>
    );
  };
  
  