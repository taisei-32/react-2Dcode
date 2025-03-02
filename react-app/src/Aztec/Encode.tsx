import React, { useState, useRef } from "react";
import "./Encode.css";
import bwipjs from '@bwip-js/browser';

function AztecEncode() {
    const [count, setCount] = useState(0);
    const [isCanvasVisible, setIsCanvasVisible] = useState(false);
    const inputtext = useRef<HTMLTextAreaElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sizeInput = useRef<HTMLInputElement>(null);
    const errorInput = useRef<HTMLInputElement>(null);
    const countFunc = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCount(event.target.value.length);
        // console.log(text);
    };

    interface AztecRenderOptions extends bwipjs.RenderOptions {
        eclevel?: string;
    }

    const generateaztec = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (count === 0) {
            window.alert("文字を入力してください")
        }
        else {
            try {
                setIsCanvasVisible(true);
                if (inputtext.current && canvasRef.current) {
                    console.log(inputtext.current?.value);
                    let options: AztecRenderOptions = {
                        bcid: "azteccode",
                        text: inputtext.current?.value,
                        scale: Number(sizeInput.current?.value),
                        eclevel: String(errorInput.current?.value),
                    }

                    bwipjs.toCanvas(
                        canvasRef.current,
                        options
                    );
                }
            }
            catch (e) {

            }
        }
    }

    const ResetCount = () =>{
        setCount(0);
    }

    return (
        <div>
            <form>
                <h1>AztecCode生成</h1>
                <p className="text">文字を入力</p>
                <textarea id="qr_gettext" ref={inputtext} rows={8} cols={100} maxLength={150} placeholder="150文字以内" onChange={countFunc}></textarea>
                <div className="reset_count">
                    <input className="reset" type="reset" value="リセット" onClick={ResetCount}></input>
                    <div>
                        <p>{count}文字</p>
                    </div>
                </div>
                <div>
                    <tbody>
                        <tr className="errorlevel">
                            <td className="td_name">
                                <div>誤り訂正(5-90)</div>
                            </td>
                            <td className="td_number">
                                <input type="number" ref={errorInput} defaultValue={23} min="5" max="90"></input>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_name">
                                <div>サイズ(1-10)</div>
                            </td>
                            <td className="td_number">
                                <input type="number" ref={sizeInput} defaultValue={2} min="1" max="10"></input>
                            </td>
                        </tr>
                    </tbody>
                </div>
                <div className="button">
                    <button type="button" onClick={generateaztec}>AztecCode Generate</button>
                </div>
                <div className="div_canvas">
                    <canvas ref={canvasRef} width={70} height={70} style={{ display: isCanvasVisible ? "block" : "none" }}></canvas>
                </div>
            </form>
        </div>
    )
}

export default AztecEncode;
