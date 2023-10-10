
import { useEffect, useMemo, useState } from 'react';
import '../Styles/Game.css'
import '../Styles/Card.css'

import {Images} from "./Images";

const Game = ({data, setData}) => {
    const [pointsGame, setPointsGame] = useState(0);
    
    const [verifyCards, setVerifyCards] = useState([]);
    const [imageToPlay, setImageToPlay] = useState([]);

    const [refretchPage, setRefretchPage] = useState(false);

    useEffect(() => {
        const arrayEmpty = [];
        for(let i = 0; i<data.level*2;){
            let randomImage = Math.floor(Math.random()*(data.level*2));
            if(!arrayEmpty.includes(randomImage)){
                arrayEmpty.push(randomImage);
                i++;
            }
        }
        const imageToPlay2 = [...imageToPlay];
        arrayEmpty.forEach((i) => {
            imageToPlay2.push(Images[i]);
            setImageToPlay(imageToPlay2);
            setImageToPlay2(imageToPlay2);
        })
    },[data.level]);

    const verify = () => {
        console.log(imageToPlay[verifyCards[0]].image+" - " +imageToPlay[verifyCards[1]].image)
        if(imageToPlay[verifyCards[0]].image===imageToPlay[verifyCards[1]].image){
            setPointsGame(pointsGame+1);
            const updateImageToPlay = [...imageToPlay];
            updateImageToPlay[verifyCards[0]].found=true;
            updateImageToPlay[verifyCards[1]].found=true;
            setImageToPlay(updateImageToPlay);
        }else{
            const updateImageToPlay = [...imageToPlay];
            updateImageToPlay[verifyCards[0]].status=false;
            updateImageToPlay[verifyCards[1]].status=false;
            setImageToPlay(updateImageToPlay);
        }
        setVerifyCards([]);
    }
    const resetAll = () => {
        console.log("Resetando tudo");
        const resetArray = [...imageToPlay];
        imageToPlay.forEach =((i) => {
            resetArray[i].status = false;
            resetArray[i].found = false;
            setImageToPlay(resetArray);
        })
        setVerifyCards([]);
        setImageToPlay([])

    }
    useEffect(() => {
    }, [refretchPage, data.level, verifyCards]);
    return (
        <div className="divGame">
            <div className={'divGame_Cards ' + data.class}>
                {imageToPlay.map((value, i) => (
                    <img 
                     key={i}
                     src={value.status ? '.'+value.image : './src/ImagesBackground/background.jpg'}
                     className={value.status ? 'showCard' : 'hideCard'}
                     onClick={()=>{
                        if(verifyCards.length<2 && !value.status){
                            if(!value.found){

                                const updateVerifyCards = [...verifyCards, i];
                                setVerifyCards(updateVerifyCards);

                                const updatedImageToPlay = [...imageToPlay];
                                updatedImageToPlay[i].status = true;
                                setImageToPlay(updatedImageToPlay);

                                setRefretchPage(!refretchPage);
                            }
                        }
                        else{
                            verify();
                        }
                    }} />
                ))}
            </div>
            <button 
            onClick={() => {
                resetAll();
                setData((...previousData) =>{return{...previousData, play: false,points:pointsGame}})}
                }>
                    Exit</button>
        </div>
    );

}

export default Game;