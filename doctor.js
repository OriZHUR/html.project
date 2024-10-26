// פונקציה להוספת תרגיל למשתמש ביום מסוים ושמירתו ב-localStorage
function addExercise() {
    const username = document.getElementById('username').value; 
    // קבלת שם המשתמש שנבחר מהתפריט (dropdown) לפי ה-ID שלו
    const day = document.getElementById('day').value; 
    // קבלת היום שנבחר מהתפריט (dropdown) לפי ה-ID שלו
    const exercise = document.getElementById('exercise').value; 
    // קבלת התרגיל שהוזן בשדה הטקסט לפי ה-ID שלו

    // קבלת רשימת התרגילים של כל המשתמשים מ-localStorage או יצירת אובייקט חדש אם היא לא קיימת
    let usersExercises = JSON.parse(localStorage.getItem('usersExercises')) || {};

    // אם למשתמש הנבחר אין תרגילים, יצירת אובייקט חדש עבורו
    if (!usersExercises[username]) {
        usersExercises[username] = {};
        // יצירת אובייקט חדש לשמירת התרגילים של המשתמש במקרה שאין תרגילים קודמים
    }

    // הוספת התרגיל ליום שנבחר
    usersExercises[username][day] = exercise;
    // שמירת התרגיל תחת היום שנבחר באובייקט של המשתמש

    // שמירת העדכונים ב-localStorage
    localStorage.setItem('usersExercises', JSON.stringify(usersExercises));
    // המרה של אובייקט התרגילים למחרוזת JSON ושמירתו ב-localStorage

    // הודעה על הצלחה
    alert('התרגיל נוסף בהצלחה למשתמש ' + username + ' עבור יום ' + day);
    // הודעה על כך שהתרגיל נוסף בהצלחה למשתמש וליום שנבחר

    // איפוס הטופס לאחר ההוספה
    document.getElementById('exerciseForm').reset();
    // איפוס כל השדות בטופס כדי לאפשר הוספת תרגיל נוסף
}

// פונקציה להטענת משתמשים מ-localStorage
function loadUsers() {
    // קבלת רשימת המשתמשים מ-localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // המרה של מחרוזת JSON לרשימת המשתמשים. אם אין משתמשים, מחזירה רשימה ריקה.

    // מילוי רשימת המשתמשים בתפריט הבחירה
    const userSelect = document.getElementById('username');
    // מציאת אלמנט התפריט (dropdown) לשמות המשתמשים לפי ה-ID שלו
    userSelect.innerHTML = ''; 
    // איפוס התוכן של תפריט הבחירה לפני הוספת משתמשים חדשים

    if (users.length === 0) {
        alert('לא נמצאו משתמשים.');
        // הודעה אם לא נמצאו משתמשים ברשימת ה-localStorage
        return;
        // סיום הפונקציה אם אין משתמשים
    }

    // לולאת forEach לעבור על כל משתמש ברשימה ולהוסיף אותו לתפריט
    users.forEach(user => {
        const option = document.createElement('option');
        // יצירת אלמנט חדש מסוג <option> עבור כל משתמש
        option.value = user.name; 
        // שימוש בשם המשתמש בתור הערך הייחודי של האפשרות
        option.textContent = user.name; 
        // הצגת שם המשתמש בתפריט הבחירה
        userSelect.appendChild(option);
        // הוספת האפשרות לתפריט הבחירה
    });
}

// טעינת המשתמשים כאשר הדף נטען
window.onload = loadUsers;
// קריאה לפונקציה loadUsers אוטומטית עם טעינת הדף כדי למלא את תפריט הבחירה עם שמות המשתמשים
