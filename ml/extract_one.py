import sys, os, zipfile, tempfile
import numpy as np, cv2, pandas as pd
import mediapipe as mp
from mediapipe.tasks import python as mpt
from mediapipe.tasks.python import vision

zip_path = sys.argv[1]
z = zipfile.ZipFile(zip_path)

with z.open("ASL_Citizen/splits/train.csv") as f:
    train = pd.read_csv(f)
row = train[train["Gloss"] == "HELLO"].iloc[0]
member = "ASL_Citizen/videos/" + row["Video file"]
print("using clip:", member)

hand = vision.HandLandmarker.create_from_options(vision.HandLandmarkerOptions(
    base_options=mpt.BaseOptions(model_asset_path="models/hand_landmarker.task"),
    running_mode=vision.RunningMode.VIDEO, num_hands=2))
pose = vision.PoseLandmarker.create_from_options(vision.PoseLandmarkerOptions(
    base_options=mpt.BaseOptions(model_asset_path="models/pose_landmarker_lite.task"),
    running_mode=vision.RunningMode.VIDEO))

def flat(lms, n):
    if lms is None:
        return np.zeros(n * 3, dtype=np.float32)
    return np.array([[p.x, p.y, p.z] for p in lms], dtype=np.float32).flatten()

with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as t:
    t.write(z.read(member))
    path = t.name

cap = cv2.VideoCapture(path)
fps = cap.get(cv2.CAP_PROP_FPS) or 30
frames, n_hand_frames, i = [], 0, 0
while True:
    ok, img = cap.read()
    if not ok:
        break
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    mp_img = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
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
    if left or right:
        n_hand_frames += 1
    body = p.pose_landmarks[0] if p.pose_landmarks else None
    frames.append(np.concatenate([flat(left, 21), flat(right, 21), flat(body, 33)]))

cap.release()
os.remove(path)

arr = np.array(frames, dtype=np.float32)
print("shape (frames, numbers per frame):", arr.shape)
print("frames where a hand was found:", n_hand_frames, "of", len(frames))
os.makedirs("data/test", exist_ok=True)
np.save("data/test/hello_one.npy", arr)
print("saved data/test/hello_one.npy")