/* Sign lists for the vocabulary stages. Used by stage.html?stage=N
   Stages: 3, 4, 5, 6, 7, 8, 9, 11-19, 23, 24, 25.
   Each sign: [word shown to the learner, how to sign it, common mistake]
   - The word must match the trained model (sign-judge.js) to get the real webcam check.
     Words the model does not know fall back to the simulated check.
   - v (demo video path) is empty for now: add it to each sign, e.g. v:"videos/hello.mp4".
   NOTE: draft descriptions. Please have a Deaf signer review them before launch.
   Lines that just say "Copy the handshape and movement from the demo video" need a
   proper description once you have the demo videos. */
(function () {
  var G = "Copy the handshape and movement from the demo video.";
  var M = "Compare your movement with the demo video.";

  function S(id, title, goal, signs) {
    return {
      id: id, level: Math.ceil(id / 10), title: title, goal: goal, xp: 50, pass: 70, review: [],
      signs: signs.map(function (a) { return { w: a[0], v: "", t: a[1], m: a[2] }; })
    };
  }

  window.STAGE_DATA = {
    3: S(3, "Time & Calendar", "Days of the week and parts of the day.", [
      ["Monday", "Make an M handshape (three fingers down) and draw a small circle in front of you.", "Make a smooth circle. Don’t shake the hand."],
      ["Tuesday", "Make a T handshape (thumb between index and middle finger) and draw a small circle.", "The handshape is T, not M."],
      ["Friday", "Make an F handshape (index finger and thumb touching) and draw a small circle.", "Keep the other three fingers up and spread."],
      ["Morning", "Rest one flat hand against your other arm, then lift it up like the sun rising.", "Rise slowly, like a sunrise."],
      ["Night", "Hold one arm flat in front of you. Curve your other hand over it, like the sun going down.", "Curve the hand over the arm, like a sunset."]]),

    4: S(4, "Core Survival & Greetings", "Learn the signs you need to greet people and ask for help.", [
      ["Hello", "Flat hand at your forehead, then move it outward in a small salute.", "It is not a wave. Keep it small and away from the head."],
      ["Goodbye", "Open hand facing out, fingers fold down and up as you wave.", "Fold the fingers, don’t swing the whole arm."],
      ["Please", "Flat hand on your chest, rub in a slow circle.", "Keep the circle on the chest and take it slowly."],
      ["Thank you", "Fingertips of a flat hand touch your chin, then move forward and down.", "Start at the chin, and move toward the person."],
      ["Sorry", "Fist on your chest, rub in a circle.", "Use a fist. A flat hand means “please”."],
      ["Help", "Fist on top of your open palm, lift both hands up together.", "Lift both hands together as one movement."],
      ["Bathroom", "Make a T-shape fist (thumb between index and middle) and shake it side to side.", "Shake the hand, don’t wave it."]]),

    5: S(5, "Personal Pronouns & Identity", "Me, you, name and introducing yourself.", [
      ["Me", "Point your index finger at your own chest.", "Point at yourself, not forward."],
      ["You", "Point your index finger at the other person.", "Point toward them, not at yourself."],
      ["Name", "Make an H with both hands (index and middle fingers together). Tap the top H across the other one twice.", "Tap twice and keep the two fingers together."],
      ["Hello", "Flat hand at your forehead, then move it outward in a small salute.", "Keep it small and away from the head."]]),

    6: S(6, "Family & Relationships", "Mom, dad, siblings, friends and marital status.", [
      ["Mother", "Open hand with spread fingers. Tap your thumb on your chin.", "Thumb touches the chin and the fingers stay spread."],
      ["Father", "Open hand with spread fingers. Tap your thumb on your forehead.", "Thumb touches the forehead, not the chin."],
      ["Sister", "Slide your thumb along your jaw (girl), then bring both index fingers together.", "Do both parts: the jaw slide, then the join."],
      ["Brother", "Grab an imaginary cap brim at your forehead (boy), then bring both index fingers together.", "Do both parts: the forehead grab, then the join."],
      ["Friend", "Hook your index fingers together, then switch which one is on top and hook again.", "Hook twice, and swap the top finger."],
      ["Marry", "Clasp both hands together, with one hand coming down onto the other.", "Bring the hands together gently, as in a clasp."]]),

    7: S(7, "Colors, Shapes & Clothes", "Basic wardrobe items and visual descriptors.", [
      ["Red", "Brush your index finger downward across your lips.", "Brush down over the lips. Don’t just point."],
      ["Blue", "Make a B handshape (flat hand) and twist your wrist back and forth.", "Twist the wrist. Don’t wave the whole arm."],
      ["Green", "Make a G handshape and shake or twist it.", "Keep the handshape steady while you shake."],
      ["Yellow", "Make a Y handshape (thumb and little finger out) and twist your wrist.", "Twist the wrist and keep the Y shape."],
      ["Black", "Draw your index finger across your forehead.", "Draw it sideways across the forehead."],
      ["White", "Place your open hand on your chest and pull it away while the fingers close.", "Pull away and close the fingers as you go."],
      ["Shirt", "Pinch the fabric of your shirt near the shoulder.", "Touch your own shirt, not the air."],
      ["Shoes", "Tap two fists together side by side, twice.", "Tap twice and keep the fists side by side."]]),

    8: S(8, "Food & Drink Essentials", "Water, eating, common meals and dietary signs.", [
      ["Water", "Make a W handshape (three fingers up) and tap your chin twice.", "Tap the chin. Don’t touch the mouth."],
      ["Eat", "Bunch your fingertips together and tap them on your lips.", "Tap twice toward the mouth."],
      ["Drink", "Make a C shape with your hand and tip it toward your mouth, like a cup.", "Tip the hand toward the mouth, don’t just raise it."],
      ["Milk", "Squeeze your fist open and closed, like milking.", "Squeeze two or three times."],
      ["Bread", "Slide the fingers of one hand down the back of your other hand, like slicing.", "Slice down the back of the other hand."]]),

    9: S(9, "Home & Daily Routine", "Rooms, sleeping and everyday places at home.", [
      ["Home", "Touch your bunched fingertips to the corner of your mouth, then to your cheek.", "Two touches: mouth, then cheek."],
      ["Sleep", "Hold an open hand in front of your face and close the fingers as it moves down, as your eyes close.", "Close the fingers as the hand moves down."],
      ["Kitchen", "Make K handshapes and tap them on your palm, first one side and then the other.", "Tap both sides of the hand."],
      ["Bedroom", "Tilt your head against a flat hand (bed), then draw a box in the air with both hands (room).", "Do both parts: bed, then room."]]),

    11: S(11, "Emotions & Feelings", "Happy, sad, angry, tired and excited.", [
      ["Happy", "Brush a flat hand upward on your chest twice, with a smile.", "Brush up the chest. Don’t pat it."],
      ["Sad", "Open both hands in front of your face and drop them down, with a sad face.", "Show it on your face as well as your hands."],
      ["Angry", "Curl your fingers like claws in front of your face and pull them toward you, with an angry face.", "Tense the fingers and show it on your face."],
      ["Tired", "Rest bent hands on your chest and let them drop as your shoulders slump.", "Let the shoulders slump too."],
      ["Excited", "Touch the middle fingers of both hands to your chest and circle them upward, one after the other.", "Alternate the hands. Don’t move them together."]]),

    12: S(12, "Health & The Body", "Head, stomach, pain, doctor, hospital and feeling sick.", [
      ["Head", "Touch your fingers to your temple, then to your jaw.", "Touch your own head, not the air."],
      ["Stomach", "Rest a flat hand on your stomach.", "Rest the hand on your stomach, not your chest."],
      ["Pain", "Point both index fingers toward each other and twist them, with a pained face.", "Twist the fingers and show the pain on your face."],
      ["Doctor", "Tap the fingers of one hand on the wrist of the other, as if taking a pulse.", "Tap the wrist, not the palm."],
      ["Hospital", "Draw a cross (+) on your upper arm with an H handshape.", "Draw the cross on your upper arm."],
      ["Sick", "Touch the middle finger of one hand to your forehead and the middle finger of the other to your stomach.", "Touch both places: forehead and stomach."]]),

    13: S(13, "Restaurant & Dining Out", "Ordering food, asking for the check and paying.", [
      ["Restaurant", G, M],
      ["Hungry", "Make a C handshape and move it down the middle of your chest.", "Move it down the chest, from the throat to the stomach."],
      ["Order", G, M],
      ["Pay", "Flick your index finger outward off your open palm, as if handing over money.", "Flick away from you."]]),

    14: S(14, "Shopping & Money", "Prices, buying, paying, cheap and expensive.", [
      ["Price", G, M],
      ["Buy", "Slide a flat hand out across the palm of your other hand, as if handing over money.", "Move the hand away from the palm."],
      ["Pay", "Flick your index finger outward off your open palm, as if handing over money.", "Flick away from you."],
      ["Cheap", G, M],
      ["Expensive", G, M],
      ["Money", "Tap your bunched fingertips on your open palm.", "Tap the palm a couple of times."]]),

    15: S(15, "Hobbies & Sports", "Soccer, reading, music, gaming and swimming.", [
      ["Soccer", G, M],
      ["Read", "Move two fingers (a V) down the palm of your other hand, like eyes scanning a page.", "Move the V down the palm, slowly."],
      ["Music", "Swing a flat hand back and forth over your other forearm.", "Swing smoothly like a conductor."],
      ["Game", "Hold two fists up and tap them together side to side.", "Tap them together, don’t wave them."],
      ["Swim", "Move both flat hands forward and out, like swimming strokes.", "Make the strokes alternate."],
      ["Run", G, M]]),

    16: S(16, "School & Education", "Classroom words, teacher, student and studying.", [
      ["Teacher", "Sign TEACH (flat O hands move out from your forehead), then PERSON (flat hands move down).", "Do both parts: teach, then person."],
      ["Student", "Sign LEARN (take from your palm to your forehead), then PERSON (flat hands move down).", "Do both parts: learn, then person."],
      ["School", "Clap your flat hands together twice.", "Clap twice, with a clear sound-like movement."],
      ["Book", "Place your flat palms together and open them like a book.", "Open the hands from the side, like a book."],
      ["Study", "Wiggle your fingers toward your open palm, as if soaking in information.", "Keep wiggling the fingers toward the palm."],
      ["Class", "Make C handshapes and circle them outward until the little fingers meet.", "Circle outward and bring the hands together."]]),

    17: S(17, "Work & Professions", "Office, computer, boss, meeting and work.", [
      ["Office", G, M],
      ["Computer", G, M],
      ["Boss", "Tap your fingertips on your shoulder.", "Tap the shoulder, not the chest."],
      ["Meeting", G, M],
      ["Work", "Tap the wrist of one fist on the wrist of the other, twice.", "Tap twice, wrist on wrist."]]),

    18: S(18, "Weather & Nature", "Sun, rain, snow, hot and cold.", [
      ["Sun", G, M],
      ["Rain", "Spread the fingers of both hands and move them down several times, like rain falling.", "Move the hands down together."],
      ["Snow", "Wiggle your fingers as both hands float down, like snowflakes.", "Wiggle the fingers as the hands drift down."],
      ["Hot", "Hold a C shape at your mouth and twist it away, as if taking something hot out.", "Twist away from the mouth."],
      ["Cold", "Make two fists and shiver them in front of you.", "Shiver your shoulders as well."]]),

    19: S(19, "Places Around Town", "Park, library, bank, school and asking where.", [
      ["Park", G, M],
      ["Library", "Make an L handshape and circle it in front of you.", "Keep the L shape and draw a small circle."],
      ["Bank", G, M],
      ["Where", "Point your index finger and shake it side to side, with your eyebrows down.", "Lower your eyebrows. It is a Wh- question."],
      ["School", "Clap your flat hands together twice.", "Clap twice."]]),

    23: S(23, "Travel & Transportation", "Airplane, train, hotel, tickets and travel.", [
      ["Airplane", "Make a Y handshape (thumb and little finger out) and move it forward and up, like a plane taking off.", "Move it up and away, not just forward."],
      ["Train", "Slide two fingers of one hand back and forth across two fingers of the other, like a train on tracks.", "Slide across, don’t tap."],
      ["Hotel", G, M],
      ["Ticket", G, M],
      ["Travel", "Make a V handshape and wiggle the fingers as the hand moves forward.", "Wiggle the fingers while moving forward."]]),

    24: S(24, "Emergencies & Safety", "Police, fire, earthquake, danger and asking for help.", [
      ["Police", "Make a C handshape and tap it on your chest, like a badge.", "Tap the chest. Keep the C shape."],
      ["Fire", "Wiggle your fingers upward, like flames.", "Wiggle the fingers as the hands rise."],
      ["Earthquake", G, M],
      ["Danger", G, M],
      ["Help", "Fist on top of your open palm, lift both hands up together.", "Lift both hands together as one movement."]]),

    25: S(25, "Technology & Modern Life", "Phone, internet, text, email and computer.", [
      ["Phone", "Make a Y handshape and hold it to your ear and mouth.", "Keep the Y shape, with the thumb at the ear."],
      ["Internet", G, M],
      ["Text", "Tap both thumbs in front of you, as if texting.", "Tap the thumbs, not the whole hands."],
      ["Email", G, M],
      ["Computer", G, M]])
  };
})();
