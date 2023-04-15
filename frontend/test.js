const JSONfile = async () => {
  const json = fabricCanvas.toDatalessJSON(['clipPath']);
  return json;
  const out = JSON.stringify(json, null, '\t');
  const blob = new Blob([out], { type: 'text/plain' });
  // return blob
  const clipboardItemData = { [blob.type]: blob };
  try {
    navigator.clipboard &&
      (await navigator.clipboard.write([new ClipboardItem(clipboardItemData)]));
  } catch (error) {
    console.log(error);
  }
  const blobURL = URL.createObjectURL(blob);
  // return blobURL
  const a = document.createElement('a');
  // a.href = blobURL;
  // a.download = 'eraser_example.json';
  // a.click();

  return URL.revokeObjectURL(blobURL);
};

const png = canvas.toDataURL({
  format: 'png',
});

const png2 = canvas.toDataURL({
  width: canvas.width,
  height: canvas.height,
  left: 0,
  top: 0,
  format: 'png',
});
const link = document.createElement('a');
link.download = 'image.png';
link.href = dataURL;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);