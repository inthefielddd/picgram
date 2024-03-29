import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 },
    } = req;

    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            const user = await User({
                name,
                email,
            });
            console.log(user);
            //만든계정과 비밀번호 등록하기
            await User.register(user, password);
            next();
        } catch (error) {
            res.redirect(routes.home);
        }
    }
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home,
});

//github
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: { id, avatar_url: avatarUrl, name, email },
    } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.githubId = id;
            user.avatarUrl = avatarUrl;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            name,
            email,
            avatarUrl,
            githubId: id,
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

//다시 화면으로 렌더
export const postSocialLogin = (req, res) => {
    res.redirect(routes.home);
};

//kakao
export const kakaoLogin = passport.authenticate("kakao");

//kakaocallback
export const kakaoLoginCallback = async (_, __, profile, done) => {
    const {
        _json: {
            id,
            properties: { nickname, profile_image: avatarUrl },
        },
    } = profile;
    try {
        const user = await User.findOne({ id });
        if (user) {
            user.kakaoId = id;
            user.save();
            return done(null, user);
        }
        const newUser = await User.create({
            name: nickname,
            email: id,
            avatarUrl,
            kakaoId: id,
        });
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
};

//google
export const googleLogin = passport.authenticate("google", { scope: ["profile"] });

//googleCallback
export const googleLoginCallback = async (_, __, profile, cb) => {
    const {
        id,
        _json: { name, picture },
    } = profile;
    try {
        const user = await User.findOne({ id });
        if (user) {
            user.googleId = id;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            name,
            googleId: id,
            avatarUrl: picture,
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};

//사용자가 로그인시 보일 profile 화면
export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "User Detail", user: req.user });
    console.log(req.user);
};

//이용자가 profile에 들어가면 보이는 화면
export const userDetail = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const user = await User.findById(id);
        console.log(user);
        res.render("userDetail", { pageTitle: "User Detail", user });
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file,
    } = req;
    try {
        await User.findByIdAndUpdate(req.user.id, {
            //
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl,
        });
        res.redirect(routes.me);
    } catch (error) {
        console.log(error);
        res.redirect(routes.editProfile);
    }
};

export const getChangePassword = (req, res) => {
    res.render("changePassword", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword2 },
    } = req;
    try {
        if (newPassword !== newPassword2) {
            res.status(400);
            res.redirect(`/users${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    } catch (error) {
        res.redirect(`/users${routes.changePassword}`);
    }
};
