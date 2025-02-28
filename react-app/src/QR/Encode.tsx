import React from "react";
import "./Encode.css";

// 中央揃いにしたい　
function QR_Encode() {
    return(
        <div>
            <form>
                <label>Text: </label>
                <textarea rows={6} cols={100}></textarea>
                <p>100文字</p>
            </form>
        </div>
    )
}

export default QR_Encode;
