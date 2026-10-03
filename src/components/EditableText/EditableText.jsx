import { useState } from 'react';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import './EditableText.css';

export default function EditableText({ contentKey, initialText, isAdminMode, onSave }) {
    const [text, setText] = useState(initialText);
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(initialText);

    const handleSave = () => {
        setText(tempText);
        setIsEditing(false);
        if (onSave) {
            onSave(contentKey, tempText);
        }
    };

    const handleCancel = () => {
        setTempText(text);
        setIsEditing(false);
    };

    if (isAdminMode && isEditing) {
        return (
            <span className="inline-edit-container active">
                <textarea 
                    value={tempText} 
                    onChange={(e) => setTempText(e.target.value)}
                    rows={2}
                />
                <div className="edit-actions">
                    <button onClick={handleSave} className="save-btn" title="Запази">
                        <FaCheck />
                    </button>
                    <button onClick={handleCancel} className="cancel-btn" title="Отказ">
                        <FaTimes />
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
                    onClick={() => { setTempText(text); setIsEditing(true); }} 
                    className={`edit-trigger-button ${isAdminMode ? 'active' : ''}`} 
                    title="Редактирай текста"
                >
                    <FaEdit />
                </button>
            )}
        </span>
    );
}