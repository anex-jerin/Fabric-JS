import './App.css';
import { useEffect, useState, useRef } from 'react';
import { fabric } from 'fabric';
import { Icon } from '@iconify/react';

function App() {
  const canRef = useRef(null);
  const [penWidth, setPenWidth] = useState(1);
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [penColor, setPenColor] = useState('#000000');
  const [fabricCanvas, setFabricCanvas] = useState();
  const [toggleErase, setToggleErase] = useState(false);
  useEffect(() => {
    const canvas = new fabric.Canvas(canRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      isDrawingMode: true,
      backgroundColor: 'white',
    });
    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [canRef]);

  const addTriangle = () => {
    const triangle = new fabric.Triangle({
      width: 150,
      height: 100,
      fill: penColor,
      stroke: '',
      strokeWidth: 3,
      cornerColor: 'blue',
      angle: 45,
      left: 100,
      top: 100,
    });
    fabricCanvas.add(triangle);
  };
  const addCircle = () => {
    const circle = new fabric.Circle({
      radius: 25,
      fill: penColor,
      left: 100,
      top: 100,
    });
    fabricCanvas.add(circle);
  };
  const addRect = () => {
    const rect = new fabric.Rect({
      width: 45,
      height: 45,
      fill: penColor,
      left: 200,
      top: 150,
    });
    fabricCanvas.add(rect);
  };

  const addText = ()=>{
    const text = new fabric.Text('Add text here', {
      underline: false,
      overline: false,
      left: 200,
      top: 150,
    });
    fabricCanvas.add(text);
  }
  const changePenWidth = (width) => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = width;
      setPenWidth(width);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };

  const removeObject = () => {
    fabricCanvas.remove(fabricCanvas.getActiveObject());
  };

  const changePenColor = (color) => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.color = color;
      fabricCanvas.isDrawingMode = true;
      setIsDrawingMode(true);
      setPenColor(color);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };

  const penMode = () => {
    if (fabricCanvas) {
      fabricCanvas.isDrawingMode = true;
      fabricCanvas.freeDrawingBrush.width = 0.5;
      setPenColor('#000000');
      setPenWidth(0.5);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };

  const drawingMode = (value) => {
    if (fabricCanvas) {
      fabricCanvas.isDrawingMode = value;
      setIsDrawingMode(value);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };
  const clearButton = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };

  const eraseMode = () => {
    if (fabricCanvas) {
      if (toggleErase) {
        fabricCanvas.isDrawingMode = true;
        changePenColor('#000000');
        setToggleErase(false);
      } else {
        fabricCanvas.isDrawingMode = true;
        changePenColor('#ffff');
        setToggleErase(true);
      }
    }
  };

  const downloadButton = () => {
    const svg = fabricCanvas.toSVG();
    const downloadLink = document.createElement('a');
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const blobURL = URL.createObjectURL(blob);
    const fileName = 'save.svg';
    downloadLink.href = blobURL;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const downloadButton1 = async () => {
    const json = fabricCanvas.toDatalessJSON(['clipPath']);
    const out = JSON.stringify(json, null, '\t');
    const blob = new Blob([out], { type: 'text/plain' });
    const clipboardItemData = { [blob.type]: blob };
    try {
      navigator.clipboard &&
        (await navigator.clipboard.write([
          new ClipboardItem(clipboardItemData),
        ]));
    } catch (error) {
      console.log(error);
    }
    const blobURL = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobURL;
    a.download = 'eraser_example.json';
    a.click();
    URL.revokeObjectURL(blobURL);
  };

  return (
    <div className='full'>
      <canvas ref={canRef} />
      <div className='toolbar'>
        <div className='pen-group'>
          <button
            className='pen'
            onClick={(e) => {
              e.preventDefault();
              penMode();
            }}
          >
            <Icon icon='ri:pencil-fill' />
          </button>
          <div className='pen-width'>
            <input
              type='range'
              onChange={(e) => changePenWidth(e.target.value)}
              value={penWidth}
              min={1}
              max={30}
            />
            <label htmlFor=''>{penWidth}</label>
          </div>
        </div>
        <div className='colors'>
          <button
            onClick={(e) => {
              e.preventDefault();
              changePenColor('#000000');
            }}
          ></button>
          <button
            onClick={(e) => {
              e.preventDefault();
              changePenColor('#279655');
            }}
          ></button>
          <button
            onClick={(e) => {
              e.preventDefault();
              changePenColor('#f1c855');
            }}
          ></button>
          <button
            onClick={(e) => {
              e.preventDefault();
              changePenColor('#3581ea');
            }}
          ></button>
          <button
            onClick={(e) => {
              e.preventDefault();
              changePenColor('#e9565a');
            }}
          ></button>
          <input
            type='color'
            onChange={(e) => changePenColor(e.target.value)}
            value={penColor}
          />
        </div>
        <div className='erase'>
          <button onClick={() => eraseMode()}>
            <Icon icon='mdi:eraser' />
          </button>
          <div className='pen-width'>
            <input
              type='range'
              onChange={(e) => changePenWidth(e.target.value)}
              value={penWidth}
              min={1}
              max={30}
            />
            <label htmlFor=''>{penWidth}</label>
          </div>
        </div>
        <div className='extra'>
          <button onClick={() => addCircle()} title=' Add Circle'>
            <Icon icon='material-symbols:circle-outline' />
          </button>
          <button onClick={() => addTriangle()} title=' Add Triangle'>
            <Icon icon='ph:triangle-bold' />
          </button>
          <button onClick={() => addRect()} title=' Add Square'>
            <Icon icon='material-symbols:square-outline-rounded' />
          </button>
          <button onClick={() => addRect()} title='Add Image'>
            <Icon icon='ic:round-crop-original' />
          </button>
          <button onClick={() => addText()} title='Add text'>
            <Icon icon='ph:text-t-bold' />
          </button>

          <button
            className='ml'
            onClick={(e) => drawingMode()}
            title='Select Object '
          >
            <Icon icon='mdi:cursor-move' />
          </button>
          <button
            onClick={(e) => removeObject()}
            title='Remove selected object'
          >
            <Icon icon='material-symbols:delete-forever' />
          </button>
          <button onClick={(e) => clearButton()} title='Clear All'>
            <Icon icon='ant-design:clear-outlined' />
          </button>

          <button className='ml' onClick={(e) => addCircle()} title='Upload'>
            <Icon icon='material-symbols:cloud-upload' />
          </button>
          <button onClick={(e) => downloadButton()} title='Download'>
            <Icon icon='material-symbols:download' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
