import { useState, useEffect } from 'react';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import './EditableText.css';

export default function EditableText({ contentKey, initialText, isAdminMode, onSave }) {
    const [text, setText] = useState(initialText);
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(initialText);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        setText(initialText);
        setTempText(initialText);
    }, [initialText]);

    const handleSave = async () => {
        setIsSaving(true);
        setErrorMessage(null);

        try {
            if (onSave) {
                await onSave(contentKey, tempText);
            }
            setText(tempText);
            setIsEditing(false);
        } catch (err) {
            setErrorMessage(err.message || "Грешка при запис.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setTempText(text);
        setErrorMessage(null);
        setIsEditing(false);
    };

    if (isAdminMode && isEditing) {
        return (
            <span className={`inline-edit-container active ${isSaving ? 'saving' : ''}`}>
                <textarea
                    value={tempText}
                    onChange={(e) => setTempText(e.target.value)}
                    rows={2}
                    disabled={isSaving}
                />
                
                {errorMessage && <span className="editable-error-msg">{errorMessage}</span>}

                <div className="edit-actions">
                    <button 
                        onClick={handleSave} 
                        className="save-btn" 
                        title="Запази"
                        disabled={isSaving}
                    >
                        <FaCheck /> {isSaving ? "Записване..." : "Запази"}
                    </button>
                    <button 
                        onClick={handleCancel} 
                        className="cancel-btn" 
                        title="Отказ"
                        disabled={isSaving}
                    >
                        <FaTimes /> Отказ
                    </button>
                </div>
            </span>
        );
    }

    return (
        <span className="editable-wrapper">
            {text}
            {isAdminMode && (
                <button
                    onClick={() => { setTempText(text); setErrorMessage(null); setIsEditing(true); }}
                    className={`edit-trigger-button ${isAdminMode ? 'active' : ''}`}
                    title="Редактирай текста"
                >
                    <FaEdit />
                </button>
            )}
        </span>
    );
}