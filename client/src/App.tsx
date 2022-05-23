import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { NavBar } from "./components/NavBar/NavBar";
import { NavHome } from "./components/NavBar/NavHome";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import LandingPage from "./components/Landing/LandingPage";
import Auth from "./components/hoc/auth";
import Project from "./components/Project/Project";
import PostCardDetail from "./components/PostDetail/PostCardDetail";
import PostCardDetailDescrip from "./components/PostDetail/section/PostCardDetailDescrip";
import ProjectFunding from "./components/ProjectFunding/ProjectFunding";
import ProjectPayment from "./components/ProjectPayment/ProjectPayment";
import PostCardDetailFaq from "./components/PostDetail/section/PostCardDetailFaq";
import PostCardDetailUpdates from "./components/PostDetail/section/PostCardDetailUpdates";
import PostCardDetailCommunity from "./components/PostDetail/section/PostCardDetailCommunity";
import UpdatesDetail from "./components/PostDetail/section/children/UpdatesDetail";
import PostCardDetailComment from "./components/PostDetail/section/PostCardDetailComment";
import SavedProjects from "./components/UserSetting/saved/SavedProjects";
import SearchPage from "./components/Search/SearchPage";
import Profile from "./components/UserSetting/Profile/Profile";
import Settings from "./components/UserSetting/Settings/Settings";
import Account from "./components/UserSetting/Settings/sections/Account";
import EditProfile from "./components/UserSetting/Settings/sections/EditProfile";
import ShippingAddress from "./components/UserSetting/Settings/sections/ShippingAddress/ShippingAddress";
import Following from "./components/UserSetting/Settings/sections/following/Following";
import FollowingFindCreator from "./components/UserSetting/Settings/sections/following/FollowingFindCreator";
import Followers from "./components/UserSetting/Settings/sections/following/followerSection/Followers";
import Blocked from "./components/UserSetting/Settings/sections/following/blocked/Blocked";
import About from "./components/UserSetting/Profile/sections/About";
import Backed from "./components/UserSetting/Profile/sections/Backed";
import FollowingList from "./components/UserSetting/Settings/sections/following/followingsection/FollowingList";
import Notifications from "./components/UserSetting/Settings/sections/Notifications/Notifications";
import PaymentMethods from "./components/UserSetting/Settings/sections/PaymentMethods/PaymentMethods";
import Arts from "./components/MainNavPages/Arts";
import ComicsIllustration from "./components/MainNavPages/ComicsIllustration";
import DesignTech from "./components/MainNavPages/DesignTech";
import Film from "./components/MainNavPages/Film";
import FoodCraft from "./components/MainNavPages/FoodCraft";
import Games from "./components/MainNavPages/Games";
import Publishing from "./components/MainNavPages/Publishing";
import Music from "./components/MainNavPages/Music";
import AuthLoginKakao from "./components/utils/AuthLoginKakao";
import AuthRegisterKakao from "./components/utils/AuthRegisterKakao";
import LogoutKakao from "./components/utils/LogoutKakao";
import { NavBarBottom } from "./components/NavBar/NavBarBottom";
import Footer from "./components/Footer/Footer";
import MyProjects from "./components/UserSetting/ViewAll/MyProjects";
import MyBacking from "./components/UserSetting/BackedProject/MyBacking";
import Message from "./components/UserSetting/Message/Message";
import Activity from "./components/UserSetting/Activity/Activity";

function App() {
  return (
    <div className="App">
      <Router>
        <NavHome />
        {/* <NavBar /> */}
        <div>
          <Routes>
            <Route path="/" element={Auth(LandingPage, null)} />
            <Route path="/login" element={Auth(Login, null)} />
            <Route path="/signup" element={Auth(Register, null)} />
            <Route path="/startaproject" element={Auth(Project, true)} />
            <Route path="/Art" element={Auth(Arts, null)} />
            <Route
              path="/Comics&Illustration"
              element={Auth(ComicsIllustration, null)}
            />
            <Route path="/design&tech" element={Auth(DesignTech, null)} />
            <Route path="/film" element={Auth(Film, null)} />
            <Route path="/food&craft" element={Auth(FoodCraft, null)} />
            <Route path="/games" element={Auth(Games, null)} />
            <Route path="/music" element={Auth(Music, null)} />
            <Route path="/publishing" element={Auth(Publishing, null)} />
            <Route path="/post/:postID/" element={Auth(PostCardDetail, null)}>
              <Route path="description" element={<PostCardDetailDescrip />} />
              <Route path="faq" element={<PostCardDetailFaq />} />
              <Route path="updates" element={<PostCardDetailUpdates />} />
              <Route path="comments" element={<PostCardDetailComment />} />
              <Route path="community" element={<PostCardDetailCommunity />} />
              <Route path="updates/:updateID" element={<UpdatesDetail />} />
            </Route>
            <Route
              path="/project/:projectID/funding/:backing/:rewardTitle/:rewardAmount"
              element={Auth(ProjectFunding, null)}
            />
            <Route
              path="/project/:projectID/payments"
              element={Auth(ProjectPayment, true)}
            />
            <Route path="/message" element={Auth(Message, true)} />
            <Route path="/myProject" element={Auth(MyProjects, true)} />
            <Route path="/myBacked" element={Auth(MyBacking, true)} />
            <Route path="/Activity" element={Auth(Activity, true)} />
            <Route path="/savedProjects" element={Auth(SavedProjects, true)} />
            <Route path="/search/" element={Auth(SearchPage, null)} />
            <Route path="/search/:terms" element={Auth(SearchPage, null)} />
            <Route path="/profile/:userId/" element={Auth(Profile, null)}>
              <Route path="about" element={<About />} />
              <Route path="backed" element={<Backed />} />
            </Route>
            <Route path="/settings/" element={Auth(Settings, true)}>
              <Route path="Account" element={<Account />} />
              <Route path="EditProfile" element={<EditProfile />} />
              <Route path="Notifications" element={<Notifications />} />
              <Route path="PaymentMethods" element={<PaymentMethods />} />
              <Route path="ShippingAddress" element={<ShippingAddress />} />
            </Route>
            <Route path="/following/" element={Auth(Following, true)}>
              <Route path="findCreators" element={<FollowingFindCreator />} />
              <Route path="following" element={<FollowingList />} />
              <Route path="followers" element={<Followers />} />
              <Route path="blocked" element={<Blocked />} />
            </Route>
            <Route
              path="/oauth/kakao/login/callback"
              element={<AuthLoginKakao />}
            />
            <Route
              path="/oauth/kakao/register/callback"
              element={<AuthRegisterKakao />}
            />
            <Route
              path="/oauth/kakao/logout/callback"
              element={<LogoutKakao />}
            />
          </Routes>
        </div>
        <NavBarBottom />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
