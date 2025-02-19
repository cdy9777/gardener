const requestFollowing = new XMLHttpRequest();

const onClickFollowing = (user_id) => {
  const url = "/following_ajax/";
  requestFollowing.open("POST", url, true);
  requestFollowing.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  requestFollowing.send(JSON.stringify({ user_id: user_id }));
};

const followingHandleResponse = () => {
  if (requestFollowing.status < 400) {
    const { user_id,  user_name, user_point, user_image_url, user_userid  } = JSON.parse(requestFollowing.response);
    const element = document.querySelectorAll(`.follow-wraper-${user_id}`);
    const followingObject = document.querySelector(`.follow-object-${user_id}`)
    console.log(element);
    element[0].innerHTML = `
        <div class="follow-${user_id}" style="display:inline;">
        <button onclick="onClickFollow(${user_id})" style="background: white; border: 1px solid #ACA790; padding:5px; border-radius:10px; font-size:16px;">팔로우</button>
        </div>
        `;
    followingObject.remove(followingObject)
    const is_list_Conatiner1 = document.querySelector(`.following-box #follow-user-box1`)
    const is_list_Conatiner2 = document.querySelector(`.following-box #follow-user-box2`)
    
    if ((is_list_Conatiner1 == null) && (is_list_Conatiner2 == null)) {
      const listConatiner = document.querySelector('.list-container')
      listConatiner.innerHTML += `
      <div class="text-center" style="margin-top: 50px; height: 300px;">
      <h4> 아직 함께하는 가드너가 없네요
      <img src="/static/images/sad.svg" alt="" style="width: 30px; height: 30px;"></h4>
      </div>`
    }
  }
};

requestFollowing.onreadystatechange = () => {
  if (requestFollowing.readyState === XMLHttpRequest.DONE) {
    followingHandleResponse();
  }
};
const requestFollow = new XMLHttpRequest();

const onClickFollow = (user_id) => {
  const url = "/follow_ajax/";
  requestFollow.open("POST", url, true);
  requestFollow.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  requestFollow.send(JSON.stringify({ user_id: user_id }));
};

const followHandleResponse = () => {
  if (requestFollow.status < 400) {
    const { user_id, user_name, user_point, user_image_url, user_userid } = JSON.parse(requestFollow.response); 
    const element = document.querySelectorAll(`.follow-wraper-${user_id}`);
    console.log(element);
    element[0].innerHTML = `    
        <div class='following-${user_id}' style="display:inline;">
        <button onclick="onClickFollowing(${user_id})"  style="background: white; border: 1px solid #ACA790; padding:5px; border-radius:10px; font-size:16px;">팔로잉</button>
        </div>
        `;
    const listConatiner = document.querySelector('.list-container')
    const is_list_Conatiner = document.querySelector(`.following-box #follow-user-box1`)
    const box1 = document.querySelectorAll(`#follow-user-box1`)
    const box2 = document.querySelectorAll(`#follow-user-box2`)
    console.log(listConatiner)
    if (is_list_Conatiner == null)
      listConatiner.innerHTML=''
    
    listConatiner.innerHTML += `
    <div class="row row-cols-2 row-cols-lg-2 p-3 follow-object-${user_id}" id="follow-user-box1">  
    <div class="col p-0 mt-2" id="follow-user-img">
    <img src="${user_image_url}">
    </div>
    <div class="col" style="width:80%">
    <h5 id="follow-name">
    <img src="/static/images/ID.png" alt="" style="width:20px; height:20px; margin-bottom: 5px;">
    ID : ${user_userid}</h5>
    <div class="follow-wraper-${user_id}" style="display:inline; ">
    <div class="following-${user_id}" style="display:inline;"> 
    <button onclick="onClickFollowing(${user_id})" style="background: white; border: 1px solid #ACA790; padding:5px; border-radius:10px; font-size:16px;">팔로잉</button>
    </div>
    </div>
    <hr class="m-1">
    <span> &nbsp; Name : ${user_name}</span><br>
    <span> &nbsp; Point : ${user_point}</span>
    </div>
    </div>
    `
  }
};
requestFollow.onreadystatechange = () => {
  if (requestFollow.readyState === XMLHttpRequest.DONE) {
    followHandleResponse();
  }
};

