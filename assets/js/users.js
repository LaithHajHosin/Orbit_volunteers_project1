   let users=[]
     let editForm=document.getElementById("editForm")
     let deleteModel=document.getElementById("deleteModel")
     localStorage.setItem("userToken","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBvcmJpdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzg0MTk5Nzc5fQ.pvWTef8dnLvm1NUirIbIl8la4mfZFvSPVCljYEha2Xs")
     

     //  جلب المستخدمين من localStorage
const renderUsers = (users) => {
   console.log(users)
    
  const token=localStorage.getItem("userToken")
  if (token) {
    const bodyTable = document.getElementById("bodyTable");
    const sortedUsers = [...users].sort((a, b) => {
    return a.id - b.id
});
console.log(sortedUsers)

    bodyTable.innerHTML = sortedUsers.map((user) => 
        `
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

renderUsers(users)
var currentPage=1
      var limit=2
  //  جلب المستخدمين من  api
  const fetchUsers = async () => {
    
    const token=localStorage.getItem("userToken")
    console.log(token)
    try {
        
   let offset = (currentPage - 1) * limit;
   console.log(offset)
   console.log(currentPage)

    const backendUsersUrl =
        `http://orbitvolunteers.atwebpages.com/users`;

    const proxyUsersUrl = `https://corsproxy.io/?${encodeURIComponent(backendUsersUrl)}`;


     fetch(proxyUsersUrl,{headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
     }})
    .then((res)=>{
        if(!res.ok){
            throw new Error("HTTP error! status: " + res.status);
            
        }else{
           return res.json()
           
        }
    }).then((result)=>{
        console.log(result.data)
        users=result.data
        console.log(users)
        localStorage.setItem("users",JSON.stringify(users))
       
        renderUsers(users);
        
    })
   

    } catch (error) {
        console.log(error);
    }
}

  
  


//  إخفاء القائمة
function cancelModel(){
  editForm.style.display="none"
  deleteModel.style.display="none"
  // console.log("here")
}

      //  حفظ التعديل
   const saveEditUser=(id)=>{
            const token=localStorage.getItem("userToken")
            const backendEditUrl =
        `http://orbitvolunteers.atwebpages.com/users/${id}`;

    const proxyEditUrl = `https://corsproxy.io/?${encodeURIComponent(backendEditUrl)}`;
         let username=document.getElementById("name").value;
     let email=document.getElementById("email").value;
     let role =document.getElementById("role").value;
     let status =document.getElementById("status").value;

     fetch(proxyEditUrl,
        {method:"PUT",
        headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username:username,
          email: email,
            role : role,
            status : status,

        })
    
     }).then(((res)=>{
            if (!res.ok) {
                throw new Error("update failed");
                
            } 
            return res.json()
        }))
        .then((result)=>{
            console.log(result)
             editForm.style.display = "none";

          renderUsers(users)
        })
   
     console.log(users)
     users=users.map(user=>{
      if (user.id == id) {
        user.username=username;
        console.log(user.username)
        user.email=email;
          console.log(user.email)
        user.role=role;
          console.log(user.role)
          user.status=status;
          console.log(user.status)

        
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
        const token=localStorage.getItem("userToken")
            const backendDeleteUrl =
        `http://orbitvolunteers.atwebpages.com/users/${id}`;

    const proxyDeleteUrl = `https://corsproxy.io/?${encodeURIComponent(backendDeleteUrl)}`;

        fetch(proxyDeleteUrl,{
            method:"DELETE",
                headers:{
                    Authorization: `Bearer ${token}`

                }   
            
        }).then((res)=>{
            if (!res.ok) {
                throw new Error("Delete Faild");
                
            }
           users=users.filter(user=> user.id != id)
            renderUsers(users)
             deleteModel.style.display="none"
        })
    
    }
        // تعديل مستخدم
      const editUser=(id)=>{
        users=JSON.parse(localStorage.getItem("users"))
        editForm.style.display="block"
       let user=users.find(user=>user.id == id)
       console.log(users)
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
              <div class="field">
              <label>الحالة</label>
              <input type="text" id="status" value="${user.status}">
            </div>

            <div class="button-row">
              <button class="btn btn-primary" onClick="saveEditUser(${user.id})">حفظ</button>
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
       users = JSON.parse(localStorage.getItem("users") || "[]");
       console.log(users)
       console.log(status)
     if (status == "all") {
      renderUsers(users)
     }else if(status == "active"){
      console.log(users)
      const filterdUsers=users.filter(user=>user.status == "active")
      
      renderUsers(filterdUsers)
      console.log(filterdUsers)
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
  // const generalFilter=(status , role)=>{
  //   let filterdUsers=users
  //   if (status !== "all") {
  //     filterdUsers=filterdUsers.filter(user=>user.status === status)
      
  //   }
  //   if (role !== "all") {
  //     filterdUsers=filterdUsers.filter(user=>user.role === role)
      
  //   }
  //   renderUsers(filterdUsers)
  // }
  // prev & next btns
//   const prev=document.getElementById("prevBtn")
//  prev.addEventListener("click",()=>{
//   if (currentPage > 1) {
//     console.log("prev")
//     currentPage--;
//     fetchUsers()
    
//   }
//  })
//   const next=document.getElementById("nextBtn")
//    next.addEventListener("click",()=>{
//   if (currentPage >= 1) {
//     console.log("prev")
//     currentPage++;
//     fetchUsers()
    
//   }
//  })
     fetchUsers();