import { Square } from "./Square";
export const Board = ({squares,onClick,activeButton,win}) => {
  
  function renderSquare(idx) {  
   const className = activeButton ===  idx ? 'square active' : 'square';
     
    return (
      <Square idx= {idx} win={win} className={className}  value={squares[idx]} onClick={() => {onClick(idx)}} />
    );
  }

  const butNumber = [[0,1,2],[3,4,5],[6,7,8]];
  const render = butNumber.map((squareRender) => {   
  
    return (      
        <div className="board-row" key={squareRender}>
        {renderSquare(squareRender[0])}
        {renderSquare(squareRender[1])}
        {renderSquare(squareRender[2])}
      </div>    
    );
  });

  return (
    <div>    
      {render}
    </div>
  );
};
