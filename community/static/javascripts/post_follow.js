const requestFollowing = new XMLHttpRequest()

const onClickFollowing = (user_id) => {
    const url = '/following_ajax/';
    requestFollowing.open('POST', url, true);
    requestFollowing.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded',
    );
    requestFollowing.send(JSON.stringify({user_id:user_id}))
}

const followingHandleResponse = () => {
    if (requestFollowing.status < 400) {
        const {user_id} = JSON.parse(requestFollowing.response);
        const element = document.querySelector('.follow-wraper')
        console.log(element)
        element.innerHTML = `
        <button class="follow" onclick="onClickFollow(${user_id})">팔로우</button>
        `

    }

}

requestFollowing.onreadystatechange = () => {
if (requestFollowing.readyState === XMLHttpRequest.DONE) {
    followingHandleResponse();
    }
}

const requestFollow = new XMLHttpRequest()

const onClickFollow = (user_id) => {
    const url = '/follow_ajax/';
    requestFollow.open('POST', url, true);
    requestFollow.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded',
    );
    requestFollow.send(JSON.stringify({user_id:user_id}))
}

const followHandleResponse = () => {
    if (requestFollow.status < 400) {
        const {user_id} = JSON.parse(requestFollow.response);
        const element = document.querySelector(`.follow-wraper`)
        console.log(element)
        element.innerHTML = `    
        <button class='follow' onclick="onClickFollowing(${user_id})">팔로잉</button>
        `
    }

}
requestFollow.onreadystatechange = () => {
if (requestFollow.readyState === XMLHttpRequest.DONE) {
    followHandleResponse();
    }
}