import { useState } from 'react';
import '../Styles/Begin.css'
import { useEffect } from 'react';
import Game from './Game';

const defaultValues = {
    points: 1.0,
    level: 0,
    play: false,
    class: 'L',
};

const Begin = () => {


    const [data, setData] = useState(defaultValues);

    const choiseLevel = (level, play) => {
        
        setData((previousData) => {
            return { ...previousData, level: level, play: play, class: 'L'+level}
        });
    }
    
    return (
        <div className="false">
            {!data.play &&
            <div className="divBegin">
                <h1 className='titleBegin'>Choise your level</h1>
                <form>
                    <button onClick={() => choiseLevel(2, true)}>2x2</button>
                    <button onClick={() => choiseLevel(4, true)}>4x4</button>
                    <button onClick={() => choiseLevel(6, true)}>6x6</button>
                    <button onClick={() => choiseLevel(8, true)}>8x8</button>
                    <button onClick={() => choiseLevel(10, true)}>10x10</button>
                    <button onClick={() => choiseLevel(12, true)}>12x12</button>
                    <button onClick={() => choiseLevel(14, true)}>14x14</button>
                    <button onClick={() => choiseLevel(16, true)}>16x16</button>
                </form>
            </div>
            }
            {data.play && <Game data={data} setData={setData}/>}
            <p>Points: {data.points}</p>
        </div>
    );
}

export default Begin;