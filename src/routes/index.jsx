import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import ProfileFront from "../pages/profileFront/ProfileFront";
import ContactForm from "../pages/login/Contact";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/login/Register";
import Contacts from "../pages/contacts/Contacts";
import ResetPassword from "../pages/login/ResetPassword";
import {AUTH_STATES} from "../constants";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../store/actions";

import {Auth, Hub} from "aws-amplify";
import {userSignOut} from "../services";
import ForgotPassword from "../pages/login/ForgotPassword";
import ForgotPasswordSubmit from "../pages/login/ForgotPasswordSubmit";
import Analytics from "../pages/analytics/analytics";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import ProfileEdit from "../pages/profileEdit/ProfileEdit";
import OtpValidation from "../pages/login/OtpValidation";

const Router = () => {
    const [auth, setauth] = useState(AUTH_STATES.INITIAL);
    const [tempUser, setTempUser] = useState({
        username: "",
        password: "",
    });
    const dispatch = useDispatch();
    const {user: userProfile, publicProfile} = useSelector(
        (state) => state.userReducer
    );

    useEffect(() => {
        if (
            userProfile &&
            (userProfile.mobile || userProfile.fax || userProfile.landPhone)
        ) {
            if (auth !== AUTH_STATES.ADMIN) {
                setauth(AUTH_STATES.LOGGED);
            }
        } else if (userProfile) {
            setauth(AUTH_STATES.NO_CONTACT);
        }
    }, [userProfile]);

    const getAuthenticatedUser = async () => {
        try {
            if (
                window.location.pathname.includes("/profile/") ||
                window.location.pathname.includes("share-my-details")
            ) {
                return;
            }
            const authUser = await Auth.currentAuthenticatedUser();
            if (
                authUser?.attributes &&
                authUser?.attributes["custom:role"] === "ADMIN"
            ) {
                setauth(AUTH_STATES.ADMIN);
            }
            if (authUser) {
                dispatch(getUser(authUser.username));
            } else {
                setauth(AUTH_STATES.NO_AUTH);
            }
        } catch (error) {
            setauth(AUTH_STATES.NO_AUTH);
            await userSignOut();
        }
    };

    useEffect(() => {
        Hub.listen("auth", async ({payload: {event, data}}) => {
            switch (event) {
                case "signIn":
                    if (data?.attributes && data?.attributes["custom:role"] === "ADMIN") {
                        setauth(AUTH_STATES.ADMIN);
                    }
                    dispatch(getUser(data.username));
                    break;
                case "signOut":
                    setauth(AUTH_STATES.NO_AUTH);
                    break;
            }
        });
        getAuthenticatedUser();
    }, []);

    return (
        <BrowserRouter>
            <div className="w-full min-h-screen bg-brand-gray sm:py-6">
                <Routes>
                    <Route
                        path="/auth/login"
                        element={<Login auth={auth} setTempUser={setTempUser}/>}
                    />
                    <Route
                        path="/auth/register"
                        element={
                            <Register
                                auth={auth}
                                setauth={setauth}
                                setTempUser={setTempUser}
                            />
                        }
                    />
                    <Route
                        path="/auth/forgot-password"
                        element={<ForgotPassword auth={auth}/>}
                    />
                    <Route
                        path="/auth/reset-forgot-password/:username"
                        element={<ForgotPasswordSubmit auth={auth}/>}
                    />
                    <Route
                        path="/auth/contact"
                        element={<ContactForm auth={auth} setauth={setauth}/>}
                    />
                    <Route
                        path="/auth/otp"
                        element={
                            <OtpValidation
                                auth={auth}
                                setauth={setauth}
                                tempUser={tempUser}
                            />
                        }
                    />
                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute auth={auth}>
                                <AdminDashboard/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute auth={auth}>
                                <Dashboard auth={auth}/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/analytics"
                        element={
                            <ProtectedRoute auth={auth}>
                                <Analytics/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reset-password"
                        element={
                            <ProtectedRoute auth={auth}>
                                <ResetPassword/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/edit-profile"
                        element={
                            <ProtectedRoute auth={auth}>
                                <ProfileEdit auth={auth}/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile/:userId"
                        element={<ProfileFront setauth={setauth}/>}
                    />
                    <Route
                        path="/contacts"
                        element={
                            <ProtectedRoute auth={auth}>
                                <Contacts/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export {Router};
