// פונקציה לבדוק אם שם המשתמש והסיסמה תואמים למשתמשים ב-localStorage
function validateLogin() {
    const usernameInput = document.getElementById('username').value;
    // קבלת שם המשתמש שהוזן בשדה הטופס לפי ה-ID שלו
    const passwordInput = document.getElementById('password').value;
    // קבלת הסיסמה שהוזנה בשדה הטופס לפי ה-ID שלה
    const loginError = document.getElementById('loginError');
    // אלמנט להצגת הודעת שגיאה אם שם המשתמש או הסיסמה לא נכונים

    // קבלת רשימת המשתמשים מ-localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // קריאה ל-localStorage לקבלת הרשימה של המשתמשים ששמורים. אם אין משתמשים, תוחזר רשימה ריקה.

    // חיפוש משתמש שתואם את שם המשתמש והסיסמה שהוזנו
    const user = users.find(user => user.name === usernameInput && user.password === passwordInput);
    // חיפוש ברשימת המשתמשים כדי למצוא משתמש עם שם וסיסמה תואמים

    if (user) {
        // אם נמצא משתמש שתואם לשם והסיסמה שהוזנו
        alert("התחברות מוצלחת!"); 
        // הודעה על התחברות מוצלחת
        loginError.style.display = 'none'; 
        // הסתרת הודעת שגיאה אם ההתחברות הצליחה

        // שמירת המשתמש המחובר ב-localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        // שמירת פרטי המשתמש המחובר (האובייקט) ב-localStorage תחת המפתח 'loggedInUser'

        // העברה לדף התרגילים עם שם המשתמש המחובר
        window.location.href = "exercise.html"; 
        // שינוי המיקום של הדפדפן לדף "exercise.html"
    } else {
        // אם לא נמצא משתמש שתואם לשם והסיסמה שהוזנו
        loginError.style.display = 'block'; 
        // הצגת הודעת שגיאה אם שם המשתמש או הסיסמה לא נכונים
    }
}
