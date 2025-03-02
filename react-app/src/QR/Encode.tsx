import React, {useState, useRef} from "react";
import "./Encode.css";
import QRCode, { QRCodeErrorCorrectionLevel } from "qrcode";

function QREncode() {
    const [count, setCount] = useState(0);
    const [isCanvasVisible, setIsCanvasVisible] = useState(false);
    const inputtext = useRef<HTMLTextAreaElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sizeInput = useRef<HTMLInputElement>(null);
    const errorInput = useRef<HTMLSelectElement>(null);
    const qzonInput = useRef<HTMLInputElement>(null);
    const colorDarkInput = useRef<HTMLInputElement>(null);
    const colorLightInput = useRef<HTMLInputElement>(null);
    const countFunc = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCount(event.target.value.length);
        // console.log(text);
    };

    const generateQR = (event: React.MouseEvent<HTMLButtonElement>) =>{
        //ポップアップで表示するようにしよう
        if (count === 0){
            window.alert("文字を入力してください");
        }
        else{
            if (inputtext.current && canvasRef.current){
                setIsCanvasVisible(true);
                const text = inputtext.current.value;
                const errorCorrectionLevel_input = qzonInput.current?.value as QRCodeErrorCorrectionLevel;
                console.log(text);
                QRCode.toCanvas(
                    canvasRef.current,
                    inputtext.current?.value,
                    {
                        errorCorrectionLevel: errorCorrectionLevel_input,
                        scale: Number(sizeInput.current?.value),
                        margin: Number(qzonInput.current?.value),
                        color: {
                            dark: colorDarkInput.current?.value,
                            light: colorLightInput.current?.value,
                        }
                    },
                    function (error: any){
                        if(error){
                            console.error(error);
                        }
                        console.log("success");
                    }
                );
            } else {
                window.alert("Error");
            }
        }
    }

    return(
        <div>
            <form>
                <h1>QRCode生成</h1>
                <p className="text">文字を入力</p>
                <textarea id="qr_gettext" ref={inputtext} rows={8} cols={100} maxLength={150} placeholder="150文字以内" onChange={countFunc}></textarea>
                <div className="reset_count">
                    <input className="reset" type="reset" value="リセット"></input>
                    <div>
                        <p>{count}文字</p>
                    </div>
                </div>
                {/* scaleも追加しよう */}
                <div className="table-option">
                    <tbody>
                        <tr className="errorlevel">
                            <td className="td_name">
                                <div>誤り訂正(L,M,Q,H)</div>
                            </td>
                            <td className="td_op">
                                <select ref={errorInput} defaultValue="M">
                                    <option value="L">L (10%)</option>
                                    <option value="M">M (15%)</option>
                                    <option value="Q">Q (25%)</option>
                                    <option value="H">H (30%)</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_name">
                                <div>サイズ(1-10)</div>
                            </td>
                            <td className="td_number">
                                <input type="number" ref={sizeInput} defaultValue={4} min="1" max="10"></input>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_name">
                                <div>クワイエットゾーン(1-20)</div>
                            </td>
                            <td className="td_number">
                                <input type="number" ref={qzonInput} defaultValue={4} min="1" max="20"></input>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_name">
                                <div>Color</div>
                            </td>
                            <td className="td_color">
                                <input type="color" ref={colorDarkInput} defaultValue="#000000"></input>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_name">
                                <div>Background Color</div>
                            </td>
                            <td className="td_color">
                                <input type="color" ref={colorLightInput} defaultValue="#ffffff"></input>
                            </td>
                        </tr>
                    </tbody>
                </div>
                <div className="button">
                    <button type="button" onClick={generateQR}>QRCode Generate</button>
                </div>
                <div　className="div_canvas">
                    <canvas ref={canvasRef} style={{ display: isCanvasVisible ? "block" : "none" }}></canvas>
                </div>
            </form>
        </div>
    )
}

export default QREncode;
