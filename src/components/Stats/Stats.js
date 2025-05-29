import React, { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import { PlusCircle, Trash2 } from "lucide-react";
import "./Stats.css";

const Stats = () => {
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [posterData, setPosterData] = useState(null);
  const [formData, setFormData] = useState({
    heading: "",
    details: "",
    image: null,
  });
  const [successMsg, setSuccessMsg] = useState("");
  const certificateRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const name = user.displayName || user.email.split("@")[0];
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
        setUsername(formattedName);

        const progressRef = doc(db, "gameProgress", user.uid);
        const progressSnap = await getDoc(progressRef);
        if (progressSnap.exists()) {
          setProgress(progressSnap.data());
        }

        const posterRef = doc(db, "posters", user.uid);
        const posterSnap = await getDoc(posterRef);
        if (posterSnap.exists()) {
          setPosterData(posterSnap.data());
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCreateToggle = () => {
    setShowForm(!showForm);
  };

  const handleFormChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  

  const handleUpload = async () => {
    const user = auth.currentUser;
    if (!formData.image || !formData.heading || !formData.details || !user) return;

    const imageRef = ref(storage, `posters/${user.uid}`);
    await uploadBytes(imageRef, formData.image);
    const imageUrl = await getDownloadURL(imageRef);

    const posterRef = doc(db, "posters", user.uid);
    await setDoc(posterRef, {
      heading: formData.heading,
      details: formData.details,
      imageUrl,
      uploader: username,
      uid: user.uid,
    });

    setPosterData({
      heading: formData.heading,
      details: formData.details,
      imageUrl,
      uploader: username,
    });

    setSuccessMsg("✅ Poster uploaded successfully!");
    setShowForm(false);
    setFormData({ heading: "", details: "", image: null });

    setTimeout(() => setSuccessMsg(""), 3000);

    
  };

  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const imageRef = ref(storage, `posters/${user.uid}`);
    await deleteObject(imageRef).catch(() => {});
    await deleteDoc(doc(db, "posters", user.uid));
    setPosterData(null);
  };

  const downloadCertificate = () => {
    html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save(`Certificate-${username}.pdf`);
    });
  };

  const allCompleted = progress.education && progress.protection && progress.survival;
  

  return (
    <div className="stats-container">
      <h2>Your Progress, {username}</h2>

      <ul className="stats-list">
        <li>📚 Education Game: {progress.education ? "✅ Completed" : "❌ Not Completed"}</li>
        <li>🛡️ Protection Game: {progress.protection ? "✅ Completed" : "❌ Not Completed"}</li>
        <li>🧬 Survival Game: {progress.survival ? "✅ Completed" : "❌ Not Completed"}</li>
      </ul>

      {allCompleted && (
        <>
          <div className="certificate" ref={certificateRef}>
            <h3>🎓 Certificate of Achievement</h3>
            <p>This is to proudly certify that</p>
            <h2 className="username">{username}</h2>
            <p>has successfully completed all educational games on</p>
            <h4>Children's Rights Platform</h4>
            <p className="date">{new Date().toLocaleDateString()}</p>
            <p className="signature">— The Dev Team</p>
          </div>
          <button className="download-btn" onClick={downloadCertificate}>
            ⬇️ Download Certificate
          </button>
        </>
      )}

      <div className="poster-actions">
        {!posterData ? (
          <button className="create-btn" onClick={handleCreateToggle}>
            <PlusCircle size={20} /> Create Poster
          </button>
        ) : (
          <button className="delete-btn" onClick={handleDelete}>
            <Trash2 size={20} /> Delete Poster
          </button>
        )}
      </div>

      {successMsg && <motion.div className="upload-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{successMsg}</motion.div>}

      {showForm && (
        <motion.div
          className="upload-form"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4>Create a Poster</h4>
          <input type="text" name="heading" placeholder="Heading" value={formData.heading} onChange={handleFormChange} />
          <textarea name="details" placeholder="Details" value={formData.details} onChange={handleFormChange}></textarea>
          <input type="file" accept="image/*" name="image" onChange={handleFormChange} />
          <button className="upload-btn" onClick={handleUpload}>Upload Poster</button>
        </motion.div>
      )}
    </div>
  );
};

export default Stats;
