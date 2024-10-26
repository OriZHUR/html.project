// פונקציה לבדוק אם המייל שהוזן תקין
function validateEmail() {
    const emailInput = document.getElementById('email'); 
    // קבלת השדה של המייל מהטופס לפי ה-ID שלו
    const emailError = document.getElementById('emailError'); 
    // אלמנט להצגת הודעת שגיאה אם המייל לא תקין
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    // תבנית רגולרית לבדיקה של תקינות המייל (תבנית בסיסית)

    if (!emailPattern.test(emailInput.value)) {
        emailError.style.display = 'block'; 
        // הצגת הודעת שגיאה אם המייל לא תואם את התבנית
        return false;
    } else {
        emailError.style.display = 'none'; 
        // הסתרת הודעת שגיאה אם המייל תקין
        return true;
    }
}

// פונקציה לבדוק אם הסיסמה שהוזנה תקינה
function validatePassword() {
    const passwordInput = document.getElementById('pass'); 
    // קבלת השדה של הסיסמה מהטופס לפי ה-ID שלו
    const passwordError = document.getElementById('passwordError'); 
    // אלמנט להצגת הודעת שגיאה אם הסיסמה לא תקינה

    // דרישות הסיסמה: לפחות 8 תווים, אות אחת לפחות ומספר אחד לפחות
    const passwordPattern = /^(?=.*[A-Za-zא-ת])(?=.*\d).{8,}$/; 
    // תבנית רגולרית לבדיקת הדרישות של הסיסמה

    if (!passwordPattern.test(passwordInput.value)) {
        passwordError.style.display = 'block'; 
        // הצגת הודעת שגיאה אם הסיסמה לא עומדת בדרישות
        return false;
    } else {
        passwordError.style.display = 'none'; 
        // הסתרת הודעת שגיאה אם הסיסמה תקינה
        return true;
    }
}

// פונקציה לבדוק אם שם המשתמש ייחודי
function isUsernameUnique(username) {
    const users = JSON.parse(localStorage.getItem('users')) || []; 
    // קבלת רשימת המשתמשים מ-localStorage והמרתה ממחרוזת לאובייקט JSON
    return !users.some(user => user.name === username); 
    // בדיקה אם כבר קיים משתמש עם שם זה, החזרה של true אם השם ייחודי
}

// פונקציה שמוודאת את תקינות הטופס
function validateForm() {
    const isEmailValid = validateEmail(); 
    // בדיקת תקינות המייל על ידי קריאה לפונקציה validateEmail
    const isPasswordValid = validatePassword(); 
    // בדיקת תקינות הסיסמה על ידי קריאה לפונקציה validatePassword
    const username = document.getElementById('name').value; 
    // קבלת שם המשתמש מהשדה בטופס לפי ה-ID שלו

    // בדיקת ייחודיות שם המשתמש
    if (!isUsernameUnique(username)) {
        alert('שם המשתמש כבר קיים במערכת. בחר שם משתמש אחר.'); 
        // הודעה אם שם המשתמש כבר קיים
        return false;
    }

    // אם המייל והסיסמה תקינים ושם המשתמש ייחודי, שמירת המשתמש והעברה לדף Login.html
    if (isEmailValid && isPasswordValid) {
        saveUser(); // קריאה לפונקציה לשמירת פרטי המשתמש
        redirectToLogin(); // העברה לדף ההתחברות
    }
}

// פונקציה לשמירת פרטי המשתמש ב-localStorage
function saveUser() {
    // קבלת ערכי השדות מהטופס לפי ה-IDs שלהם
    const name = document.getElementById('name').value;
    const password = document.getElementById('pass').value;
    const age = document.getElementById('age').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value; 
    // קבלת המין שנבחר באמצעות querySelector
    const doctors = Array.from(document.querySelectorAll('input[name^="DR"]:checked'))
                        .map(cb => cb.value); 
    // קבלת שמות הרופאים שנבחרו באמצעות תיבות סימון
    const email = document.getElementById('email').value;
    const image = document.getElementById('image').value;

    // יצירת אובייקט של המשתמש עם הפרטים שהוזנו
    const user = {
        name,
        password,
        age,
        gender,
        doctors, // שמות הרופאים שנבחרו
        email,
        image
    };

    // קבלת רשימת המשתמשים מ-localStorage (אם קיימת)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user); // הוספת המשתמש החדש לרשימה
    localStorage.setItem('users', JSON.stringify(users)); 
    // שמירת הרשימה ב-localStorage לאחר הוספת המשתמש החדש

    // איפוס הטופס לאחר שמירה
    document.getElementById('registrationForm').reset(); 
    // איפוס השדות בטופס למצב ההתחלתי
}

// פונקציה להעברה לדף Login.html
function redirectToLogin() {
    window.location.href = "Login.html"; 
    // העברה לדף ההתחברות על ידי שינוי המיקום של הדפדפן
}
