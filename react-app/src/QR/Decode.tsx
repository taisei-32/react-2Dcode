import React, {useState, useRef} from "react";
import "./Decode.css";
import { BrowserQRCodeReader } from "@zxing/browser";

function QRDecode() {
    const [image, setImage] = useState<string | null>(null);
    const [result_text, setReader] = useState<string | null>(null);
    const [isResultText, setIsResultText] = useState(false);
    const [isResultRead, setIsResultRead] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const ReaderOnload = (e: ProgressEvent<FileReader>) => {
        const imageUrl = e.target?.result as string;
        setIsResultText(true);
        // エラー処理書くべきだけど
        setImage(imageUrl);
        const codeReader = new BrowserQRCodeReader();
        codeReader.decodeFromImageUrl(imageUrl)
            .then((result) => {
                setIsResultRead(true);
                setReader(result.getText())
            })
            .catch((err) => {
                setIsResultRead(false);
                window.alert("QRCodeのデコードに失敗しました")
            })
    }

    const handleFile = (file: File) =>{
        if (file && file.type.startsWith("image/")){
            const reader = new FileReader();
            reader.onload = ReaderOnload;
            reader.readAsDataURL(file);
        }
        else{
            window.alert("画像ファイルを選択してください");
        }
    }

    const DragOver = (e: React.DragEvent<HTMLDivElement>) =>{
        e.preventDefault();
    }

    const Drop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const ClickDrop = () => {
        fileInputRef.current?.click();
    }
    const ChangeFile = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files?.length){
            handleFile(e.target.files[0]);
            e.target.value = "";
        }
    }


    return(
        <div className="main">
            <h1>QRCode読み取り</h1>
            <div className="drag_drop" onDragOver={DragOver} onDrop={Drop} onClick={ClickDrop}>
                <p>ドラッグ＆ドロップ または ファイルを選択</p>
                <button type="button" className="button-file">ファイルを選択</button>
                <input className="input_file" type="file" accept="image/*" ref={fileInputRef} onChange={ChangeFile}></input>
            </div>
            <div className="result" style={{display: isResultRead ? "inline-flex" : "none"}}>
                {image && <img src={image} alt="Uploaded Preview" className="preview" />}
                <div className="result_reader" style={{display: isResultText ? "block" : "none"}}>
                    <p className="p_result">読み取り結果</p>
                    <hr></hr>
                    <p className="p_texxt">{result_text}</p>
                </div>
            </div>
        </div>
    )
}

export default QRDecode;
