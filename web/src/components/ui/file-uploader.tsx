import React from "react";

type FileUploaderProps = {
  file: File | undefined;
  handleFile: (Files: FileList) => void;
  handleUpload: () => void;
  loadingUpload?: boolean
}
const FileUploader = ({ file, handleFile, handleUpload, loadingUpload = false }: FileUploaderProps) => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files != undefined && files.length>0) {
      handleFile(files);
    } else {
      console.log('Erro ao adicionar o arquivo.');
    }
  };
  const handleClickUpload = () => {
    handleUpload();
  }

  return (
    <div className = "flex flex-col gap-6">
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          <p className="pb-6">File details:</p>
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && !loadingUpload && (
        <button className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold" onClick={handleClickUpload}>
          Upload the file
        </button>
      )}

      {file && loadingUpload && (
        <button className="flex items-center justify-center rounded-lg bg-green-300 text-white px-4 py-2 border-none font-semibold">
          <span className="mr-2">Uploading...</span>
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
        </button>
      )}

    </div>
  );
};

export { FileUploader };
