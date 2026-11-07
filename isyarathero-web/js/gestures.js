/**
 * IsyaratHero / SignBridge - ASL Gesture Classification Engine
 * Analyzes 21 3D hand landmarks from MediaPipe Tasks Vision.
 */

export class GestureDetector {
  constructor(historySize = 5) {
    this.historySize = historySize;
    this.history = [];
    this.currentGesture = null;
    this.confidence = 0.0;
  }

  // Calculate Euclidean distance between two 3D landmarks
  distance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dz = (p1.z || 0) - (p2.z || 0);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  // Determine open/closed states for all 5 fingers
  getFingerStates(landmarks, handedness = "Right") {
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const thumbMcp = landmarks[2];

    const dTipWrist = this.distance(thumbTip, wrist);
    const dMcpWrist = this.distance(thumbMcp, wrist);

    // Thumb extended outward
    const thumbOpen = dTipWrist > dMcpWrist * 1.25;

    // Inverted Y axis in screen space: smaller Y = higher on screen
    const indexOpen = landmarks[8].y < landmarks[6].y;
    const middleOpen = landmarks[12].y < landmarks[10].y;
    const ringOpen = landmarks[16].y < landmarks[14].y;
    const pinkyOpen = landmarks[20].y < landmarks[18].y;

    return {
      thumb: thumbOpen,
      index: indexOpen,
      middle: middleOpen,
      ring: ringOpen,
      pinky: pinkyOpen
    };
  }

  // Classify landmarks into candidate ASL sign
  classify(landmarks, handedness = "Right") {
    if (!landmarks || landmarks.length < 21) {
      return { gesture: null, confidence: 0 };
    }

    const { thumb, index, middle, ring, pinky } = this.getFingerStates(landmarks, handedness);
    let detected = null;
    let score = 0.0;

    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    // Distance metrics
    const dThumbIndex = this.distance(thumbTip, indexTip);
    const dThumbMiddle = this.distance(thumbTip, middleTip);
    const dIndexMiddle = this.distance(indexTip, middleTip);

    // 1. ASL "I LOVE YOU" (ILY): Thumb, Index, Pinky extended; Middle and Ring folded
    if (thumb && index && !middle && !ring && pinky) {
      detected = "ILY";
      score = 0.98;
    }
    // 2. ASL "NO": Index and middle fingertips close to thumb tip (pinching / snapping), ring & pinky curled
    else if (!ring && !pinky && dThumbIndex < 0.065 && dThumbMiddle < 0.075) {
      detected = "NO";
      score = 0.95;
    }
    // 3. ASL "EAT": All fingertips clustered near thumb tip and held in upper half of frame (near mouth)
    else if (dThumbIndex < 0.07 && dThumbMiddle < 0.07 && wrist.y < 0.6) {
      const allClustered = this.distance(thumbTip, ringTip) < 0.09 && this.distance(thumbTip, pinkyTip) < 0.1;
      if (allClustered) {
        detected = "EAT";
        score = 0.93;
      } else {
        detected = "NO";
        score = 0.92;
      }
    }
    // 4. ASL "WHERE" or "PAIN": Single index finger pointing up or sideways
    else if (!thumb && index && !middle && !ring && !pinky) {
      // If index pointing horizontally (toward center of frame), classify as PAIN
      const indexHorizontal = Math.abs(landmarks[8].x - landmarks[6].x) > Math.abs(landmarks[8].y - landmarks[6].y);
      if (indexHorizontal) {
        detected = "PAIN";
        score = 0.92;
      } else {
        detected = "WHERE";
        score = 0.94;
      }
    }
    // 5. ASL "HELP" (Thumbs Up / Closed Fist with thumb up)
    else if (thumb && !index && !middle && !ring && !pinky) {
      if (thumbTip.y < landmarks[2].y) {
        detected = "HELP";
        score = 0.96;
      } else {
        detected = "YES";
        score = 0.90;
      }
    }
    // 6. ASL "YES": Closed fist with knuckles facing forward or downward
    else if (!thumb && !index && !middle && !ring && !pinky) {
      detected = "YES";
      score = 0.93;
    }
    // 7. ASL "STOP": Flat open vertical hand with all 5 fingers straight, palm facing forward/sideways
    else if (index && middle && ring && pinky && !thumb) {
      detected = "STOP";
      score = 0.94;
    }
    // 8. ASL "HELLO" vs "THANK_YOU" vs "PLEASE" vs "WHAT": Open 5 fingers
    else if (thumb && index && middle && ring && pinky) {
      // High in frame near face/head -> HELLO
      if (wrist.y < 0.42) {
        detected = "HELLO";
        score = 0.95;
      }
      // Held flat at chest height with fingers horizontal -> PLEASE / THANK_YOU
      else if (wrist.y >= 0.42 && wrist.y < 0.65) {
        detected = "THANK_YOU";
        score = 0.94;
      }
      // Low in frame with palm up -> WHAT
      else {
        detected = "WHAT";
        score = 0.91;
      }
    }
    // 9. ASL "DRINK": Curved fingers forming a C shape near mouth level
    else if (wrist.y < 0.65 && !indexOpen && !middleOpen && dThumbIndex > 0.06 && dThumbIndex < 0.15) {
      detected = "DRINK";
      score = 0.91;
    }

    // Temporal Smoothing
    if (detected) {
      this.history.push(detected);
      if (this.history.length > this.historySize) {
        this.history.shift();
      }

      // Majority voting
      const counts = {};
      this.history.forEach(g => { counts[g] = (counts[g] || 0) + 1; });
      let best = null, maxCount = 0;
      for (const k in counts) {
        if (counts[k] > maxCount) {
          maxCount = counts[k];
          best = k;
        }
      }

      const stability = maxCount / this.history.length;
      if (stability >= 0.6) {
        this.currentGesture = best;
        this.confidence = score * stability;
        return { gesture: this.currentGesture, confidence: this.confidence };
      }
    } else {
      if (this.history.length > 0) this.history.shift();
    }

    return { gesture: null, confidence: 0 };
  }
}
