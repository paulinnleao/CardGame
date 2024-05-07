
import { useEffect, useMemo, useState } from 'react';
import '../Styles/Game.css'
import '../Styles/Card.css'

import {Images} from "./Images";

import thisPunch from '../songs/punch.mp3';
import thisSoda from '../songs/soda.mp3';
import thisSurprise from '../songs/surprise.mp3';

import BackgroundImageCard from '../ImagesBackground/background.jpg'


const Game = ({data, setData}) => {
    const [punch] = useState(new Audio(".."+thisPunch));
    const [soda] = useState(new Audio(".."+thisSoda));
    const [surprise] = useState(new Audio(".."+thisSurprise));
    
    const [pointsGame, setPointsGame] = useState(0);
    
    const [verifyCards, setVerifyCards] = useState([]);
    const [imageToPlay, setImageToPlay] = useState([]);

    const [counterLevel, setCounterLevel] = useState(0);
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
        })
    },[data.level]);

    const verify = () => {
        if(imageToPlay[verifyCards[0]].image===imageToPlay[verifyCards[1]].image){
            soda.play();
            setPointsGame(pointsGame+(data.level/2));
            const updateImageToPlay = [...imageToPlay];
            updateImageToPlay[verifyCards[0]].found=true;
            updateImageToPlay[verifyCards[1]].found=true;
            setImageToPlay(updateImageToPlay);
            setCounterLevel(counterLevel+1);
        }else{
            surprise.play();
            const updateImageToPlay = [...imageToPlay];
            updateImageToPlay[verifyCards[0]].status=false;
            updateImageToPlay[verifyCards[1]].status=false;
            setImageToPlay(updateImageToPlay);
        }
        setVerifyCards([]);
    }
    const resetAll = () => {
        const resetArray = imageToPlay.map((item)=>{
            item.status = false;
            item.found = false;
            return item;
        });
        setVerifyCards([]);
        setImageToPlay(resetArray);

    }
    useEffect(() => {
        if(counterLevel===data.level){
            resetAll();
            const updateDataGame = {...data};
            updateDataGame.play = false;
            updateDataGame.points = pointsGame+data.points;
            updateDataGame.endGame = true;
            setData(updateDataGame);
        }
    }, [refretchPage, data.level, verifyCards]);
    return (
         <div className="divGame">
            <h1>Accumulated points : <b>{pointsGame}</b> </h1>
            <div className={'divGame_Cards ' + data.class}>
                {imageToPlay.map((value, i) => (
                    <img 
                     key={i}
                     src={value.status ? '.'+value.image : BackgroundImageCard}
                     className={value.status ? 'showCard' : 'hideCard'}
                     onClick={()=>{
                        console.log(value.image)
                        if(verifyCards.length<2 && !value.status){
                            if(!value.found){
                                punch.play();
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
                var answer = window.confirm("Are you sure? Don't worry, your points will be retained.");
                if(answer){
                    resetAll();
                    const updateDataGame = {...data};
                    updateDataGame.play = false;
                    updateDataGame.points = pointsGame+data.points;
                    setData(updateDataGame);
                }
                    }
                }>
                    Exit
                </button>

        </div>
    );

}

export default Game;