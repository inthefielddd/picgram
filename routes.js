//global
const HOME = "/";
const SEARCH = "/search";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

//users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

//videos
const PICTURES = "/pictures";
const UPLOAD = "/upload";
const PICTURE_DETAIL = "/:id";
const EDIT_PICTURE = "/:id/edit";
const DELETE_PICTURE = "/:id/delete";

//github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

//kakao
const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/oauth";

//google
const GOOGLE = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";

const routes = {
    home: HOME,
    search: SEARCH,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    users: USERS,
    userDetail: (id) => {
        if (id) {
            return `/users/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    pictures: PICTURES,
    upload: UPLOAD,
    pictureDetail: (id) => {
        if (id) {
            return `/pictures/${id}`;
        } else {
            return PICTURE_DETAIL;
        }
    },
    editPicture: (id) => {
        if (id) {
            return `/pictures/${id}/edit`;
        } else {
            return EDIT_PICTURE;
        }
    },
    deletePicture: (id) => {
        if (id) {
            return `/pictures/${id}/delete`;
        } else {
            return DELETE_PICTURE;
        }
    },
    github: GITHUB,
    gitHubCallback: GITHUB_CALLBACK,
    kakao: KAKAO,
    kakaoCallback: KAKAO_CALLBACK,
    google: GOOGLE,
    googleCallback: GOOGLE_CALLBACK,
};

export default routes;
