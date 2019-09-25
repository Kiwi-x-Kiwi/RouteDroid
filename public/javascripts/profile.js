document.addEventListener('DOMContentLoaded', () => {

  const deleteBtn = document.getElementById("delete-btn");

  deleteBtn.addEventListener("click", (e)=>{
    confirmDelete = confirm("Are you sure you want to delete your account?")

    if(confirmDelete){
      const enterpriseID = deleteBtn.dataset.id;
      console.log(enterpriseID);
      axios.post(`/enterprise/${enterpriseID}/delete`)
        .then(res =>{
          console.log("Success", res)
          location.assign("/")
        })
        .catch(err => console.error(err))
    }
  })

}, false);
