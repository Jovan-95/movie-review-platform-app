import { useState } from "react";
import { uploadAvatar } from "../services";
import type { UploadFileProps } from "../types";
import { showInfoToast, showSuccessToast } from "./Toast";

export default function UploadFile({
  editUserFormFields,
  currentUser,
}: UploadFileProps) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleUpload = async () => {
    if (!file) return showInfoToast("Select a file first");
    try {
      const publicUrl = await uploadAvatar(file, "test-user");
      setUrl(publicUrl);
      showSuccessToast("Upload successful!");
      //   console.log("Public URL:", publicUrl);

      // Update users table sa novim URL-om
      editUserFormFields({
        userId: String(currentUser.id),
        editedObj: { profileImage: publicUrl },
      });
    } catch (err: any) {
      alert("Error: " + err.message);
      console.error(err);
    }
  };

  return (
    <div className="upload-file-wrapper">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {file && <button onClick={handleUpload}>Upload Avatar</button>}
      {url && (
        <img
          src={url}
          alt="Uploaded"
          style={{ width: "120px", marginTop: "10px" }}
        />
      )}
    </div>
  );
}
