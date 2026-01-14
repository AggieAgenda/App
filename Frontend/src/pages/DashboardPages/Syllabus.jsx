import { useState, useEffect } from "react";
import { Plus, BookOpen, MapPin, User, Calendar, GraduationCap, Clock, Edit, Trash2, X, UploadCloud, FileText, Loader, CheckCircle, XCircle } from "lucide-react";

const MAROON = "#500000";

export default function Classes() {
    const [classes, setClasses] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [showSyllabusReader, setShowSyllabusReader] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // Load classes on component mount
    useEffect(() => {
        loadClasses();
    }, []);

    const loadClasses = async (forceBackend = false) => {
        setIsLoading(true);
        setLoadError(null);

        try {
            // If not forcing backend, prefer cache
            if (!forceBackend) {
            const cached = localStorage.getItem("courses");
            if (cached) {
                const parsed = JSON.parse(cached);
                setClasses(Array.isArray(parsed) ? parsed : (parsed.courses ?? []));
                setIsLoading(false);
                return;
            }
            }

            // Force backend OR no cache available
            const token =
            localStorage.getItem("token") ||
            localStorage.getItem("authToken");

            if (!token) {
            setLoadError("No authentication token found. Please log in again.");
            setIsLoading(false);
            return;
            }

            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/courses/`, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
            throw new Error(data?.detail || data?.error || `Failed to load classes (${res.status})`);
            }

            const courses = Array.isArray(data) ? data : (data?.courses ?? []);
            setClasses(courses);
            localStorage.setItem("courses", JSON.stringify(courses));
        } catch (err) {
            setLoadError(err.message || "Unknown error");
            setClasses([]);
        } finally {
            setIsLoading(false);
        }
        };


    const updateLocalStorage = (updatedClasses) => {
        localStorage.setItem('courses', JSON.stringify(updatedClasses));
    };

    const handleDeleteClass = (classId) => {
        if (confirm("Are you sure you want to delete this class?")) {
            const updatedClasses = classes.filter(c => c.id !== classId);
            setClasses(updatedClasses);
            updateLocalStorage(updatedClasses);
        }
    };

    const handleCreateClass = (classData) => {
        let updatedClasses;
        
        if (editingClass) {
            updatedClasses = classes.map(c =>
                c.id === editingClass.id ? { ...classData, id: c.id } : c
            );
        } else {
            updatedClasses = [...classes, { ...classData, id: Date.now() }];
        }
        
        setClasses(updatedClasses);
        updateLocalStorage(updatedClasses);
        setShowCreateModal(false);
        setEditingClass(null);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">My Classes</h1>
                    <p className="text-gray-600 mt-1">Manage your course schedule and information</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={loadClasses}
                        className="px-4 py-3 rounded-xl border-2 font-semibold hover:bg-gray-50 transition flex items-center gap-2"
                        style={{ borderColor: MAROON, color: MAROON }}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader size={20} className="animate-spin" /> : <UploadCloud size={20} />}
                        {isLoading ? "Loading..." : "Reload from Backend"}
                    </button>
                    <button
                        onClick={() => {
                            setEditingClass(null);
                            setShowCreateModal(true);
                        }}
                        className="px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition shadow-sm flex items-center gap-2"
                        style={{ backgroundColor: MAROON }}
                    >
                        <Plus size={20} />
                        Add Class
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {loadError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-red-800">Failed to load classes</p>
                        <p className="text-sm text-red-700">{loadError}</p>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {isLoading && classes.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
                    <Loader className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Loading your classes...</h3>
                    <p className="text-gray-600">Please wait while we fetch your course information</p>
                </div>
            ) : (
                <>
                    {/* Classes Grid */}
                    {classes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {classes.map(classItem => (
                                <ClassCard
                                    key={classItem.id}
                                    classItem={classItem}
                                    onEdit={() => {
                                        setEditingClass(classItem);
                                        setShowCreateModal(true);
                                    }}
                                    onDelete={() => handleDeleteClass(classItem.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
                            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No classes yet</h3>
                            <p className="text-gray-600 mb-6">Add your first class to get started</p>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition inline-flex items-center gap-2"
                                style={{ backgroundColor: MAROON }}
                            >
                                <Plus size={20} />
                                Add Your First Class
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Create/Edit Modal */}
            {showCreateModal && (
                <ClassFormModal
                    classData={editingClass}
                    onClose={() => {
                        setShowCreateModal(false);
                        setEditingClass(null);
                        setShowSyllabusReader(false);
                    }}
                    onSave={handleCreateClass}
                    showSyllabusReader={showSyllabusReader}
                    setShowSyllabusReader={setShowSyllabusReader}
                />
            )}
        </div>
    );
}

function ClassCard({ classItem, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden">
            <div className="h-2" style={{ backgroundColor: classItem.color }}></div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-extrabold text-gray-900">{classItem.name}</h3>
                        <p className="text-sm text-gray-600">{classItem.fullName}</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onEdit}
                            className="p-2 rounded-lg hover:bg-gray-100 transition"
                            title="Edit class"
                        >
                            <Edit size={18} className="text-gray-600" />
                        </button>
                        <button
                            onClick={onDelete}
                            className="p-2 rounded-lg hover:bg-red-50 transition"
                            title="Delete class"
                        >
                            <Trash2 size={18} className="text-red-600" />
                        </button>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                        <User size={16} className="text-gray-400" />
                        <span>{classItem.professor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{classItem.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={16} className="text-gray-400" />
                        <span>{classItem.meetingTimes}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={16} className="text-gray-400" />
                        <span>Exam: {new Date(classItem.examDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                        <GraduationCap size={16} className="text-gray-400" />
                        <span>{classItem.creditHours} Credit Hours</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ClassFormModal({ classData, onClose, onSave, showSyllabusReader, setShowSyllabusReader }) {
    const [formData, setFormData] = useState(classData || {
        name: "",
        fullName: "",
        professor: "",
        location: "",
        examDate: "",
        creditHours: 3,
        meetingTimes: "",
        color: "#3B82F6"
    });

    const handleSubmit = async() => {
        if (!formData.name || !formData.fullName || !formData.professor) {
            alert("Please fill in required fields (Class Code, Full Name, Professor)");
            return;
        }
        onSave(formData);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/courses/update`, {
                method: "POST",
                body: formData,
            });
        if (!res.ok){
            console.log("ERROR Saving ")
        }
    };

    const handleSyllabusData = (extractedData) => {
        // Auto-fill form with extracted syllabus data
        // This is a placeholder - you'll customize based on your syllabus extraction format
        if (extractedData.courseName) setFormData(prev => ({ ...prev, fullName: extractedData.courseName }));
        if (extractedData.professor) setFormData(prev => ({ ...prev, professor: extractedData.professor }));
        if (extractedData.location) setFormData(prev => ({ ...prev, location: extractedData.location }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-extrabold text-gray-900">
                        {classData ? "Edit Class" : "Add New Class"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Syllabus Reader Toggle */}
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <UploadCloud className="text-blue-600" size={24} />
                                <div>
                                    <p className="font-semibold text-gray-900">Auto-fill from Syllabus</p>
                                    <p className="text-sm text-gray-600">Upload your syllabus PDF to extract course information</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowSyllabusReader(!showSyllabusReader)}
                                className="px-4 py-2 rounded-lg font-semibold transition"
                                style={{
                                    backgroundColor: showSyllabusReader ? "#E5E7EB" : MAROON,
                                    color: showSyllabusReader ? "#374151" : "white"
                                }}
                            >
                                {showSyllabusReader ? "Hide" : "Upload Syllabus"}
                            </button>
                        </div>
                    </div>

                    {/* Syllabus Reader Component */}
                    {showSyllabusReader && (
                        <div className="mb-6">
                            <SyllabusReader onDataExtracted={handleSyllabusData} />
                        </div>
                    )}

                    {/* Manual Form */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
                                    Class Code *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ex: CSCE 314"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                                    style={{ outlineColor: MAROON }}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    placeholder="Ex: Programming Languages"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                                    style={{ outlineColor: MAROON }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
                                    Professor *
                                </label>
                                <input
                                    type="text"
                                    value={formData.professor}
                                    onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
                                    placeholder="Ex: Dr. Smith"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                                    style={{ outlineColor: MAROON }}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Ex: HRBB 124"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                                    style={{ outlineColor: MAROON }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
                                Meeting Times
                            </label>
                            <input
                                type="text"
                                value={formData.meetingTimes}
                                onChange={(e) => setFormData({ ...formData, meetingTimes: e.target.value })}
                                placeholder="Ex: MWF 10:20-11:10 AM"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                                style={{ outlineColor: MAROON }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
                                    Exam Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.examDate}
                                    onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                                    style={{ outlineColor: MAROON }}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
                                    Credit Hours
                                </label>
                                <input
                                    type="number"
                                    value={formData.creditHours}
                                    onChange={(e) => setFormData({ ...formData, creditHours: parseInt(e.target.value) })}
                                    min="1"
                                    max="6"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                                    style={{ outlineColor: MAROON }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
                                Color Tag
                            </label>
                            <div className="flex gap-3">
                                {["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setFormData({ ...formData, color })}
                                        className="w-10 h-10 rounded-lg border-2 transition"
                                        style={{
                                            backgroundColor: color,
                                            borderColor: formData.color === color ? MAROON : "transparent"
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 rounded-lg border-2 font-semibold hover:bg-gray-50 transition"
                            style={{ borderColor: MAROON, color: MAROON }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
                            style={{ backgroundColor: MAROON }}
                        >
                            {classData ? "Save Changes" : "Add Class"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SyllabusReader({ onDataExtracted }) {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFiles = [...e.target.files];

        const invalidFiles = selectedFiles.filter(file => !file.name.endsWith('.pdf'));
        if (invalidFiles.length > 0) {
            setError(`Invalid file type. Only PDFs are allowed.`);
            return;
        }

        const MAX_SIZE = 10 * 1024 * 1024;
        const oversizedFiles = selectedFiles.filter(file => file.size > MAX_SIZE);
        if (oversizedFiles.length > 0) {
            setError(`File too large. Maximum size is 10MB.`);
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

        try {
            const formData = new FormData();
            formData.append("file", files[0]);

            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/syllabus/`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to process file");
            } else {
                setResponse(data);
                if (onDataExtracted) {
                    onDataExtracted(data);
                }
            }
        } catch (err) {
            setError(`Network error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
            <div className="flex items-center gap-3 mb-4">
                <FileText className="text-blue-600" size={24} />
                <h3 className="font-bold text-gray-900">Syllabus Parser</h3>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-800 text-sm">{error}</p>
                </div>
            )}

            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-gray-700 font-medium">Upload Syllabus PDF</span>
                <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>

            {files.length > 0 && (
                <div className="mt-4">
                    <p className="text-sm text-gray-700 mb-2">Selected: {files[0].name}</p>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader className="w-4 h-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Extract Information"
                        )}
                    </button>
                </div>
            )}

            {response && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="font-semibold text-green-800">Successfully extracted!</p>
                    </div>
                    <p className="text-sm text-green-700">Found {response.total_dates_found} dates and events</p>
                </div>
            )}
        </div>
    );
}