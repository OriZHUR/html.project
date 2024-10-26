// פונקציה להצגת התרגיל ליום הנבחר על פי המשתמש המחובר
function showExercise(day) {
    // קבלת המשתמש המחובר מ-localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    // קריאה ל-localStorage לקבלת פרטי המשתמש המחובר, המומר ממחרוזת JSON לאובייקט.

    // בדיקת אם יש משתמש מחובר
    if (!loggedInUser) {
        // אם אין משתמש מחובר (אובייקט ריק), תוצג הודעה
        alert("לא נמצא משתמש מחובר.");
        // הצגת הודעת אזהרה למשתמש
        return;
        // סיום הפונקציה במידה ואין משתמש מחובר
    }

    // קבלת רשימת התרגילים של כל המשתמשים מ-localStorage
    const usersExercises = JSON.parse(localStorage.getItem('usersExercises')) || {};
    // קריאה ל-localStorage לקבלת רשימת התרגילים של כל המשתמשים.
    // אם הרשימה לא קיימת, תוחזר אובייקט ריק כאובייקט ברירת מחדל.

    // קבלת התרגיל עבור המשתמש המחובר ביום הנבחר
    const exercise = usersExercises[loggedInUser.name]?.[day] || "לא הוגדר תרגיל ליום זה";
    // חיפוש התרגיל עבור המשתמש המחובר ביום הנבחר.
    // אם אין תרגיל מוגדר לאותו יום, יוצג טקסט ברירת מחדל "לא הוגדר תרגיל ליום זה".

    // הצגת התרגיל
    document.getElementById('exerciseText').innerText = exercise;
    // עדכון טקסט ה-HTML באלמנט עם ה-ID 'exerciseText' להצגת התרגיל הנבחר.
}
