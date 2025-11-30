import { useState } from "react";
import { UploadCloud, FileText, Loader } from "lucide-react";

export default function SyllabusReader() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);  
    };

    const handleSubmit = async () => {
        if (files.length === 0) return;

        setLoading(true);

        try {
            const formData = new FormData();
            files.forEach((file) => formData.append("files", file));

            // 🔥 Django backend endpoint (adjust later)
            const res = await fetch("http://127.0.0.1:8000/api/syllabus", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setResponse(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4">📚 Syllabus Reader</h1>
            <p className="text-gray-600 mb-6">
                Upload one or more syllabus PDF files and let the system extract key details.
            </p>

            {/* Upload Box */}
            <label className="flex flex-col items-center justify-center w-full p-10 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition">
                <UploadCloud className="w-10 h-10 text-gray-500 mb-3" />
                <span className="text-gray-700 font-medium">Click to upload PDFs</span>
                <span className="text-gray-500 text-sm">(You can select multiple)</span>

                <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>

            {/* File List */}
            {files.length > 0 && (
                <div className="mt-6 space-y-2">
                    <h2 className="font-medium">Selected Files:</h2>

                    {files.map((file, idx) => (
                        <div
                            key={idx}
                            className="flex items-center p-3 bg-gray-50 rounded-lg border"
                        >
                            <FileText className="text-gray-600 w-5 h-5 mr-3" />
                            <span className="text-gray-800">{file.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={loading || files.length === 0}
                className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 disabled:bg-gray-400 transition flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Processing...
                    </>
                ) : (
                    "Process PDFs"
                )}
            </button>

            {/* Response Preview */}
            {response && (
                <div className="mt-8 bg-gray-50 p-5 rounded-xl border">
                    <h3 className="text-lg font-semibold mb-2">Extracted Output</h3>
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                        {JSON.stringify(response, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
