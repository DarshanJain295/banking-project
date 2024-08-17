var d = setTimeout(showdiv,2000);

function showdiv() {
        document.querySelector(".page").style.display = "block";
        document.querySelector(".preloader").style.display = "none";
};



let myAccountBalance = parseInt(document.getElementById("myAccountBalance").innerText);

function money()
{
   let username = document.getElementById("enterName").value;
   let amount = document.getElementById("enterAmount").value;
   let val = parseInt(document.getElementById("numbername").value);
   let enterAmount = parseInt(document.getElementById("enterAmount").value);
   if (enterAmount > val) {
      alert("Insufficient Balance.");
   }
   else
   {
      let container = document.getElementById("transaction-history-body");
      const text = document.createTextNode("Successfull transaction of $" + amount + " to " + username + "@email.com");
      container.appendChild(text);
      const lineBreak = document.createElement('br');
      container.appendChild(lineBreak);
      let amt = document.getElementById("numbername");
      amt.value = val - enterAmount;
      var newBal = parseInt(document.getElementById(username).innerHTML) + enterAmount;
      document.getElementById(username).innerHTML = newBal;
      alert(`Successful Transaction !!  $${amount} is sent to ${username}@email.com.`);
   }
}
