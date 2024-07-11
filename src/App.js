import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function App() {

  const [files, setFiles] = useState([])
  const [allFiles, setAllFiles] = useState([])
  const [printFiles, setPrintFiles] = useState(false)
  const [existingFilenames, setExistingFilenames] = useState([])
  const fileInputRef = useRef(null)


  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.filter((file) => !existingFilenames.includes(file.name))

    setFiles((prevFiles) => [...prevFiles, ...newFiles])

    const newFilenames = newFiles.map((file) => file.name)
    setExistingFilenames((prevFilenames) => [...prevFilenames, ...newFilenames])

    const refs = Array.from(fileInputRef.current.files)
    const uniqueNewFiles = refs.filter((ref) => !files.some((f) => f.name == ref.name))

    const allSelectedFiles = Array.from(new Set([...uniqueNewFiles, ...files]))
    setAllFiles(allSelectedFiles)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleCloseFile = (fileName) => {
    const updatedFiles = files.filter((file) => file.name != fileName)
    setFiles(updatedFiles)
  }

  const handleSendData = (e) => {
    setPrintFiles(e.target.checked)
  }

  const handleClickButton = (e) => {
    e.stopPropagation()
    fileInputRef.current.click()
  }

  useEffect(() => {
    console.log(allFiles);
  }, [allFiles])

  return (
    <>
      <div className='container'>
        <div {...getRootProps()} className='dropZone'>
          <input
            type='file'
            {...getInputProps()}
            style={{ display: 'block' }}
            ref={fileInputRef}
          />
          <p>{files.length} file(s) selected</p>
          <ul>
            {files.map(file => (
              <li key={file.name} onClick={(e) => e.stopPropagation()} >
                <div className='close' onClick={() => handleCloseFile(file.name)}>×</div>
                <img src={URL.createObjectURL(file)} alt={file.name} />
              </li>
            ))}
          </ul>
          {files.length == 0 ? <p>Drag & Drop</p> : null}
        </div>
        <div className='btnWrapper'>
          <input
            type='button'
            value='Files'
            className='customButton'
            onClick={(e) => handleClickButton(e)}
          />
          <div className='switchRow'>
            <label className="switch">
              <input type="checkbox" onChange={handleSendData} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      {printFiles && (
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Path</th>
              </tr>
            </thead>
            <tbody>
              {allFiles.map((file) => (
                <tr>
                  <td>{file.name}</td>
                  <td>{file.type}</td>
                  <td>{file.size}</td>
                  <td>{file.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
};

export default App;