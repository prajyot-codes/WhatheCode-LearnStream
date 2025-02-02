const PDFPreviewModal = ({ pdfUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-3/4 h-3/4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-black">✖</button>
        <iframe src={pdfUrl} width="100%" height="100%" title="PDF Preview" />
      </div>
    </div>
  );
};

export default PDFPreviewModal;
