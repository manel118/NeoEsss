// const loginsec=document.querySelector('.login-section')
// const loginlink=document.querySelector('.login-link')
// const registerlink=document.querySelector('.register-link')
// registerlink.addEventListener('click',()=>{
//     loginsec.classList.add('active')
// })
// loginlink.addEventListener('click',()=>{
//     loginsec.classList.remove('active')
// })

const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');
var roleEle = document.getElementById("role");




form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // reset error messages
  emailError.textContent = '';
  passwordError.textContent = '';

  // collect form data
  const email = form.email.value;
  const password = form.password.value;
  const role =roleEle.options[roleEle.selectedIndex].value;
  console.log({ email, password, role })

  try {
    const res = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    console.log(data)

    if (data.user) {
      location.assign(`/${role}/dashboard`);
    }

    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
      console.log(data);
    }

  } catch (err) {
    console.log(err);
  }
});
