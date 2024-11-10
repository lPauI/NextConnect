// components/TagSelector.js
import { useState } from 'react';
import { predefinedTags } from "../../utils/tags";

function TagSelector({ onSaveTags, existingTags = [] }) {
    const [selectedTags, setSelectedTags] = useState(existingTags);

    const toggleTag = (tag) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
    };

    const handleSave = () => {
        onSaveTags(selectedTags);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h3 className="text-lg font-semibold mb-4">Select Your Interests</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {predefinedTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1 rounded-full border transition-all duration-200 ${
                                selectedTags.includes(tag)
                                    ? "bg-purple-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleSave}
                    className="w-full bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition duration-200"
                >
                    Save Interests
                </button>
            </div>
        </div>
    );
}

export default TagSelector;
