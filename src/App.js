import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function App() {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true
  });


  const handleCloseFile = (fileName) => {
    const updatedFiles = files.filter((file) => file.name != fileName);
    setFiles(updatedFiles);
  }

  return (
    <>
    <div  {...getRootProps()} className='dropZone'>
        {/* <input {...getInputProps()} /> */}
        <ul>
          {files.map(file => (
            <li>
              <input type='button' className='close' onClick={() => handleCloseFile(file.name)} />
              <img src={URL.createObjectURL(file)} alt={file.name} />
            </li>
          ))}
        </ul>
        <p>Drag & Drop</p>
      </div>
    
    
    </>
  );
}

export default App;