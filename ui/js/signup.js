const signupForm = document.getElementById('signn-form');
const feedback2 = document.querySelector('#feedback2');
const feedback9 = document.querySelector('#feedback9');
function signup(e) {
  e.preventDefault();
  console.log('uuu');
  const password = document.querySelector('.pass2').value;
  const confirmPassword = document.querySelector('.cpass2').value;
  const email = document.querySelector('.email2').value;
  const firstName = document.querySelector('.name2').value;
  const lastName = document.querySelector('.lname2').value;

  const url = 'http://127.0.0.1:8000/api/v1/auth/signup';

  const data = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,

  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((result) => {
      if (result.status === 201) {
        console.log(result);
        localStorage.setItem('x-access-token', result.data[0].token);
        window.location.href = './user.html';
      } else if (result.status === 409) {
        feedback2.innerHTML = `The email ${email} already exists`;
        feedback2.style.display = 'block';
      } else if (result.status === 500) {
        // Internal server error
        feedback9.style.display = 'block';
        feedback9.innerHTML = 'An error occured while trying to sign you up, please try again.';
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.signinText').innerHTML = 'Sign up';
      }
    });
}
signupForm.addEventListener('submit', signup);
const redirect = () => {
  const feedback4 = document.querySelector('#feedback4');
  const feedback5 = document.querySelector('#feedback5');
  const feedback1 = document.querySelector('#feedback1');
  const feedback3 = document.querySelector('#feedback3');
  const userPassword = document.querySelector('.pass2').value;
  const usercPassword = document.querySelector('.cpass2').value;
  const userEmail = document.querySelector('.email2').value;
  const userName = document.querySelector('.name2').value;
  const userlName = document.querySelector('.lname2').value;
  const reg = /^[a-zA-Z]+$/;
  // userEmail not an email address
  if (userName === '') {
    // User fields empty
    feedback3.innerHTML = 'First name field is empty';
    feedback3.style.display = 'block';
  } else if (userName.length < 2) {
    // User fields empty
    feedback3.innerHTML = 'First name must contain a minimum of 2 characters';
    feedback3.style.display = 'block';
  } else if (!reg.test(userName)) {
    // User fields empty
    feedback3.innerHTML = 'Invalid input for firstname';
    feedback3.style.display = 'block';
  } if (userlName === '') {
    // User fields empty
    feedback1.innerHTML = 'Last name field is empty';
    feedback1.style.display = 'block';
  } else if (userlName.length < 2) {
    // User fields empty
    feedback1.innerHTML = 'Last name must contain a minimum of 2 characters';
    feedback1.style.display = 'block';
  } else if (!reg.test(userlName)) {
    // User fields empty
    feedback1.innerHTML = 'Invalid input for last name';
    feedback1.style.display = 'block';
  } if (userEmail === '') {
    // User fields empty
    feedback2.innerHTML = 'Email field is empty';
    feedback2.style.display = 'block';
  } else if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail))) {
    feedback2.innerHTML = 'Not a valid email address';
    feedback2.style.display = 'block';
  } if (userPassword === '') {
    // User fields empty
    feedback4.innerHTML = 'Password field is empty';
    feedback4.style.display = 'block';
  } else if (userPassword.length <= 5) {
    // User fields empty
    feedback4.innerHTML = 'Password must contain a min of 5 characters';
    feedback4.style.display = 'block';
  } if (usercPassword === '') {
    // User fields empty
    feedback5.innerHTML = 'Please confirm password';
    feedback5.style.display = 'block';
  } else if (userPassword !== usercPassword) {
    // User fields empty
    feedback5.innerHTML = 'passwords do not match';
    feedback5.style.display = 'block';
  } else {
    // Show spinner and Loading
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('.signupText').innerHTML = 'Loading';
  }
};
