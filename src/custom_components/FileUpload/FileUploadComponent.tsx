import Image from 'next/image';
import React, { useState } from 'react';

const FileUploadComponent = ({ files, setFiles, previews, setPreviews }: any) => {
  const [maxFiles, setMaxFiles] = useState(1);

  const handleDropdownChange = (event: any) => {
    setMaxFiles(parseInt(event.target.value));
    setFiles([]);
    setPreviews([]);
  };

  const handleFileChange = (event: any) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files.`);
      return;
    }
    setFiles([...files, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file: any) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  return (
    <div>
      <div className='mb-4' >
        <label htmlFor="maxFiles">Select maximum number of files:</label>
        <select className='ms-4 w-28 px-2' id="maxFiles" value={maxFiles} onChange={handleDropdownChange}>
          {Array.from({ length: 10 }, (_, num) => (
            <option key={num + 1} value={num + 1}>{num + 1}</option>
          ))}
        </select>
      </div>


      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className="previews my-4 flex gap-4 flex-wrap justify-between items-center">
        {previews.map((preview: any, index: any) => (
          <div key={index} className="preview w-28 h-28 my-4">
            <Image className='w-full h-full rounded-full' width={100} height={100} src={preview} alt={`preview ${index}`} />
            <button type="button" onClick={() => handleRemoveFile(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploadComponent;
