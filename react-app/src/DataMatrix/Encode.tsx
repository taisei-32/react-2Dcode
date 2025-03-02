import React, {useState, useRef} from "react";
import "./Encode.css";
import bwipjs from '@bwip-js/browser';

function DataMatrixEncode() {
    const [count, setCount] = useState(0);
    const [isCanvasVisible, setIsCanvasVisible] = useState(false);
    const inputtext = useRef<HTMLTextAreaElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const marginInput = useRef<HTMLInputElement>(null);
    // const scaleInput = useRef<HTMLInputElement>(null);
    // const widthInput = useRef<HTMLInputElement>(null);
    // const colorDarkInput = useRef<HTMLInputElement>(null);
    // const colorLightInput = useRef<HTMLInputElement>(null);
    const countFunc = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCount(event.target.value.length);
        // console.log(text);
    };

    const generatedatamatrix = (event: React.MouseEvent<HTMLButtonElement>) =>{
        try{
            setIsCanvasVisible(true);
            if (inputtext.current && canvasRef.current){
                const text = inputtext.current.value;
                console.log(text);
    
                bwipjs.toCanvas(
                    canvasRef.current,
                    {
                        bcid: "datamatrix",
                        text: text,
                    }
                );
            }
        }
        catch (e){
            
        }
    }

    return(
        <div>
            <form>
                <label>Text: </label>
                <textarea id="qr_gettext" ref={inputtext} rows={8} cols={100} maxLength={150} placeholder="150文字以内" onChange={countFunc}></textarea>
                <p>{count}文字</p>
                <p></p>
                <div className="button">
                    <button type="button" onClick={generatedatamatrix}>DataMatrix Generate</button>
                </div>
                <div className="div_canvas">
                    <canvas ref={canvasRef} width={70} height={70} style={{ display: isCanvasVisible ? "block" : "none" }}></canvas>
                </div>
            </form>
        </div>
    )
}

export default DataMatrixEncode;