//  not my profile
const requestOtherFollowing = new XMLHttpRequest();

const onClickOtherFollowing = (user_id) => {
  const url = "/following_ajax/";
  requestOtherFollowing.open("POST", url, true);
  requestOtherFollowing.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  requestOtherFollowing.send(JSON.stringify({ user_id: user_id }));
};

const otherFollowingHandleResponse = () => {
  if (requestOtherFollowing.status < 400) {
    const { user_id,  user_name, user_point, user_image_url, user_userid  } = JSON.parse(requestOtherFollowing.response);
    const element = document.querySelectorAll(`.follow-wraper-${user_id}`);
    const followingObject = document.querySelector(`.follow-object-${user_id}`)
    console.log(element);
    if (element.length > 1){
      element[0].innerHTML = `
      <div class="follow-${user_id}" style="display:inline;">
      <button onclick="onClickOtherFollow(${user_id})" style="background: white; border: 1px solid #ACA790; padding:5px; border-radius:10px; font-size:16px;">팔로우</button>
      </div>
      `
      element[1].innerHTML = `
      <div class="follow-${user_id}" style="display:inline;">
      <button onclick="onClickOtherFollow(${user_id})" style="background: white; border: 1px solid #ACA790; padding:5px; border-radius:10px; font-size:16px;">팔로우</button>
      </div>
      `
    }
    else {
      element[0].innerHTML = `
      <div class="follow-${user_id}" style="display:inline;">
      <button onclick="onClickOtherFollow(${user_id})" style="background: white; border: 1px solid #ACA790; padding:5px; border-radius:10px; font-size:16px;">팔로우</button>
      </div>
      `
    }
  }
};

requestOtherFollowing.onreadystatechange = () => {
  if (requestOtherFollowing.readyState === XMLHttpRequest.DONE) {
    otherFollowingHandleResponse();
  }
};

const requestOtherFollow = new XMLHttpRequest();

const onClickOtherFollow = (user_id) => {
  const url = "/follow_ajax/";
  requestOtherFollow.open("POST", url, true);
  requestOtherFollow.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  requestOtherFollow.send(JSON.stringify({ user_id: user_id }));
};

const otherFollowHandleResponse = () => {
  if (requestOtherFollow.status < 400) {
    const { user_id, user_name, user_point, user_image_url, user_userid } = JSON.parse(requestOtherFollow.response); 
    const element = document.querySelectorAll(`.follow-wraper-${user_id}`);
    console.log(element);
    if (element.length>1){

      element[0].innerHTML = `    
      <div class='following-${user_id}' style="display:inline;">
      <button onclick="onClickOtherFollowing(${user_id})"  style="background: white; border: 1px solid #ACA790; padding:5px; border-radius:10px; font-size:16px;">팔로잉</button>
      </div>
      `;
      
      element[1].innerHTML = `    
      <div class='following-${user_id}' style="display:inline;">
      <button onclick="onClickOtherFollowing(${user_id})"  style="background: white; border: 1px solid #ACA790; padding:5px; border-radius:10px; font-size:16px;">팔로잉</button>
      </div>
      `;
    }
    else {
      element[0].innerHTML = `    
      <div class='following-${user_id}' style="display:inline;">
      <button onclick="onClickOtherFollowing(${user_id})"  style="background: white; border: 1px solid #ACA790; padding:5px; border-radius:10px; font-size:16px;">팔로잉</button>
      </div>
      `;
    }
      
  }
};
requestOtherFollow.onreadystatechange = () => {
  if (requestOtherFollow.readyState === XMLHttpRequest.DONE) {
    otherFollowHandleResponse();
  }
};