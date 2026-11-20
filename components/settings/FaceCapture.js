"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CameraIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { btnMain, btnSoft } from "./fields";

export default function FaceCapture({ onCapture }) {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [live, setLive] = useState(false);
  const [error, setError] = useState("");

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setLive(false);
  }, []);

  // পেজ ছাড়লে ক্যামেরা বন্ধ
  useEffect(() => stop, [stop]);

  useEffect(() => {
    if (live && videoRef.current) videoRef.current.srcObject = streamRef.current;
  }, [live]);

  const start = async () => {
    setError("");
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      setLive(true);
    } catch {
      setError(t("verify.cameraError"));
    }
  };

  const snap = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (blob) onCapture(new File([blob], "face.jpg", { type: "image/jpeg" }));
        stop();
      },
      "image/jpeg",
      0.9,
    );
  };

  return (
    <div className="space-y-3">
      {live ? (
        <>
          <video ref={videoRef} autoPlay playsInline muted className="aspect-[4/3] w-full -scale-x-100 rounded-xl bg-black object-cover" />
          <div className="flex gap-2">
            <button type="button" onClick={snap} className={btnMain}>
              <CameraIcon className="h-5 w-5" />
              {t("verify.capture")}
            </button>
            <button type="button" onClick={stop} className={btnSoft}>
              {t("verify.cancel")}
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={start} className={btnMain}>
            <CameraIcon className="h-5 w-5" />
            {t("verify.takeSelfie")}
          </button>
        </div>
      )}
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
