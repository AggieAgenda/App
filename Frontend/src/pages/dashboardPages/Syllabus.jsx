import { useState } from "react";
import { UploadCloud, FileText, Loader, CheckCircle, XCircle, Calendar, BookOpen } from "lucide-react";

export default function SyllabusReader() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [processingFile, setProcessingFile] = useState(null);
    const [savingFile, setSavingFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFiles = [...e.target.files];

        // Validate file types
        const invalidFiles = selectedFiles.filter(file => !file.name.endsWith('.pdf'));
        if (invalidFiles.length > 0) {
            setError(`Invalid file type: ${invalidFiles.map(f => f.name).join(', ')}. Only PDFs are allowed.`);
            return;
        }

        // Validate file size (10MB limit)
        const MAX_SIZE = 10 * 1024 * 1024;
        const oversizedFiles = selectedFiles.filter(file => file.size > MAX_SIZE);
        if (oversizedFiles.length > 0) {
            setError(`File too large: ${oversizedFiles.map(f => f.name).join(', ')}. Maximum size is 10MB.`);
            return;
        }

        setFiles(selectedFiles);
        setError(null);
        setResponse(null);
    };

    const handleSubmit = async () => {
        if (files.length === 0) return;

        setLoading(true);
        setError(null);
        const results = [];

        try {
            // Process each file individually
            for (const file of files) {
                setProcessingFile(file.name);

                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch("http://127.0.0.1:8000/api/syllabus/", {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();

                if (!res.ok) {
                    results.push({
                        fileName: file.name,
                        success: false,
                        error: data.error || "Failed to process file"
                    });
                } else {
                    results.push({
                        fileName: file.name,
                        success: true,
                        data: data
                    });
                }
            }

            setResponse(results);
        } catch (err) {
            setError(`Network error: ${err.message}. Make sure the Django server is running.`);
            console.error(err);
        } finally {
            setLoading(false);
            setProcessingFile(null);
        }
    };

    const saveToCalendar = async () => {
        if (response == null) return;

        setSaving(true);
        setError(null);

        try {
            for (const result of response) {
                if (!result.success) {
                    console.log(`Skipping ${result.fileName} - processing failed`);
                    continue;
                }

                setSavingFile(result.fileName);

                for (const date of result.data.dates) {
                    try {
                        const res = await fetch("http://127.0.0.1:8000/api/calendar/events/", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                'title': date.description,
                                'description': `From ${result.fileName}`,
                                'date': date.date,
                                'time': '8:00', // Replace this later
                                'type': date.event_type,
                                'course': 'MATH 151', // Replace this later
                                'color': '#FF5733' // Replace this later
                            })
                        });

                        const data = await res.json();

                        // Could check if the request was successful here (data.success) and then add to a counter of successfully added events

                    } catch (err) {
                        console.error(`Failed to create event: ${date.description}`);
                    }
                }
            }
        } catch (err) {
            setError(`Network error: ${err.message}. Make sure the Django server is running.`);
            console.error(err);
        } finally {
            setSaving(false);
            setSavingFile(null);
        }
    }

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold">Syllabus Reader</h1>
            </div>

            <p className="text-gray-600 mb-6">
                Upload syllabus PDF files to automatically extract important dates, deadlines, and course information.
            </p>

            {/* Error Alert */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-red-800 font-medium">Error</p>
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                </div>
            )}

            {/* Upload Box */}
            <label className="flex flex-col items-center justify-center w-full p-10 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                <UploadCloud className="w-10 h-10 text-gray-500 mb-3" />
                <span className="text-gray-700 font-medium">Click to upload PDFs</span>
                <span className="text-gray-500 text-sm">(You can select multiple files)</span>

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
                    <h2 className="font-medium text-gray-700">Selected Files ({files.length}):</h2>

                    {files.map((file, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition"
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="text-blue-600 w-5 h-5" />
                                <div>
                                    <p className="text-gray-800 font-medium">{file.name}</p>
                                    <p className="text-gray-500 text-xs">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFile(idx)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                disabled={loading}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Submit Button */}
            <div className="mt-6 space-y-2">
                <button
                    onClick={handleSubmit}
                    disabled={loading || files.length === 0}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 font-medium"
                >
                    {loading ? (
                        <>
                            <Loader className="w-5 h-5 animate-spin" />
                            Processing {processingFile}...
                        </>
                    ) : (
                        <>Process {files.length} {files.length === 1 ? 'PDF' : 'PDFs'}</>
                    )}
                </button>

                {/* Save to Calendar Button */}
                {response && (
                    <button
                        onClick={saveToCalendar}
                        disabled={saving}
                        className="w-full py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 font-medium"
                    >
                        {saving ? (
                            <>
                                <Loader className="w-5 h-5 animate-spin" />
                                Saving {savingFile} results...
                            </>
                        ) : (
                            <>Save results to Calendar</>
                        )}
                    </button>
                )}
            </div>

            {/* Response Preview */}
            {response && (
                <div className="mt-8 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-blue-600" />
                        Extraction Results
                    </h3>

                    {response.map((result, idx) => (
                        <div
                            key={idx}
                            className={`p-5 rounded-xl border ${result.success
                                ? 'bg-green-50 border-green-200'
                                : 'bg-red-50 border-red-200'
                                }`}
                        >
                            <div className="flex items-start gap-3 mb-3">
                                {result.success ? (
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                )}
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800">{result.fileName}</h4>

                                    {result.success ? (
                                        <div className="mt-3 space-y-3">
                                            {/* Summary */}
                                            <div className="text-sm text-gray-700">
                                                Found <span className="font-semibold text-blue-600">
                                                    {result.data.total_dates_found}
                                                </span> date(s)
                                            </div>

                                            {/* Dates List */}
                                            {result.data.dates && result.data.dates.length > 0 && (
                                                <div className="space-y-2">
                                                    <p className="text-sm font-medium text-gray-700">Extracted Dates:</p>
                                                    <div className="space-y-2 max-h-64 overflow-y-auto">
                                                        {result.data.dates.map((dateInfo, dateIdx) => (
                                                            <div
                                                                key={dateIdx}
                                                                className="p-3 bg-white rounded-lg border border-gray-200"
                                                            >
                                                                <div className="flex items-start justify-between gap-3">
                                                                    <div className="flex-1">
                                                                        <p className="font-medium text-gray-800">
                                                                            {dateInfo.date}
                                                                        </p>
                                                                        <p className="text-sm text-gray-600 mt-1">
                                                                            {dateInfo.description}
                                                                        </p>
                                                                    </div>
                                                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                                                        {dateInfo.event_type}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Text Preview */}
                                            {result.data.text_preview && (
                                                <details className="mt-3">
                                                    <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium">
                                                        View text preview
                                                    </summary>
                                                    <pre className="mt-2 text-xs text-gray-600 bg-white p-3 rounded border overflow-x-auto">
                                                        {result.data.text_preview}
                                                    </pre>
                                                </details>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-red-700 mt-2">{result.error}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Raw JSON Toggle */}
                    <details className="bg-gray-50 p-4 rounded-lg border">
                        <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                            View Raw JSON
                        </summary>
                        <pre className="mt-3 text-xs text-gray-800 overflow-x-auto">
                            {JSON.stringify(response, null, 2)}
                        </pre>
                    </details>
                </div>
            )}
        </div>
    );
}