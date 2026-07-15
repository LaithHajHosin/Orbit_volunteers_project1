   let users=[]
     let editForm=document.getElementById("editForm")
     let deleteModel=document.getElementById("deleteModel")
     localStorage.setItem("userToken","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBvcmJpdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzg0MTk5Nzc5fQ.pvWTef8dnLvm1NUirIbIl8la4mfZFvSPVCljYEha2Xs")
       let currentPage=1
      let limit=10
    

     //  جلب المستخدمين من localStorage
const renderUsers = (users) => {
  const token=localStorage.getItem("userToken")
  if (token) {
    const bodyTable = document.getElementById("bodyTable");
    

    bodyTable.innerHTML = users.map((user) => `
        <tr>
             <td>${user.id}</td>
             <td>${user.username}</td>
             <td>${user.email}</td>
             <td>${user.role}</td>
             <td>${user.status}</td>
             <td class="action-btns">
                 <button class="btn btn-edit" onclick="editUser(${user.id})">
                     تعديل
                 </button>

                 <button class="btn btn-delete" onclick="deleteUser(${user.id})">
                     حذف
                 </button>
             </td>
         </tr>
     `).join("");
    
  }
    
};
  //  جلب المستخدمين من  api
  const fetchUsers = async () => {
    console.log("welcome")

    let localUsers = localStorage.getItem("users");
    localUsers=Array.from(localUsers)
     console.log(typeof(localUsers))
    if (localUsers.length == 0) {
        users = JSON.parse(localUsers);
         console.log("users")
        renderUsers(users);
        return;
    }

    try {
         const offset=(currentPage -1)*limit
      const backendUsersUrl = `http://volunteerorbit.atwebpages.com/api.php/users?limit=${limit}&offset=${offset}`;
      const proxyUsersUrl = `https://corsproxy.io/?${encodeURIComponent(backendUsersUrl)}`;

      console.log("hh")
        const response = await fetch(proxyUsersUrl);
        
        
        if (!response.ok){
              throw new Error("Failed to fetch users");
        }else{
         const result = await response.json();
        console.log(result)
        users=result.users

        localStorage.setItem("users", JSON.stringify(users));

        renderUsers(users);

        }

    } catch (error) {
        console.log(error);
    }
}
fetchUsers();
  
  


//  إخفاء القائمة
function cancelModel(){
  editForm.style.display="none"
  deleteModel.style.display="none"
  // console.log("here")
}

      //  حفظ التعديل
   const saveUser=(id)=>{
     let username=document.getElementById("name").value;
     let email=document.getElementById("email").value;
     let role =document.getElementById("role").value;
     console.log(users)
     users=users.map(user=>{
      if (user.id == id) {
        user.username=username;
        console.log(user.username)
        user.email=email;
          console.log(user.email)
        user.role=role;
          console.log(user.role)

        
      }
      return user
      
     })
      renderUsers(users)
  editForm.style.display="none"
  localStorage.setItem("users",JSON.stringify(users))
 
   }
  
  //  حذف مستخدم
  const deleteUser=(id)=>{
    deleteModel.style.display="block"
     deleteModel.innerHTML=`
     <div>
         <div class="overlay"> </div>
       <div class="delete-card"> 
         <h2> 🚫هل تريد  تأكيد الحذف </h2>
         <div class="buttons-row"> 
          <button class=" btn btn-dlt" onClick="saveDeleteUser(${id})">تأكيد </button>
          <button class="btn btn-cancel" onClick="cancelModel()"> إلغاء</button>
           </div>
          </div>
         </div>
     `
        }

         //  تأكيد حذف المستخدم
    const saveDeleteUser=(id)=>{
        users=users.filter(user=> user.id != id)
     localStorage.setItem("users",JSON.stringify(users))
     deleteModel.style.display="none"
        renderUsers(users)
      
    }
        // تعديل مستخدم
      const editUser=(id)=>{
        editForm.style.display="block"
       let user=users.find(user=>user.id == id)
        editForm.innerHTML=`
        <div class="overlay"> </div>
        <div class="edit-card">
        
          <h2>تعديل بيانات المستخدم</h2>
          <div class="edit-inputs">
            <div class="field">
              <label>الاسم</label>
              <input type="text" id="name" value="${user.username}">
            </div>

            <div class="field">
              <label>الإيميل</label>
              <input type="text" id="email" value="${user.email}">
            </div>

            <div class="field">
              <label>الدور</label>
              <input type="text" id="role" value="${user.role}">
            </div>

            <div class="button-row">
              <button class="btn btn-primary" onClick="saveUser(${user.id})">حفظ</button>
              <button class="btn btn-cancel" onClick="cancelModel()">إلغاء</button>
            </div>
          </div>
        </div>
        `
        console.log(user)

        }
  

  //  الفلترة
  const filterByRole=(role)=>{
    if (role === "all") {
      renderUsers(users)
      
    }else if(role=="admin"){
      const filterdUsers=users.filter(user=>user.role == "admin")
      renderUsers(filterdUsers)

    }else{
       const filterdUsers=users.filter(user=>user.role == "volunteer")
             renderUsers(filterdUsers)


    }
  }
  const filterByStatus=(status)=>{
     if (status == "all") {
      renderUsers(users)
     }else if(status == "active"){
      const filterdUsers=users.filter(user=>user.status == "active")
      renderUsers(filterdUsers)
     }
     else if(status == "inactive"){
      const filterdUsers=users.filter(user=>user.status == "inactive")
      renderUsers(filterdUsers)
     }
      else if(status == "suspended"){
      const filterdUsers=users.filter(user=>user.status == "suspended")
      renderUsers(filterdUsers)
     } else if(status == "pending"){
      const filterdUsers=users.filter(user=>user.status == "pending")
      renderUsers(filterdUsers)
     }
  }
  const generalFilter=(status , role)=>{
    let filterdUsers=users
    if (status !== "all") {
      filterdUsers=filterdUsers.filter(user=>user.status === status)
      
    }
    if (role !== "all") {
      filterdUsers=filterdUsers.filter(user=>user.role === role)
      
    }
    renderUsers(filterdUsers)
  }
  // prev & next btns
  const prev=document.getElementById("prevBtn")
 prev.addEventListener("click",()=>{
  if (currentPage > 1) {
    currentPage--;
    fetchUsers()
    
  }
 })
  const next=document.getElementById("nextBtn")
   next.addEventListener("click",()=>{
  if (currentPage >= 1) {
    currentPage++;
    fetchUsers()
    
  }
 })
     