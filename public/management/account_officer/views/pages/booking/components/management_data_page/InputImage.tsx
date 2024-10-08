import React, { useEffect, useRef, useState } from 'react';
export interface Props {
    name: string;
    label: string;
    preview_url?: string,
}

const InputImage: React.FC<Props> = ({ name, label, preview_url, ...props }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (preview_url) {
            setPreview(preview_url);
        };

        return () => {
            setPreview(null)
        }
    }, [])

    const handleFileChange = () => {
        const fileInput = fileInputRef.current;
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
            <label>{label}</label>
            <input
                type="file"
                name={name}
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
            />
            {preview && (
                <div>
                    <img
                        src={preview}
                        alt="Image Preview"
                        style={{ marginTop: '10px', maxHeight: '80px' }}
                    />
                </div>
            )}
        </>
    );
};

export default InputImage;
