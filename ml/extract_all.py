import sys, os, zipfile, tempfile
import numpy as np, cv2, pandas as pd
import mediapipe as mp
from mediapipe.tasks import python as mpt
from mediapipe.tasks.python import vision

z = zipfile.ZipFile(sys.argv[1])
words = [w.strip().upper() for w in open("words.txt") if w.strip()]

def flat(lms, n):
    if lms is None:
        return np.zeros(n * 3, dtype=np.float32)
    return np.array([[p.x, p.y, p.z] for p in lms], dtype=np.float32).flatten()

def extract(member):
    hand = vision.HandLandmarker.create_from_options(vision.HandLandmarkerOptions(
        base_options=mpt.BaseOptions(model_asset_path="models/hand_landmarker.task"),
        running_mode=vision.RunningMode.VIDEO, num_hands=2))
    pose = vision.PoseLandmarker.create_from_options(vision.PoseLandmarkerOptions(
        base_options=mpt.BaseOptions(model_asset_path="models/pose_landmarker_lite.task"),
        running_mode=vision.RunningMode.VIDEO))
    with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as t:
        t.write(z.read(member))
        path = t.name
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    frames, i = [], 0
    while True:
        ok, img = cap.read()
        if not ok:
            break
        mp_img = mp.Image(image_format=mp.ImageFormat.SRGB,
                          data=cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        ts = int(i * 1000 / fps)
        h = hand.detect_for_video(mp_img, ts)
        p = pose.detect_for_video(mp_img, ts)
        i += 1
        left = right = None
        for lms, cat in zip(h.hand_landmarks, h.handedness):
            if cat[0].category_name == "Left":
                left = lms
            else:
                right = lms
        body = p.pose_landmarks[0] if p.pose_landmarks else None
        frames.append(np.concatenate([flat(left, 21), flat(right, 21), flat(body, 33)]))
    cap.release()
    os.remove(path)
    hand.close()
    pose.close()
    return np.array(frames, dtype=np.float32)

for split in ["train", "val", "test"]:
    with z.open(f"ASL_Citizen/splits/{split}.csv") as f:
        df = pd.read_csv(f)
    df = df[df["Gloss"].isin(words)]
    os.makedirs(f"data/landmarks/{split}", exist_ok=True)
    print(split, ":", len(df), "clips")
    for n, (_, r) in enumerate(df.iterrows(), 1):
        out = f"data/landmarks/{split}/{r['Gloss']}__{r['Participant ID']}__{r['Video file']}.npy"
        if os.path.exists(out):
            continue
        np.save(out, extract("ASL_Citizen/videos/" + r["Video file"]))
        if n % 10 == 0:
            print("  ", split, n, "of", len(df))
print("done")