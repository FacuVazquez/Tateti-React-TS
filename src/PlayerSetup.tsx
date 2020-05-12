import React from 'react';


export interface IVersus{
    player1:string;
    player2:string;
}

const PlayerSetup:React.FC<any>=(props:{onSubmit:Function})=>{

    const[versus, setNewVersus]= React.useState<IVersus>({
        player1:'',
        player2:''
    });

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>):void =>{       
        setNewVersus({
            player1: event.target.name === "player1"? event.target.value : versus.player1,
            player2: event.target.name === "player2"? event.target.value : versus.player2
        });
    }
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        props.onSubmit(versus);
    }

    return(
        <form className="formSubmit" onSubmit={handleSubmit}>
        <label>
            <h2>Ingrese jugadores:</h2>
            <p>Jugar con 'X':</p>
          <input type="text" name="player1" value={versus.player1} onChange={handleChange} />
            <p>Jugar con 'O':</p>
          <input type="text" name="player2" value={versus.player2} onChange={handleChange} />
        </label>
        <input className="submitBtn" type="submit" value="Submit" />
      </form>
    )
}

export default PlayerSetup;