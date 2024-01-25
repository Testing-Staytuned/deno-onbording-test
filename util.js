// main.js

export function generateVerificationCode() {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    return verificationCode;
  }
  
  export async function sendVerificationcode() {
    const email = document.getElementById('email').value;
    const verificationCode = generateVerificationCode();
  
    try {
      const response = await fetch(`http://localhost:3000/send-verification?email=${email}&code=${verificationCode}`, { method: 'POST' });
      const result = await response.json();
  
      if (response.ok) {
        alert('Code sent!');
        document.getElementById('formContainer2').style.display = 'block';
      } else {
        alert('Error sending verification: ' + result.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to fetch. Check console for details.');
    }
  }
  
  export function submitVerification() {
    const email = document.getElementById('email').value;
    const verificationCode1 = document.getElementById('verificationCode').value;
  
    if (verificationCode1 == verificationCode) {
      alert('Verification successful!');
    } else {
      alert('Verification failed!');
    }
  }
  
  export function showVerificationForm() {
    document.getElementById('applyBtn').style.display = 'none';
    document.getElementById('formContainer').style.display = 'block';
  }
  