# SignPlay! 🤟

**Learn sign language through play!**

SignPlay is an interactive web app that makes learning American Sign Language (ASL) fun and engaging. Through games, webcam practice, and mystery-solving adventures, users can learn sign language while earning rewards and progressing through different stages.

🌐 **[Try SignPlay Here!](https://signplay.onrender.com/)**

> Making communication more inclusive, one sign at a time.

---

## ✨ Features

- 📚 **Learn Mode** — Learn ASL through interactive lessons, videos, and quizzes.
- 🕵️ **Mystery Mode** — Solve mysteries and uncover clues using sign language.
- 📷 **Webcam Practice** — Practise signs with real-time hand and pose tracking using MediaPipe.
- 🏆 **Rewards & Progress** — Earn XP, stars, badges, and trophies as you complete stages.
- 🗺️ **30 Learning Stages** — Progress through three levels, from basic signs to more advanced concepts.
- 🌏 **Bilingual Support** — Available in English and Bahasa Melayu.
- 👤 **User Accounts** — Sign in with email or Google and save your learning progress.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML, CSS, JavaScript | Web development |
| MediaPipe | Hand and pose tracking |
| Python | Sign recognition model training |
| Firebase | Authentication and progress synchronization |
| Render | Website hosting |

---

## 📁 Project Structure

```text
SignPlay/
├── index.html           # Homepage
├── dashboard.html       # User dashboard
├── login.html           # Login
├── register.html        # Registration
├── firebase-config.js   # Firebase setup
├── learn/               # Learn Mode (30 stages)
├── gestigo-app/         # Mystery Mode
├── image/               # Images and icons
├── videos/              # ASL learning videos
├── models/              # MediaPipe models
├── ml/                  # Machine learning pipeline
├── members/             # Team information
├── README.md
└── LICENSE
```

---

## 🚀 Getting Started

You can use SignPlay online or run it locally on your laptop.

### 🌐 Option 1: Play Online

Simply visit:

**https://signplay.onrender.com/**

No installation is required. Allow webcam access when prompted to use the sign recognition features.

### 💻 Option 2: Run Locally (Using Conda)

If you prefer to run SignPlay on your laptop, follow these steps.

**1. Install Anaconda or Miniconda**

Download and install [Anaconda](https://www.anaconda.com/download) or Miniconda.

**2. Clone the repository**

Open Anaconda Prompt and run:

```bash
git clone https://github.com/hiyyu/SignPlay.git
cd SignPlay
```

**3. Create and activate a Conda environment**

```bash
conda create -n signplay python=3.10 -y
conda activate signplay
```

**4. Start the local server**

```bash
python -m http.server 8000
```

**5. Open SignPlay**

Visit these links in your browser:

| Page | Local URL |
|---|---|
| Homepage | http://localhost:8000 |
| Learn Mode | http://localhost:8000/learn/learningpath.html |
| Mystery Mode | http://localhost:8000/gestigo-app/ |

**6. Stop the server**

Press `Ctrl + C` in Anaconda Prompt.

To exit Conda:

```bash
conda deactivate
```

**Note:** Conda is optional for running the website if Python is already installed. An internet connection is still required for Firebase and other external services. For local sign-in, ensure `localhost` is authorized in your Firebase project.

---

## 🤖 Machine Learning

SignPlay uses MediaPipe for browser-based hand and pose tracking, alongside a Python pipeline for developing its sign recognition model.

The `ml/` folder contains scripts for:

- Extracting hand and pose landmarks from sign language videos.
- Preparing and preprocessing training data.
- Training a sign recognition classifier.
- Exporting trained models for browser integration.

Model training is optional and is not required to play SignPlay.

---

## 📊 Datasets & Credits

SignPlay uses sign language datasets and original recordings, including:

- **ASL Citizen** — A sign language recognition dataset from Microsoft Research.
- **WLASL** — A word-level American Sign Language dataset.
- **Original Recordings** — Sign language recordings collected with the consent of participants.

Each dataset retains its own licensing and usage conditions.

---

## ♿ Accessibility

SignPlay aims to make sign language learning more accessible, interactive, and enjoyable.

It is designed as a learning aid and does not replace instruction from Deaf educators or fluent signers.

We welcome feedback to improve the learning experience and promote inclusive communication.

---

## 👥 Team

Meet the team behind SignPlay in the `members/` folder.

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Third-party datasets, libraries, and models retain their respective licenses.

Copyright © 2026 SignPlay Contributers.

---

**🤟 SignPlay — Making communication more inclusive, one sign at a time.**
