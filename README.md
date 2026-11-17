# SignPlay! 🤟

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live Website](https://img.shields.io/badge/Live-Website-brightgreen)](https://signplay.onrender.com/)

**Learn sign language through play.**

SignPlay is a gamified web application for learning American Sign Language (ASL). Learners follow a 30-stage adventure, practise signs using their webcam, and apply their knowledge to solve mysteries and earn rewards.

**🌐 Live Website:** https://signplay.onrender.com/

> Making communication more inclusive, one sign at a time.

---

## ✨ Features

### 🎮 Two Ways to Play

- **Learn Mode:** Step-by-step lessons featuring demonstration videos, vocabulary exercises, quizzes, and webcam-based sign practice.
- **Mystery Mode:** Decode secret messages, gather clues, interact with characters, and solve mysteries using sign language knowledge.

### 📚 Three Levels, 30 Stages

| Level | Stages | Topics |
|---|---|---|
| Level 1: Foundations | 1–10 | Alphabet, numbers, greetings, family, food, daily routines |
| Level 2: Everyday Life & Interactions | 11–20 | Emotions, health, shopping, school, work, places |
| Level 3: Conversational Fluency & Culture | 21–30 | Directional verbs, facial grammar, classifiers, storytelling, Deaf culture |

### 🏆 Additional Features

- **Webcam Sign Checking:** Browser-based hand and pose tracking powered by MediaPipe.
- **Gamification:** Earn XP, stars, badges, and a trophy for completing the learning journey.
- **User Authentication:** Email/password and Google sign-in using Firebase Authentication.
- **Bilingual Interface:** English and Bahasa Melayu (BM).
- **Progress Tracking:** Save and synchronize learning progress across sessions.

---

## 🛠️ Tech Stack

| Area | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript (no build step) |
| Fonts | Baloo 2, Nunito (Google Fonts) |
| Authentication | Firebase Authentication |
| Hand and Pose Tracking | MediaPipe Hand Landmarker, Pose Landmarker |
| Model Training | Python |
| Local Environment | Conda / Python HTTP Server |
| Hosting | Render (Static Site) |

---

## 📁 Project Structure

```text
SignPlay/
├── README.md
├── LICENSE
├── .gitignore
├── .gitattributes
├── index.html              # Landing page
├── about.html              # About SignPlay
├── dashboard.html          # Learner dashboard
├── login.html              # Login page
├── register.html           # Registration page
├── profile.html            # Learner profile
├── firebase-config.js      # Firebase configuration
├── game-data.js            # Shared game data
├── sync.js                 # Progress synchronization
│
├── learn/                  # Learn Mode
│   ├── learningpath.html
│   ├── stage.html
│   ├── stage-lesson.html
│   ├── stage-1-2.html
│   ├── stage-21.html
│   ├── stage-22.html
│   ├── stage-29.html
│   ├── stage-boss.html
│   ├── progress.js
│   ├── sign-judge.js
│   └── stage-data.js
│
├── gestigo-app/            # Mystery Mode
│   ├── index.html
│   ├── answer_key.html
│   ├── serve.py
│   ├── css/
│   │   └── style.css
│   └── js/
│
├── image/                  # Images and website icon
├── members/                # Team profile images
├── models/                 # Browser MediaPipe models
│   ├── hand_landmarker.task
│   └── pose_landmarker_lite.task
├── videos/                 # Lesson and sign videos
│
└── ml/                     # Machine Learning Pipeline
    ├── extract_all.py
    ├── extract_one.py
    ├── preprocess.py
    ├── train.py
    ├── export.py
    ├── export_clips.py
    ├── analyze.py
    ├── check_data.py
    ├── check_words.py
    ├── inspect_zip.py
    ├── look_csv.py
    ├── webcam_test.html
    ├── words.txt
    ├── new_words.txt
    ├── data/
    ├── models/
    └── preview/
```

---

## 🚀 Getting Started

SignPlay can be accessed in two ways:

### 🌐 Option 1: Use SignPlay Online

**Recommended for users who want to try SignPlay without installing anything.**

Visit:

**https://signplay.onrender.com/**

No installation or local environment setup is required.

Allow camera access when prompted to use the webcam-based sign recognition features.

### 💻 Option 2: Run SignPlay Locally (Using Conda)

You can run SignPlay directly on your laptop using Anaconda or Miniconda.

This is useful for development, testing, or running the application without relying on the deployed website.

#### Prerequisites

Ensure you have:

- [Anaconda or Miniconda](https://www.anaconda.com/download)
- [Git](https://git-scm.com/downloads), or download the project ZIP
- A modern web browser (Google Chrome, Microsoft Edge, or Firefox)
- A webcam for sign recognition features

#### Step 1: Clone the Repository

Open **Anaconda Prompt** on Windows, or your terminal on macOS/Linux.

Run:

```bash
git clone https://github.com/hiyyu/SignPlay.git
cd SignPlay
```

Alternatively, download the ZIP file from GitHub and extract it.

Open Anaconda Prompt and navigate to the extracted `SignPlay` directory.

#### Step 2: Create a Conda Environment

Create an environment named `signplay` with Python 3.10:

```bash
conda create -n signplay python=3.10 -y
```

#### Step 3: Activate the Environment

```bash
conda activate signplay
```

You should see `(signplay)` at the beginning of your terminal prompt.

#### Step 4: Start the Local Server

Make sure you are inside the main `SignPlay` folder.

Run:

```bash
python -m http.server 8000
```

Expected output:

```text
Serving HTTP on :: port 8000 ...
```

Keep the terminal open while using SignPlay.

#### Step 5: Open SignPlay in Your Browser

Open your preferred browser and visit:

**Main Website**

http://localhost:8000/

**Learn Mode**

http://localhost:8000/learn/learningpath.html

**Mystery Mode (Gestigo)**

http://localhost:8000/gestigo-app/

You can now explore SignPlay locally.

#### Step 6: Stop the Server

When finished, return to Anaconda Prompt and press:

```text
Ctrl + C
```

Deactivate the Conda environment:

```bash
conda deactivate
```

### 📝 Important Notes for Local Setup

- The website uses HTML, CSS, and JavaScript and does not require a frontend build step.
- Python's built-in HTTP server is sufficient to serve the static website.
- Conda is used to manage Python environments and is optional if Python is already installed.
- The website must be accessed through `http://localhost:8000`, rather than opening HTML files directly.
- Webcam access is supported on `localhost` in modern browsers, subject to browser permissions.
- Firebase Authentication requires a working Firebase configuration and network access.
- Google Fonts and other external resources may require an internet connection.
- Machine learning training requires additional Python packages, described below.
- Running locally does not automatically make all features available offline.

---

## 🔥 Firebase Authentication Setup

SignPlay uses Firebase Authentication for user accounts.

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Create a Firebase project.
3. Navigate to **Authentication → Sign-in method**.
4. Enable:
   - Email/Password
   - Google
5. Navigate to **Authentication → Settings → Authorized domains**.
6. Add the domains you use, such as:
   - `signplay.onrender.com`
   - `localhost` (add it if not already listed)
7. Configure your Firebase web application settings in:

```text
firebase-config.js
```

Firebase Authentication requires an internet connection, including when running the website locally.

---

## 🤖 Machine Learning Setup (Optional)

This section is intended for developers who want to train, test, or improve SignPlay's sign recognition model.

**You do not need to train the model to use the website.**

### Step 1: Activate Conda

```bash
conda activate signplay
```

### Step 2: Install Dependencies

If the repository includes `ml/requirements.txt`, install it using:

```bash
pip install -r ml/requirements.txt
```

Alternatively, if an `environment.yml` file is provided:

```bash
conda env update -n signplay -f environment.yml
```

If neither file is available, install the dependencies required by the training scripts.

Common packages include:

```bash
pip install mediapipe opencv-python numpy pandas scikit-learn matplotlib
```

Depending on the training implementation, additional packages such as TensorFlow, PyTorch, or TensorFlow.js conversion tools may be required.

### Step 3: Verify Installation

```bash
python -c "import mediapipe, cv2; print('OK')"
```

If the installation succeeds, the terminal should display:

```text
OK
```

### Step 4: Prepare the Dataset

Place the downloaded sign language datasets in:

```text
ml/data/
```

Datasets are not committed to the repository because of their size and licensing restrictions.

### Step 5: Train or Update the Model

Navigate to the machine learning directory:

```bash
cd ml
```

Run the pipeline:

```bash
python extract_all.py
python preprocess.py
python train.py
python export.py
```

These scripts perform the following operations:

| Script | Purpose |
|---|---|
| `extract_all.py` | Extract hand and pose landmarks from videos |
| `preprocess.py` | Clean and normalize extracted data |
| `train.py` | Train the sign classification model |
| `export.py` | Export the trained model for browser integration |

### Step 6: Test Webcam Recognition

Return to the project root:

```bash
cd ..
python -m http.server 8000
```

Open:

http://localhost:8000/ml/webcam_test.html

Allow webcam access when prompted.

### Developer Tips

- Use VS Code to edit and test the project.
- Select the Conda Python interpreter through **Ctrl + Shift + P → Python: Select Interpreter**.
- Activate `signplay` before running training scripts.
- GPU acceleration may improve training performance for large datasets.
- Keep dataset files outside Git when licensing or file size restrictions apply.
- Use `conda deactivate` to exit the environment.

---

## 🌐 Live Application

SignPlay is hosted on **Render** and is publicly accessible at:

**[https://signplay.onrender.com/](https://signplay.onrender.com/)**

Users can explore the application directly through their web browser without installing any additional software.

For developers, contributors, or users who prefer running SignPlay on their own laptops, refer to the [Getting Started](#getting-started) section for local setup instructions using Conda.

---

## 📊 Datasets and Credits

SignPlay uses publicly available sign language research datasets and recordings collected with the consent of signers.

### ASL Citizen

Developed by Microsoft Research for sign language recognition research.

Usage is subject to the dataset's research and non-commercial licensing conditions.

### WLASL

A word-level American Sign Language dataset containing videos collected from online sources.

### Original Recordings

Additional recordings are created with the consent of participating signers.

**Note:** Each dataset retains its original licensing terms. Users should review the relevant licenses before redistribution or commercial use.

---

## 📜 Third-Party Licenses

SignPlay's original code and designs are released under the MIT License.

This license does not override the terms governing third-party resources, including:

- Sign language datasets and trained models
- [MediaPipe](https://github.com/google-ai-edge/mediapipe)
- [Firebase](https://firebase.google.com/)
- Google Fonts (Baloo 2 and Nunito)

---

## ♿ Accessibility and Community

SignPlay aims to make sign language education more accessible through interactive learning.

However, SignPlay is a learning aid and is not intended to replace instruction from qualified Deaf educators or fluent signers.

Feedback from the Deaf community is encouraged to improve the accuracy, inclusivity, and cultural relevance of the learning materials.

---

## 👥 Team

Team member profiles and information can be found in the `members/` directory.

---

## 🤝 Contributing

Contributions are welcome!

If you would like to improve SignPlay:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request.

For major changes, please open an issue first to discuss your proposal.

Learning content should be maintained in `learn/stage-data.js` where possible.

---

## 📄 License

SignPlay is released under the [MIT License](LICENSE).

Copyright © 2026 SignPlay.

---

**SignPlay! 🤟 — Making communication more inclusive, one sign at a time.**
