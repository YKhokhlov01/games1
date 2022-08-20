
import { Square } from "./Square";

export const Board = (props) => {
  function renderSquare(idx) {
    return (
      <Square value={props.squares[idx]} onClick={() => props.onClick(idx)} />
    );
  }

 
  const butNumber = [[0,1,2],[3,4,5],[6,7,8]];
  const render = butNumber.map((squareRender) => { 
    console.log  (squareRender)   
  
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
