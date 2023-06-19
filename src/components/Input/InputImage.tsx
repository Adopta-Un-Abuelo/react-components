import { useState, useRef, useEffect, CSSProperties, ReactElement } from 'react';
import styled from 'styled-components';
import Compressor from 'compressorjs';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import './input-image.css'

import { Crop as CropIcon, X } from 'lucide-react';
import Button from '../Button/Button';
import Color  from '../../constants/Color';

const Container = styled.div`
`
const CropContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    z-index: 1;
    background-color: black;
`
const ToolBar = styled.div`
    display: flex;
    width: -webkit-fill-available;
    padding: 0px 12px;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    background-color: white;
    border-bottom: 1px solid ${Color.line.soft};
`
const Preview = styled.canvas`
    position: absolute;
    bottom: 12px;
    right: 12px;
    object-fit: contain;
    width: 150px;
    height: 150px;
    border-radius: 6px;
`

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(makeAspectCrop({ unit: '%', width: 60 }, aspect, mediaWidth, mediaHeight), mediaWidth, mediaHeight)
}

const InputImage = (props: InputImageProps) =>{

    const inputRef = useRef<HTMLInputElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const aspect = 1 / 1;
    const [ imgSrc, setImgSrc ] = useState('')
    const [ crop, setCrop ] = useState<Crop>()
    const [ completedCrop, setCompletedCrop ] = useState<PixelCrop>();
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => {
            canvasPreview.apply([completedCrop])
        }, 100)

        return () => clearTimeout(t);
    }, [completedCrop]);

    const canvasPreview = async () =>{
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;
        if(crop?.width && crop?.height && image && canvas){
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                throw new Error('No 2d context')
            }
        
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            const pixelRatio = window.devicePixelRatio;
        
            canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
            canvas.height = Math.floor(crop.height * scaleY * pixelRatio)
        
            ctx.scale(pixelRatio, pixelRatio)
            ctx.imageSmoothingQuality = 'high';
        
            const cropX = crop.x * scaleX
            const cropY = crop.y * scaleY
        
            const centerX = image.naturalWidth / 2
            const centerY = image.naturalHeight / 2
        
            ctx.save()
        
            // 5) Move the crop origin to the canvas origin (0,0)
            ctx.translate(-cropX, -cropY)
            // 4) Move the origin to the center of the original position
            ctx.translate(centerX, centerY)
            // 1) Move the center of the image to the origin (0,0)
            ctx.translate(-centerX, -centerY)
            ctx.drawImage(
                image,
                0,
                0,
                image.naturalWidth,
                image.naturalHeight,
                0,
                0,
                image.naturalWidth,
                image.naturalHeight,
            )
            ctx.restore()
        }
    }

    const toBase64 = (file: any ) => { 
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }

    const onSelectFile = async(e:any) => {
        console.log('HOLA');
        if(e && e.target && e.target.files && e.target.files[0]){
            setCrop(undefined)
            const base64: any = await toBase64(e.target.files[0]);
            setImgSrc(base64);
            if(inputRef.current)
                inputRef.current.value = '';
        }
    }

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    const completeCrop = () =>{
        setLoading(true);
        previewCanvasRef.current?.toBlob((blob) =>{
            if(blob){
                new Compressor(blob, {
                    quality: 0.8,
                    maxHeight: props.maxHeight,
                    maxWidth: props.maxWidth,
                    success: async (compressedResult) => {
                        setImgSrc('');
                        const base64 = await toBase64(compressedResult);
                        props.onChange && props.onChange(base64);
                        setLoading(false);
                    },
                });
            }
            else setLoading(false);
        });
    }

    const cancelCrop = () =>{
        setImgSrc('');
    }

    return(
        <Container style={props.style}>
            <Button 
                role={'button'}
                onClick={() => inputRef.current?.click()}
                style={{height:32, padding: '0px 12px', fontSize: 14, fontWeight: 500, ...props.buttonStyle}} 
                design={"secondary"}
            >
                {props.children ? props.children : "Subir foto"}
            </Button>
            <input name="image" accept="image/*" onChange={onSelectFile} hidden={true} type="file" ref={inputRef}/>
            {imgSrc && (
                <CropContainer>
                    <ToolBar>
                        <Button
                            design='primary'
                            size='small'
                            loading={loading}
                            icon={<CropIcon/>}
                            onClick={completeCrop}
                        >
                            Recortar
                        </Button>
                        <Button
                            style={{marginLeft: 12}}
                            design='image'
                            icon={<X/>}
                            onClick={cancelCrop}
                        />
                    </ToolBar>
                    <ReactCrop
                        style={{height: '-webkit-fill-available'}}
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            style={{ maxWidth: '100%', maxHeight: '100%'}}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                    {completedCrop && 
                        <Preview
                            ref={previewCanvasRef}
                            style={props.previewStyle}
                        />
                    }
                </CropContainer>
            )}
        </Container>
    )
}
export default InputImage;
export interface InputImageProps{
    children?: ReactElement,
    style?: CSSProperties,
    buttonStyle?: CSSProperties,
    previewStyle?: CSSProperties,
    label?: string,
    maxHeight?: number,
    maxWidth?: number,
    onChange?: (image: any) => void
}