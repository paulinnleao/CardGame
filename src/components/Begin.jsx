import { useState } from 'react';
import '../Styles/Begin.css'
import { useEffect } from 'react';
const Begin = () => {

    const [points, setPoints] = useState();
    const [level, setLevel] = useState(0);
    const [play, setPlay] = useState(false)

    useEffect(() => {

    }, []);
    useEffect(() => {

    }, []);
    return (
        <div className="false">
            {!play &&
            <div className="divBegin">
                <h1 className='titleBegin'>Choise your level</h1>
                <form>
                    <button onClick={() => setLevel(2)}>2x2</button>
                    <button onClick={() => setLevel(4)}>4x4</button>
                    <button onClick={() => setLevel(6)}>6x6</button>
                    <button onClick={() => setLevel(8)}>8x8</button>
                    <button onClick={() => setLevel(10)}>10x10</button>
                    <button onClick={() => setLevel(12)}>12x12</button>
                    <button onClick={() => setLevel(14)}>14x14</button>
                    <button onClick={() => setLevel(16)}>16x16</button>
                </form>
            </div>
            }
            <p>Points: 00</p>
        </div>
    );
}

export default Begin;