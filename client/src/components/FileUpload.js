import axios from 'axios';
import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';

export const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          //Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });

      const { fileName, filePath } = res.data;
      console.log(filePath);
      setUploadedFile({ fileName, filePath });
      setMessage('File Uploaded');
    } catch (error) {
      if (error.response.status === 500) {
        setMessage('There was problem with the server');
      } else {
        setMessage(error.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      {message && <Message msg={message} />}
      <form onSubmit={submitHandler}>
        <div className='input-group mb-4'>
          <input
            type='file'
            className='form-control'
            id='inputGroupFile02'
            onChange={onChange}
          />
        </div>
        <Progress percentage={uploadPercentage} />
        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4 form-control'
        />
      </form>
      {uploadedFile && (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img
              src={uploadedFile.filePath}
              style={{ width: '100%' }}
              alt={uploadedFile.fileName}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};
